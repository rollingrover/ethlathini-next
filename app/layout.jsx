// app/layout.jsx
import '../styles/globals.css'
import { lora, dmSans } from '../lib/fonts'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { SITE, localBusinessSchema } from '../lib/seo'

export const metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default:  `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'Ethlathini Rest Camp','Hluhluwe camping','overland campsites KZN',
    'Hluhluwe-iMfolozi','Big 5 camping','KwaZulu-Natal camping',
    'overland South Africa','4x4 camping KZN','rooftop tent Hluhluwe',
    'Memorial Gate accommodation','forest camping South Africa',
    'eco camp KZN','ethlathini.co.za',
  ],
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  openGraph: {
    type:     'website',
    siteName: SITE.name,
    locale:   'en_ZA',
    images:   [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon:  [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon_32x32.png', type: 'image/png' }],
    apple: '/favicon_180x180.png',
  },
  manifest: '/site.webmanifest',
}

// viewport and themeColor must be exported separately in Next.js 14
// (not inside metadata object — Next.js will warn if they are)
export const viewport = {
  width:          'device-width',
  initialScale:   1,
  themeColor:     '#1C3A18',   // forest green — matches brand + PWA chrome
  colorScheme:    'light',
}

export default function RootLayout({ children }) {
  return (
    // NOTE for Part D: when [locale] layout is added, move lang to the locale layout
    <html lang="en-ZA">
      <head>
        {/* JSON-LD structured data — LocalBusiness schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
        {/*
          No manual <link> font tags needed — next/font handles preloading,
          self-hosting, and crossOrigin automatically. External font links
          removed to eliminate render-blocking requests and FOIT.
        */}
      </head>
      {/*
        lora.variable    injects --font-display CSS variable
        dmSans.variable  injects --font-body CSS variable
        Both are available globally via var(--font-display) and var(--font-body) in CSS.

        Part D — locale layouts: add the locale-specific font variable class here,
        e.g. for /zh: className={`${lora.variable} ${dmSans.variable} ${notoSansSC.variable}`}
      */}
      <body className={`${lora.variable} ${dmSans.variable}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
