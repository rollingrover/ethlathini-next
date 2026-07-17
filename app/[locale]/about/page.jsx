import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '../../../i18n/routing'
import { pageMeta, organizationSchema, breadcrumbSchema } from '../../../lib/seo'
import { StructuredData } from '../../../components/StructuredData'
import styles from './about.module.css'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  return pageMeta({ locale, path: '/about', title: t('meta_title'), description: t('meta_description') })
}

export default async function AboutPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  const FACTS = t.raw('facts')
  const CARDS = t.raw('sidebar_cards')

  return (
    <>
      <StructuredData data={[
        organizationSchema(locale),
        breadcrumbSchema([
          { name: 'Home',  path: '/' },
          { name: t('breadcrumb_name'), path: '/about' },
        ], locale),
      ]} />
      <section className={styles.hero}>
        <Image src="/images/photos/ethlathini-forest-canopy-clean-mahogany-fig-kzn.jpg" alt="Looking up through the mahogany and fig forest canopy at Ethlathini Rest Camp, KZN" fill className={styles.heroBg} sizes="100vw" priority fetchPriority="high" quality={80} />
        <div className={styles.heroOverlay} />
        <div className={'wrap ' + styles.heroContent}>
          <span className="eyebrow" style={{color:"#C4874A"}}>{t('eyebrow')}</span>
          <h1>{t('h1_line1')}<br /><em>{t('h1_em')}</em></h1>
        </div>
      </section>
      <section className={styles.body}>
        <div className={'wrap ' + styles.bodyInner}>
          <div className={styles.text}>
            <h2>{t('h2_title')}</h2>
            <p>{t.rich('p_intro', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
            <h3>{t('h3_place')}</h3>
            <p>{t.rich('p_place', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
            <h3>{t('h3_now')}</h3>
            <p>{t.rich('p_now1', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
            <p>{t.rich('p_now2', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
            {/* Task C6 — internal link to /book from body text */}
            <p>{t.rich('p_book_link', { link: (chunks) => <Link href="/book" style={{color:"var(--terracotta)"}}>{chunks}</Link> })}</p>
            <div className={styles.location}>
              <h3>{t('h3_location')}</h3>
              <p>{t.rich('p_location', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
            </div>
            <div className={styles.facts}>
              <h3>{t('h3_facts')}</h3>
              <ul>
                {FACTS.map((f, i) => (
                  <li key={i}><strong>{f.label}</strong> {f.value}</li>
                ))}
              </ul>
            </div>
            <p className={styles.signoff}><strong>{t('signoff')}</strong></p>
          </div>
          <div className={styles.sidebar}>
            <Image src="/images/ethlathini-rest-camp-logo.jpg" alt="Ethlathini Rest Camp" width={200} height={240} sizes="(max-width: 800px) 160px, 200px" className={styles.logo} />
            {CARDS.map(c => (
              <div key={c.label} className={styles.card}>
                <div className={styles.cardLabel}>{c.label}</div>
                <div className={styles.cardVal}>{c.val}</div>
                <div className={styles.cardNote}>{c.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
