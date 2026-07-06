/**
 * lib/fonts.js
 * ─────────────────────────────────────────────────────────────────
 * Central font configuration for Ethlathini Rest Camp.
 *
 * All fonts are loaded via next/font/google — self-hosted at build
 * time, zero external requests at runtime, zero layout shift.
 *
 * HOW TO USE
 * ──────────
 * Root layout (all locales):
 *   import { lora, dmSans } from '@/lib/fonts'
 *   <body className={`${lora.variable} ${dmSans.variable}`}>
 *
 * Locale layouts (Part D — add the matching script font):
 *   import { notoSansCyrillic } from '@/lib/fonts'   // ru
 *   import { notoSansSC }       from '@/lib/fonts'   // zh
 *   import { notoSansDevanagari }from '@/lib/fonts'  // hi
 *   <body className={`${lora.variable} ${dmSans.variable} ${notoSansSC.variable}`}>
 *
 * In CSS use:  font-family: var(--font-display);   (Lora)
 *              font-family: var(--font-body);       (DM Sans)
 *              font-family: var(--font-cjk);        (Noto Sans SC — zh only)
 *              font-family: var(--font-devanagari); (Noto Sans Devanagari — hi only)
 */

import { Lora, DM_Sans, Noto_Sans, Noto_Sans_SC, Noto_Sans_Devanagari } from 'next/font/google'

// ── Display font — Lora (Latin, used for headings & wordmark) ─────
export const lora = Lora({
  subsets:  ['latin'],
  weight:   ['400', '500', '600'],
  style:    ['normal', 'italic'],
  display:  'swap',
  variable: '--font-display',
  preload:  true,
})

// ── Body font — DM Sans (Latin, used for all UI text) ────────────
export const dmSans = DM_Sans({
  subsets:  ['latin'],
  weight:   ['400', '500', '600'],
  display:  'swap',
  variable: '--font-body',
  preload:  true,
})

// ── Russian — Noto Sans with Cyrillic subset ──────────────────────
// Load ONLY in the /ru locale layout (Part D).
// Provides Cyrillic glyph coverage that Lora/DM Sans lack.
export const notoSansCyrillic = Noto_Sans({
  subsets:  ['cyrillic', 'latin'],
  weight:   ['400', '500'],
  display:  'swap',
  variable: '--font-cyrillic',
  preload:  false,  // only preload on /ru pages
})

// ── Chinese Simplified — Noto Sans SC ────────────────────────────
// Load ONLY in the /zh locale layout (Part D).
// CJK glyphs are not covered by Lora or DM Sans.
// font-family in CSS: var(--font-display), var(--font-cjk), sans-serif
export const notoSansSC = Noto_Sans_SC({
  subsets:  ['chinese-simplified'],
  weight:   ['400', '500'],
  display:  'swap',
  variable: '--font-cjk',
  preload:  false,  // only preload on /zh pages
})

// ── Hindi — Noto Sans Devanagari ──────────────────────────────────
// Load ONLY in the /hi locale layout (Part D).
// Devanagari script not covered by Lora or DM Sans.
export const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets:  ['devanagari'],
  weight:   ['400', '500'],
  display:  'swap',
  variable: '--font-devanagari',
  preload:  false,  // only preload on /hi pages
})
