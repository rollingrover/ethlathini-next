// lib/seo.js
// Central SEO config — update once, applies everywhere

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
}

// Per-page metadata factory
export function pageMeta({ title, description, path = '', image } = {}) {
  const url = `${SITE.domain}${path}`
  const ogImg = image || SITE.ogImage
  return {
    metadataBase: new URL(SITE.domain),
    // Return ONLY the page-specific title — no brand suffix.
    // The root layout template: "%s | Ethlathini Rest Camp" appends the brand name.
    // If no title supplied, return undefined so root layout default is used.
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
    alternates: { canonical: url },
    openGraph: {
      type:        'website',
      url,
      // OG title: include brand suffix explicitly since OG ignores Next.js template
      title:       title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`,
      description: description || SITE.description,
      siteName:    SITE.name,
      locale:      'en_ZA',
      images: [{ url: ogImg, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card:        'summary_large_image',
      // Twitter title: same as OG — explicit brand suffix
      title:       title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`,
      description: description || SITE.description,
      images:      [ogImg],
    },
  }
}

// JSON-LD schemas
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LodgingBusiness', 'CampingGround'],
    name:        SITE.name,
    description: 'Overland campsites in a mahogany and fig forest, 2km from Memorial Gate, Hluhluwe-iMfolozi Park. Big 5 country. KwaZulu-Natal.',
    url:         SITE.domain,
    telephone:   SITE.phone,
    email:       SITE.email,
    image:       `${SITE.domain}/images/ethlathini-rest-camp-hluhluwe-forest-social-share.jpg`,
    logo:        `${SITE.domain}/images/ethlathini-rest-camp-logo.jpg`,
    priceRange:  'R',
    currenciesAccepted: 'ZAR',
    paymentAccepted: 'Cash, Credit Card, EFT',
    // openingHours must be a string array for schema.org CampingGround
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

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type':   'ListItem',
      position:  i + 1,
      name:      item.name,
      item:      `${SITE.domain}${item.path}`,
    })),
  }
}


// ── FAQ schema ─────────────────────────────────────────────────────
export function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
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
// TODO: add real prices — replace R___ strings with actual amounts
// when rates are confirmed. Remove the TODO comment when done.
export function campingOfferSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'Offer',
    name:       'Overland Campsite — Ethlathini Rest Camp',
    description:'Self-contained overland campsite in a mahogany and fig forest, 2km from Memorial Gate, Hluhluwe-iMfolozi Park.',
    url:        `${SITE.domain}/book`,
    seller: {
      '@type': 'LocalBusiness',
      name:    SITE.name,
      url:     SITE.domain,
    },
    // TODO: add real prices — replace priceSpecification values when rates confirmed
    priceSpecification: [
      {
        '@type':       'UnitPriceSpecification',
        name:          'Overland / Rooftop Tent Site (up to 2 people)',
        price:         'TBC',           // TODO: replace with real nightly rate e.g. 250
        priceCurrency: 'ZAR',
        unitText:      'NIGHT',
        description:   'Includes free firewood. Self-contained rigs only.',
      },
      {
        '@type':       'UnitPriceSpecification',
        name:          'Group Site (up to 8 people, 3 vehicles)',
        price:         'TBC',           // TODO: replace with real group rate
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
export function webPageSchema({ name, description, path, breadcrumbs }) {
  return {
    '@context':  'https://schema.org',
    '@type':     'WebPage',
    name,
    description,
    url:         `${SITE.domain}${path}`,
    breadcrumb:  breadcrumbSchema(breadcrumbs),
    publisher: {
      '@type': 'Organization',
      name:    SITE.name,
      url:     SITE.domain,
    },
  }
}

// ── Organization schema (used on About) ───────────────────────────
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'Organization',
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
