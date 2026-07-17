// app/sitemap.js
// Next.js 14 generates /sitemap.xml automatically from this file.
// Part D: one entry per page × locale (9 pages × 11 locales = 99 URLs),
// each carrying the full reciprocal hreflang alternate set.

import { SITE, localePath, hreflangAlternates } from '../lib/seo'
import { locales } from '../i18n/routing'

const PAGES = [
  { path: '',            changeFrequency: 'weekly',  priority: 1.0 },
  { path: '/book',       changeFrequency: 'monthly', priority: 0.9 },
  { path: '/contact',    changeFrequency: 'yearly',  priority: 0.8 },
  { path: '/find-us',    changeFrequency: 'yearly',  priority: 0.8 },
  { path: '/faq',        changeFrequency: 'monthly', priority: 0.8 },
  { path: '/about',      changeFrequency: 'monthly', priority: 0.7 },
  { path: '/vision',     changeFrequency: 'monthly', priority: 0.7 },
  { path: '/dream',      changeFrequency: 'monthly', priority: 0.7 },
  { path: '/volunteer',  changeFrequency: 'monthly', priority: 0.7 },
]

export default function sitemap() {
  const now = new Date().toISOString()

  return PAGES.flatMap(page =>
    locales.map(locale => ({
      url: `${SITE.domain}${localePath(locale, page.path)}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: hreflangAlternates(page.path),
      },
    }))
  )
}
