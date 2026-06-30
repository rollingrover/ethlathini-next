// app/layout.jsx
import '../styles/globals.css'
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

export default function RootLayout({ children }) {
  return (
    <html lang="en-ZA">
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
