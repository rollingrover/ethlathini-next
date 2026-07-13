// app/volunteer/page.jsx
import Link from 'next/link'
import { pageMeta, breadcrumbSchema, SITE } from '../../lib/seo'
import { StructuredData } from '../../components/StructuredData'
import styles from './volunteer.module.css'

export const metadata = pageMeta({
  path: '/volunteer',
  title: 'Volunteer — Be Part of the Build, Hluhluwe KZN',
  description: 'Volunteer at Ethlathini Rest Camp in Hluhluwe, KwaZulu-Natal. Eco camp volunteer program, workaway South Africa, skills development, community garden, Big 5 game reserve.',
})

function volunteerSchema() {
  return {
    '@context':  'https://schema.org',
    '@type':     'VolunteerAction',
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

const TASKS = [
  { icon: '🌿', title: 'Clearing invasive plants',     desc: 'Chromolaena, lantana, and prickly pear are being cleared metre by metre to restore indigenous forest. Physical, rewarding, and directly visible progress.' },
  { icon: '🏗️', title: 'Building infrastructure',      desc: 'Ablutions, site improvements, fencing, signage, and general property maintenance. Basic tools provided — building experience a bonus but not required.' },
  { icon: '🌱', title: 'Community food garden',         desc: 'Planting, watering, weeding, and maintaining the food garden that feeds the community development programme.' },
  { icon: '🐟', title: 'Fish farm development',         desc: 'Help set up aquaculture infrastructure as part of the community skills programme.' },
  { icon: '📚', title: 'Skills development support',    desc: 'If you have skills in hospitality, IT, agriculture, trades, or teaching — there is meaningful work here training the next generation.' },
  { icon: '🌳', title: 'Forest restoration',            desc: 'Propagating indigenous trees and plants in the nursery, replanting cleared areas, and general forest care.' },
]

const WHAT_YOU_GET = [
  '🏠 A room in the main house (shared bathroom)',
  '🍽️ Meals included (we cook together)',
  '🌿 Live and work in a mahogany and fig forest',
  '🦁 Access to Hluhluwe-iMfolozi Park (2km away) on your days off',
  '🤝 Real community connection — not tourist-facing',
  '📜 Reference letter on completion of a meaningful stay',
  '☕ Coffee shop access when it opens',
]

export default function VolunteerPage() {
  return (
    <>
      <StructuredData data={[
        volunteerSchema(),
        breadcrumbSchema([
          { name: 'Home',      path: '/' },
          { name: 'Volunteer', path: '/volunteer' },
        ]),
      ]} />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className="wrap">
          <span className="eyebrow">Voluntourism · Workaway South Africa · Eco Camp</span>
          <h1>Be part of<br /><em>building something real</em></h1>
          <p>
            Help us clear, build, plant, and grow an eco-social destination in the heart of
            KwaZulu-Natal — 2km from Africa&apos;s oldest game reserve.
            No experience required. Just willingness.
          </p>
          <div className={styles.heroBtns}>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
              💬 WhatsApp us to apply
            </a>
            <a href={`mailto:${SITE.email}`} className="btn-ghost">
              ✉️ Email us
            </a>
          </div>
        </div>
      </section>

      {/* ── The honest ask ── */}
      <div className={styles.honestBanner}>
        <div className="wrap">
          <strong>Honest about what this is:</strong> We&apos;re not a polished volunteer resort.
          We&apos;re a property being built from scratch by a small team with limited resources and
          a big vision. If you want comfortable tourism with light volunteering — this is not it.
          If you want to do real work that matters, in a forest, next to a game reserve,
          with a community that will welcome you — come.
        </div>
      </div>

      {/* ── What you'll do ── */}
      <section className={styles.tasks}>
        <div className="wrap">
          <span className="eyebrow">What volunteers do</span>
          <h2 className={styles.h2}>Real work. Real impact.</h2>
          <div className={styles.tasksGrid}>
            {TASKS.map(t => (
              <div key={t.title} className={styles.taskCard}>
                <div className={styles.taskIcon}>{t.icon}</div>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What you get ── */}
      <section className={styles.benefits}>
        <div className={`wrap ${styles.benefitsInner}`}>
          <div>
            <span className="eyebrow">What volunteers receive</span>
            <h2 className={styles.h2}>Your stay, covered.</h2>
            <p className={styles.benefitsSub}>
              In exchange for meaningful work (minimum 4 hours per weekday),
              we provide accommodation and meals. This is a workaway-style arrangement —
              genuine exchange, not employment.
            </p>
            <ul className={styles.benefitsList}>
              {WHAT_YOU_GET.map((item, i) => (
                <li key={i} className={styles.benefitItem}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.stayCard}>
            <h3>Volunteer rooms</h3>
            <p>
              We have <strong>2 rooms</strong> available in the main house for volunteers.
              Shared bathroom. Simple, clean, and in the forest.
            </p>
            <div className={styles.stayDetail}><span>📅 Minimum stay</span><strong>2 weeks</strong></div>
            <div className={styles.stayDetail}><span>⏰ Work hours</span><strong>4 hrs/day, weekdays</strong></div>
            <div className={styles.stayDetail}><span>🌍 Who</span><strong>18+ · all nationalities</strong></div>
            <div className={styles.stayDetail}><span>🗣️ Language</span><strong>English required</strong></div>
            <div className={styles.stayDetail}><span>🐾 Pets</span><strong>On request</strong></div>
          </div>
        </div>
      </section>

      {/* ── The story ── */}
      <section className={styles.story}>
        <div className="wrap">
          <span className="eyebrow">Why this matters</span>
          <h2 className={styles.h2}>More than a campsite</h2>
          <p>
            Ethlathini was born from a second chance. The property was overgrown, the buildings
            dilapidated, and the land reclaimed by invasive species. The Mdledshe family opened
            the land with one question: <em>&ldquo;Can you build a skills development centre?&rdquo;</em>
          </p>
          <p>
            That question is still driving everything. The campsites fund the build. The build
            creates the skills centre. The skills centre trains the community. Volunteers are
            part of that chain — not tourists observing it.
          </p>
          <p>
            Hluhluwe-iMfolozi Park — Africa&apos;s oldest game reserve — is 2km down the road.
            The Bhejane and Mdledshe communities surround us. This is a real place, with real
            stakes, and room for real people who want to contribute.
          </p>
          <Link href="/dream" className="btn-secondary" style={{ marginTop: '1.25rem', display: 'inline-flex' }}>
            Read the full story →
          </Link>
        </div>
      </section>

      {/* ── Apply CTA ── */}
      <section className={styles.cta}>
        <div className={`wrap ${styles.ctaInner}`}>
          <h2>Ready to apply?</h2>
          <p>
            WhatsApp or email us with a short introduction — who you are, when you&apos;re available,
            and what you&apos;d like to contribute. No CV needed. Just be honest.
          </p>
          <div className={styles.ctaBtns}>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
              💬 WhatsApp {SITE.phoneDisplay}
            </a>
            <a href={`mailto:${SITE.email}?subject=Volunteer enquiry — Ethlathini`} className="btn-ghost">
              ✉️ {SITE.email}
            </a>
          </div>
          <p className={styles.ctaNote}>
            We reply to all enquiries within 48 hours · Spaces are limited to 2 volunteers at a time
          </p>
        </div>
      </section>
    </>
  )
}
