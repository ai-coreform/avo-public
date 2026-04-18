'use client'

import { useRef, useEffect, useState, useCallback, type ReactNode } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
const SITE_URL = 'https://avomenu.com'
import { cn } from '@/lib/utils'
import {
  ArrowRight,
  Check,
  Search,
  Globe,
  Sparkles,
  Send,
  Menu,
  X,
  Star,
  ChevronRight,
  LayoutDashboard,
  Palette,
  Languages,
  BotMessageSquare,
  QrCode,
  Clock,
  Upload,
  Wand2,
  Share2,
  Mail,
  Eye,
  Utensils,
  Zap,
  Camera,
  Radio,
  ShieldCheck,
} from 'lucide-react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  MilkBottleIcon,
  FishFoodIcon,
  BeanIcon,
  EggIcon,
  ShellfishIcon,
  WheatIcon,
  NutIcon,
} from '@hugeicons/core-free-icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { StaticMenuDemo } from '@/components/landing/static-menu-demo'

const siteUrl = SITE_URL
const socialImageUrl = `${SITE_URL}/images/header-image.png`

const faqItems = [
  {
    question: "Che cos'e Avo?",
    answer:
      "Avo e un software che permette a ristoranti e locali di creare, gestire e pubblicare il proprio menu digitale. I clienti lo consultano tramite QR code, senza scaricare nessuna app.",
  },
  {
    question: "In che modo Avo usa l'intelligenza artificiale?",
    answer:
      "Avo usa l'AI per tradurre il menu in tutte le lingue in automatico, generare descrizioni dei piatti, tracciare gli allergeni e offrirti un assistente con cui modificare e consultare il menu, e molto altro. Tu controlli sempre il risultato finale, l'AI fa il lavoro pesante.",
  },
  {
    question: 'Posso aggiornare il menu in tempo reale?',
    answer:
      "Si, ogni modifica e visibile subito. Se finisce un piatto, cambia un prezzo o parte una promo del giorno, aggiorni dal pannello e il menu del cliente si aggiorna all'istante.",
  },
  {
    question: 'Come funzionano le traduzioni?',
    answer:
      "Avo traduce automaticamente il menu nelle lingue che scegli. I tuoi clienti internazionali vedono il menu nella loro lingua, senza che tu debba tradurre nulla a mano.",
  },
  {
    question: 'Quanto costa Avo?',
    answer:
      "Puoi provarlo gratis, senza carta di credito. Dopo la prova ci sono piani flessibili pensati per ogni tipo di locale, dal ristorante singolo alla catena con piu sedi.",
  },
  {
    question: 'Funziona anche per cocktail bar o enoteche?',
    answer:
      "Assolutamente. Avo funziona per qualsiasi locale con un menu: ristoranti, pizzerie, cocktail bar, enoteche, pasticcerie, food truck. Se hai una lista di cose da offrire, Avo la rende digitale.",
  },
]

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Avo',
    url: siteUrl,
    logo: `${siteUrl}/images/avo-logo.svg`,
    image: socialImageUrl,
    email: 'team@avomenu.com',
    sameAs: [siteUrl],
    description:
      'Avo aiuta i ristoranti a pubblicare menu digitali con QR code, traduzioni e gestione semplice dal back office.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Avo',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: siteUrl,
    image: socialImageUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Ristoranti e locali hospitality',
    },
    description:
      'Software per ristoranti che gestisce menu digitali, QR code, traduzioni automatiche e aggiornamenti dal back office.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Avo',
    url: siteUrl,
    inLanguage: 'it-IT',
    description:
      'Sito ufficiale di Avo, piattaforma per creare e gestire menu digitali per ristoranti.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  },
]

/* ─── Scroll-triggered fade ─── */

function FadeIn({
  children,
  className,
  delay = 0,
  autoShow = false,
}: {
  children: ReactNode
  className?: string
  delay?: number
  autoShow?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (autoShow) {
      setVisible(true)
      return
    }
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [autoShow])

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ─── Realistic Phone Frame ─── */

function PhoneFrame({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('relative mx-auto', className)} style={{ width: 280 }}>
      <div
        className="overflow-hidden bg-cream"
        style={{
          borderRadius: 36,
          border: '6px solid #2C2420',
          boxShadow: '0 40px 80px -20px rgba(44,36,32,0.18)',
        }}
      >
        {/* Status bar */}
        <div className="relative bg-cream px-5 pt-3 pb-1">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[22px] w-[90px] rounded-b-2xl bg-[#2C2420]" />
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-[10px] font-semibold text-ink/50">9:41</span>
            <div className="flex gap-1">
              <div className="h-[7px] w-[18px] rounded-sm bg-ink/25" />
              <div className="h-[7px] w-[7px] rounded-sm bg-ink/25" />
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="bg-cream">{children}</div>
        {/* Home indicator */}
        <div className="flex justify-center pb-2 pt-1 bg-cream">
          <div className="h-[4px] w-[100px] rounded-full bg-ink/15" />
        </div>
      </div>
    </div>
  )
}

/* ─── Hero Phone Mockup — live interactive replica of real menu UI ─── */

function HeroPhoneMockup() {
  const borderWidth = 7
  const frameWidth = 300
  const innerWidth = frameWidth - borderWidth * 2 // 286px visible
  const contentWidth = 390
  const scale = innerWidth / contentWidth // ~0.733
  // iPhone 15 body ratio ~2.06:1 (71.6 x 147.6mm). Status bar is ~35px.
  // Total inner height = innerWidth * 2.06 ≈ 589px. Content area = 589 - 35 = 554px.
  const statusBarHeight = 35
  const visibleHeight = Math.round(innerWidth * 2.06) - statusBarHeight

  return (
    <div className="relative mx-auto" style={{ width: frameWidth }}>
      <div
        className="overflow-hidden"
        style={{
          borderRadius: 40,
          border: `${borderWidth}px solid #1a1a1a`,
          boxShadow: '0 50px 100px -25px rgba(0,0,0,0.18), 0 20px 40px -15px rgba(0,0,0,0.10)',
        }}
      >
        {/* Status bar with notch */}
        <div className="relative bg-white px-5 pt-3 pb-1">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[24px] w-[100px] rounded-b-2xl bg-[#1a1a1a]" />
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-[10px] font-semibold text-ink/50">9:41</span>
            <div className="flex gap-1">
              <div className="h-[7px] w-[18px] rounded-sm bg-ink/20" />
              <div className="h-[7px] w-[7px] rounded-sm bg-ink/20" />
            </div>
          </div>
        </div>

        {/* Scaled interactive menu — renders at 390px, scaled to fit inner width */}
        <div
          className="relative overflow-hidden"
          style={{ height: visibleHeight }}
        >
          <div
            style={{
              width: contentWidth,
              height: visibleHeight / scale,
              transformOrigin: 'top left',
              transform: `scale(${scale})`,
            }}
          >
            <StaticMenuDemo height={visibleHeight / scale} />
          </div>

          {/* Home indicator — floats over content */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2 pt-3 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none">
            <div className="h-[4px] w-[100px] rounded-full bg-ink/[0.12]" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Product Mockup: Customer Menu ─── */

function MenuMockup() {
  const items = [
    { name: 'Burrata pugliese', desc: 'Datterini, basilico, olio EVO', price: '14.00', allergens: ['🥛'] },
    { name: 'Tartare di tonno', desc: 'Avocado, sesamo, salsa di soia', price: '16.00', allergens: ['🐟'] },
    { name: 'Carpaccio di polpo', desc: 'Patate tiepide, olive taggiasche', price: '13.00', allergens: ['🐟'] },
    { name: 'Vitello tonnato', desc: 'Salsa tonnata della tradizione', price: '12.00', allergens: [] },
  ]

  return (
    <PhoneFrame>
      {/* Header — matches real MenuHeader */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-md bg-primary/10 flex items-center justify-center">
            <span className="text-[9px] font-bold text-primary">DM</span>
          </div>
          <span className="text-[13px] font-display font-bold text-ink">Da Mario</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Search className="size-[18px] text-ink/50" strokeWidth={1.8} />
          <div className="flex items-center gap-1 rounded-md bg-ink/5 px-1.5 py-0.5">
            <Globe className="size-3 text-ink/50" />
            <span className="text-[10px] font-medium text-ink/60">IT</span>
          </div>
        </div>
      </div>

      {/* Section tabs — matches real DigitalMenu tabs */}
      <div className="flex border-b border-ink/8">
        <button className="flex-1 py-2 text-[11px] font-display font-semibold text-primary border-b-2 border-primary">
          Mangiare
        </button>
        <button className="flex-1 py-2 text-[11px] font-display font-medium text-ink/40">
          Bere
        </button>
      </div>

      {/* Category pills */}
      <div className="flex gap-1.5 px-4 py-3 overflow-hidden">
        <span className="rounded-full bg-primary px-3 py-1 text-[9px] font-semibold text-primary-foreground whitespace-nowrap">
          Antipasti
        </span>
        <span className="rounded-full bg-ink/5 px-3 py-1 text-[9px] font-medium text-ink/40 whitespace-nowrap">
          Primi
        </span>
        <span className="rounded-full bg-ink/5 px-3 py-1 text-[9px] font-medium text-ink/40 whitespace-nowrap">
          Secondi
        </span>
        <span className="rounded-full bg-ink/5 px-3 py-1 text-[9px] font-medium text-ink/40 whitespace-nowrap">
          Dolci
        </span>
      </div>

      {/* Group heading — matches real CompactMenuList */}
      <div className="px-4 pt-2 pb-1">
        <span className="font-display text-base font-bold tracking-tight lowercase text-ink">
          antipasti<span className="text-primary">.</span>
        </span>
      </div>

      {/* Menu items — matches real CompactMenuItem layout */}
      <div className="px-4 pb-4">
        {items.map((item) => (
          <div key={item.name} className="pt-4">
            {/* Name ··· Price row */}
            <div className="flex items-baseline">
              <span className="font-display text-[11px] font-semibold uppercase text-ink">
                {item.name}
              </span>
              <span className="flex-1 border-b border-dotted border-ink/15 mx-2 mb-[3px]" />
              <span className="font-display text-[11px] font-semibold text-primary whitespace-nowrap">
                {item.price}
              </span>
            </div>
            {/* Description */}
            <p className="text-[9px] leading-snug text-ink/50 mt-0.5">
              {item.desc}
            </p>
            {/* Allergen badges */}
            {item.allergens.length > 0 && (
              <div className="flex gap-0.5 mt-1">
                {item.allergens.map((a) => (
                  <span key={a} className="text-[8px]">{a}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </PhoneFrame>
  )
}

/* ─── Product Mockup: AI Chat ─── */

function ChatMockup() {
  return (
    <PhoneFrame>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-md bg-primary/10 flex items-center justify-center">
            <span className="text-[9px] font-bold text-primary">DM</span>
          </div>
          <span className="text-[13px] font-display font-bold text-ink">Da Mario</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Search className="size-[18px] text-ink/50" strokeWidth={1.8} />
          <div className="flex items-center gap-1 rounded-md bg-ink/5 px-1.5 py-0.5">
            <Globe className="size-3 text-ink/50" />
            <span className="text-[10px] font-medium text-ink/60">EN</span>
          </div>
        </div>
      </div>

      {/* Chat UI — matches real UserChat */}
      <div className="border-t border-ink/8">
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-ink/8">
          <div className="flex size-7 items-center justify-center rounded-full bg-primary">
            <Sparkles className="size-3.5 text-primary-foreground" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-ink">Avo Assistant</div>
            <div className="text-[8px] text-ink/40 flex items-center gap-1">
              <span className="size-1 rounded-full bg-green-500" />
              Online
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="p-4 space-y-3">
          {/* User */}
          <div className="flex justify-end">
            <div className="rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 max-w-[78%]">
              <p className="text-[11px] leading-relaxed text-primary-foreground">
                Which dishes are gluten-free?
              </p>
            </div>
          </div>
          {/* AI */}
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm bg-ink/5 px-3.5 py-2 max-w-[82%]">
              <p className="text-[11px] leading-relaxed text-ink">
                Here are today&apos;s gluten-free options:
              </p>
              <ul className="mt-1.5 space-y-1">
                {[
                  ['Tartare di tonno', 'avocado & sesame'],
                  ['Tagliata di manzo', 'rocket & parmesan'],
                  ['Insalata di polpo', 'potatoes & olives'],
                ].map(([name, desc]) => (
                  <li key={name} className="text-[10px] text-ink/70 flex items-start gap-1.5">
                    <Check className="size-2.5 text-primary mt-0.5 shrink-0" strokeWidth={3} />
                    <span><strong className="text-ink">{name}</strong>, {desc}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[9px] text-ink/40">
                Would you like more details about any of these?
              </p>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 rounded-xl bg-ink/[0.04] px-3 py-2">
            <span className="text-[10px] text-ink/30 flex-1">Ask something...</span>
            <div className="flex size-6 items-center justify-center rounded-lg bg-primary">
              <Send className="size-2.5 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  )
}

/* ─── Product Mockup: Translation ─── */

function TranslationMockup() {
  return (
    <PhoneFrame>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-md bg-primary/10 flex items-center justify-center">
            <span className="text-[9px] font-bold text-primary">DM</span>
          </div>
          <span className="text-[13px] font-display font-bold text-ink">Da Mario</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Search className="size-[18px] text-ink/50" strokeWidth={1.8} />
          {/* Language selector open state */}
          <div className="flex items-center gap-1 rounded-md bg-primary/10 px-1.5 py-0.5 ring-1 ring-primary/20">
            <Globe className="size-3 text-primary" />
            <span className="text-[10px] font-medium text-primary">FR</span>
          </div>
        </div>
      </div>

      {/* Section tabs */}
      <div className="flex border-b border-ink/8">
        <button className="flex-1 py-2 text-[11px] font-display font-semibold text-primary border-b-2 border-primary">
          Manger
        </button>
        <button className="flex-1 py-2 text-[11px] font-display font-medium text-ink/40">
          Boire
        </button>
      </div>

      {/* Category pills in French */}
      <div className="flex gap-1.5 px-4 py-3 overflow-hidden">
        <span className="rounded-full bg-primary px-3 py-1 text-[9px] font-semibold text-primary-foreground whitespace-nowrap">
          Entrées
        </span>
        <span className="rounded-full bg-ink/5 px-3 py-1 text-[9px] font-medium text-ink/40 whitespace-nowrap">
          Premiers
        </span>
        <span className="rounded-full bg-ink/5 px-3 py-1 text-[9px] font-medium text-ink/40 whitespace-nowrap">
          Seconds
        </span>
        <span className="rounded-full bg-ink/5 px-3 py-1 text-[9px] font-medium text-ink/40 whitespace-nowrap">
          Desserts
        </span>
      </div>

      {/* Group heading */}
      <div className="px-4 pt-2 pb-1">
        <span className="font-display text-base font-bold tracking-tight lowercase text-ink">
          entrées<span className="text-primary">.</span>
        </span>
      </div>

      {/* French-translated menu items */}
      <div className="px-4 pb-4">
        {[
          { name: 'Burrata des Pouilles', desc: 'Tomates datterini, basilic, huile EVO', price: '14.00' },
          { name: 'Tartare de thon', desc: 'Avocat, sésame, sauce soja', price: '16.00' },
          { name: 'Carpaccio de poulpe', desc: 'Pommes de terre, olives taggiasca', price: '13.00' },
          { name: 'Vitello tonnato', desc: 'Sauce au thon traditionnelle', price: '12.00' },
        ].map((item) => (
          <div key={item.name} className="pt-4">
            <div className="flex items-baseline">
              <span className="font-display text-[11px] font-semibold uppercase text-ink">
                {item.name}
              </span>
              <span className="flex-1 border-b border-dotted border-ink/15 mx-2 mb-[3px]" />
              <span className="font-display text-[11px] font-semibold text-primary whitespace-nowrap">
                {item.price}
              </span>
            </div>
            <p className="text-[9px] leading-snug text-ink/50 mt-0.5">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Language flags bar */}
      <div className="px-4 pb-4 pt-2 border-t border-ink/8">
        <p className="text-[8px] text-ink/30 mb-2 text-center">Disponible en 30+ langues</p>
        <div className="flex items-center justify-center gap-1.5">
          {['🇮🇹', '🇬🇧', '🇫🇷', '🇩🇪', '🇪🇸', '🇯🇵', '🇨🇳', '🇵🇹'].map((flag) => (
            <span key={flag} className="text-[11px]">{flag}</span>
          ))}
          <span className="text-[8px] text-ink/30 ml-0.5">+22</span>
        </div>
      </div>
    </PhoneFrame>
  )
}

/* ─── Benefits / Value Tabs Section ─── */

/* ─── Back Office Features (auto-cycling tabs with progress bars) ─── */

const CYCLE_DURATION = 4000 // ms per tab

const backofficeFeatures = [
  {
    id: 'menu',
    icon: LayoutDashboard,
    title: 'Gestione menu',
    description: 'Aggiungi, modifica e riordina piatti e categorie in pochi clic. Tutto in tempo reale.',
  },
  {
    id: 'ai',
    icon: BotMessageSquare,
    title: 'Assistente AI',
    description: "Modifica il menu con comandi in linguaggio naturale. L'AI fa il lavoro pesante.",
  },
  {
    id: 'style',
    icon: Palette,
    title: 'Personalizzazione',
    description: 'Colori, font e logo del tuo brand. Il menu digitale che sembra fatto su misura.',
  },
  {
    id: 'translate',
    icon: Languages,
    title: 'Traduzioni automatiche',
    description: 'Oltre 30 lingue disponibili. Traduci tutto il menu con un solo clic.',
  },
]

function BackOfficeFeatures() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const progressRef = useRef(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (paused || !inView) return
    const tick = 50
    progressRef.current = progress
    const id = setInterval(() => {
      progressRef.current += (tick / CYCLE_DURATION) * 100
      if (progressRef.current >= 100) {
        progressRef.current = 0
        setProgress(0)
        setActiveIndex((prev) => (prev + 1) % backofficeFeatures.length)
      } else {
        setProgress(progressRef.current)
      }
    }, tick)
    return () => clearInterval(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, activeIndex, inView])

  const selectTab = (i: number) => {
    progressRef.current = 0
    setActiveIndex(i)
    setProgress(0)
  }

  return (
    <section ref={sectionRef} id="back-office" className="scroll-mt-20 py-14 md:py-20">
      <div className="mx-auto max-w-5xl space-y-12 px-6">
        <FadeIn>
          <div className="relative z-10 grid items-center gap-4 md:grid-cols-2 md:gap-12">
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.5rem)] font-bold tracking-tight leading-tight text-ink">
              Tutto il tuo menu,{' '}
              <br className="hidden md:block" />
              in un unico pannello
            </h2>
            <p className="max-w-sm text-base leading-relaxed text-ink/50 sm:ml-auto">
              Gestisci piatti, traduzioni, stile e assistente AI da un back office pensato per la ristorazione. Semplice, veloce, sempre aggiornato.
            </p>
          </div>
        </FadeIn>

        {/* Screenshot area — same style as original */}
        <FadeIn delay={100}>
          <div
            className="px-3 pt-3 md:-mx-8"
          >
            <div className="aspect-76/36 mask-b-from-75% mask-b-to-95% relative">
              {backofficeFeatures.map((f, i) => (
                <img
                  key={f.id}
                  src={`/images/backoffice-${f.id}.png`}
                  alt={`Avo back office — ${f.title}`}
                  className={cn(
                    'absolute inset-0 w-full transition-opacity duration-500',
                    i === activeIndex ? 'opacity-100' : 'opacity-0',
                  )}
                />
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Feature tabs with progress bars */}
        <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
          {backofficeFeatures.map((feature, i) => (
            <FadeIn key={feature.id} delay={i * 80}>
              <button
                onClick={() => selectTab(i)}
                onMouseEnter={() => i === activeIndex && setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                className="relative w-full text-left pt-4"
              >
                {/* Progress bar — flush top, full width */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-ink/[0.08] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: i === activeIndex ? `${progress}%` : '0%',
                      transition: 'none',
                    }}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <feature.icon className={cn('size-4', i === activeIndex ? 'text-primary' : 'text-ink/30')} />
                    <h3 className={cn('text-sm font-medium', i === activeIndex ? 'text-ink' : 'text-ink/50')}>
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-ink/50">
                    {feature.description}
                  </p>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Client Features (auto-cycling accordion + phone mockup) ─── */

const CLIENT_CYCLE_DURATION = 5000

const clientFeatures = [
  {
    id: 'qr',
    icon: QrCode,
    title: 'Il menu sempre a portata di mano',
    description:
      'I clienti inquadrano il QR code e hanno il menu completo sul telefono. Nessuna app, nessuna attesa. Basta uno scan.',
  },
  {
    id: 'translate',
    icon: Globe,
    title: 'Parla tutte le lingue del mondo',
    description:
      'Il menu si traduce automaticamente in oltre 30 lingue. Ogni turista legge piatti e descrizioni nella propria lingua madre.',
  },
  {
    id: 'ai',
    icon: Sparkles,
    title: 'Un assistente AI a ogni tavolo',
    description:
      'I clienti chiedono consigli, abbinamenti e alternative e ricevono risposte in tempo reale, nella loro lingua, 24/7.',
  },
  {
    id: 'allergens',
    icon: ShieldCheck,
    title: 'Allergeni sempre sotto controllo',
    description:
      'Ogni piatto mostra chiaramente gli allergeni. I clienti con intolleranze consultano il menu in totale sicurezza e autonomia.',
  },
]

function ClientFeatures() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const progressRef = useRef(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (paused || !inView) return
    const tick = 50
    progressRef.current = progress
    const id = setInterval(() => {
      progressRef.current += (tick / CLIENT_CYCLE_DURATION) * 100
      if (progressRef.current >= 100) {
        progressRef.current = 0
        setProgress(0)
        setActiveIndex((prev) => (prev + 1) % clientFeatures.length)
      } else {
        setProgress(progressRef.current)
      }
    }, tick)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, activeIndex, inView])

  const selectTab = (i: number) => {
    progressRef.current = 0
    setActiveIndex(i)
    setProgress(0)
  }

  return (
    <section ref={sectionRef} id="prodotto" className="scroll-mt-20 py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid items-center gap-16 md:grid-cols-[1fr_auto] md:gap-20">
          {/* Left: text + accordion items */}
          <div>
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.5rem)] font-bold tracking-tight leading-tight text-ink">
              Con Avo, il tuo ristorante fa un salto di qualità
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink/50">
              Più clienti soddisfatti, meno lavoro per te.
            </p>

            <div className="mt-6 space-y-0">
              {clientFeatures.map((feature, i) => {
                const isActive = i === activeIndex
                return (
                  <button
                    key={feature.id}
                    onClick={() => selectTab(i)}
                    onMouseEnter={() => isActive && setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    className="relative w-full text-left py-5 border-b border-ink/8"
                  >
                    {/* Progress bar — overlays the bottom border */}
                    <div className="absolute bottom-[-1px] left-0 right-0 h-[2px]">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{
                          width: isActive ? `${progress}%` : '0%',
                          transition: 'none',
                        }}
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <feature.icon
                        className={cn('size-5 mt-0.5 shrink-0 transition-colors', isActive ? 'text-primary' : 'text-ink/25')}
                        strokeWidth={1.8}
                      />
                      <div>
                        <h3 className={cn('font-display text-[15px] font-semibold transition-colors', isActive ? 'text-ink' : 'text-ink/50')}>
                          {feature.title}
                        </h3>
                        <div
                          className={cn(
                            'grid transition-all duration-300',
                            isActive ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0',
                          )}
                        >
                          <div className="overflow-hidden">
                            <p className="text-sm leading-relaxed text-ink/50 max-w-md">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Illustration — below accordion on mobile, right column on desktop */}
          <div
            className="flex items-center justify-center h-[320px] md:h-[380px] w-full max-w-[280px] mx-auto md:max-w-none md:w-[320px]"
          >
            <div key={activeIndex} className="animate-in fade-in slide-in-from-bottom-2 duration-400 relative">
              {/* QR Menu — programmatic menu card + floating QR & badges */}
              {activeIndex === 0 && (
                <div className="relative w-[280px] h-[380px] flex items-center justify-center">
                  {/* Background QR code — centered, visible but behind cards */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-[140px] h-[140px] rounded-2xl border border-ink/6 bg-white/40 p-3 flex items-center justify-center">
                      {/* 11x11 QR grid — clearly visible */}
                      <div className="grid grid-cols-11 grid-rows-11 gap-[2px] w-[110px] h-[110px]">
                        {Array.from({ length: 121 }).map((_, k) => {
                          const row = Math.floor(k / 11)
                          const col = k % 11
                          const isTopLeft = row < 3 && col < 3
                          const isTopRight = row < 3 && col > 7
                          const isBottomLeft = row > 7 && col < 3
                          const isAlignment = row >= 7 && row <= 9 && col >= 7 && col <= 9 && !(row === 8 && col === 8)
                          const isAlignCenter = row === 8 && col === 8
                          const isTiming = (row === 3 && col > 2 && col < 8 && col % 2 === 0) ||
                            (col === 3 && row > 2 && row < 8 && row % 2 === 0)
                          const dataFilled = [
                            15, 17, 26, 28, 30, 37, 39, 41, 48, 50, 52, 54,
                            59, 61, 63, 70, 72, 74, 76, 81, 83, 85,
                            92, 94, 96, 103, 105, 107
                          ].includes(k)
                          const isFilled = isTopLeft || isTopRight || isBottomLeft ||
                            isAlignment || isAlignCenter || isTiming || dataFilled
                          return (
                            <div
                              key={k}
                              className="rounded-[1.5px]"
                              style={{
                                backgroundColor: isFilled ? 'var(--primary)' : 'rgba(0,0,0,0.05)',
                                opacity: isFilled ? 0.35 : 0.5,
                              }}
                            />
                          )
                        })}
                      </div>

                      {/* Scan frame corners */}
                      <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-primary/30 rounded-tl-md" />
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-primary/30 rounded-tr-md" />
                      <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-primary/30 rounded-bl-md" />
                      <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-primary/30 rounded-br-md" />

                      {/* Laser scan line */}
                      <div
                        className="absolute left-2.5 right-2.5 h-[2px] rounded-full animate-[qrScan_2.8s_ease-in-out_infinite]"
                        style={{
                          background: 'linear-gradient(90deg, transparent 0%, rgba(34,197,94,0.5) 20%, #22c55e 50%, rgba(34,197,94,0.5) 80%, transparent 100%)',
                          boxShadow: '0 0 10px 2px rgba(34,197,94,0.3)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Floating menu page — top left */}
                  <div className="absolute top-2 -left-2 z-10 w-[105px] h-[148px] rounded-2xl bg-white/95 backdrop-blur-sm shadow-lg shadow-ink/[0.06] border border-ink/8 p-3 rotate-[-10deg]">
                    <div className="flex gap-1 mb-2.5">
                      <span className="rounded-full bg-primary px-2 py-0.5 text-[6px] font-semibold text-white">Pizze</span>
                      <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[6px] font-medium text-ink/30">Primi</span>
                    </div>
                    <div className="space-y-2.5">
                      {[
                        { name: 'Margherita', price: '8.50' },
                        { name: 'Diavola', price: '10.00' },
                        { name: 'Capricciosa', price: '11.50' },
                      ].map((item) => (
                        <div key={item.name}>
                          <div className="flex items-baseline">
                            <span className="text-[6px] font-display font-semibold uppercase text-ink">{item.name}</span>
                            <span className="flex-1 border-b border-dotted border-ink/10 mx-0.5 mb-[1px]" />
                            <span className="text-[6px] font-display font-semibold text-primary">{item.price}</span>
                          </div>
                          <div className="h-[3px] w-12 rounded-full bg-ink/[0.03] mt-0.5" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Floating menu page — top right */}
                  <div className="absolute top-0 -right-3 z-10 w-[100px] h-[142px] rounded-2xl bg-white/95 backdrop-blur-sm shadow-lg shadow-ink/[0.06] border border-ink/8 p-3 rotate-[8deg]">
                    <p className="font-display text-[9px] font-bold tracking-tight lowercase text-ink mb-2.5">
                      dolci<span className="text-primary">.</span>
                    </p>
                    <div className="space-y-2.5">
                      {[
                        { name: 'Tiramisù', price: '7.00' },
                        { name: 'Panna Cotta', price: '6.50' },
                        { name: 'Cannolo', price: '5.00' },
                      ].map((item) => (
                        <div key={item.name}>
                          <div className="flex items-baseline">
                            <span className="text-[6px] font-display font-semibold uppercase text-ink">{item.name}</span>
                            <span className="flex-1 border-b border-dotted border-ink/10 mx-0.5 mb-[1px]" />
                            <span className="text-[6px] font-display font-semibold text-primary">{item.price}</span>
                          </div>
                          <div className="h-[3px] w-10 rounded-full bg-ink/[0.03] mt-0.5" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Floating menu page — bottom left */}
                  <div className="absolute bottom-14 -left-4 z-10 w-[96px] h-[136px] rounded-2xl bg-white/95 backdrop-blur-sm shadow-lg shadow-ink/[0.06] border border-ink/8 p-3 rotate-[6deg]">
                    <p className="font-display text-[9px] font-bold tracking-tight lowercase text-ink mb-2.5">
                      vini<span className="text-primary">.</span>
                    </p>
                    <div className="space-y-2.5">
                      {[
                        { name: 'Chianti', price: '6.00' },
                        { name: 'Barolo', price: '12.00' },
                      ].map((item) => (
                        <div key={item.name}>
                          <div className="flex items-baseline">
                            <span className="text-[6px] font-display font-semibold uppercase text-ink">{item.name}</span>
                            <span className="flex-1 border-b border-dotted border-ink/10 mx-0.5 mb-[1px]" />
                            <span className="text-[6px] font-display font-semibold text-primary">{item.price}</span>
                          </div>
                          <div className="h-[3px] w-14 rounded-full bg-ink/[0.03] mt-0.5" />
                        </div>
                      ))}
                      <div className="h-[3px] w-12 rounded-full bg-ink/[0.03]" />
                      <div className="h-[3px] w-8 rounded-full bg-ink/[0.03]" />
                    </div>
                  </div>

                  {/* Floating menu page — bottom right */}
                  <div className="absolute bottom-12 -right-2 z-10 w-[100px] h-[140px] rounded-2xl bg-white/95 backdrop-blur-sm shadow-lg shadow-ink/[0.06] border border-ink/8 p-3 rotate-[-7deg]">
                    <p className="font-display text-[9px] font-bold tracking-tight lowercase text-ink mb-2.5">
                      antipasti<span className="text-primary">.</span>
                    </p>
                    <div className="space-y-2.5">
                      {[
                        { name: 'Burrata', price: '14.00' },
                        { name: 'Tartare', price: '16.00' },
                      ].map((item) => (
                        <div key={item.name}>
                          <div className="flex items-baseline">
                            <span className="text-[6px] font-display font-semibold uppercase text-ink">{item.name}</span>
                            <span className="flex-1 border-b border-dotted border-ink/10 mx-0.5 mb-[1px]" />
                            <span className="text-[6px] font-display font-semibold text-primary">{item.price}</span>
                          </div>
                          <div className="h-[3px] w-11 rounded-full bg-ink/[0.03] mt-0.5" />
                        </div>
                      ))}
                      <div className="h-[3px] w-14 rounded-full bg-ink/[0.03]" />
                      <div className="h-[3px] w-9 rounded-full bg-ink/[0.03]" />
                    </div>
                  </div>

                  {/* "No app" badge — bottom center */}
                  <div className="absolute bottom-2 inset-x-0 z-20 flex justify-center">
                    <div className="rounded-full bg-primary px-5 py-2 shadow-lg flex items-center gap-1.5">
                      <Check className="size-3 text-white" strokeWidth={3} />
                      <span className="text-[11px] font-bold text-white leading-none">No app, solo scan</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Translations — multilingual cards fanning out */}
              {activeIndex === 1 && (
                <div className="relative w-[280px] h-[380px] flex items-center justify-center">
                  {/* Back card — Japanese */}
                  <div className="absolute top-10 left-2 w-[150px] h-[200px] rounded-2xl bg-white shadow-sm border border-ink/6 p-4 rotate-[-8deg] origin-bottom-center">
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-[11px]">🇯🇵</span>
                      <span className="text-[9px] font-medium text-ink/40">日本語</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-1.5 w-16 rounded-full bg-ink/[0.06]" />
                      <div className="h-1 w-20 rounded-full bg-ink/[0.04]" />
                      <div className="h-1 w-12 rounded-full bg-ink/[0.04]" />
                    </div>
                  </div>
                  {/* Middle card — French */}
                  <div className="absolute top-6 right-2 w-[150px] h-[200px] rounded-2xl bg-white shadow-sm border border-ink/6 p-4 rotate-[7deg] origin-bottom-center">
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-[11px]">🇫🇷</span>
                      <span className="text-[9px] font-medium text-ink/40">Français</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-1.5 w-14 rounded-full bg-ink/[0.06]" />
                      <div className="h-1 w-20 rounded-full bg-ink/[0.04]" />
                      <div className="h-1 w-10 rounded-full bg-ink/[0.04]" />
                    </div>
                  </div>
                  {/* Front card — Italian (original) */}
                  <div className="relative z-10 w-[170px] h-[220px] rounded-2xl bg-white shadow-xl border border-ink/8 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13px]">🇮🇹</span>
                        <span className="text-[10px] font-bold text-ink">Italiano</span>
                      </div>
                      <Globe className="size-4 text-primary" />
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: 'Margherita', desc: 'Pomodoro, mozzarella', price: '8.50' },
                        { name: 'Diavola', desc: 'Salame piccante, peperoni', price: '10.00' },
                        { name: 'Capricciosa', desc: 'Prosciutto, funghi, olive', price: '11.50' },
                        { name: 'Quattro Formaggi', desc: 'Mozzarella, gorgonzola', price: '11.00' },
                      ].map((item) => (
                        <div key={item.name}>
                          <div className="flex items-baseline">
                            <span className="text-[8px] font-display font-semibold uppercase text-ink">{item.name}</span>
                            <span className="flex-1 border-b border-dotted border-ink/15 mx-1 mb-[2px]" />
                            <span className="text-[8px] font-display font-semibold text-primary">{item.price}</span>
                          </div>
                          <p className="text-[6.5px] text-ink/40 mt-0.5">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Decorative flags — background corners, behind cards */}
                  <span className="absolute -top-3 -right-4 text-[20px] opacity-40 rotate-[10deg]">🇬🇧</span>
                  <span className="absolute top-1/2 -right-6 text-[20px] opacity-40 rotate-[-6deg]">🇩🇪</span>
                  <span className="absolute top-1/2 -left-6 text-[20px] opacity-40 rotate-[12deg]">🇪🇸</span>
                  <span className="absolute -top-3 -left-2 text-[20px] opacity-40 rotate-[-8deg]">🇨🇳</span>
                  <span className="absolute bottom-12 -right-5 text-[20px] opacity-40 rotate-[5deg]">🇧🇷</span>
                  {/* Language count badge — centered below cards */}
                  <div className="absolute bottom-2 inset-x-0 z-20 flex justify-center">
                    <div className="rounded-full bg-primary px-6 py-2.5 shadow-lg flex items-center justify-center">
                      <span className="text-[13px] font-bold text-white leading-none">30+ lingue</span>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Assistant — chat matching real Avo chat UI */}
              {activeIndex === 2 && (
                <div className="relative w-[280px] h-[380px] flex items-center justify-center">
                  <div className="relative w-[230px] rounded-2xl bg-white shadow-xl border border-ink/8 overflow-hidden">
                    {/* Header — matches real chat header */}
                    <div className="flex items-center gap-2.5 px-4 py-3 border-b border-ink/6">
                      {/* Full Avo mascot avatar with eye */}
                      <div className="size-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <svg width="18" height="22" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path d="M1.48 5.09c.59-1.81 1.53-3.42 3.31-4.31C6.39-.02 8.01-.24 9.75.28c2.1.63 3.61 2.42 4.98 4l1.12 1.39.02.03.01.01c.23.19.68.9.89 1.17 3.25 4.07 4.79 9.41 1.04 13.72-.86.99-2.43 2.11-3.72 2.55-2.6 1.03-5.89 1.2-8.5.11l-.2-.09c-1.75-.77-3.26-2.03-4.15-3.7-.61-1.14-1-2.38-1.15-3.66-.36-2.87.51-7.98 1.4-10.72Z" fill="url(#avo-h-grad)" />
                          <g clipPath="url(#avo-h-clip)">
                            <mask id="avo-h-mask" style={{ maskType: 'alpha' } as React.CSSProperties} maskUnits="userSpaceOnUse" x="9" y="9" width="5" height="4">
                              <path d="M11.52 9.31a.08.08 0 0 1 .15 0l.07.2c.1.29.27.56.5.78.22.22.49.39.79.5l.22.08a.08.08 0 0 1 0 .15l-.22.08c-.3.1-.56.27-.78.48-.22.21-.39.47-.5.75l-.09.23a.08.08 0 0 1-.15 0l-.09-.24c-.11-.28-.28-.53-.5-.74a2.1 2.1 0 0 0-.77-.48l-.23-.08a.08.08 0 0 1 0-.15l.23-.08c.29-.1.55-.27.77-.48.22-.21.38-.46.49-.74l.09-.24Z" fill="#3186FF" />
                            </mask>
                            <g mask="url(#avo-h-mask)">
                              <g filter="url(#avo-h-f0)"><ellipse cx="11.77" cy="10.93" rx="2.28" ry="1.79" fill="black" /></g>
                              <g filter="url(#avo-h-f1)"><circle cx="10.27" cy="10.86" r="0.8" fill="black" /></g>
                              <g filter="url(#avo-h-f1)"><circle cx="10.11" cy="10.93" r="0.8" fill="black" /></g>
                              <g filter="url(#avo-h-f1)"><path d="M12.13 9.37c-.26.81-1.49 1.4-1.99 1.4l1.41-2.26.58.86Z" fill="black" /></g>
                              <g filter="url(#avo-h-f1)"><path d="M12.09 9.11c-.26.81-1.49 1.4-1.99 1.4l1.41-2.26.58.86Z" fill="black" /></g>
                              <g filter="url(#avo-h-f1)"><path d="M12.14 12.4c-.26-.81-1.49-1.4-1.99-1.4l1.41 2.26.58-.86Z" fill="black" /></g>
                              <g filter="url(#avo-h-f1)"><path d="M12.16 12.87c-.26-.81-1.49-1.4-1.99-1.4l1.41 2.26.58-.86Z" fill="black" /></g>
                            </g>
                          </g>
                          <path d="M12.8 14.56a.78.78 0 0 1 .78-.77.78.78 0 0 1 .78.78v.04a3.56 3.56 0 0 1-.43 1.54 4.16 4.16 0 0 1-3.01 2.08 4.16 4.16 0 0 1-3.71-1.56 3.47 3.47 0 0 1-.41-.76 1.87 1.87 0 0 1-.1-.29l-.01-.03a.78.78 0 0 1 1.4-.67l.02.04.06.1c.06.1.14.22.26.35a2.56 2.56 0 0 0 3.38.34c.58-.42.83-.94.95-1.28.04-.1.06-.19.07-.24a.67.67 0 0 0 .01-.05v-.01Z" fill="black" />
                          <defs>
                            <filter id="avo-h-f0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="shape" /><feGaussianBlur stdDeviation="0.56" result="blur" /></filter>
                            <filter id="avo-h-f1" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="shape" /><feGaussianBlur stdDeviation="0.99" result="blur" /></filter>
                            <linearGradient id="avo-h-grad" x1="5.41" y1="-0.01" x2="13.77" y2="23.23" gradientUnits="userSpaceOnUse">
                              <stop stopColor="white" /><stop offset="0.72" stopColor="white" /><stop offset="1" stopColor="white" stopOpacity="0.6" />
                            </linearGradient>
                            <clipPath id="avo-h-clip"><rect width="3.44" height="3.36" fill="white" transform="translate(9.88 9.25)" /></clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div>
                        <span className="text-[10px] font-display font-bold text-ink block">AVO</span>
                        <span className="text-[7px] text-ink/40">Il tuo assistente di fiducia</span>
                      </div>
                    </div>
                    {/* Messages */}
                    <div className="p-3 space-y-2.5">
                      {/* User message */}
                      <div className="flex justify-end">
                        <div className="rounded-2xl rounded-br-md bg-primary px-3 py-2 max-w-[82%]">
                          <span className="text-[8px] text-white leading-relaxed block">La burrata contiene lattosio?</span>
                        </div>
                      </div>
                      {/* AI response with avatar */}
                      <div className="flex items-start gap-1.5">
                        <div className="size-5 rounded-md bg-primary flex items-center justify-center shrink-0 mt-0.5">
                          <svg width="10" height="12" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M1.48 5.09c.59-1.81 1.53-3.42 3.31-4.31C6.39-.02 8.01-.24 9.75.28c2.1.63 3.61 2.42 4.98 4l1.12 1.39.02.03.01.01c.23.19.68.9.89 1.17 3.25 4.07 4.79 9.41 1.04 13.72-.86.99-2.43 2.11-3.72 2.55-2.6 1.03-5.89 1.2-8.5.11l-.2-.09c-1.75-.77-3.26-2.03-4.15-3.7-.61-1.14-1-2.38-1.15-3.66-.36-2.87.51-7.98 1.4-10.72Z" fill="white" fillOpacity="0.9" />
                            <g clipPath="url(#avo-m1-clip)">
                              <mask id="avo-m1-mask" style={{ maskType: 'alpha' } as React.CSSProperties} maskUnits="userSpaceOnUse" x="9" y="9" width="5" height="4">
                                <path d="M11.52 9.31a.08.08 0 0 1 .15 0l.07.2c.1.29.27.56.5.78.22.22.49.39.79.5l.22.08a.08.08 0 0 1 0 .15l-.22.08c-.3.1-.56.27-.78.48-.22.21-.39.47-.5.75l-.09.23a.08.08 0 0 1-.15 0l-.09-.24c-.11-.28-.28-.53-.5-.74a2.1 2.1 0 0 0-.77-.48l-.23-.08a.08.08 0 0 1 0-.15l.23-.08c.29-.1.55-.27.77-.48.22-.21.38-.46.49-.74l.09-.24Z" fill="#3186FF" />
                              </mask>
                              <g mask="url(#avo-m1-mask)">
                                <g filter="url(#avo-m1-f0)"><ellipse cx="11.77" cy="10.93" rx="2.28" ry="1.79" fill="black" /></g>
                              </g>
                            </g>
                            <path d="M12.8 14.56a.78.78 0 0 1 .78-.77.78.78 0 0 1 .78.78v.04a3.56 3.56 0 0 1-.43 1.54 4.16 4.16 0 0 1-3.01 2.08 4.16 4.16 0 0 1-3.71-1.56 3.47 3.47 0 0 1-.41-.76 1.87 1.87 0 0 1-.1-.29l-.01-.03a.78.78 0 0 1 1.4-.67l.02.04.06.1c.06.1.14.22.26.35a2.56 2.56 0 0 0 3.38.34c.58-.42.83-.94.95-1.28.04-.1.06-.19.07-.24a.67.67 0 0 0 .01-.05v-.01Z" fill="black" fillOpacity="0.5" />
                            <defs>
                              <filter id="avo-m1-f0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="shape" /><feGaussianBlur stdDeviation="0.56" result="blur" /></filter>
                              <clipPath id="avo-m1-clip"><rect width="3.44" height="3.36" fill="white" transform="translate(9.88 9.25)" /></clipPath>
                            </defs>
                          </svg>
                        </div>
                        <div className="rounded-2xl rounded-bl-md bg-primary/[0.06] px-3 py-2 max-w-[80%]">
                          <span className="text-[8px] text-ink leading-relaxed block">
                            Sì, la Burrata Pugliese contiene <span className="font-semibold text-primary">latticini</span>. Ti consiglio il Carpaccio di Polpo! 🐙
                          </span>
                        </div>
                      </div>
                      {/* User follow-up */}
                      <div className="flex justify-end">
                        <div className="rounded-2xl rounded-br-md bg-primary px-3 py-2 max-w-[82%]">
                          <span className="text-[8px] text-white leading-relaxed block">Perfetto, e un vino?</span>
                        </div>
                      </div>
                      {/* AI suggestion with avatar */}
                      <div className="flex items-start gap-1.5">
                        <div className="size-5 rounded-md bg-primary flex items-center justify-center shrink-0 mt-0.5">
                          <svg width="10" height="12" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M1.48 5.09c.59-1.81 1.53-3.42 3.31-4.31C6.39-.02 8.01-.24 9.75.28c2.1.63 3.61 2.42 4.98 4l1.12 1.39.02.03.01.01c.23.19.68.9.89 1.17 3.25 4.07 4.79 9.41 1.04 13.72-.86.99-2.43 2.11-3.72 2.55-2.6 1.03-5.89 1.2-8.5.11l-.2-.09c-1.75-.77-3.26-2.03-4.15-3.7-.61-1.14-1-2.38-1.15-3.66-.36-2.87.51-7.98 1.4-10.72Z" fill="white" fillOpacity="0.9" />
                            <g clipPath="url(#avo-m2-clip)">
                              <mask id="avo-m2-mask" style={{ maskType: 'alpha' } as React.CSSProperties} maskUnits="userSpaceOnUse" x="9" y="9" width="5" height="4">
                                <path d="M11.52 9.31a.08.08 0 0 1 .15 0l.07.2c.1.29.27.56.5.78.22.22.49.39.79.5l.22.08a.08.08 0 0 1 0 .15l-.22.08c-.3.1-.56.27-.78.48-.22.21-.39.47-.5.75l-.09.23a.08.08 0 0 1-.15 0l-.09-.24c-.11-.28-.28-.53-.5-.74a2.1 2.1 0 0 0-.77-.48l-.23-.08a.08.08 0 0 1 0-.15l.23-.08c.29-.1.55-.27.77-.48.22-.21.38-.46.49-.74l.09-.24Z" fill="#3186FF" />
                              </mask>
                              <g mask="url(#avo-m2-mask)">
                                <g filter="url(#avo-m2-f0)"><ellipse cx="11.77" cy="10.93" rx="2.28" ry="1.79" fill="black" /></g>
                              </g>
                            </g>
                            <path d="M12.8 14.56a.78.78 0 0 1 .78-.77.78.78 0 0 1 .78.78v.04a3.56 3.56 0 0 1-.43 1.54 4.16 4.16 0 0 1-3.01 2.08 4.16 4.16 0 0 1-3.71-1.56 3.47 3.47 0 0 1-.41-.76 1.87 1.87 0 0 1-.1-.29l-.01-.03a.78.78 0 0 1 1.4-.67l.02.04.06.1c.06.1.14.22.26.35a2.56 2.56 0 0 0 3.38.34c.58-.42.83-.94.95-1.28.04-.1.06-.19.07-.24a.67.67 0 0 0 .01-.05v-.01Z" fill="black" fillOpacity="0.5" />
                            <defs>
                              <filter id="avo-m2-f0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="shape" /><feGaussianBlur stdDeviation="0.56" result="blur" /></filter>
                              <clipPath id="avo-m2-clip"><rect width="3.44" height="3.36" fill="white" transform="translate(9.88 9.25)" /></clipPath>
                            </defs>
                          </svg>
                        </div>
                        <div className="rounded-2xl rounded-bl-md bg-primary/[0.06] px-3 py-2 max-w-[80%]">
                          <span className="text-[8px] text-ink leading-relaxed block">
                            Un Vermentino si abbina perfettamente! Fresco e minerale. 🍷
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Input — matches real chat input */}
                    <div className="px-3 pb-3">
                      <div className="flex items-center gap-1.5 rounded-xl border border-ink/8 px-3 py-2">
                        <span className="text-[7px] text-ink/25 flex-1">Chiedimi qualcosa...</span>
                        <div className="size-5 rounded-full bg-primary flex items-center justify-center">
                          <ArrowRight className="size-2.5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Sparkles badge — top right for visual balance */}
                  <div className="absolute -top-2 -right-2 z-20 rounded-full bg-secondary px-2.5 py-1 shadow-sm border border-primary/10 flex items-center gap-1">
                    <Sparkles className="size-3 text-primary" />
                    <span className="text-[7px] font-bold text-primary">AI</span>
                  </div>
                  {/* Language flags — bottom left */}
                  <div className="absolute -bottom-5 -left-6 z-20">
                    <div className="flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 shadow-md border border-ink/6">
                      <span className="text-[16px]">🇬🇧</span>
                      <span className="text-[16px]">🇫🇷</span>
                      <span className="text-[16px]">🇩🇪</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Allergens — menu card with floating allergen badges */}
              {activeIndex === 3 && (
                <div className="relative w-[280px] h-[380px] flex items-center justify-center">
                  {/* Menu card matching real menu style */}
                  <div className="relative w-[200px] rounded-2xl bg-white shadow-xl border border-ink/8 overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-ink/6">
                      <span className="text-[10px] font-display font-bold text-ink lowercase">
                        antipasti<span className="text-primary">.</span>
                      </span>
                      <div className="flex items-center gap-1 rounded-md bg-primary/10 px-1.5 py-0.5">
                        <ShieldCheck className="size-2.5 text-primary" />
                        <span className="text-[7px] font-semibold text-primary">Allergeni</span>
                      </div>
                    </div>
                    {/* Items — matching real menu style with dotted leader + allergen circles */}
                    <div className="p-3 space-y-3">
                      {([
                        { name: 'Burrata Pugliese', desc: 'Datterini, basilico, olio EVO', price: '14.00', allergens: [MilkBottleIcon] },
                        { name: 'Tartare di Tonno', desc: 'Avocado, sesamo, salsa di soia', price: '16.00', allergens: [FishFoodIcon, BeanIcon] },
                        { name: 'Carpaccio di Polpo', desc: 'Patate tiepide, olive taggiasche', price: '13.00', allergens: [ShellfishIcon] },
                        { name: 'Vitello Tonnato', desc: 'Salsa tonnata della tradizione', price: '12.00', allergens: [FishFoodIcon, EggIcon] },
                      ] as const).map((item) => (
                        <div key={item.name}>
                          <div className="flex items-baseline">
                            <span className="text-[8px] font-display font-semibold text-ink uppercase">{item.name}</span>
                            <span className="flex-1 border-b border-dotted border-ink/15 mx-1 mb-[2px]" />
                            <span className="text-[8px] font-display font-semibold text-primary">{item.price}</span>
                          </div>
                          <p className="text-[6.5px] text-ink/40 mt-0.5">{item.desc}</p>
                          <div className="flex items-center gap-0.5 mt-1">
                            {item.allergens.map((icon, i) => (
                              <span key={i} className="inline-flex items-center justify-center size-3.5 rounded-full bg-[#B1693A]">
                                <HugeiconsIcon icon={icon} className="size-2 text-white" />
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Floating allergen badges — outside the card, amber-tinted to stand out */}
                  {[
                    { icon: MilkBottleIcon, label: 'Latte', top: '-8px', left: '-20px', rotate: '-6deg' },
                    { icon: FishFoodIcon, label: 'Pesce', top: '60px', right: '-36px', rotate: '5deg' },
                    { icon: EggIcon, label: 'Uova', top: '170px', left: '-32px', rotate: '8deg' },
                    { icon: BeanIcon, label: 'Soia', bottom: '-8px', right: '20px', rotate: '-4deg' },
                    { icon: ShellfishIcon, label: 'Molluschi', bottom: '-12px', left: '30px', rotate: '6deg' },
                    { icon: WheatIcon, label: 'Glutine', top: '-12px', right: '-10px', rotate: '-3deg' },
                    { icon: NutIcon, label: 'Noci', bottom: '70px', right: '-34px', rotate: '10deg' },
                  ].map((a) => (
                    <div
                      key={a.label}
                      className="absolute z-20 flex items-center gap-1.5 rounded-full bg-secondary/10 px-2.5 py-1.5 shadow-md border border-secondary/30"
                      style={{
                        top: a.top, bottom: a.bottom, left: a.left, right: a.right,
                        transform: `rotate(${a.rotate})`,
                      }}
                    >
                      <span className="inline-flex items-center justify-center size-4.5 rounded-full bg-primary shrink-0">
                        <HugeiconsIcon icon={a.icon} className="size-2.5 text-white" />
                      </span>
                      <span className="text-[7px] font-semibold text-primary">{a.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ Accordion Item ─── */

function FaqAccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="py-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 text-left"
        aria-expanded={open}
      >
        <h3 className="font-display text-[17px] font-semibold tracking-tight text-ink leading-snug">
          {question}
        </h3>
        <span
          className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-ink/5 transition-colors group-hover:bg-ink/10"
          aria-hidden
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className={`text-ink/50 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
          >
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="pt-3 text-[15px] leading-relaxed text-ink/55 max-w-xl">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── Page ─── */

const TRIAL_URL = '/prova-gratis'
const PROMO_END_DATE = new Date('2026-04-15T23:59:59')

function useCountdown(end: Date) {
  const calc = () => {
    const diff = end.getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0 }
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000) / 60_000),
    }
  }
  const [timeLeft, setTimeLeft] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calc()), 60_000)
    return () => clearInterval(id)
  }, [end])
  return timeLeft
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [showBanner, setShowBanner] = useState(true)
  const countdown = useCountdown(PROMO_END_DATE)
  const [mobileNav, setMobileNav] = useState(false)
  const [mobileNavVisible, setMobileNavVisible] = useState(false)
  const mobileNavRef = useRef<HTMLDivElement>(null)

  const openMobileNav = useCallback(() => {
    setMobileNav(true)
    requestAnimationFrame(() => requestAnimationFrame(() => setMobileNavVisible(true)))
  }, [])

  const closeMobileNav = useCallback(() => {
    setMobileNavVisible(false)
    const el = mobileNavRef.current
    if (!el) { setMobileNav(false); return }
    const onEnd = () => { setMobileNav(false); el.removeEventListener('transitionend', onEnd) }
    el.addEventListener('transitionend', onEnd)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="min-h-svh bg-white text-ink overflow-x-hidden">
        {/* ── Promo Banner ── */}
        {showBanner && (
          <div className="fixed top-0 inset-x-0 z-50 bg-secondary">
            <div className="mx-auto flex h-10 max-w-7xl items-center px-4 md:px-6 relative justify-between md:justify-center">
              <Link
                href={TRIAL_URL}
                className="text-[12px] md:text-[13px] font-semibold text-primary tracking-wide truncate"
              >
                <span className="md:hidden">🔥 -30% OFF <span className="mx-1 text-primary/30">|</span> {countdown.days}g <span className="countdown-colon font-bold">:</span> {String(countdown.hours).padStart(2, '0')}h <span className="countdown-colon font-bold">:</span> {String(countdown.minutes).padStart(2, '0')}m <span className="mx-1 text-primary/30">|</span> <span className="underline underline-offset-2 inline-flex items-center gap-1">Registrati <ArrowRight className="size-2.5" /></span></span>
                <span className="hidden md:inline-flex md:items-center md:gap-0">🔥 PROMO -30% OFF <span className="mx-1.5 text-primary/30">|</span> Scade tra {countdown.days}g <span className="countdown-colon font-bold">:</span> {String(countdown.hours).padStart(2, '0')}h <span className="countdown-colon font-bold">:</span> {String(countdown.minutes).padStart(2, '0')}m <span className="mx-1.5 text-primary/30">|</span> <span className="underline underline-offset-2 inline-flex items-center gap-1">Registrati ora <ArrowRight className="size-3" /></span></span>
              </Link>
              <button
                onClick={() => setShowBanner(false)}
                className="shrink-0 md:absolute md:right-6 size-6 flex items-center justify-center text-primary/50 hover:text-primary transition-colors"
                aria-label="Chiudi banner"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ── Nav (Lemon-style) ── */}
        <nav
          className={cn(
            'fixed inset-x-0 z-50 transition-all duration-300',
            showBanner ? 'top-10' : 'top-0',
            scrolled
              ? 'bg-white/80 backdrop-blur-xl border-b border-ink/6'
              : 'bg-transparent',
          )}
        >
          <div className="mx-auto flex h-[72px] max-w-7xl items-center px-6 lg:px-10">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <img src="/images/avo-logo.svg" alt="Avo" className="h-8 w-auto" />
            </Link>

            {/* Nav links — right next to logo */}
            <div className="hidden items-center gap-1 ml-10 md:flex">
              <a href="#come-funziona" className="px-4 py-2 text-[15px] text-ink/70 transition-colors hover:text-ink">
                Come funziona
              </a>
              <a href="#back-office" className="px-4 py-2 text-[15px] text-ink/70 transition-colors hover:text-ink">
                Back office
              </a>
              <a href="#prodotto" className="px-4 py-2 text-[15px] text-ink/70 transition-colors hover:text-ink">
                Lato cliente
              </a>
              <a href="#contatti" className="px-4 py-2 text-[15px] text-ink/70 transition-colors hover:text-ink">
                Contattaci
              </a>
            </div>

            <div className="flex-1" />

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hidden md:inline-flex rounded-full font-display font-semibold px-6 h-10 text-[14px] text-ink/60 transition-colors hover:text-ink hover:bg-ink/5 items-center justify-center"
              >
                Accedi
              </Link>
              <Button
                size="sm"
                className="hidden md:inline-flex rounded-full font-display font-semibold px-6 h-10 text-[14px]"
                asChild
              >
                <Link href={TRIAL_URL}>Provalo gratis</Link>
              </Button>
              <button
                className="md:hidden relative size-9 flex items-center justify-center"
                onClick={() => mobileNav ? closeMobileNav() : openMobileNav()}
                aria-label="Menu"
              >
                <Menu
                  className="size-5 text-ink/60 absolute"
                  style={{
                    animation: mobileNav
                      ? mobileNavVisible ? 'icon-morph-out 250ms cubic-bezier(0.23,1,0.32,1) forwards' : 'icon-morph-in 300ms cubic-bezier(0.23,1,0.32,1) forwards'
                      : 'none',
                    opacity: mobileNav ? undefined : 1,
                  }}
                />
                <X
                  className="size-5 text-ink/60 absolute"
                  style={{
                    animation: mobileNav
                      ? mobileNavVisible ? 'icon-morph-in 300ms cubic-bezier(0.23,1,0.32,1) forwards' : 'icon-morph-out 250ms cubic-bezier(0.23,1,0.32,1) forwards'
                      : 'none',
                    opacity: mobileNav ? undefined : 0,
                  }}
                />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile nav overlay — outside nav to avoid bg/blur inheritance */}
        {mobileNav && (
          <div
            ref={mobileNavRef}
            className={`fixed inset-0 z-40 bg-white md:hidden transition-opacity duration-300 ease-out ${
              mobileNavVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="px-6" style={{ paddingTop: showBanner ? 'calc(72px + 2.5rem + 1rem)' : 'calc(72px + 1rem)' }}>
              {[
                { href: '#come-funziona', label: 'Come funziona' },
                { href: '#back-office', label: 'Back office' },
                { href: '#prodotto', label: 'Lato cliente' },
                { href: '#contatti', label: 'Contattaci' },
              ].map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-4 font-display text-2xl font-semibold text-ink tracking-tight transition-all duration-300 ease-out"
                  style={{
                    transitionDelay: mobileNavVisible ? `${(i + 1) * 50}ms` : '0ms',
                    opacity: mobileNavVisible ? 1 : 0,
                    transform: mobileNavVisible ? 'translateY(0)' : 'translateY(8px)',
                  }}
                  onClick={closeMobileNav}
                >
                  {item.label}
                </a>
              ))}
              <Link
                href="/login"
                className="block py-4 font-display text-2xl font-semibold text-ink tracking-tight transition-all duration-300 ease-out"
                style={{
                  transitionDelay: mobileNavVisible ? '250ms' : '0ms',
                  opacity: mobileNavVisible ? 1 : 0,
                  transform: mobileNavVisible ? 'translateY(0)' : 'translateY(8px)',
                }}
                onClick={closeMobileNav}
              >
                Accedi
              </Link>
            </div>
          </div>
        )}

        <main>
      {/* ── Hero (Lemon-style) ── */}
      <section className={cn('pb-10 md:pb-16 overflow-hidden', showBanner ? 'pt-[8.5rem] md:pt-[9.5rem]' : 'pt-28 md:pt-32')}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* Left — Text column */}
            <div className="max-w-xl">
              <FadeIn>
                <span className="inline-block rounded-full bg-secondary px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-primary">
                  Scopri Avo
                </span>
              </FadeIn>

              <FadeIn delay={60}>
                <h1 className="mt-5 font-display text-[clamp(2.5rem,5.5vw,4.2rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
                  Il menu bello da vedere, facile da gestire.
                </h1>
              </FadeIn>

              <FadeIn delay={120}>
                <p className="mt-6 max-w-[420px] text-[17px] leading-relaxed text-ink/45">
                  Menu digitale con QR code, traduzioni automatiche,
                  allergeni e assistente AI. Online in 5 minuti.
                </p>
              </FadeIn>

              <FadeIn delay={180}>
                <div className="mt-10">
                  <Button
                    size="lg"
                    className="h-[52px] px-8 text-[15px] font-display font-semibold rounded-full"
                    asChild
                  >
                    <Link href={TRIAL_URL}>
                      Provalo gratis
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </div>
              </FadeIn>

              <FadeIn delay={240}>
                <div className="mt-6 flex items-center gap-2">
                  <Star className="size-4 text-ink fill-ink" />
                  <span className="text-[14px] text-ink/50">
                    Scelto da più di 100 ristoranti.
                  </span>
                </div>
              </FadeIn>
            </div>

            {/* Right — Clean phone mockup on green panel */}
            <FadeIn delay={200} className="hidden md:flex justify-center">
              <div className="relative py-8 px-10">
                {/* Symmetrical green background */}
                <div
                  className="absolute inset-0 rounded-[28px]"
                  style={{ backgroundColor: 'var(--secondary)' }}
                />
                {/* Phone mockup */}
                <div className="relative z-10">
                  <HeroPhoneMockup />
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Mobile: green panel + phone mockup below text */}
          <FadeIn autoShow delay={300} className="mt-12 md:hidden flex justify-center">
            <div className="relative py-6 px-8">
              <div
                className="absolute inset-0 rounded-[24px]"
                style={{ backgroundColor: 'var(--secondary)' }}
              />
              <div className="relative z-10">
                <HeroPhoneMockup />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section>
        <div className="py-14 md:py-20">
          <div className="mx-auto w-full max-w-5xl px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  name: 'Salvatore Cataldo',
                  role: 'Ristoratore',
                  stars: 5,
                  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                  content: "Da quando usiamo Avo, i clienti stranieri ordinano senza problemi. Le traduzioni automatiche sono impeccabili.",
                },
                {
                  name: 'Antonella Tarantino',
                  role: 'Chef',
                  stars: 5,
                  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                  content: "Aggiornare il menu è diventato semplicissimo. Cambio i piatti del giorno in pochi secondi, anche dal telefono.",
                },
                {
                  name: 'Davide Ferrante',
                  role: 'Ristoratore',
                  stars: 5,
                  avatar: 'https://randomuser.me/api/portraits/men/74.jpg',
                  content: "L'assistente AI risponde alle domande sugli allergeni al posto nostro. I clienti lo adorano.",
                },
              ].map((testimonial, index) => (
                <FadeIn key={index} delay={index * 100}>
                  <div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn('size-4', i < testimonial.stars ? 'fill-primary stroke-primary' : 'fill-foreground/15 stroke-transparent')}
                        />
                      ))}
                    </div>
                    <p className="text-foreground my-4">{testimonial.content}</p>
                    <div className="flex items-center gap-2">
                      <Avatar className="ring-foreground/10 size-6 border border-transparent shadow ring-1">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="text-foreground text-sm font-medium">{testimonial.name}</div>
                      <span aria-hidden className="bg-foreground/25 size-1 rounded-full" />
                      <span className="text-muted-foreground text-sm">{testimonial.role}</span>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works (Tailark-inspired) ── */}
      <section id="come-funziona" className="scroll-mt-20 py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-primary font-medium text-sm mb-3 block">Come funziona</span>
              <h2 className="font-display text-[clamp(1.6rem,3vw,2.5rem)] font-bold tracking-tight text-ink">
                Dal cartaceo al digitale in 5 minuti
              </h2>
              <p className="mt-4 text-base text-ink/50 max-w-lg mx-auto">
                Tre semplici passaggi per trasformare il tuo menu cartaceo in un&apos;esperienza digitale completa per i tuoi clienti.
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 md:mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
            {/* Step 1: Carica il menu */}
            <FadeIn delay={0}>
              <div className="flex flex-col items-center text-center">
                {/* Illustration */}
                <div className="relative mb-8 h-[180px] w-full flex items-center justify-center">
                  {/* Step number */}
                  <div className="absolute top-0 right-4 md:right-8 size-8 rounded-full bg-ink/[0.08] flex items-center justify-center">
                    <span className="text-sm font-bold text-ink/50">1</span>
                  </div>
                  {/* Paper menu being scanned */}
                  <div className="relative">
                    {/* Paper sheet */}
                    <div className="w-[100px] h-[130px] rounded-lg bg-white shadow-lg border border-ink/8 p-3 -rotate-6">
                      <div className="h-2 w-14 rounded bg-ink/10 mb-2" />
                      <div className="space-y-1.5">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <div key={n} className="flex items-center justify-between">
                            <div className="h-1.5 rounded bg-ink/[0.06]" style={{ width: `${40 + n * 6}%` }} />
                            <div className="h-1.5 w-4 rounded bg-ink/[0.06]" />
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Camera overlay */}
                    <div className="absolute -bottom-2 -right-6 size-12 rounded-xl bg-primary shadow-md flex items-center justify-center rotate-6">
                      <Camera className="size-5 text-white" strokeWidth={1.8} />
                    </div>
                    {/* Sparkle accent */}
                    <div className="absolute -top-2 -left-3 size-6 rounded-full bg-secondary flex items-center justify-center">
                      <Sparkles className="size-3 text-primary" />
                    </div>
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold text-ink">Scatta e carica</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/50 max-w-[280px]">
                  Scatta una foto al menu cartaceo o carica un PDF. L&apos;AI riconosce piatti, prezzi e descrizioni in pochi secondi.
                </p>
              </div>
            </FadeIn>

            {/* Step 2: Personalizza */}
            <FadeIn delay={100}>
              <div className="flex flex-col items-center text-center">
                {/* Illustration */}
                <div className="relative mb-8 h-[180px] w-full flex items-center justify-center">
                  {/* Step number */}
                  <div className="absolute top-0 right-4 md:right-8 size-8 rounded-full bg-ink/[0.08] flex items-center justify-center">
                    <span className="text-sm font-bold text-ink/50">2</span>
                  </div>
                  {/* Stacked cards showing customization */}
                  <div className="relative">
                    {/* Back card */}
                    <div className="absolute -left-3 -top-1 w-[90px] h-[110px] rounded-lg bg-white shadow border border-ink/6 rotate-[-8deg]" />
                    {/* Middle card */}
                    <div className="absolute -right-3 -top-1 w-[90px] h-[110px] rounded-lg bg-white shadow border border-ink/6 rotate-[8deg]" />
                    {/* Front card */}
                    <div className="relative w-[100px] h-[120px] rounded-lg bg-white shadow-lg border border-ink/8 p-3 z-10">
                      {/* Color swatches */}
                      <div className="flex gap-1.5 mb-3">
                        <div className="size-5 rounded-md bg-[#294028]" />
                        <div className="size-5 rounded-md bg-[#E8E4D9]" />
                        <div className="size-5 rounded-md bg-[#FAF9F6] border border-ink/10" />
                      </div>
                      {/* Font preview */}
                      <div className="h-1.5 w-12 rounded bg-ink/10 mb-1.5" />
                      <div className="h-1 w-16 rounded bg-ink/[0.06] mb-1" />
                      <div className="h-1 w-10 rounded bg-ink/[0.06] mb-3" />
                      {/* Toggle */}
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-3 rounded-full bg-primary" />
                        <div className="h-1 w-8 rounded bg-ink/[0.06]" />
                      </div>
                    </div>
                    {/* Wand accent */}
                    <div className="absolute -bottom-2 -right-5 z-20 size-10 rounded-xl bg-secondary flex items-center justify-center rotate-12">
                      <Wand2 className="size-4 text-primary" strokeWidth={1.8} />
                    </div>
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold text-ink">Personalizza</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/50 max-w-[280px]">
                  Scegli colori, font e layout che rispecchiano il tuo ristorante. Aggiungi traduzioni automatiche e assistente AI.
                </p>
              </div>
            </FadeIn>

            {/* Step 3: Vai live */}
            <FadeIn delay={200}>
              <div className="flex flex-col items-center text-center">
                {/* Illustration */}
                <div className="relative mb-8 h-[180px] w-full flex items-center justify-center">
                  {/* Step number */}
                  <div className="absolute top-0 right-4 md:right-8 size-8 rounded-full bg-ink/[0.08] flex items-center justify-center">
                    <span className="text-sm font-bold text-ink/50">3</span>
                  </div>
                  {/* QR code + broadcast */}
                  <div className="relative">
                    {/* QR code card */}
                    <div className="w-[100px] h-[120px] rounded-lg bg-white shadow-lg border border-ink/8 p-3 flex flex-col items-center justify-center">
                      {/* QR code grid */}
                      <div className="grid grid-cols-5 grid-rows-5 gap-[2px] size-14 mb-2">
                        {Array.from({ length: 25 }).map((_, k) => (
                          <div
                            key={k}
                            className="rounded-[1px]"
                            style={{
                              backgroundColor:
                                // Corner patterns + random fill for QR look
                                (k < 3 || (k >= 5 && k < 7) || k === 10 || k === 12 || k === 14 || (k >= 18 && k < 20) || k >= 22)
                                  ? 'var(--primary)'
                                  : k % 3 === 0
                                    ? 'rgba(0,0,0,0.06)'
                                    : 'var(--primary)',
                              opacity:
                                (k < 3 || (k >= 5 && k < 7) || k === 10 || k === 12 || k === 14 || (k >= 18 && k < 20) || k >= 22)
                                  ? 1
                                  : k % 3 === 0
                                    ? 1
                                    : 0.6,
                            }}
                          />
                        ))}
                      </div>
                      <div className="h-1 w-12 rounded bg-ink/[0.06]" />
                    </div>
                    {/* Broadcast icon */}
                    <div className="absolute -top-3 -right-5 size-10 rounded-xl bg-primary shadow-md flex items-center justify-center">
                      <Radio className="size-4 text-white" strokeWidth={1.8} />
                    </div>
                    {/* Check accent */}
                    <div className="absolute -bottom-1 -left-4 size-7 rounded-full bg-green-500 flex items-center justify-center shadow-sm">
                      <Check className="size-3.5 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold text-ink">Vai live</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/50 max-w-[280px]">
                  Stampa il QR code, mettilo sui tavoli. Il tuo menu digitale è online, tradotto e sempre aggiornato.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* CTA */}
          <FadeIn delay={300}>
            <div className="mt-16 flex justify-center">
              <Button
                size="sm"
                className="rounded-full font-display font-semibold px-6 h-10 text-[14px] shadow-none"
                asChild
              >
                <Link href={TRIAL_URL}>
                  Provalo gratis
                  <ArrowRight className="ml-2 size-3.5" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Back Office Features ── */}
      <BackOfficeFeatures />

      {/* ── Client-side Features ── */}
      <ClientFeatures />

      {/* ── CTA / Contact ── */}
      <section id="contatti" className="scroll-mt-20 py-14 md:py-20">
        <FadeIn>
          <div className="mx-auto max-w-5xl px-6">
            <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 md:px-16 md:py-16">
              {/* Decorative circles */}
              <div className="absolute -top-24 -right-24 size-64 rounded-full bg-secondary/10 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 size-48 rounded-full bg-secondary/8 blur-2xl" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.75rem)] font-bold tracking-tight text-primary-foreground max-w-lg">
                  Pronto a trasformare il tuo menu?
                </h2>
                <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-primary-foreground/50">
                  Gratis, senza carta di credito. In cinque minuti
                  il tuo menu è online e pronto a stupire.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="h-12 px-8 text-[15px] font-display font-semibold rounded-full"
                    asChild
                  >
                    <Link href={TRIAL_URL}>
                      Inizia gratis
                      <ArrowRight className="ml-1.5 size-4" />
                    </Link>
                  </Button>
                  <a
                    href="mailto:team@avomenu.com"
                    className="inline-flex items-center gap-2 h-12 px-8 rounded-full text-[15px] font-display font-semibold text-primary-foreground/60 transition-colors hover:text-primary-foreground hover:bg-primary-foreground/5"
                  >
                    <Mail className="size-4" />
                    Contattaci
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section aria-labelledby="faq-title" className="py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-primary font-medium text-sm mb-3 block">FAQ</span>
              <h2 id="faq-title" className="font-display text-[clamp(1.6rem,3vw,2.5rem)] font-bold tracking-tight text-ink">
                Hai qualche dubbio?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink/50">
                Le domande che ci fanno piu spesso, con risposte brevi e dirette.
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 divide-y divide-ink/8">
            {faqItems.map((item, index) => (
              <FadeIn key={item.question} delay={index * 50}>
                <FaqAccordionItem question={item.question} answer={item.answer} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
        </main>

      {/* ── Footer ── */}
      <footer className="bg-primary pt-16 pb-8">
        <div className="mx-auto max-w-5xl px-6">
          {/* Top row */}
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            {/* Brand */}
            <div>
              <img src="/images/avo-logo-dark.svg" alt="Avo" className="h-7 w-auto" />
              <p className="mt-4 text-sm leading-relaxed text-primary-foreground/40 max-w-[240px]">
                Il menu digitale per la ristorazione italiana. Bello, tradotto, intelligente.
              </p>
            </div>

            {/* Prodotto */}
            <div>
              <h4 className="font-display text-sm font-semibold text-primary-foreground/70">Prodotto</h4>
              <ul className="mt-4 space-y-2.5">
                {['Menu digitale', 'Traduzioni', 'Assistente AI', 'QR Code'].map((link) => (
                  <li key={link}>
                    <a href="#prodotto" className="text-sm text-primary-foreground/40 transition-colors hover:text-primary-foreground/70">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-display text-sm font-semibold text-primary-foreground/70">Link</h4>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a href="#come-funziona" className="text-sm text-primary-foreground/40 transition-colors hover:text-primary-foreground/70">
                    Come funziona
                  </a>
                </li>
                <li>
                  <a href="#contatti" className="text-sm text-primary-foreground/40 transition-colors hover:text-primary-foreground/70">
                    Contattaci
                  </a>
                </li>
                <li>
                  <a href="mailto:team@avomenu.com" className="text-sm text-primary-foreground/40 transition-colors hover:text-primary-foreground/70">
                    team@avomenu.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Legale */}
            <div>
              <h4 className="font-display text-sm font-semibold text-primary-foreground/70">Legale</h4>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a href="/privacy" className="text-sm text-primary-foreground/40 transition-colors hover:text-primary-foreground/70">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/cookie-policy" className="text-sm text-primary-foreground/40 transition-colors hover:text-primary-foreground/70">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-12 border-t border-primary-foreground/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-primary-foreground/30 text-center md:text-left">
              <p>&copy; {new Date().getFullYear()} Coreform Limited. Tutti i diritti riservati.</p>
              <p className="mt-1">Company No. 16633802 &middot; Registered in England and Wales</p>
            </div>
            <a href="https://coreform.ai/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-primary-foreground/30 hover:text-primary-foreground/50 transition-colors">
              Un prodotto <img src="/images/coreform-logo.png" alt="Coreform" className="h-3.5 w-auto inline-block" />
            </a>
          </div>
        </div>
      </footer>
      </div>

      {structuredData.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}
