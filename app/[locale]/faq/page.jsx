// app/[locale]/faq/page.jsx
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '../../../i18n/routing'
import { pageMeta, breadcrumbSchema, faqSchema, SITE } from '../../../lib/seo'
import { StructuredData } from '../../../components/StructuredData'
import styles from './faq.module.css'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'faq' })
  return pageMeta({ locale, path: '/faq', title: t('meta_title'), description: t('meta_description') })
}

export default async function FAQPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'faq' })
  const FAQS = t.raw('faqs').map(f => ({
    ...f,
    a: f.a.replace('{phone}', SITE.phoneDisplay),
  }))
  const QUICK_LINKS = t.raw('quick_links')

  return (
    <>
      <StructuredData data={[
        faqSchema(FAQS, locale),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: t('breadcrumb_name'),  path: '/faq' },
        ], locale),
      ]} />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <Image
          src="/images/photos/faq-hero.jpg"
          alt="Frequently asked questions about camping at Ethlathini Rest Camp"
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
          <h1>
            {t('h1_line1')}<br />
            <em>{t('h1_em')}</em>
          </h1>
          <p>{t('hero_p_pre')}<a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">{t('hero_p_link')}</a></p>
        </div>
      </section>

      {/* ── Quick links ── */}
      <div className={styles.quicklinks}>
        <div className="wrap">
          <span className={styles.quicklinksLabel}>{t('quicklinksLabel')}</span>
          <div className={styles.quicklinksRow}>
            {QUICK_LINKS.map((link, i) => (
              <a key={i} href={`#faq-${i}`} className={styles.quicklink}>
                <Image
                  src={link.icon}
                  alt={link.label}
                  width={20}
                  height={20}
                  sizes="20px"
                  className={styles.quicklinkIcon}
                />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ list ── */}
      <section className={styles.faqSection}>
        <div className={`wrap ${styles.faqGrid}`}>
          <div className={styles.faqList}>
            {FAQS.map((faq, i) => (
              <article key={i} id={`faq-${i}`} className={styles.faqItem}>
                <h2 className={styles.faqQ}>
                  <span className={styles.faqNum}>{String(i + 1).padStart(2, '0')}</span>
                  {faq.q}
                </h2>
                <p className={styles.faqA}>{faq.a}</p>
              </article>
            ))}
          </div>

          {/* ── Sidebar CTA ── */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <div className={styles.sidebarIcon}>
                <Image
                  src="/images/icons/volunteer/volunteer-rooms-in-main-house-icon.png"
                  alt="Book a site"
                  width={40}
                  height={40}
                  sizes="40px"
                  className={styles.sidebarIconImg}
                />
              </div>
              <h3>{t('sidebar_book_h3')}</h3>
              <p>{t('sidebar_book_p')}</p>
              <Link href="/book" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem' }}>
                {t('sidebar_book_cta')}
              </Link>
            </div>
            <div className={styles.sidebarCard}>
              <div className={styles.sidebarIcon}>
                <Image
                  src="/images/icons/volunteer/phone-whatsapp-icon.png"
                  alt="WhatsApp us"
                  width={40}
                  height={40}
                  sizes="40px"
                  className={styles.sidebarIconImg}
                />
              </div>
              <h3>{t('sidebar_wa_h3')}</h3>
              <p>{t('sidebar_wa_p')}</p>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem', background: '#25D366' }}>
                {t('sidebar_wa_cta')}
              </a>
            </div>
            <div className={styles.sidebarCard}>
              <div className={styles.sidebarIcon}>
                <Image
                  src="/images/icons/volunteer/want-to-volunteer-icon.png"
                  alt="Volunteer"
                  width={40}
                  height={40}
                  sizes="40px"
                  className={styles.sidebarIconImg}
                />
              </div>
              <h3>{t('sidebar_vol_h3')}</h3>
              <p>{t('sidebar_vol_p')}</p>
              <Link href="/volunteer" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem' }}>
                {t('sidebar_vol_cta')}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
