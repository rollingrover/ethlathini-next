// i18n/routing.js
// ─────────────────────────────────────────────────────────────────
// Single source of truth for supported locales (Part D — 11 languages).
// Used by middleware.js, i18n/request.js, lib/seo.js, sitemap.js,
// and components/LanguageSwitcher.jsx.

import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const locales = ['en', 'zu', 'de', 'nl', 'fr', 'it', 'ru', 'zh', 'hi', 'es', 'pt']

export const defaultLocale = 'en'

// Display names shown BY the language switcher, in-language (not translated
// through the message catalog — a language's own name doesn't change
// depending on which locale is currently active).
export const localeNames = {
  en: 'English',
  zu: 'isiZulu',
  de: 'Deutsch',
  nl: 'Nederlands',
  fr: 'Français',
  it: 'Italiano',
  ru: 'Русский',
  zh: '中文',
  hi: 'हिन्दी',
  es: 'Español',
  pt: 'Português',
}

// Compact codes for mobile nav
export const localeCodes = {
  en: 'EN', zu: 'ZU', de: 'DE', nl: 'NL', fr: 'FR',
  it: 'IT', ru: 'RU', zh: 'ZH', hi: 'HI', es: 'ES', pt: 'PT',
}

// <html lang> per locale — BCP-47 tags where the plain code isn't quite right
export const htmlLangMap = {
  en: 'en-ZA',
  zh: 'zh-Hans',
  pt: 'pt', // acceptable for both PT and BR
}

// hreflang tags used in alternates.languages — schema.org / SEO convention
// (mostly identical to locale codes, except Chinese uses the Hans tag)
export const hreflangMap = {
  en: 'en-ZA',
  zu: 'zu',
  de: 'de',
  nl: 'nl',
  fr: 'fr',
  it: 'it',
  ru: 'ru',
  zh: 'zh-Hans',
  hi: 'hi',
  es: 'es',
  pt: 'pt',
}

// Open Graph locale tags (OG uses underscore, region-qualified form)
export const ogLocaleMap = {
  en: 'en_ZA',
  zu: 'zu_ZA',
  de: 'de_DE',
  nl: 'nl_NL',
  fr: 'fr_FR',
  it: 'it_IT',
  ru: 'ru_RU',
  zh: 'zh_CN',
  hi: 'hi_IN',
  es: 'es_ES',
  pt: 'pt_PT',
}

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // English at "/", others prefixed "/de", "/zu", etc.
  localeDetection: true,     // Accept-Language header + NEXT_LOCALE cookie
})

// Locale-aware <Link>, redirect, usePathname, useRouter — these automatically
// add/omit the locale prefix so components never construct locale paths by hand.
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
