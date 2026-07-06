// lib/seo.js
// Central SEO config — update once, applies everywhere

export const SITE = {
  name:        'Ethlathini Rest Camp',
  domain:      'https://ethlathini.co.za',
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
    title: title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`,
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
      title:       title ? `${title} | ${SITE.name}` : SITE.name,
      description: description || SITE.description,
      siteName:    SITE.name,
      locale:      'en_ZA',
      images: [{ url: ogImg, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       title ? `${title} | ${SITE.name}` : SITE.name,
      description: description || SITE.description,
      images:      [ogImg],
    },
  }
}

// JSON-LD schemas
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LodgingBusiness', 'CampingPitch', 'TouristAttraction'],
    name:        SITE.name,
    url:         SITE.domain,
    telephone:   SITE.phone,
    email:       SITE.email,
    description: SITE.description,
    image:       `${SITE.domain}${SITE.ogImage}`,
    logo:        `${SITE.domain}/images/ethlathini-rest-camp-logo.jpg`,
    priceRange:  '$$',
    currenciesAccepted: 'ZAR',
    paymentAccepted: 'Cash, Credit Card, EFT',
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
    hasMap: `https://www.google.com/maps?q=${SITE.address.lat},${SITE.address.lng}`,
    openingHoursSpecification: {
      '@type':     'OpeningHoursSpecification',
      dayOfWeek:   ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      opens:       '07:00',
      closes:      '20:00',
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Firepit',       value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free firewood', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'WiFi',          value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Pets allowed',  value: true },
    ],
    sameAs: Object.values(SITE.social),
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

