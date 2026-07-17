// lib/seo.js
// Central SEO config — update once, applies everywhere

import { locales, hreflangMap, ogLocaleMap } from '../i18n/routing'

export const SITE = {
  name:        'Ethlathini Rest Camp',
  domain:      'https://www.ethlathini.co.za',
  tagline:     'From tar road to forest canopy in one turn.',
  description: 'Ethlathini Rest Camp — overland campsites in a mahogany and fig forest, 2km from Memorial Gate, Hluhluwe-iMfolozi Park. Africa\'s oldest game reserve. Big 5 country. KwaZulu-Natal.',
  phone:       '+27610118513',
  phoneDisplay:'+27 (0)61 011 8513',
  email:       'info@ethlathini.co.za',
  whatsapp:    'https://wa.me/27610118513',
  address: {
    street:   'Memorial Gate Road',
    city:     'Hluhluwe',
    province: 'KwaZulu-Natal',
    country:  'South Africa',
    postal:   '3960',
    lat:      -28.056694,
    lng:       32.154616,
  },
  social: {
    instagram: 'https://instagram.com/ethlathinirestcamp',
    facebook:  'https://facebook.com/ethlathinirestcamp',
    tiktok:    'https://tiktok.com/@ethlathinirestcamp',
  },
  ogImage: '/images/ethlathini-rest-camp-hluhluwe-forest-social-share.jpg',
  ogImageType: 'image/jpeg', // Task C7 — update if the final asset is a different format
}

// ── Locale helpers (Part D) ────────────────────────────────────────

// Build the localized path prefix: English has none ("as-needed" strategy)
export function localePath(locale, path = '') {
  return locale === 'en' ? path || '/' : `/${locale}${path || ''}`
}

export function ogLocaleFor(locale) {
  return ogLocaleMap[locale] ?? 'en_ZA'
}

export function alternateOgLocales(currentLocale) {
  return locales.filter(l => l !== currentLocale).map(l => ogLocaleMap[l]).filter(Boolean)
}

// Complete reciprocal hreflang set (Task D4) — every locale + x-default
export function hreflangAlternates(path = '') {
  const languages = {}
  for (const l of locales) {
    languages[hreflangMap[l]] = `${SITE.domain}${localePath(l, path)}`
  }
  languages['x-default'] = `${SITE.domain}${path || ''}`
  return languages
}

// Per-page metadata factory — locale-aware canonical + hreflang + OG + Twitter
export function pageMeta({ locale, title, description, path = '', image } = {}) {
  const url = `${SITE.domain}${localePath(locale, path)}`
  const ogImg = image || SITE.ogImage
  return {
    metadataBase: new URL(SITE.domain),
    // Return ONLY the page-specific title — no brand suffix.
    // The root layout template: "%s | Ethlathini Rest Camp" appends the brand name.
    title: title || undefined,
    description: description || SITE.description,
    keywords: [
      'Ethlathini Rest Camp', 'Hluhluwe camping', 'overland campsites KZN',
      'Hluhluwe-iMfolozi', 'Big 5 camping', 'KwaZulu-Natal camping',
      'overland South Africa', '4x4 camping KZN', 'rooftop tent Hluhluwe',
      'Memorial Gate accommodation', 'forest camping South Africa',
      'eco camp KZN', 'mahogany fig forest camp', 'ethlathini',
    ],
    authors: [{ name: SITE.name, url: SITE.domain }],
    creator: SITE.name,
    publisher: SITE.name,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    alternates: {
      canonical: url,
      languages: hreflangAlternates(path),
    },
    openGraph: {
      type:        'website',
      url,
      title:       title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`,
      description: description || SITE.description,
      siteName:    SITE.name,
      locale:      ogLocaleFor(locale),
      alternateLocale: alternateOgLocales(locale),
      images: [{ url: ogImg, width: 1200, height: 630, alt: SITE.name, type: SITE.ogImageType }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`,
      description: description || SITE.description,
      images:      [ogImg],
      // TODO: replace with real Twitter/X handle once the account is live (Task C7)
      site: undefined,
    },
  }
}

// JSON-LD schemas — all accept a `locale` and stamp "inLanguage" (Task D4.5)
export function localBusinessSchema(locale = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': ['LodgingBusiness', 'CampingGround'],
    inLanguage:  hreflangMap[locale] ?? locale,
    name:        SITE.name,
    description: 'Overland campsites in a mahogany and fig forest, 2km from Memorial Gate, Hluhluwe-iMfolozi Park. Big 5 country. KwaZulu-Natal.',
    url:         `${SITE.domain}${localePath(locale)}`,
    telephone:   SITE.phone,
    email:       SITE.email,
    image:       `${SITE.domain}/images/ethlathini-rest-camp-hluhluwe-forest-social-share.jpg`,
    logo:        `${SITE.domain}/images/ethlathini-rest-camp-logo.jpg`,
    priceRange:  'R',
    currenciesAccepted: 'ZAR',
    paymentAccepted: 'Cash, Credit Card, EFT',
    openingHours: 'Mo-Su 00:00-24:00',
    address: {
      '@type':           'PostalAddress',
      streetAddress:     SITE.address.street,
      addressLocality:   SITE.address.city,
      addressRegion:     SITE.address.province,
      postalCode:        SITE.address.postal,
      addressCountry:    'ZA',
    },
    geo: {
      '@type':     'GeoCoordinates',
      latitude:    SITE.address.lat,
      longitude:   SITE.address.lng,
    },
    hasMap: `https://maps.google.com/?q=${SITE.address.lat},${SITE.address.lng}`,
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Free WiFi',      value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Firepit',         value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free Firewood',   value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Water Points',    value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Pets Allowed',    value: true },
    ],
    sameAs: Object.values(SITE.social).filter(Boolean),
    touristType: ['Overlander', '4x4 traveller', 'Wildlife enthusiast', 'Birder'],
    nearbyAttraction: {
      '@type': 'TouristAttraction',
      name:    'Hluhluwe-iMfolozi Park',
      description: "Africa's oldest proclaimed game reserve, established 1895. Big 5 country.",
    },
  }
}

export function breadcrumbSchema(items, locale = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    inLanguage: hreflangMap[locale] ?? locale,
    itemListElement: items.map((item, i) => ({
      '@type':   'ListItem',
      position:  i + 1,
      name:      item.name,
      item:      `${SITE.domain}${localePath(locale, item.path)}`,
    })),
  }
}

// ── FAQ schema ─────────────────────────────────────────────────────
export function faqSchema(items, locale = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    inLanguage: hreflangMap[locale] ?? locale,
    mainEntity: items.map(({ q, a }) => ({
      '@type':          'Question',
      name:             q,
      acceptedAnswer: {
        '@type': 'Answer',
        text:    a,
      },
    })),
  }
}

// ── Offer / PriceSpecification schema for /book ───────────────────
// Prices mirror the RATES config in app/[locale]/book/RatesTable.jsx —
// the single source of truth for rates. Update both together.
export function campingOfferSchema(locale = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type':    'Offer',
    inLanguage: hreflangMap[locale] ?? locale,
    name:       'Overland Campsite — Ethlathini Rest Camp',
    description:'Self-contained overland campsite in a mahogany and fig forest, 2km from Memorial Gate, Hluhluwe-iMfolozi Park.',
    url:        `${SITE.domain}${localePath(locale, '/book')}`,
    seller: {
      '@type': 'LocalBusiness',
      name:    SITE.name,
      url:     SITE.domain,
    },
    priceSpecification: [
      {
        '@type':       'UnitPriceSpecification',
        name:          'Overland / Rooftop Tent Site (up to 2 people)',
        price:         200,
        priceCurrency: 'ZAR',
        unitText:      'NIGHT',
        description:   'Includes free firewood. Self-contained rigs only.',
      },
      {
        '@type':       'UnitPriceSpecification',
        name:          'Group Site (up to 8 people, 3 vehicles)',
        price:         450,
        priceCurrency: 'ZAR',
        unitText:      'NIGHT',
      },
    ],
    availability:     'https://schema.org/InStock',
    validFrom:        '2026-01-01',
    areaServed: {
      '@type':          'Place',
      name:             'Hluhluwe, KwaZulu-Natal, South Africa',
    },
  }
}

// ── WebPage schema (generic — used on vision, dream pages) ─────────
export function webPageSchema({ name, description, path, breadcrumbs, locale = 'en' }) {
  return {
    '@context':  'https://schema.org',
    '@type':     'WebPage',
    inLanguage:  hreflangMap[locale] ?? locale,
    name,
    description,
    url:         `${SITE.domain}${localePath(locale, path)}`,
    breadcrumb:  breadcrumbSchema(breadcrumbs, locale),
    publisher: {
      '@type': 'Organization',
      name:    SITE.name,
      url:     SITE.domain,
    },
  }
}

// ── Organization schema (used on About) ───────────────────────────
export function organizationSchema(locale = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type':    'Organization',
    inLanguage: hreflangMap[locale] ?? locale,
    name:       SITE.name,
    url:        SITE.domain,
    logo:       `${SITE.domain}/images/ethlathini-rest-camp-logo.jpg`,
    description:'Eco-social enterprise and overland campsite in Hluhluwe, KwaZulu-Natal — building skills, community, and sustainable tourism.',
    address: {
      '@type':          'PostalAddress',
      streetAddress:    SITE.address.street,
      addressLocality:  SITE.address.city,
      addressRegion:    SITE.address.province,
      addressCountry:   'ZA',
    },
    contactPoint: {
      '@type':       'ContactPoint',
      telephone:     SITE.phone,
      email:         SITE.email,
      contactType:   'customer service',
      availableLanguage: ['English', 'Afrikaans', 'Zulu'],
    },
    sameAs: Object.values(SITE.social).filter(Boolean),
  }
}
