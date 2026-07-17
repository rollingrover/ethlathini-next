// app/[locale]/find-us/page.jsx
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { pageMeta, breadcrumbSchema, SITE } from '../../../lib/seo'
import { StructuredData } from '../../../components/StructuredData'
import styles from './findus.module.css'

const MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3463.612568476143!2d32.15461667594398!3d-28.056694476318793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDAzJzI0LjEwIlMgMzLCsDA5JzE2LjYyIkU!5e1!3m2!1sen!2sza!4v1749744000000!5m2!1sen!2sza"
const MAPS_DIR  = "https://www.google.com/maps/dir/?api=1&destination=28.056694,32.154616"

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'findUs' })
  return pageMeta({ locale, path: '/find-us', title: t('meta_title'), description: t('meta_description') })
}

export default async function FindUsPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'findUs' })

  return (
    <>
      <StructuredData data={
        breadcrumbSchema([
          { name: 'Home',    path: '/' },
          { name: t('breadcrumb_name'), path: '/find-us' },
        ], locale)
      } />

      {/* ── Hero ── */}
<section className={styles.hero}>
  <Image
    src="/images/photos/main-road-sunrise-approach-ethlathini-hluhluwe.jpg"
    alt="Sunrise on the main road approaching Ethlathini Rest Camp and Hluhluwe-iMfolozi Memorial Gate"
    fill
    className={styles.heroBg}
    priority
    fetchPriority="high"
    quality={80}
    sizes="100vw"
    />
      <div className={styles.heroOverlay} />
      <div className={`wrap ${styles.heroContent}`}>
      <span className="eyebrow" style={{ color: '#C4874A' }}>{t('eyebrow')}</span>
      <h1>{t('h1_line1')}<br /><em>{t('h1_em')}</em></h1>
      <p>{t('hero_p')}</p>
      </div>
      </section>

      {/* ── Body ── */}
      <section className={styles.body}>
        <div className={"wrap " + styles.bodyInner}>

          {/* Map */}
          <div className={styles.mapWrap}>
            <iframe src={MAPS_EMBED} width="100%" height="100%"
              style={{border:0,borderRadius:"12px"}} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ethlathini Rest Camp location — Memorial Gate Road, Hluhluwe, KZN"
              className={styles.mapIframe} />
          </div>

          {/* Details */}
          <div className={styles.details}>

            {/* Address Card */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <Image
                  src="/images/icons/volunteer/physical-address-icon.png"
                  alt={t('card_address_alt')}
                  width={28}
                  height={28}
                  sizes="28px"
                  className={styles.cardIconImg}
                />
              </div>
              <div className={styles.cardLabel}>{t('card_address_label')}</div>
              <div className={styles.cardVal} dangerouslySetInnerHTML={{ __html: t('card_address_val') }} />
            </div>

            {/* GPS Card */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <Image
                  src="/images/icons/volunteer/gps-icon.png"
                  alt={t('card_gps_alt')}
                  width={28}
                  height={28}
                  sizes="28px"
                  className={styles.cardIconImg}
                />
              </div>
              <div className={styles.cardLabel}>{t('card_gps_label')}</div>
              <div className={styles.cardVal}>{t('card_gps_val')}</div>
              <div className={styles.cardNote}>{t('card_gps_note')}</div>
            </div>

            {/* Distance Card */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <Image
                  src="/images/icons/volunteer/2km-to-memorial-gate-icon.png"
                  alt={t('card_distance_alt')}
                  width={28}
                  height={28}
                  sizes="28px"
                  className={styles.cardIconImg}
                />
              </div>
              <div className={styles.cardLabel}>{t('card_distance_label')}</div>
              <div className={styles.cardVal}>{t('card_distance_val')}</div>
              <div className={styles.cardNote}>{t('card_distance_note')}</div>
            </div>

            {/* Phone / WhatsApp Card */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <Image
                  src="/images/icons/volunteer/phone-whatsapp-icon.png"
                  alt={t('card_phone_alt')}
                  width={28}
                  height={28}
                  sizes="28px"
                  className={styles.cardIconImg}
                />
              </div>
              <div className={styles.cardLabel}>{t('card_phone_label')}</div>
              <div className={styles.cardVal}>
                <a href={"tel:" + SITE.phone}>{SITE.phoneDisplay}</a>
              </div>
              <div className={styles.cardNote}>
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
                  {t('card_phone_note')}
                </a>
              </div>
            </div>

            {/* Buttons */}
            <div className={styles.btnRow}>
              <a href={MAPS_DIR} target="_blank" rel="noopener noreferrer" className="btn-primary">
                {t('btn_openMaps')}
              </a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                {t('btn_whatsapp')}
              </a>
            </div>

            {/* Directions */}
            <div className={styles.directions}>
              <h4>{t('directions_h4')}</h4>
              <ol>
                {t.raw('directions_steps').map((step, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: step }} />
                ))}
              </ol>
              <p className={styles.directionsNote}>
                <em>{t('directions_note')}</em>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
