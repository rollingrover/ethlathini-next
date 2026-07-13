// app/sitemap.js
// Next.js 14 generates /sitemap.xml automatically from this file.
// Uses SITE.domain from lib/seo.js — single source of truth for the www domain.

import { SITE } from '../lib/seo'

export default function sitemap() {
  const base = SITE.domain  // https://www.ethlathini.co.za
  const now  = new Date().toISOString()

  return [
    // ── Core pages ────────────────────────────────────────────────
    { url: `${base}/`,          lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/book`,      lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/contact`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.8 },
    { url: `${base}/find-us`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.8 },
    { url: `${base}/faq`,       lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    // ── Story / brand pages ───────────────────────────────────────
    { url: `${base}/about`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/vision`,    lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/dream`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    // ── Voluntourism ─────────────────────────────────────────────
    { url: `${base}/volunteer`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
