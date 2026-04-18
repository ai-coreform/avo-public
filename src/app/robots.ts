import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/favicon.ico', '/manifest.json', '/images/'],
        disallow: ['/api'],
      },
    ],
    sitemap: `${getSiteUrl()}/sitemap.xml`,
    host: getSiteUrl(),
  }
}
