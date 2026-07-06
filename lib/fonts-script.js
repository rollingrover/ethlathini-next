/**
 * lib/fonts-script.js
 * ─────────────────────────────────────────────────────────────────
 * Script-specific fonts for non-Latin locales (Part D).
 *
 * Import ONLY in the relevant locale layout — NOT in root layout:
 *   /ru layout → import { notoSansCyrillic }
 *   /zh layout → import { notoSansSC }
 *   /hi layout → import { notoSansDevanagari }
 *
 * Uses next/font/google because these fonts are too large to
 * self-host (CJK font = ~5–15MB). Vercel has full network access
 * at build time so this resolves correctly in production.
 */

import { Noto_Sans, Noto_Sans_SC, Noto_Sans_Devanagari } from 'next/font/google'

// Russian — Cyrillic script coverage
export const notoSansCyrillic = Noto_Sans({
  subsets:  ['cyrillic', 'latin'],
  weight:   ['400', '500'],
  display:  'swap',
  variable: '--font-cyrillic',
  preload:  false,
  fallback: ['system-ui', 'sans-serif'],
})

// Chinese Simplified — CJK glyph coverage
export const notoSansSC = Noto_Sans_SC({
  subsets:  ['chinese-simplified'],
  weight:   ['400', '500'],
  display:  'swap',
  variable: '--font-cjk',
  preload:  false,
  fallback: ['PingFang SC', 'Microsoft YaHei', 'sans-serif'],
})

// Hindi — Devanagari script coverage
export const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets:  ['devanagari'],
  weight:   ['400', '500'],
  display:  'swap',
  variable: '--font-devanagari',
  preload:  false,
  fallback: ['system-ui', 'sans-serif'],
})
