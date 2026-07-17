import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '../../../i18n/routing'
import { pageMeta, breadcrumbSchema } from '../../../lib/seo'
import { StructuredData } from '../../../components/StructuredData'
import styles from './dream.module.css'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'dream' })
  return pageMeta({ locale, path: '/dream', title: t('meta_title'), description: t('meta_description') })
}

export default async function DreamPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'dream' })
  const CARDS = t.raw('sidebar_cards')

  return (
    <>
      <StructuredData data={breadcrumbSchema([
        { name: 'Home',      path: '/' },
        { name: t('breadcrumb_name'), path: '/dream' },
      ], locale)} />
      <section className={styles.hero}>
        <Image src="/images/photos/ethlathini-property-sunrise-misty-hillside-kzn.jpg" alt="Soft misty sunrise over the Ethlathini Rest Camp property hillside, Hluhluwe KZN — the beginning of the journey" fill className={styles.heroBg} sizes="100vw" priority fetchPriority="high" quality={80} />
        <div className={styles.heroOverlay} />
        <div className={'wrap ' + styles.heroContent}>
          <span className="eyebrow" style={{color:"#C4874A"}}>{t('eyebrow')}</span>
          <h1>{t('h1_line1')}<br /><em>{t('h1_em')}</em></h1>
          <p className={styles.heroSub}>{t('hero_sub')}</p>
        </div>
      </section>
      <section className={styles.body}>
        <div className={'wrap ' + styles.bodyInner}>
          <div className={styles.text}>
            <p>{t('p1')}</p>
            <p>{t('p2_pre')}<strong>{t('p2_strong')}</strong>{t('p2_post')}</p>
            <p>{t('p3_pre')}<em>{t('p3_em')}</em></p>
            <p>{t('p4')}</p>

            <hr className={styles.divider} />

            <h2>{t('h2_reality')}</h2>
            <p>{t.rich('p5', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
            <p>{t('p6')}</p>

            <hr className={styles.divider} />

            <h2>{t('h2_help')}</h2>
            <p>{t.rich('p7', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
            <p>{t('p8_pre')}<Link href="/volunteer" style={{color:"var(--terracotta)"}}>{t('p8_link')}</Link>{t('p8_post')}</p>

            <hr className={styles.divider} />

            <h2>{t('h2_hospitality')}</h2>
            <p>{t('p9')}</p>
            <p>{t('p10')}</p>
            <p>{t('p11_pre')}<Link href="/book" style={{color:"var(--terracotta)"}}>{t('p11_link')}</Link>{t('p11_post')}</p>

            <div className={styles.signoff}>
              <p><strong>{t('signoff')}</strong></p>
              <p className={styles.signoffSmall}>{t('signoff_small')}</p>
            </div>
          </div>
          <div className={styles.sidebar}>
            <Image src="/images/ethlathini-rest-camp-logo.jpg" alt="Ethlathini" width={180} height={216} sizes="(max-width: 800px) 140px, 180px" className={styles.logo} />
            <div className={styles.card + ' ' + styles.highlight}>
              <div className={styles.cardLabel}>{t('sidebar_question_label')}</div>
              <div className={styles.cardVal}>{t('sidebar_question_val')}</div>
              <div className={styles.cardNote}>{t('sidebar_question_note')}</div>
            </div>
            {CARDS.map(c => (
              <div key={c.label} className={styles.card}>
                <div className={styles.cardLabel}>{c.label}</div>
                <div className={styles.cardVal}>{c.val}</div>
                <div className={styles.cardNote}>{c.note}</div>
              </div>
            ))}
            <Link href="/book" className={'btn-primary ' + styles.dreamCta}>{t('sidebar_cta')}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
