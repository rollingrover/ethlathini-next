// app/page.jsx
import Image from 'next/image'
import Link from 'next/link'
import { pageMeta, breadcrumbSchema, SITE } from '../lib/seo'
import styles from './page.module.css'

export const metadata = pageMeta({
  path: '/',
  title: 'Overland Campsites in the Forest — Hluhluwe, KZN',
  description: 'Ethlathini Rest Camp — overland campsites in a mahogany and fig forest, 2km from Memorial Gate, Hluhluwe-iMfolozi Park. Big 5 country. KwaZulu-Natal.',
})

const FEATURES = [
  { 
    icon: "/images/icons/forrest-icon.png", 
    title: "Mahogany & fig forest",   
    desc: "Sleep under a real forest canopy — shade, birdsong, and total bush quiet on a KZN hillside.",
    alt: "Mahogany and fig forest icon"
  },
  { 
    icon: "/images/icons/big5-at-doorstep.png", 
    title: "Big 5 at your door",       
    desc: "2km from Memorial Gate. Lion, leopard, elephant, rhino & buffalo in Africa's oldest reserve.",
    alt: "Big 5 icon"
  },
  { 
    icon: "/images/icons/overland-campsites.png", 
    title: "Overland-ready sites",     
    desc: "Shaded natural sites for fully self-contained rooftop tents, trailers & large rigs.",
    alt: "Overland campsite icon"
  },
  { 
    icon: "/images/icons/birding-paradise.png", 
    title: "Birding paradise",          
    desc: "Exceptional birdlife with a huge variety of species right on the property.",
    alt: "Bird watching icon"
  },
  { 
    icon: "/images/icons/onsite-morning-walk.png", 
    title: "Safe morning walk",         
    desc: "A peaceful ~400m boundary walk along the edge of the property — shaded forest stroll.",
    alt: "Morning walk icon"
  },
  { 
    icon: "/images/icons/coffee-icon.png", 
    title: "Coffee shop & nursery",     
    desc: "Opening very soon — good coffee in the forest, and indigenous plants to take home.",
    alt: "Coffee shop and nursery icon"
  },
  { 
    icon: "/images/icons/community-at-heart-ico.png", 
    title: "Community at heart",        
    desc: "Skills centre, food garden, fish farm & restaurant — building it one layer at a time.",
    alt: "Community icon"
  },
  { 
    icon: "/images/icons/honest-and-growing.png", 
    title: "Honest & growing",          
    desc: "We tell you what's ready and what isn't. Come as we are — it's already worth the stop.",
    alt: "Honest and growing icon"
  },
]

const STATS = [
  { num: '1895', label: 'Year Hluhluwe-iMfolozi was established' },
  { num: '2nd',  label: 'Oldest game reserve in the world' },
  { num: 'Big 5', label: 'Lion · Leopard · Elephant · Rhino · Buffalo' },
  { num: '2km',  label: 'To Memorial Gate from camp' },
]

const COMING = [
  { done: true,  label: 'Overland campsites' },
  { done: false, label: 'Coffee shop + nursery' },
  { done: false, label: 'Standard campsites' },
  { done: false, label: 'Chalets' },
  { done: false, label: 'Community food garden' },
  { done: false, label: 'Skills development centre' },
  { done: false, label: 'Fish farm' },
  { done: false, label: 'Workshop space' },
  { done: false, label: 'Restaurant' },
]

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Home', path: '/' }])) }}
      />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <Image
          src="/images/social_post_forest.jpg"
          alt="Ethlathini Rest Camp forest canopy, Hluhluwe KwaZulu-Natal"
          fill
          className={styles.heroBg}
          priority
          sizes="100vw"
        />
        <div className={styles.heroOverlay} />
        <div className={`wrap ${styles.heroContent}`}>
          <Image
            src="/images/logo_stacked.jpg"
            alt="Ethlathini Rest Camp logo"
            width={240}
            height={290}
            className={styles.heroLogo}
            priority
          />
          <p className={styles.heroSub}>
            From tar road to forest canopy in one turn.<br />
            Self-contained overland campsites in a mahogany &amp; fig forest,<br />
            2km from Hluhluwe-iMfolozi Park.
          </p>
          <div className={styles.heroBtns}>
            <Link href="/book" className="btn-primary">Book a campsite</Link>
            <Link href="/about" className="btn-ghost">Our story</Link>
          </div>
          <div className={styles.heroBadge}>
            🌍 Africa&apos;s oldest game reserve · Est. 1895 · 2nd oldest in the world
          </div>
        </div>
      </section>

      {/* ── Strip ── */}
      <div className={styles.strip}>
        {['🏕️ Overland campsites', '🌿 Mahogany & fig forest', '🦁 Big 5 · 2km', '☕ Coffee shop coming soon'].map(t => (
          <span key={t} className={styles.stripItem}>{t}</span>
        ))}
      </div>

      {/* ── Split — camp photo ── */}
      <section className={styles.split}>
        <div className={`wrap ${styles.splitInner}`}>
          <div className={styles.splitImg}>
            <Image
              src="/images/social_post_forest.jpg"
              alt="Ethlathini overland campsite under forest canopy"
              fill
              sizes="(max-width:750px) 100vw, 50vw"
              className={styles.splitPhoto}
            />
          </div>
          <div className={styles.splitText}>
            <span className="eyebrow">Now open</span>
            <h2>The forest is ready.<br /><em>Come park under it.</em></h2>
            <p>
              Ethlathini sits on a hillside off the main road to Memorial Gate —
              a roadside surprise you&apos;d never expect. Pull in and you&apos;re under the
              canopy of mahogany, wild fig, and tree aloe within seconds of leaving the tar.
            </p>
            <p>
              Simple shaded overland sites for fully self-contained rigs. Firepits at each
              site with free forest firewood, clean water points, and WiFi in some areas.
              Ablutions are under construction — self-sufficient travellers only at this stage.
            </p>
            <Link href="/book" className="btn-primary" style={{ marginTop: '1.25rem' }}>
              Book your site →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className={styles.features}>
        <div className="wrap">
          <span className="eyebrow">Why stop at Ethlathini</span>
          <h2 className={styles.h2}>More than a campsite</h2>
          <div className={styles.featGrid}>
            {FEATURES.map(f => (
              <article key={f.title} className={styles.featCard}>
                <div className={styles.featIcon}>
                  <Image
                    src={f.icon}
                    alt={f.alt}
                    width={48}
                    height={48}
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
            <span className="eyebrow">The name</span>
            <h2 className={styles.roadmapH2}><em>&ldquo;Ethlathini&rdquo;</em></h2>
            <p className={styles.roadmapP1}>
              In Zulu: <strong>&ldquo;in the forest.&rdquo;</strong> That&apos;s exactly where you&apos;ll find us.
              We&apos;re building an eco-social destination rooted in this land and the
              Hluhluwe community — one honest layer at a time.
            </p>
            <p className={styles.roadmapP2}>
              We tell you what&apos;s open and what isn&apos;t. The forest is real, the welcome
              is warm, and everything else is on its way.
            </p>
            <Link href="/dream" className="btn-secondary" style={{ marginTop: '1.25rem' }}>
              Read the story →
            </Link>
          </div>
          <div className={styles.roadmapList}>
            <div className={styles.roadmapListLabel}>What&apos;s here &amp; what&apos;s coming</div>
            {COMING.map(c => (
              <div key={c.label} className={`${styles.roadmapItem} ${c.done ? styles.done : ''}`}>
                <span aria-hidden="true">{c.done ? '✅' : '🔜'}</span>
                <span>{c.label}</span>
                {c.done && <span className={styles.openTag}>Open now</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <div className={`wrap ${styles.ctaInner}`}>
          <h2>Ready to camp in the forest?</h2>
          <p>Book directly — no platform fees, fast WhatsApp confirmation.</p>
          <div className={styles.heroBtns} style={{ justifyContent: 'center' }}>
            <Link href="/book" className="btn-primary">Check availability</Link>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              💬 WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}