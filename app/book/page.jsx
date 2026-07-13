// app/book/page.jsx
// ─────────────────────────────────────────────────────────────────
// SERVER COMPONENT — no 'use client'. Renders fully in initial HTML.
// Composes the static RatesTable (SSR) + dynamic BookingWidget (CSR).
//
// Why this matters:
//   BEFORE: entire page was 'use client' + returned null on server
//           → zero HTML to crawlers, zero LCP content
//   AFTER:  hero, notice, rates table = server-rendered static HTML
//           → crawlers index "Hluhluwe camping rates", "overland KZN price"
//           → LCP resolves without JS hydration

import Image from 'next/image'
import { breadcrumbSchema, campingOfferSchema } from '../../lib/seo'
import { StructuredData } from '../../components/StructuredData'
import RatesTable from './RatesTable'
import BookingWidget from './BookingWidget'
import styles from './book.module.css'

export default function BookPage() {
  return (
    <>
      <StructuredData data={[
        campingOfferSchema(),
        breadcrumbSchema([
          { name: 'Home',          path: '/' },
          { name: 'Book & Rates',  path: '/book' },
        ]),
      ]} />

      {/* ── Hero — server-rendered, priority LCP ── */}
      <section className={styles.hero}>
        <Image
          src="/images/photos/firewood-braai-ethlathini-campsite-stoep-hluhluwe.jpg"
          alt="Firewood and braai stand at Ethlathini Rest Camp campsite stoep, Hluhluwe KZN"
          fill
          className={styles.heroBg}
          priority
          fetchPriority="high"
          quality={80}
          sizes="100vw"
        />
        <div className={styles.heroOverlay} />
        <div className={`wrap ${styles.heroContent}`}>
          <span className="eyebrow" style={{ color: '#C4874A' }}>
            Overland Campsites · Self-Contained Only
          </span>
          <h1>Book your site in the forest</h1>
          <p>
            4 cleared sites under mahogany, fig &amp; tree aloe canopy,
            2km from Memorial Gate, Hluhluwe-iMfolozi Park.
            Firepits. Free firewood. Pure bush quiet.
          </p>
        </div>
      </section>

      {/* ── Availability notice — server-rendered ── */}
      <div className={styles.notice}>
        <div className="wrap">
          🏕️ <strong>4 overland sites open now</strong> — ablutions under development,
          self-contained campers only. Chalets, coffee shop &amp; restaurant coming soon.
        </div>
      </div>

      {/* ── Static rates table — server-rendered, crawler-visible ──
          This is the SEO-critical section. Targets:
          "Hluhluwe camping rates" · "overland campsite KZN price"
          "Hluhluwe-iMfolozi camping cost" · "forest camping South Africa"
          Renders in initial HTML — no JS required.
      ── */}
      <RatesTable />

      {/* ── Interactive booking widget — client-rendered ──
          'use client' is contained inside BookingWidget only.
          The server renders a <div> shell; React hydrates it client-side.
          This does NOT affect the RatesTable above — it's already in HTML.
      ── */}
      <BookingWidget />
    </>
  )
}