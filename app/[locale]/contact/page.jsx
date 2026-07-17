// app/[locale]/contact/page.jsx
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '../../../i18n/routing'
import { pageMeta, breadcrumbSchema, SITE } from '../../../lib/seo'
import { StructuredData } from '../../../components/StructuredData'
import ContactForm from './ContactForm'
import styles from './contact.module.css'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  return pageMeta({ locale, path: '/contact', title: t('meta_title'), description: t('meta_description') })
}

function contactPageSchema(locale) {
  return {
    '@context': 'https://schema.org',
    '@type':    'ContactPage',
    inLanguage: locale,
    name:       `Contact ${SITE.name}`,
    url:        `${SITE.domain}/contact`,
    description:'Contact Ethlathini Rest Camp — phone, WhatsApp, email, or contact form.',
    mainEntity: {
      '@type':       'Organization',
      name:          SITE.name,
      telephone:     SITE.phone,
      email:         SITE.email,
      url:           SITE.domain,
      contactPoint: {
        '@type':       'ContactPoint',
        telephone:     SITE.phone,
        email:         SITE.email,
        contactType:   'customer service',
        availableLanguage: ['English', 'Afrikaans', 'Zulu'],
        hoursAvailable: {
          '@type':    'OpeningHoursSpecification',
          dayOfWeek:  ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
          opens:      '07:00',
          closes:     '20:00',
        },
      },
    },
  }
}

export default async function ContactPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })

  return (
    <>
      <StructuredData data={[
        contactPageSchema(locale),
        breadcrumbSchema([
          { name: 'Home',    path: '/' },
          { name: t('breadcrumb_name'), path: '/contact' },
        ], locale),
      ]} />

      {/* ── Hero ── */}
<section className={styles.hero}>
  <Image
    src="/images/photos/contact-hero.jpg"
    alt="Contact Ethlathini Rest Camp in Hluhluwe, KwaZulu-Natal"
    fill
    className={styles.heroBg}
    priority
    fetchPriority="high"
    quality={80}
    sizes="100vw"
  />
      <div className={styles.heroOverlay} />
      <div className={`wrap ${styles.heroContent}`}>
      <span className="eyebrow">{t('eyebrow')}</span>
      <h1>{t('h1_line1')}<br /><em>{t('h1_em')}</em></h1>
      <p>{t('hero_p')}</p>
      </div>
      </section>

      {/* ── Contact methods + form ── */}
      <section className={styles.body}>
        <div className={`wrap ${styles.bodyGrid}`}>

          {/* ── Left: contact details + map ── */}
          <div className={styles.details}>

            {/* Direct contact */}
            <div className={styles.contactCards}>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
                <div className={styles.contactCardIcon}>
                  <Image
                    src="/images/icons/volunteer/phone-whatsapp-icon.png"
                    alt="WhatsApp"
                    width={32}
                    height={32}
                    sizes="32px"
                    className={styles.contactCardIconImg}
                  />
                </div>
                <div>
                  <div className={styles.contactCardLabel}>{t('card_whatsapp_label')}</div>
                  <div className={styles.contactCardVal}>{SITE.phoneDisplay}</div>
                  <div className={styles.contactCardNote}>{t('card_whatsapp_note')}</div>
                </div>
              </a>
              <a href={`tel:${SITE.phone}`} className={styles.contactCard}>
                <div className={styles.contactCardIcon}>
                  <Image
                    src="/images/icons/volunteer/phone-whatsapp-icon.png"
                    alt="Phone"
                    width={32}
                    height={32}
                    sizes="32px"
                    className={styles.contactCardIconImg}
                  />
                </div>
                <div>
                  <div className={styles.contactCardLabel}>{t('card_phone_label')}</div>
                  <div className={styles.contactCardVal}>{SITE.phoneDisplay}</div>
                  <div className={styles.contactCardNote}>{t('card_phone_note')}</div>
                </div>
              </a>
              <a href={`mailto:${SITE.email}`} className={styles.contactCard}>
                <div className={styles.contactCardIcon}>
                  <Image
                    src="/images/icons/volunteer/ready-to-visit-icon.png"
                    alt="Email"
                    width={32}
                    height={32}
                    sizes="32px"
                    className={styles.contactCardIconImg}
                  />
                </div>
                <div>
                  <div className={styles.contactCardLabel}>{t('card_email_label')}</div>
                  <div className={styles.contactCardVal}>{SITE.email}</div>
                  <div className={styles.contactCardNote}>{t('card_email_note')}</div>
                </div>
              </a>
            </div>

            {/* Address */}
            <div className={styles.addressCard}>
              <div className={styles.addressIcon}>
                <Image
                  src="/images/icons/volunteer/physical-address-icon.png"
                  alt="Address"
                  width={28}
                  height={28}
                  sizes="28px"
                  className={styles.addressIconImg}
                />
              </div>
              <div className={styles.addressLabel}>{t('address_label')}</div>
              <div className={styles.addressVal} dangerouslySetInnerHTML={{ __html: t('address_val') }} />
              <div className={styles.addressGps}>
                <Image
                  src="/images/icons/volunteer/gps-icon.png"
                  alt="GPS coordinates -28.056694, 32.154616"
                  width={16}
                  height={16}
                  sizes="16px"
                  className={styles.addressGpsIcon}
                />
                GPS: <code>-28.056694, 32.154616</code>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${SITE.address.lat},${SITE.address.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ marginTop: '0.75rem', display: 'inline-flex' }}
              >
                {t('getDirections')}
              </a>
            </div>

            {/* Map — lazy loaded */}
            <div className={styles.mapWrap}>
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3463.612568476143!2d${SITE.address.lng}!3d${SITE.address.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDAzJzI0LjEwIlMgMzLCsDA5JzE2LjYyIkU!5e1!3m2!1sen!2sza!4v1749744000000!5m2!1sen!2sza`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ethlathini Rest Camp location — Memorial Gate Road, Hluhluwe, KwaZulu-Natal"
                className={styles.mapIframe}
              />
            </div>
          </div>

          {/* ── Right: contact form (client component) ── */}
          <div className={styles.formSide}>
            <div className={styles.formCard}>
              <h2>{t('form_h2')}</h2>
              <p>{t('form_p_pre')}<Link href="/book">{t('form_p_link')}</Link>{t('form_p_post')}</p>
              {/* ContactForm is 'use client' — interactive */}
              <ContactForm />
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
