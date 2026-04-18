# Avo Public

Public-facing Avo surfaces (landing + trial signup, with the customer menu moving in later). Next.js 16, React 19, Tailwind v4.

## Routes

- `/` — marketing landing page
- `/prova-gratis` — trial signup form
- `/api/trial` — Notion + Slack webhook for form submissions

## Develop

```bash
bun install
bun run dev
```

Open http://localhost:3000.

## Environment

Create `.env` (or `.env.local`) with:

```
NEXT_PUBLIC_SITE_URL=https://avomenu.com
NEXT_PUBLIC_MENU_DOMAIN=avomenu.com
NOTION_API_KEY=...
NOTION_CRM_DATABASE_ID=...
SLACK_WEBHOOK_URL=...
```
