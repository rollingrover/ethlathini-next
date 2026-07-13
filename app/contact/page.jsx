// app/contact/page.jsx
import Image from 'next/image'
import { pageMeta, breadcrumbSchema, SITE } from '../../lib/seo'
import { StructuredData } from '../../components/StructuredData'
import ContactForm from './ContactForm'
import styles from './contact.module.css'

export const metadata = pageMeta({
  path: '/contact',
  title: 'Contact Us — Ethlathini Rest Camp, Hluhluwe',
  description: 'Contact Ethlathini Rest Camp in Hluhluwe, KwaZulu-Natal. Phone, WhatsApp, email, or fill in the form. GPS: -28.056694, 32.154616.',
})

function contactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'ContactPage',
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

export default function ContactPage() {
  return (
    <>
      <StructuredData data={[
        contactPageSchema(),
        breadcrumbSchema([
          { name: 'Home',    path: '/' },
          { name: 'Contact', path: '/contact' },
        ]),
      ]} />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <Image
          src="/images/photos/contact-hero.jpg"
          alt="Contact Ethlathini Rest Camp in Hluhluwe, KwaZulu-Natal"
          fill
          className={styles.heroBg}
          priority
          sizes="100vw"
        />
        <div className={styles.heroOverlay} />
        <div className={`wrap ${styles.heroContent}`}>
          <span className="eyebrow">Get in touch</span>
          <h1>Contact Ethlathini</h1>
          <p>We&apos;re usually online from 06:30. WhatsApp is the fastest way to reach us.</p>
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
                    className={styles.contactCardIconImg}
                  />
                </div>
                <div>
                  <div className={styles.contactCardLabel}>WhatsApp (fastest)</div>
                  <div className={styles.contactCardVal}>{SITE.phoneDisplay}</div>
                  <div className={styles.contactCardNote}>Usually online from 06:30</div>
                </div>
              </a>
              <a href={`tel:${SITE.phone}`} className={styles.contactCard}>
                <div className={styles.contactCardIcon}>
                  <Image
                    src="/images/icons/volunteer/phone-whatsapp-icon.png"
                    alt="Phone"
                    width={32}
                    height={32}
                    className={styles.contactCardIconImg}
                  />
                </div>
                <div>
                  <div className={styles.contactCardLabel}>Phone</div>
                  <div className={styles.contactCardVal}>{SITE.phoneDisplay}</div>
                  <div className={styles.contactCardNote}>07:00–20:00 daily</div>
                </div>
              </a>
              <a href={`mailto:${SITE.email}`} className={styles.contactCard}>
                <div className={styles.contactCardIcon}>
                  <Image
                    src="/images/icons/volunteer/ready-to-visit-icon.png"
                    alt="Email"
                    width={32}
                    height={32}
                    className={styles.contactCardIconImg}
                  />
                </div>
                <div>
                  <div className={styles.contactCardLabel}>Email</div>
                  <div className={styles.contactCardVal}>{SITE.email}</div>
                  <div className={styles.contactCardNote}>We reply within 24 hours</div>
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
                  className={styles.addressIconImg}
                />
              </div>
              <div className={styles.addressLabel}>Physical address</div>
              <div className={styles.addressVal}>
                Memorial Gate Road<br />
                Hluhluwe, KwaZulu-Natal<br />
                South Africa, 3960
              </div>
              <div className={styles.addressGps}>
                <Image
                  src="/images/icons/volunteer/gps-icon.png"
                  alt="GPS"
                  width={16}
                  height={16}
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
                🗺️ Get directions
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
              <h2>Send us a message</h2>
              <p>For booking requests, please use the <a href="/book">Book &amp; Rates page</a>. For everything else, use this form.</p>
              {/* ContactForm is 'use client' — interactive */}
              <ContactForm />
            </div>
          </div>

        </div>
      </section>
    </>
  )
}