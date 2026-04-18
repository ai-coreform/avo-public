/**
 * Apex domain used for the customer menu subdomain (e.g. avomenu.com → menu.avomenu.com).
 * Used by proxy and as SSR fallback for menu links.
 */
export const MENU_DOMAIN =
  process.env.NEXT_PUBLIC_MENU_DOMAIN ?? 'avomenu.com'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  `https://${MENU_DOMAIN.replace(/^www\./, '')}`

/**
 * Optional absolute base for shareable menu URLs, no trailing slash
 * (e.g. https://menu.avomenu.com). Use when the public menu is not served from the
 * same origin as the admin (rare). If unset, links use the current browser origin.
 */
const MENU_SITE_URL =
  process.env.NEXT_PUBLIC_MENU_SITE_URL?.replace(/\/$/, '') ?? ''

function baseDomainFromMenuDomain(): string {
  return MENU_DOMAIN.replace(/^www\./, '')
}

export function getSiteUrl(): string {
  return SITE_URL
}

export function getSiteUrlObject(): URL {
  return new URL(getSiteUrl())
}

export function getSocialImagePath(): string {
  return '/images/header-image.png'
}

export function getSocialImageUrl(): string {
  return new URL(getSocialImagePath(), getSiteUrlObject()).toString()
}

export function getPublicMenuBaseUrl(): string {
  if (MENU_SITE_URL) return MENU_SITE_URL
  return `https://menu.${baseDomainFromMenuDomain()}`
}

export function getPublicMenuUrl(orgSlug: string): string {
  return `${getPublicMenuBaseUrl()}/${encodeURIComponent(orgSlug)}`
}

/**
 * In-app path to the digital menu for an organisation (same deployment).
 */
export function menuPath(orgSlug: string): string {
  return `/m/${encodeURIComponent(orgSlug)}`
}

/**
 * Absolute URL to open/copy for the public menu. Safe to call from the browser
 * (admin UI). Uses MENU_SITE_URL if set; otherwise current origin + /m/:slug, or
 * the menu subdomain path when you are already on menu.<domain>.
 */
export function getShareableMenuUrl(orgSlug: string): string {
  const enc = encodeURIComponent(orgSlug)
  if (MENU_SITE_URL) {
    return `${MENU_SITE_URL}/${enc}`
  }
  if (typeof window === 'undefined') {
    return `https://menu.${MENU_DOMAIN}/${enc}`
  }
  const { origin, hostname } = window.location
  const base = baseDomainFromMenuDomain()
  if (hostname === `menu.${base}` || hostname === 'menu.localhost') {
    return `${origin}/${enc}`
  }
  return `${origin}${menuPath(orgSlug)}`
}

/** @deprecated Use getShareableMenuUrl (client) or menuPath + origin for server */
export function menuUrl(orgSlug: string) {
  return getPublicMenuUrl(orgSlug)
}
