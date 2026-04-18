'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  WheatIcon,
  CrabIcon,
  EggIcon,
  FishFoodIcon,
  NutIcon,
  BeanIcon,
  MilkBottleIcon,
  CoffeeBeansIcon,
  LeafyGreenIcon,
  FlowerIcon,
  CornIcon,
  GrapesIcon,
  Plant03Icon,
  ShellfishIcon,
  VegetarianFoodIcon,
  Leaf01Icon,
  WheatOffIcon,
  FireIcon,
  MilkOatIcon,
  OrganicFoodIcon,
  SparklesIcon,
} from '@hugeicons/core-free-icons'
import {
  MenuThemeProvider,
  themeToCSS,
  getFontFamily,
  THEME_PRESETS,
} from '@/lib/menu-theme'
import type { MenuTheme } from '@/lib/menu-theme'
import type { MenuItem } from '@/types/menu'

/* ─── Dummy data ─── */

const DEMO_THEME: MenuTheme = {
  ...THEME_PRESETS[1].colors, // "Classico" preset
  logoSize: 32,
  fontDisplay: 'bricolage-grotesque',
  fontBody: 'dm-sans',
  logoUrl: null,
}

type Section = 'promos' | 'mangiare' | 'bere'

interface Category {
  id: string
  name: string
  slug: string
  section: 'mangiare' | 'bere'
}

const CATEGORIES: Category[] = [
  { id: '1', name: 'Antipasti', slug: 'antipasti', section: 'mangiare' },
  { id: '2', name: 'Primi', slug: 'primi', section: 'mangiare' },
  { id: '3', name: 'Secondi', slug: 'secondi', section: 'mangiare' },
  { id: '4', name: 'Dolci', slug: 'dolci', section: 'mangiare' },
  { id: '5', name: 'Vini', slug: 'vini', section: 'bere' },
  { id: '6', name: 'Cocktail', slug: 'cocktail', section: 'bere' },
  { id: '7', name: 'Birre', slug: 'birre', section: 'bere' },
]

/* Promo items */
interface DemoPromo {
  id: string
  title: string
  description: string
  originalPrice: number
  promoPrice: number
  badge: string
  image: string
}

const DEMO_PROMOS: DemoPromo[] = [
  {
    id: 'promo1',
    title: 'Aperitivo per due',
    description: '2 Spritz + Tagliere misto',
    originalPrice: 36,
    promoPrice: 25,
    badge: 'Offerta',
    image: '/images/promo-aperitivo.jpg',
  },
  {
    id: 'promo2',
    title: 'Menu degustazione',
    description: 'Antipasto + Primo + Dolce',
    originalPrice: 42,
    promoPrice: 32,
    badge: 'Speciale',
    image: '/images/promo-degustazione.jpg',
  },
  {
    id: 'promo3',
    title: 'Happy Hour',
    description: 'Cocktail + stuzzichini dalle 18-20',
    originalPrice: 18,
    promoPrice: 12,
    badge: '-33%',
    image: '/images/promo-happy-hour.jpg',
  },
]

const ITEMS_BY_CATEGORY: Record<string, { group?: string; items: MenuItem[] }[]> = {
  antipasti: [
    {
      group: 'antipasti',
      items: [
        { id: 'a1', name: 'Burrata pugliese', description: 'Datterini, basilico, olio EVO', price: 14, category: 'antipasti', allergens: ['Milk'], features: ['Vegetarian'], image: '/images/burrata.jpg' },
        { id: 'a2', name: 'Tartare di tonno', description: 'Avocado, sesamo, salsa di soia', price: 16, category: 'antipasti', allergens: ['Fish', 'Sesame', 'Soy'], image: '/images/tuna-tartare.jpg' },
        { id: 'a3', name: 'Carpaccio di polpo', description: 'Patate tiepide, olive taggiasche', price: 13, category: 'antipasti', allergens: ['Molluscs'], image: '/images/octopus.jpg' },
        { id: 'a4', name: 'Vitello tonnato', description: 'Salsa tonnata della tradizione', price: 12, category: 'antipasti', allergens: ['Fish', 'Eggs'] },
        { id: 'a5', name: 'Tagliere misto', description: 'Salumi e formaggi della casa', price: 18, category: 'antipasti', allergens: ['Milk', 'Gluten'] },
      ],
    },
  ],
  primi: [
    {
      group: 'primi',
      items: [
        { id: 'p1', name: 'Cacio e pepe', description: 'Pecorino romano DOP, pepe nero', price: 14, category: 'primi', allergens: ['Gluten', 'Milk'] },
        { id: 'p2', name: 'Amatriciana', description: 'Guanciale, pomodoro San Marzano', price: 13, category: 'primi', allergens: ['Gluten'] },
        { id: 'p3', name: 'Risotto ai funghi', description: 'Porcini, prezzemolo, parmigiano', price: 16, category: 'primi', allergens: ['Milk'], features: ['Gluten-free'] },
        { id: 'p4', name: 'Paccheri alla Norma', description: 'Melanzane, ricotta salata, basilico', price: 14, category: 'primi', allergens: ['Gluten', 'Milk'], features: ['Vegetarian'] },
      ],
    },
  ],
  secondi: [
    {
      group: 'secondi',
      items: [
        { id: 's1', name: 'Tagliata di manzo', description: 'Rucola, pomodorini, scaglie di grana', price: 22, category: 'secondi', allergens: ['Milk'] },
        { id: 's2', name: 'Branzino al forno', description: 'Patate, olive, capperi', price: 20, category: 'secondi', allergens: ['Fish'] },
        { id: 's3', name: 'Pollo alla griglia', description: 'Verdure di stagione', price: 16, category: 'secondi', features: ['Gluten-free'] },
      ],
    },
  ],
  dolci: [
    {
      group: 'dolci',
      items: [
        { id: 'd1', name: 'Tiramisù', description: 'Mascarpone, savoiardi, caffè', price: 8, category: 'dolci', allergens: ['Gluten', 'Eggs', 'Milk'] },
        { id: 'd2', name: 'Panna cotta', description: 'Frutti di bosco', price: 7, category: 'dolci', allergens: ['Milk'], features: ['Gluten-free'] },
      ],
    },
  ],
  vini: [
    {
      group: 'vini rossi',
      items: [
        { id: 'v1', name: 'Chianti Classico', description: 'Toscana DOCG, 2021', price: 8, category: 'vini', allergens: ['Sulphites'] },
        { id: 'v2', name: 'Barolo', description: 'Piemonte DOCG, 2019', price: 14, category: 'vini', allergens: ['Sulphites'] },
        { id: 'v3', name: 'Montepulciano', description: "d'Abruzzo DOC, 2022", price: 7, category: 'vini', allergens: ['Sulphites'] },
      ],
    },
    {
      group: 'vini bianchi',
      items: [
        { id: 'v4', name: 'Prosecco Valdobbiadene', description: 'Extra Dry, Veneto', price: 7, category: 'vini', allergens: ['Sulphites'] },
        { id: 'v5', name: 'Vermentino', description: 'Sardegna DOC, 2023', price: 8, category: 'vini', allergens: ['Sulphites'] },
      ],
    },
  ],
  cocktail: [
    {
      group: 'cocktail',
      items: [
        { id: 'c1', name: 'Aperol Spritz', description: 'Aperol, prosecco, seltz', price: 9, category: 'cocktail' },
        { id: 'c2', name: 'Negroni', description: 'Gin, Campari, vermouth rosso', price: 10, category: 'cocktail' },
        { id: 'c3', name: 'Hugo', description: 'Prosecco, sciroppo di sambuco, menta', price: 9, category: 'cocktail' },
      ],
    },
  ],
  birre: [
    {
      group: 'birre',
      items: [
        { id: 'b1', name: 'Peroni Nastro Azzurro', description: 'Lager italiana, 33cl', price: 5, category: 'birre' },
        { id: 'b2', name: 'IPA Artigianale', description: 'Birrificio locale, 33cl', price: 7, category: 'birre' },
      ],
    },
  ],
}

/* ─── Allergen icons (same as real AllergenBadges) ─── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ALLERGEN_ICON_MAP: Record<string, any> = {
  Gluten: WheatIcon,
  Crustaceans: CrabIcon,
  Eggs: EggIcon,
  Fish: FishFoodIcon,
  Peanuts: NutIcon,
  Soy: BeanIcon,
  Milk: MilkBottleIcon,
  TreeNuts: CoffeeBeansIcon,
  Celery: LeafyGreenIcon,
  Mustard: FlowerIcon,
  Sesame: CornIcon,
  Sulphites: GrapesIcon,
  Lupins: Plant03Icon,
  Molluscs: ShellfishIcon,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FEATURE_ICON_MAP: Record<string, any> = {
  Vegetarian: VegetarianFoodIcon,
  Vegan: Leaf01Icon,
  'Gluten-free': WheatOffIcon,
  Spicy: FireIcon,
  'Lactose-free': MilkOatIcon,
  Organic: OrganicFoodIcon,
  New: SparklesIcon,
}

/* ─── Static allergen badges (mirrors AllergenBadges with real HugeIcons) ─── */

function StaticAllergenBadges({
  allergens = [],
  features = [],
}: {
  allergens?: string[]
  features?: string[]
}) {
  if (!allergens.length && !features.length) return null
  return (
    <div className="flex items-center gap-1 mt-1.5 flex-wrap">
      {allergens.map((a) => {
        const iconDef = ALLERGEN_ICON_MAP[a]
        return (
          <span
            key={a}
            className="inline-flex items-center justify-center w-6 h-6 rounded-full leading-none flex-shrink-0"
            style={{ backgroundColor: 'var(--menu-allergen, #B1693A)', color: 'var(--menu-allergen-icon, #FFFFFF)' }}
            title={a}
          >
            {iconDef ? <HugeiconsIcon icon={iconDef} className="w-3.5 h-3.5" /> : a.slice(0, 2)}
          </span>
        )
      })}
      {features.map((f) => {
        const iconDef = FEATURE_ICON_MAP[f]
        return (
          <span
            key={f}
            className="inline-flex items-center justify-center w-6 h-6 flex-shrink-0"
            style={{ color: 'var(--menu-text)', opacity: 0.4 }}
            title={f}
          >
            {iconDef ? <HugeiconsIcon icon={iconDef} className="w-4.5 h-4.5" /> : f.slice(0, 3)}
          </span>
        )
      })}
    </div>
  )
}

/* ─── Static menu item (mirrors CompactMenuItem exactly) ─── */

function StaticMenuItem({ item }: { item: MenuItem }) {
  return (
    <div className="px-2 -mx-2">
      <div
        className={
          item.image
            ? 'flex gap-3 items-start pt-5'
            : undefined
        }
      >
        {item.image ? (
          <div className="relative w-14 h-14 shrink-0 rounded-md overflow-hidden bg-black/5">
            <Image
              src={item.image}
              alt={item.imageAlt ?? item.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <div className={`flex items-baseline pb-0 ${item.image ? '' : 'pt-5'}`}>
            <span
              className="font-display text-base font-semibold min-w-0 uppercase"
              style={{ color: 'var(--menu-text)' }}
            >
              {item.name}
            </span>
            <span className="dotted-leader" />
            <div className="flex items-center gap-1.5 shrink-0">
              <span
                className="font-display text-base font-semibold whitespace-nowrap"
                style={{ color: 'var(--menu-price, var(--menu-primary))' }}
              >
                {item.price?.toFixed(2)}
              </span>
              <span className="w-4 inline-block" />
            </div>
          </div>
          {item.description && (
            <p
              className="font-sans text-sm pb-0 leading-relaxed"
              style={{ color: 'var(--menu-text)', opacity: 0.6 }}
            >
              {item.description}
            </p>
          )}
          <StaticAllergenBadges
            allergens={item.allergens}
            features={item.features}
          />
        </div>
      </div>
    </div>
  )
}

/* ─── Static promo card (mirrors PromotionCard exactly) ─── */

function StaticPromoCard({ promo }: { promo: DemoPromo }) {
  return (
    <div
      className="relative flex flex-col p-4 rounded-lg border h-full"
      style={{
        backgroundColor: 'var(--menu-card-bg, var(--menu-primary-light))',
        borderColor: 'var(--menu-border, var(--menu-accent))',
      }}
    >
      {/* Badge — top right */}
      {promo.badge && (
        <div className="absolute top-3 right-3 z-10">
          <Badge
            className="text-white font-sans font-bold shadow-lg text-xs"
            style={{ backgroundColor: 'var(--menu-primary)' }}
          >
            {promo.badge}
          </Badge>
        </div>
      )}

      {/* Image — 4:3 aspect */}
      <div className="w-full mb-3">
        <div
          className="w-full aspect-[4/3] rounded-lg overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, var(--menu-primary), color-mix(in srgb, var(--menu-primary) 70%, white))',
          }}
        >
          <Image
            src={promo.image}
            alt={promo.title}
            fill
            className="object-cover"
            sizes="350px"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3
          className="font-display font-bold text-lg mb-2 uppercase"
          style={{ color: 'var(--menu-text)' }}
        >
          {promo.title}
        </h3>

        <p
          className="font-sans text-sm mb-3 flex-1"
          style={{ color: 'var(--menu-text)', opacity: 0.7 }}
        >
          {promo.description}
        </p>

        {/* Pricing */}
        <div className="flex flex-col">
          {promo.originalPrice && (
            <span
              className="font-sans text-sm line-through"
              style={{ color: 'var(--menu-text)', opacity: 0.5 }}
            >
              &euro; {promo.originalPrice.toFixed(2)}
            </span>
          )}
          <span
            className="font-display font-bold text-2xl"
            style={{ color: 'var(--menu-price, var(--menu-primary))' }}
          >
            &euro; {promo.promoPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─── Static menu list (mirrors CompactMenuList exactly) ─── */

function StaticMenuList({ groups }: { groups: { group?: string; items: MenuItem[] }[] }) {
  return (
    <div className="space-y-2">
      {groups.map((g, groupIndex) => (
        <div key={g.group ?? `ungrouped-${groupIndex}`}>
          {g.group && (
            <div className={`flex items-center gap-4 mb-1 ${groupIndex === 0 ? 'pt-5' : 'pt-10'}`}>
              <span
                className="font-display text-2xl font-bold tracking-tight lowercase"
                style={{ color: 'var(--menu-text)' }}
              >
                {g.group}
                <span style={{ color: 'var(--menu-primary)' }}>.</span>
              </span>
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: 'var(--menu-border, var(--menu-accent))' }}
              />
            </div>
          )}
          <div>
            {g.items.map((item) => (
              <StaticMenuItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Main export: interactive static menu at full mobile size ─── */

export function StaticMenuDemo({ height }: { height?: number }) {
  const [activeSection, setActiveSection] = useState<Section>('mangiare')
  const [activeCategory, setActiveCategory] = useState('antipasti')

  const themeCSS = themeToCSS(DEMO_THEME)
  const currentCategories = CATEGORIES.filter((c) => c.section === (activeSection === 'mangiare' ? 'mangiare' : 'bere'))
  const currentGroups = ITEMS_BY_CATEGORY[activeCategory] ?? []

  const sections: { key: Section; label: string }[] = [
    { key: 'promos', label: 'Promos' },
    { key: 'mangiare', label: 'Mangiare' },
    { key: 'bere', label: 'Bere' },
  ]

  const handleSectionChange = (section: Section) => {
    setActiveSection(section)
    if (section === 'mangiare') {
      const firstCat = CATEGORIES.find((c) => c.section === 'mangiare')
      if (firstCat) setActiveCategory(firstCat.slug)
    } else if (section === 'bere') {
      const firstCat = CATEGORIES.find((c) => c.section === 'bere')
      if (firstCat) setActiveCategory(firstCat.slug)
    }
  }

  return (
    <MenuThemeProvider value={DEMO_THEME}>
      <div
        data-menu-demo
        className="flex flex-col"
        style={{
          ...themeCSS,
          backgroundColor: '#ffffff',
          width: 390,
          height: height ?? 680,
        }}
      >
        <style>{`
          [data-menu-demo] .font-display { font-family: ${getFontFamily(DEMO_THEME.fontDisplay)} !important; }
          [data-menu-demo] .font-sans { font-family: ${getFontFamily(DEMO_THEME.fontBody)} !important; }
        `}</style>

        {/* ── Fixed header + tabs (sticky top) ── */}
        <div className="shrink-0" style={{ backgroundColor: '#ffffff' }}>
          {/* Header (mirrors MenuHeader) */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Image
                src="/images/default-logo.svg"
                alt="Logo"
                width={80}
                height={32}
                className="object-contain"
                style={{ height: 32, width: 'auto' }}
              />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="w-6 h-6 p-0">
                <Search className="size-6" style={{ color: 'var(--menu-text)' }} />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 p-0 text-xl leading-none">
                🇮🇹
              </Button>
            </div>
          </div>

          {/* Section tabs (mirrors DigitalMenu — with Promos) */}
          <div
            className="border-b"
            style={{ borderColor: 'var(--menu-border, var(--menu-accent))' }}
          >
            <div className="flex items-center px-4 pt-4">
              {sections.map((section) => {
                const isActive = activeSection === section.key
                const isPromo = section.key === 'promos'
                return (
                  <button
                    key={section.key}
                    onClick={() => handleSectionChange(section.key)}
                    className="flex-1 pb-2 text-xl font-bold transition-colors cursor-pointer tracking-tight"
                    style={{
                      fontFamily: 'var(--menu-font-display)',
                      color: isActive
                        ? isPromo ? undefined : 'var(--menu-text)'
                        : 'var(--menu-text)',
                      opacity: isActive ? 1 : 0.4,
                    }}
                  >
                    <span
                      className="relative inline-block"
                      style={isActive && isPromo ? {
                        backgroundImage: 'var(--menu-promo-gradient)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      } : undefined}
                    >
                      {section.label}
                      {isActive && (
                        <div
                          className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full"
                          style={isPromo
                            ? { backgroundImage: 'var(--menu-promo-gradient)' }
                            : { backgroundColor: 'var(--menu-primary)' }
                          }
                        />
                      )}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Sub-category pills (only for mangiare/bere) */}
            {activeSection !== 'promos' && (
              <div
                className="overflow-x-auto scrollbar-hide py-2 border-t"
                style={{ borderColor: 'var(--menu-border, var(--menu-accent))' }}
              >
                <div className="flex w-max gap-2 min-w-full px-4">
                  {currentCategories.map((category) => {
                    const isActive = activeCategory === category.slug
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.slug)}
                        className="rounded-sm text-base font-medium px-4 py-2 whitespace-nowrap flex-shrink-0 transition-colors cursor-pointer"
                        style={{
                          fontFamily: 'var(--menu-font-display)',
                          backgroundColor: isActive
                            ? 'var(--menu-primary)'
                            : 'var(--menu-tab-bg, var(--menu-accent))',
                          color: isActive
                            ? 'var(--menu-tab-active-text, #fff)'
                            : 'var(--menu-tab-text, var(--menu-text))',
                          opacity: isActive ? 1 : 0.6,
                        }}
                      >
                        {category.name}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Scrollable content ── */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
          <div className="px-4 pb-8">
            {activeSection === 'promos' ? (
              <div className="pt-5 space-y-4">
                {DEMO_PROMOS.map((promo) => (
                  <StaticPromoCard key={promo.id} promo={promo} />
                ))}
              </div>
            ) : (
              <StaticMenuList groups={currentGroups} />
            )}
          </div>
        </div>
      </div>
    </MenuThemeProvider>
  )
}
