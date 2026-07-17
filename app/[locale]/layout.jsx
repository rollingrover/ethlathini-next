// app/[locale]/layout.jsx
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getTranslations, getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import '../../styles/globals.css'
import { lora, dmSans } from '../../lib/fonts'
import { notoSansCyrillic, notoSansSC, notoSansDevanagari } from '../../lib/fonts-script'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { StructuredData } from '../../components/StructuredData'
import { SITE, localBusinessSchema, ogLocaleFor, alternateOgLocales } from '../../lib/seo'
import { routing, htmlLangMap } from '../../i18n/routing'
import { Analytics } from '@vercel/analytics/next'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

// Map locale → extra font variable class (Part D script coverage)
const scriptFontClass = {
  ru: notoSansCyrillic.variable,
  zh: notoSansSC.variable,
  hi: notoSansDevanagari.variable,
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })

  return {
    metadataBase: new URL(SITE.domain),
    title: {
      default: t('site_title_default'),
      template: `%s | ${SITE.name}`,
    },
    description: t('site_description'),
    keywords: [
      'Ethlathini Rest Camp', 'Hluhluwe camping', 'overland campsites KZN',
      'Hluhluwe-iMfolozi', 'Big 5 camping', 'KwaZulu-Natal camping',
      'overland South Africa', '4x4 camping KZN', 'rooftop tent Hluhluwe',
      'Memorial Gate accommodation', 'forest camping South Africa',
      'eco camp KZN', 'ethlathini.co.za',
    ],
    robots: { index: true, follow: true, 'max-image-preview': 'large' },
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      locale: ogLocaleFor(locale),
      alternateLocale: alternateOgLocales(locale),
      images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name, type: SITE.ogImageType }],
    },
    twitter: {
      card: 'summary_large_image',
      // TODO: replace with real Twitter/X handle once the account is live (Task C7)
      site: undefined,
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon_180x180.png',
    },
  }
}

// viewport and themeColor must be exported separately in Next.js 14
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1C3A18',
  colorScheme: 'light',
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  const htmlLang = htmlLangMap[locale] ?? locale
  const extraFontClass = scriptFontClass[locale] ?? ''
  const messages = await getMessages()

  return (
    <html lang={htmlLang}>
      <head>
        <StructuredData data={localBusinessSchema(locale)} />
      </head>
      <body className={`${lora.variable} ${dmSans.variable} ${extraFontClass}`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
