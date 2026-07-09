// app/sitemap.js
// Next.js 14 generates /sitemap.xml automatically from this file.
// Uses SITE.domain from lib/seo.js so domain stays in sync with one source of truth.

import { SITE } from '../lib/seo'

export default function sitemap() {
  const base = SITE.domain  // https://www.ethlathini.co.za
  const now  = new Date().toISOString()

  return [
    { url: `${base}/`,         lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/book`,     lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/about`,    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/find-us`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.8 },
    { url: `${base}/vision`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/dream`,    lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
