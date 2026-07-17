import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '../../../i18n/routing'
import { pageMeta, breadcrumbSchema } from '../../../lib/seo'
import { StructuredData } from '../../../components/StructuredData'
import styles from './vision.module.css'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'vision' })
  return pageMeta({ locale, path: '/vision', title: t('meta_title'), description: t('meta_description') })
}

export default async function VisionPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'vision' })
  const tc = await getTranslations({ locale, namespace: 'common' })
  const PILLARS = t.raw('pillars')
  const OPEN_NOW = t.raw('open_now')
  const COMING_SOON = t.raw('coming_soon')

  return (
    <>
      <StructuredData data={breadcrumbSchema([
        { name: 'Home',       path: '/' },
        { name: t('breadcrumb_name'), path: '/vision' },
      ], locale)} />
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <Image src="/images/photos/sunrise-misty-valleys-hluhluwe-imfolozi-landscape.jpg" alt="Misty sunrise view over the valleys near Hluhluwe-iMfolozi Park, KwaZulu-Natal — the landscape Ethlathini is part of" fill className={styles.heroBg} sizes="100vw" priority fetchPriority="high" quality={80} />
        <div className={styles.heroOverlay} />
        <div className={"wrap " + styles.heroContent}>
          <span className="eyebrow" style={{color:"#C4874A"}}>{t('eyebrow')}</span>
          <h1>{t('h1_line1')}<br /><em>{t('h1_em')}</em></h1>
          <p className={styles.heroSub}>{t('hero_sub')}</p>
        </div>
      </section>

      {/* ── Aerial Proposed Plan ── */}
      <section className={styles.aerial}>
        <div className="wrap">
          <div className={styles.aerialText}>
            <span className="eyebrow">{t('plan_eyebrow')}</span>
            <h2 className={styles.h2}>{t('plan_h2_line1')}<br /><em>{t('plan_h2_em')}</em></h2>
            <p className={styles.aerialDesc}>{t('plan_desc')}</p>
            <p className={styles.aerialNote}>
              <em>{t('plan_note')}</em>
            </p>
          </div>
          <div className={styles.aerialImage}>
            <Image
              src="/images/ethlathini-rest-camp-site-plan-hluhluwe-imfolozi.png"
              alt="Ethlathini proposed aerial plan showing campsites, chalets, skills center, fish farm, coffee shop, nursery, and community garden"
              width={1000}
              height={700}
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.aerialImg}
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Skills Pillars ── */}
      <section className={styles.pillars}>
        <div className="wrap">
          <span className="eyebrow">{t('pillars_eyebrow')}</span>
          <h2 className={styles.h2}>{t('pillars_h2')}</h2>
          <p className={styles.pillarsSub}>{t.rich('pillars_sub', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
          <div className={styles.pillarsGrid}>
            {PILLARS.map(p => (
              <div key={p.title} className={styles.pillar}>
                <div className={styles.pillarIcon}>
                  <Image
                    src={p.icon}
                    alt={p.alt}
                    width={80}
                    height={80}
                    sizes="80px"
                    className={styles.pillarIconImg}
                  />
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
          {/* Task C6 — internal link to /book from body text */}
          <p style={{ marginTop: '1.5rem' }}>
            {t.rich('pillars_book_link', { link: (chunks) => <Link href="/book" style={{color:"var(--terracotta)"}}>{chunks}</Link> })}
          </p>
        </div>
      </section>

      {/* ── What We're Building — Image Grid ── */}
      <section className={styles.building}>
        <div className={"wrap " + styles.buildingInner}>
          <span className="eyebrow">{t('building_eyebrow')}</span>
          <h2 className={styles.h2}>{t('building_h2')}</h2>

          <div className={styles.buildingGrid}>
            {/* Open Now Column */}
            <div className={styles.buildingCol}>
              <h4 className={styles.buildingColTitle}>{t('openNowLabel')}</h4>
              <div className={styles.buildingIconGrid}>
                {OPEN_NOW.map((item, idx) => (
                  <div key={idx} className={styles.buildingIconItem}>
                    <div className={styles.buildingIconWrap}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={48}
                        height={48}
                        sizes="48px"
                        className={styles.buildingIconImg}
                      />
                    </div>
                    <span className={styles.buildingIconLabel}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Coming Soon Column */}
            <div className={styles.buildingCol}>
              <h4 className={styles.buildingColTitle}>{t('comingSoonLabel')}</h4>
              <div className={styles.buildingIconGrid}>
                {COMING_SOON.map((item, idx) => (
                  <div key={idx} className={styles.buildingIconItem}>
                    <div className={styles.buildingIconWrap}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={48}
                        height={48}
                        sizes="48px"
                        className={styles.buildingIconImg}
                      />
                    </div>
                    <span className={styles.buildingIconLabel}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <div className={"wrap " + styles.ctaInner}>
          <h2>{t('cta_h2')}</h2>
          <p>{t('cta_p')}</p>
          <div className={styles.ctaBtns}>
            <Link href="/book" className="btn-primary">{tc('bookASite')}</Link>
            <Link href="/dream" className="btn-secondary">{tc('readTheStory')}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
