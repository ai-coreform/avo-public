'use client'

import { useState, useEffect, useRef, type FormEvent } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PhoneInput, isValidPhoneNumber } from '@/components/ui/phone-input'
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import confetti from 'canvas-confetti'

const SOURCE_OPTIONS = [
  'Ricerca su Google',
  'Pubblicit\u00e0 online (es. Instagram Ads, Google Ads, etc.)',
  'Social Media (Facebook, Instagram, etc.)',
  'Passaparola',
  'Mi \u00e8 stato consigliato da un altro vostro cliente',
] as const

type Status = 'idle' | 'submitting' | 'success' | 'error'

type FieldErrors = {
  businessName?: string
  fullName?: string
  phone?: string
  province?: string
  source?: string
}

function validateFields(fields: {
  businessName: string
  fullName: string
  phone: string
  province: string
  source: string
}): FieldErrors {
  const errors: FieldErrors = {}

  if (!fields.businessName.trim()) {
    errors.businessName = 'Inserisci il nome della tua attivita.'
  }

  if (!fields.fullName.trim()) {
    errors.fullName = 'Inserisci il tuo nome e cognome.'
  } else if (!fields.fullName.trim().includes(' ')) {
    errors.fullName = 'Inserisci sia il nome che il cognome.'
  }

  if (!fields.phone) {
    errors.phone = 'Inserisci il tuo numero di telefono.'
  } else if (!isValidPhoneNumber(fields.phone)) {
    errors.phone = 'Il numero di telefono non sembra valido. Controlla e riprova.'
  }

  if (!fields.province.trim()) {
    errors.province = 'Inserisci la tua provincia.'
  }

  return errors
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="text-[13px] text-destructive mt-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
      {message}
    </p>
  )
}

export default function ProvaGratisPage() {
  const [businessName, setBusinessName] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [province, setProvince] = useState('')
  const [source, setSource] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const isSubmittingRef = useRef(false)

  function clearFieldError(field: keyof FieldErrors) {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (isSubmittingRef.current) return

    const errors = validateFields({ businessName, fullName, phone, province, source })
    setFieldErrors(errors)

    if (Object.keys(errors).length > 0) {
      const firstErrorField = (['businessName', 'fullName', 'phone', 'province'] as const).find(
        (f) => errors[f],
      )
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        document.getElementById(firstErrorField)?.focus()
      }
      return
    }

    isSubmittingRef.current = true
    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          fullName,
          phone,
          province,
          source,
          cookieConsent: localStorage.getItem('avo-cookie-consent') === 'granted',
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Errore sconosciuto')
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Errore durante la registrazione. Riprova.')
    } finally {
      isSubmittingRef.current = false
    }
  }

  useEffect(() => {
    if (status !== 'success') return

    const end = Date.now() + 600

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 1 },
        colors: ['#4a7c59', '#a8d5ba', '#f0c040', '#e8e8e8'],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 1 },
        colors: ['#4a7c59', '#a8d5ba', '#f0c040', '#e8e8e8'],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }, [status])

  if (status === 'success') {
    return (
      <div className="min-h-svh bg-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10">
            <Check className="size-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
            Registrazione completata!
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-ink/50">
            Grazie per la registrazione! Pensiamo a tutto noi: entro 24 ore riceverai il tuo menu digitale pronto all&apos;uso.
          </p>
          <Button asChild className="mt-8 rounded-full font-display font-semibold px-8 h-11">
            <Link href="/">Torna alla home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-white">
      <div className="mx-auto max-w-lg px-6 py-10 md:py-16">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[14px] text-ink/40 hover:text-ink transition-colors mb-10"
        >
          <ArrowLeft className="size-3.5" />
          Torna alla home
        </Link>

        {/* Header */}
        <div className="mb-10">
          <img src="/images/avo-logo.svg" alt="Avo" className="h-8 w-auto mb-8" />
          <h1 className="font-display text-[clamp(1.8rem,4vw,2.5rem)] font-bold tracking-tight text-ink leading-tight">
            Ricevi il tuo menu digitale
          </h1>
          <p className="mt-3 text-[16px] text-ink/45 leading-relaxed">
            Compila il form con le tue informazioni e ricevi il tuo menu digitale entro 24 ore.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="businessName" className="text-[17px] font-semibold text-ink">
              Nome dell&apos;attivita <span className="text-destructive">*</span>
            </Label>
            <Input
              id="businessName"
              value={businessName}
              onChange={(e) => {
                setBusinessName(e.target.value)
                clearFieldError('businessName')
              }}
              placeholder="Es. Ristorante Da Mario"
              aria-invalid={!!fieldErrors.businessName}
              className={cn(
                'h-11 rounded-lg text-[15px]',
                fieldErrors.businessName && 'border-destructive',
              )}
            />
            <FieldError message={fieldErrors.businessName} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-[17px] font-semibold text-ink">
              Nome e Cognome <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value)
                clearFieldError('fullName')
              }}
              placeholder="Es. Mario Rossi"
              aria-invalid={!!fieldErrors.fullName}
              className={cn(
                'h-11 rounded-lg text-[15px]',
                fieldErrors.fullName && 'border-destructive',
              )}
            />
            <FieldError message={fieldErrors.fullName} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-[17px] font-semibold text-ink">
              Numero di Telefono <span className="text-destructive">*</span>
            </Label>
            <p className="text-[13px] text-ink/35">Idealmente il tuo numero <span className="font-semibold">WhatsApp</span></p>
            <PhoneInput
              value={phone as any}
              onChange={(value) => {
                setPhone(value || '')
                clearFieldError('phone')
              }}
              placeholder="333 1234567"
              className={cn(
                '[&_input]:h-11 [&_input]:rounded-e-lg [&_input]:text-[15px] [&_button]:h-11',
                fieldErrors.phone && '[&_input]:border-destructive [&_button]:border-destructive',
              )}
            />
            <FieldError message={fieldErrors.phone} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="province" className="text-[17px] font-semibold text-ink">
              Provincia <span className="text-destructive">*</span>
            </Label>
            <Input
              id="province"
              value={province}
              onChange={(e) => {
                setProvince(e.target.value)
                clearFieldError('province')
              }}
              placeholder="Es. Milano"
              aria-invalid={!!fieldErrors.province}
              className={cn(
                'h-11 rounded-lg text-[15px]',
                fieldErrors.province && 'border-destructive',
              )}
            />
            <FieldError message={fieldErrors.province} />
          </div>

          <fieldset className="space-y-3">
            <legend className="text-[17px] font-semibold text-ink">
              Come hai scoperto Avo?
            </legend>
            {SOURCE_OPTIONS.map((option) => (
              <label
                key={option}
                className={cn(
                  'flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors',
                  source === option
                    ? 'border-primary/30 bg-primary/5'
                    : fieldErrors.source
                      ? 'border-destructive/30'
                      : 'border-ink/10 hover:border-ink/20',
                )}
              >
                <input
                  type="radio"
                  name="source"
                  value={option}
                  checked={source === option}
                  onChange={(e) => {
                    setSource(e.target.value)
                    clearFieldError('source')
                  }}
                  className="accent-primary size-4"
                />
                <span className="text-[14px] text-ink">{option}</span>
              </label>
            ))}
            <FieldError message={fieldErrors.source} />
          </fieldset>

          <p className="text-[13px] text-ink/35 leading-relaxed">
            Inviando questo modulo, accetti la nostra{' '}
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink/50">
              Privacy Policy
            </a>.
          </p>

          {status === 'error' && (
            <p className="text-[14px] text-destructive">{errorMsg}</p>
          )}

          <Button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full h-12 rounded-full font-display font-semibold text-[15px] mt-2"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                Invio in corso...
              </>
            ) : (
              <>
                Invia
                <ArrowRight className="size-4 ml-1.5" />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
