// app/[locale]/page.jsx
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '../../i18n/routing'
import { breadcrumbSchema, pageMeta, SITE } from '../../lib/seo'
import { StructuredData } from '../../components/StructuredData'
import styles from './page.module.css'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  // Home page uses the root layout's default title — passing no `title` avoids
  // the "%s | Ethlathini Rest Camp" template producing a blank/broken result.
  return pageMeta({ locale, path: '', description: t('meta_description') })
}

export default async function HomePage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  const tc = await getTranslations({ locale, namespace: 'common' })
  const FEATURES = t.raw('features')
  const STATS = t.raw('stats')
  const COMING = t.raw('coming')

  return (
    <>
      <StructuredData data={
        breadcrumbSchema([{ name: 'Home', path: '/' }], locale)
      } />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <Image
          src="/images/photos/tree-aloe-clean-silhouette-sunrise-ethlathini-kzn.jpg"
          alt="Tree aloe silhouette at sunrise, Ethlathini Rest Camp, Hluhluwe KwaZulu-Natal"
          fill
          className={styles.heroBg}
          priority
          fetchPriority="high"
          quality={80}
          sizes="100vw"
        />
        <div className={styles.heroOverlay} />
        <div className={`wrap ${styles.heroContent}`}>
          <Image
            src="/images/ethlathini-rest-camp-logo.jpg"
            alt="Ethlathini Rest Camp logo"
            width={240}
            height={290}
            className={styles.heroLogo}
            sizes="(max-width: 768px) 180px, 240px"
            quality={90}
            priority
            fetchPriority="high"
          />
          <p className={styles.heroSub}>
            {t('hero_sub_line1')}<br />
            {t('hero_sub_line2')}<br />
            {t('hero_sub_line3')}
          </p>
          <div className={styles.heroBtns}>
            <Link href="/book" className="btn-primary">{t('hero_book')}</Link>
            <Link href="/about" className="btn-ghost">{t('hero_story')}</Link>
          </div>
          <div className={styles.heroBadge}>
            {t('hero_badge')}
          </div>
        </div>
      </section>

      {/* ── Strip ── */}
      <div className={styles.strip}>
        <span className={styles.stripItem}>
          <Image
            src="/images/icons/overland-campsite-icon-south-africa.png"
            alt={t('strip_overland')}
            width={24}
            height={24}
            sizes="24px"
            className={styles.stripIcon}
          />
          {t('strip_overland')}
        </span>
        <span className={styles.stripItem}>
          <Image
            src="/images/icons/mahogany-fig-forest-icon.png"
            alt={t('strip_forest')}
            width={24}
            height={24}
            sizes="24px"
            className={styles.stripIcon}
          />
          {t('strip_forest')}
        </span>
        <span className={styles.stripItem}>
          <Image
            src="/images/icons/big5-game-reserve-icon-hluhluwe.png"
            alt={t('strip_big5')}
            width={24}
            height={24}
            sizes="24px"
            className={styles.stripIcon}
          />
          {t('strip_big5')}
        </span>
        <span className={styles.stripItem}>
          <Image
            src="/images/icons/coffee-shop-icon.png"
            alt={t('strip_coffee')}
            width={24}
            height={24}
            sizes="24px"
            className={styles.stripIcon}
          />
          {t('strip_coffee')}
        </span>
      </div>

      {/* ── Split — camp photo ── */}
      <section className={styles.split}>
        <div className={`wrap ${styles.splitInner}`}>
          <div className={styles.splitImg}>
            <Image
              src="/images/photos/firewood-braai-ethlathini-campsite-stoep-hluhluwe.jpg"
              alt="Firewood and braai stand at Ethlathini Rest Camp campsite, Hluhluwe KZN"
              fill
              sizes="(max-width:750px) 100vw, 50vw"
              className={styles.splitPhoto}
            />
          </div>
          <div className={styles.splitText}>
            <span className="eyebrow">{t('split_eyebrow')}</span>
            <h2>{t('split_h2_line1')}<br /><em>{t('split_h2_line2')}</em></h2>
            <p>{t('split_p1')}</p>
            <p>{t('split_p2')}</p>
            <Link href="/book" className="btn-primary" style={{ marginTop: '1.25rem' }}>
              {tc('bookCta')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className={styles.features}>
        <div className="wrap">
          <span className="eyebrow">{t('features_eyebrow')}</span>
          <h2 className={styles.h2}>{t('features_h2')}</h2>
          <div className={styles.featGrid}>
            {FEATURES.map(f => (
              <article key={f.title} className={styles.featCard}>
                <div className={styles.featIcon}>
                  <Image
                    src={f.icon}
                    alt={f.alt}
                    width={48}
                    height={48}
                    sizes="48px"
                    className={styles.featIconImg}
                  />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className={styles.stats} aria-label="Key facts about Hluhluwe-iMfolozi Park">
        <div className={`wrap ${styles.statsGrid}`}>
          {STATS.map(s => (
            <div key={s.num} className={styles.stat}>
              <div className={styles.statNum}>{s.num}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Roadmap ── */}
      <section className={styles.roadmap}>
        <div className={`wrap ${styles.roadmapInner}`}>
          <div>
            <span className="eyebrow">{t('roadmap_eyebrow')}</span>
            <h2 className={styles.roadmapH2}><em>{t('roadmap_h2')}</em></h2>
            <p className={styles.roadmapP1}>
              {t('roadmap_p1_pre')}<strong>{t('roadmap_p1_strong')}</strong>{t('roadmap_p1_post')}
            </p>
            <p className={styles.roadmapP2}>
              {t('roadmap_p2')}
            </p>
            <Link href="/dream" className="btn-secondary" style={{ marginTop: '1.25rem' }}>
              {tc('readTheStory')}
            </Link>
          </div>
          <div className={styles.roadmapList}>
            <div className={styles.roadmapListLabel}>{t('roadmap_list_label')}</div>
            {COMING.map(c => (
              <div key={c.label} className={`${styles.roadmapItem} ${c.done ? styles.done : ''}`}>
                <span aria-hidden="true">{c.done ? '✅' : '🔜'}</span>
                <span>{c.label}</span>
                {c.done && <span className={styles.openTag}>{tc('openNow')}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <div className={`wrap ${styles.ctaInner}`}>
          <h2>{t('cta_h2')}</h2>
          <p>{t('cta_p')}</p>
          <div className={styles.heroBtns} style={{ justifyContent: 'center' }}>
            <Link href="/book" className="btn-primary">{tc('checkAvailability')}</Link>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              {tc('whatsappUs')}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
