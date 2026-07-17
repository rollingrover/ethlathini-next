// app/[locale]/book/page.jsx
// ─────────────────────────────────────────────────────────────────
// SERVER COMPONENT — no 'use client'. Renders fully in initial HTML.
// Composes the static RatesTable (SSR) + dynamic BookingWidget (CSR).

import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { pageMeta, breadcrumbSchema, campingOfferSchema } from '../../../lib/seo'
import { StructuredData } from '../../../components/StructuredData'
import RatesTable from './RatesTable'
import BookingWidget from './BookingWidget'
import styles from './book.module.css'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'book' })
  return pageMeta({ locale, path: '/book', title: t('meta_title'), description: t('meta_description') })
}

export default async function BookPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'book' })

  return (
    <>
      <StructuredData data={[
        campingOfferSchema(locale),
        breadcrumbSchema([
          { name: 'Home',          path: '/' },
          { name: t('breadcrumb_name'), path: '/book' },
        ], locale),
      ]} />

      {/* ── Hero — server-rendered, priority LCP ── */}
      <section className={styles.hero}>
        <Image
          src="/images/photos/firewood-braai-ethlathini-campsite-stoep-hluhluwe.jpg"
          alt="Firewood and braai stand at Ethlathini Rest Camp campsite stoep, Hluhluwe KZN"
          fill
          className={styles.heroBg}
          priority
          fetchPriority="high"
          quality={80}
          sizes="100vw"
        />
        <div className={styles.heroOverlay} />
        <div className={'wrap ' + styles.heroContent}>
          <span className="eyebrow" style={{color:"#C4874A"}}>{t('eyebrow')}</span>
          <h1>{t('h1_line1')}<br /><em>{t('h1_em')}</em></h1>
          <p>{t('hero_p')}</p>
        </div>
      </section>

      {/* ── Availability notice — server-rendered ── */}
      <div className={styles.notice}>
        <div className="wrap">
          {t.rich('notice', { strong: (chunks) => <strong>{chunks}</strong> })}
        </div>
      </div>

      {/* ── Static rates table — server-rendered, crawler-visible ── */}
      <RatesTable locale={locale} />

      {/* ── Interactive booking widget — client-rendered ── */}
      <BookingWidget locale={locale} />
    </>
  )
}
