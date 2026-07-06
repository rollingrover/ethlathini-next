/**
 * lib/fonts.js
 * ─────────────────────────────────────────────────────────────────
 * PRODUCTION + BUILD-SAFE version.
 *
 * Uses next/font/local with self-hosted woff2 files (public/fonts/).
 * This is actually BETTER than next/font/google — no build-time
 * network dependency, zero latency, works in all CI environments.
 *
 * The font files in public/fonts/ were sourced from @fontsource
 * (same font files Google serves, just pre-downloaded).
 *
 * API is identical to next/font/google — CSS variables, display:swap,
 * preload — all work the same way.
 *
 * HOW TO USE (same as before)
 * ──────────────────────────
 * import { lora, dmSans } from '@/lib/fonts'
 * <body className={`${lora.variable} ${dmSans.variable}`}>
 *
 * CSS: font-family: var(--font-display);   ← Lora
 *      font-family: var(--font-body);       ← DM Sans
 *
 * Part D locale layouts — add the matching script font variable:
 *   ru: notoSansCyrillic.variable  → --font-cyrillic
 *   zh: notoSansSC.variable        → --font-cjk
 *   hi: notoSansDevanagari.variable → --font-devanagari
 *
 * NOTE: Noto fonts for ru/zh/hi use next/font/google — they are
 * NOT imported at root layout level, only in their locale layout,
 * so they only affect bundle size for those specific pages.
 * On Vercel, next/font/google resolves fine at build time.
 */

import localFont from 'next/font/local'

// ── Display font — Lora (Latin, headings & wordmark) ─────────────
export const lora = localFont({
  src: [
    { path: '../public/fonts/lora/lora-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/lora/lora-latin-400-italic.woff2', weight: '400', style: 'italic' },
    { path: '../public/fonts/lora/lora-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/lora/lora-latin-500-italic.woff2', weight: '500', style: 'italic' },
    { path: '../public/fonts/lora/lora-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/lora/lora-latin-600-italic.woff2', weight: '600', style: 'italic' },
  ],
  display:  'swap',
  variable: '--font-display',
  preload:  true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

// ── Body font — DM Sans (Latin, all UI text) ─────────────────────
export const dmSans = localFont({
  src: [
    { path: '../public/fonts/dm-sans/dm-sans-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/dm-sans/dm-sans-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/dm-sans/dm-sans-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  display:  'swap',
  variable: '--font-body',
  preload:  true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
})

// ── Script-specific fonts (loaded ONLY in locale layouts — Part D) ─
// These use next/font/google because:
//   1. They are NOT imported at root level — only in /ru, /zh, /hi locale layouts
//   2. Vercel build has full network access to fonts.googleapis.com
//   3. CJK/Devanagari font files are very large (5–15MB) — impractical to self-host
//
// Import these in the locale-specific layout, NOT here at root:
//   import { notoSansCyrillic } from '@/lib/fonts-script'  (ru)
//   import { notoSansSC }       from '@/lib/fonts-script'  (zh)
//   import { notoSansDevanagari }from '@/lib/fonts-script' (hi)
//
// See lib/fonts-script.js
