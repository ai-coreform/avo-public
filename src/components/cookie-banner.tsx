'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const CONSENT_KEY = 'avo-cookie-consent'

type Consent = 'granted' | 'denied'

export function getConsent(): Consent | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(CONSENT_KEY) as Consent | null
}

function setConsent(value: Consent) {
  localStorage.setItem(CONSENT_KEY, value)
  window.dispatchEvent(new Event('cookie-consent'))
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!getConsent()) setVisible(true)
  }, [])

  function accept() {
    setConsent('granted')
    setVisible(false)
  }

  function decline() {
    setConsent('denied')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="mx-auto max-w-xl rounded-2xl border border-ink/8 bg-white px-5 py-4 shadow-lg flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <p className="text-sm text-ink/70 flex-1">
          Utilizziamo cookie per migliorare la tua esperienza e analizzare il traffico.{' '}
          <Link href="/cookie-policy" className="underline underline-offset-2 hover:text-ink">
            Cookie policy
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="rounded-full border border-ink/15 px-4 py-1.5 text-sm font-medium text-ink/60 transition-colors hover:border-ink/30 hover:text-ink"
          >
            Rifiuta
          </button>
          <button
            onClick={accept}
            className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  )
}
