// app/[locale]/volunteer/page.jsx
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '../../../i18n/routing'
import { pageMeta, breadcrumbSchema, SITE } from '../../../lib/seo'
import { StructuredData } from '../../../components/StructuredData'
import styles from './volunteer.module.css'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'volunteer' })
  return pageMeta({ locale, path: '/volunteer', title: t('meta_title'), description: t('meta_description') })
}

function volunteerSchema(locale) {
  return {
    '@context':  'https://schema.org',
    '@type':     'VolunteerAction',
    inLanguage:  locale,
    name:        `Volunteer at ${SITE.name}`,
    description: 'Volunteer at an eco-social camp in Hluhluwe, KwaZulu-Natal — clearing invasive plants, building infrastructure, community garden, skills development.',
    agent: {
      '@type': 'Organization',
      name:    SITE.name,
      url:     SITE.domain,
    },
    location: {
      '@type':           'Place',
      name:              SITE.name,
      address: {
        '@type':          'PostalAddress',
        streetAddress:    SITE.address.street,
        addressLocality:  SITE.address.city,
        addressRegion:    SITE.address.province,
        addressCountry:   'ZA',
      },
      geo: {
        '@type':    'GeoCoordinates',
        latitude:   SITE.address.lat,
        longitude:  SITE.address.lng,
      },
    },
    participant: {
      '@type':      'Person',
      description:  'Volunteers from South Africa and internationally — eco-tourism, conservation, community development, or simply wanting to help build something real.',
    },
  }
}

export default async function VolunteerPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'volunteer' })
  const tc = await getTranslations({ locale, namespace: 'common' })
  const TASKS = t.raw('tasks')
  const PACKAGE_INCLUDES = t.raw('package_includes')
  const STAY_DETAILS = t.raw('stay_details')
  const CUSTOM_ACTIVITIES = t.raw('custom_activities')

  return (
    <>
      <StructuredData data={[
        volunteerSchema(locale),
        breadcrumbSchema([
          { name: 'Home',      path: '/' },
          { name: t('breadcrumb_name'), path: '/volunteer' },
        ], locale),
      ]} />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <Image
          src="/images/photos/hero-volunteer-schools-project.jpg"
          alt="Volunteers working with community schools project in Hluhluwe"
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
          <div className={styles.heroBtns}>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {t('enquireWhatsapp')}
            </a>
            <a href={`mailto:${SITE.email}`} className="btn-ghost">
              {t('emailUs')}
            </a>
          </div>
        </div>
      </section>

      {/* ── The honest ask ── */}
      <div className={styles.honestBanner}>
        <div className="wrap">
          {t.rich('honestBanner', { strong: (chunks) => <strong>{chunks}</strong> })}
        </div>
      </div>

      {/* ── What you'll do ── */}
      <section className={styles.tasks}>
        <div className="wrap">
          <span className="eyebrow">{t('tasks_eyebrow')}</span>
          <h2 className={styles.h2}>{t('tasks_h2')}</h2>
          <div className={styles.tasksGrid}>
            {TASKS.map(task => (
              <div key={task.title} className={styles.taskCard}>
                <div className={styles.taskIcon}>
                  <Image
                    src={task.icon}
                    alt={task.alt}
                    width={48}
                    height={48}
                    sizes="48px"
                    className={styles.taskIconImg}
                  />
                </div>
                <h3>{task.title}</h3>
                <p>{task.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What you get ── */}
      <section className={styles.benefits}>
        <div className={`wrap ${styles.benefitsInner}`}>
          <div>
            <span className="eyebrow">{t('benefits_eyebrow')}</span>
            <h2 className={styles.h2}>{t('benefits_h2')}</h2>
            <p className={styles.benefitsSub}>
              {t.rich('benefits_sub', { strong: (chunks) => <strong>{chunks}</strong> })}
            </p>
            <ul className={styles.benefitsList}>
              {PACKAGE_INCLUDES.map((item, i) => (
                <li key={i} className={styles.benefitItem}>
                  <div className={styles.benefitIcon}>
                    <Image
                      src={item.icon}
                      alt={item.alt}
                      width={28}
                      height={28}
                      sizes="28px"
                      className={styles.benefitIconImg}
                    />
                  </div>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.stayCard}>
            <h3>{t('stayCard_h3')}</h3>
            <p>{t.rich('stayCard_p', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
            {STAY_DETAILS.map((detail, i) => (
              <div key={i} className={styles.stayDetail}>
                <div className={styles.stayDetailIcon}>
                  <Image
                    src={detail.icon}
                    alt={detail.label}
                    width={24}
                    height={24}
                    sizes="24px"
                    className={styles.stayDetailIconImg}
                  />
                </div>
                <span>{detail.label}</span>
                <strong>{detail.value}</strong>
              </div>
            ))}
            <div className={styles.customActivities}>
              <p><strong>{t('customActivities_label')}</strong></p>
              <ul>
                {CUSTOM_ACTIVITIES.map((activity, i) => (
                  <li key={i}>{activity}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── The story ── */}
      <section className={styles.story}>
        <div className="wrap">
          <span className="eyebrow">{t('story_eyebrow')}</span>
          <h2 className={styles.h2}>{t('story_h2')}</h2>
          <p>{t('story_p1_pre')}<em>{t('story_p1_em')}</em></p>
          <p>{t('story_p2')}</p>
          <p>{t('story_p3')}</p>
          <Link href="/dream" className="btn-secondary" style={{ marginTop: '1.25rem', display: 'inline-flex' }}>
            {tc('readFullStory')}
          </Link>
        </div>
      </section>

      {/* ── Apply CTA ── */}
      <section className={styles.cta}>
        <div className={`wrap ${styles.ctaInner}`}>
          <h2>{t('cta_h2')}</h2>
          <p>{t('cta_p')}</p>
          <div className={styles.ctaBtns}>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {t('cta_whatsapp', { phone: SITE.phoneDisplay })}
            </a>
            <a href={`mailto:${SITE.email}?subject=Volunteer package enquiry — Ethlathini`} className="btn-ghost">
              ✉️ {SITE.email}
            </a>
          </div>
          <p className={styles.ctaNote}>{t('cta_note')}</p>
        </div>
      </section>
    </>
  )
}
