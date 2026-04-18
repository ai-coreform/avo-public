import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@notionhq/client'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const databaseId = process.env.NOTION_CRM_DATABASE_ID!
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
const metaAccessToken = process.env.META_CONVERSIONS_API_TOKEN
const NOTION_SOURCE_MAP: Record<string, string> = {
  'Pubblicità online (es. Instagram Ads, Google Ads, etc.)': 'Pubblicità online',
  'Social Media (Facebook, Instagram, etc.)': 'Social Media',
}

function normalizeText(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const businessName = normalizeText(body.businessName)
  const fullName = normalizeText(body.fullName)
  const phone = normalizeText(body.phone)
  const province = normalizeText(body.province)
  const source = normalizeText(body.source)

  if (!businessName || !fullName || !phone || !province) {
    return NextResponse.json(
      { success: false, error: 'Tutti i campi obbligatori devono essere compilati.' },
      { status: 400 },
    )
  }

  const parsed = parsePhoneNumberFromString(phone)
  const formattedPhone = parsed ? parsed.formatInternational() : phone
  const notionSource = source
    ? (NOTION_SOURCE_MAP[source] ?? source.replaceAll(',', ''))
    : ''

  const properties: Record<string, any> = {
    'Titolare': { title: [{ text: { content: fullName } }] },
    'Attività': { rich_text: [{ text: { content: businessName } }] },
    'Status': { status: { name: 'Lead' } },
    'Telefono': { phone_number: formattedPhone },
    'Provincia': { rich_text: [{ text: { content: province } }] },
    'Data di Registrazione': { date: { start: new Date().toISOString().split('T')[0] } },
    'Fonte': { select: { name: 'Landing Form' } },
  }

  if (notionSource) {
    properties['Come hai scoperto Avo?'] = { select: { name: notionSource } }
  }

  try {
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties,
    })

    if (slackWebhookUrl) {
      const slackMessage = {
        blocks: [
          {
            type: 'header',
            text: { type: 'plain_text', text: 'Nuovo contatto dal sito!' },
          },
          {
            type: 'section',
            fields: [
              { type: 'mrkdwn', text: `*Titolare:*\n${fullName}` },
              { type: 'mrkdwn', text: `*Attivita:*\n${businessName}` },
              { type: 'mrkdwn', text: `*Telefono:*\n${formattedPhone}` },
              { type: 'mrkdwn', text: `*Provincia:*\n${province}` },
              ...(source ? [{ type: 'mrkdwn', text: `*Fonte:*\n${source}` }] : []),
            ],
          },
        ],
      }

      fetch(slackWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackMessage),
      }).catch((err) => console.error('Slack webhook error:', err))
    }

    if (metaPixelId && metaAccessToken && body.cookieConsent) {
      const eventData = {
        data: [
          {
            event_name: 'Lead',
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
            user_data: {
              ph: [phone],
              fn: [fullName.toLowerCase()],
            },
          },
        ],
      }

      fetch(
        `https://graph.facebook.com/v21.0/${metaPixelId}/events?access_token=${metaAccessToken}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventData),
        },
      ).catch((err) => console.error('Meta Conversions API error:', err))
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Notion API error:', err)
    return NextResponse.json(
      { success: false, error: 'Errore durante la registrazione. Riprova.' },
      { status: 500 },
    )
  }
}
