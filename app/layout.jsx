// app/layout.jsx
import '../styles/globals.css'
import { lora, dmSans } from '../lib/fonts'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { StructuredData } from '../components/StructuredData'
import { SITE, localBusinessSchema } from '../lib/seo'

export const metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default:  'Ethlathini Rest Camp — Overland Campsites in the Forest, Hluhluwe KZN',
    template: '%s | Ethlathini Rest Camp',
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
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon_180x180.png',
  },
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
    <html lang="en-ZA">
      <head>
        <StructuredData data={localBusinessSchema()} />
      </head>
      <body className={`${lora.variable} ${dmSans.variable}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}