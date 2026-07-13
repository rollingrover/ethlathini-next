// app/faq/page.jsx
import Link from 'next/link'
import { pageMeta, breadcrumbSchema, faqSchema, SITE } from '../../lib/seo'
import { StructuredData } from '../../components/StructuredData'
import styles from './faq.module.css'

export const metadata = pageMeta({
  path: '/faq',
  title: 'FAQ — Camping at Ethlathini Rest Camp',
  description: 'Frequently asked questions about camping at Ethlathini Rest Camp in Hluhluwe, KZN. Self-contained requirements, facilities, braai, Big 5, booking, and more.',
})

const FAQS = [
  {
    q: 'Do I need a fully self-contained rig to camp at Ethlathini?',
    a: 'Yes — for now. Ablution facilities are currently under construction. We can only accommodate overlanders and campers who are fully self-contained with their own toilet and water supply. If you have a rooftop tent, camper van, or caravan with onboard facilities, you are very welcome. We are building ablutions as quickly as we can — follow us on social media for updates.',
  },
  {
    q: 'How far is Ethlathini from Hluhluwe-iMfolozi Memorial Gate?',
    a: 'We are 2km from Memorial Gate on the main road leading directly to the gate. You can be inside Hluhluwe-iMfolozi Park — Africa\'s oldest proclaimed game reserve — within 5 minutes of leaving camp. The park is open from 05:00 to 19:00 (summer) and 06:00 to 18:00 (winter).',
  },
  {
    q: 'Is Ethlathini suitable for large overland rigs and rooftop tents?',
    a: 'Absolutely. Our sites are specifically designed for overlanders. We have cleared, level areas that can accommodate large 4x4 vehicles with rooftop tents, trailer setups, and full overland rigs including extended trailers and awnings. We also have a group site for convoys and 4x4 clubs with space for up to 3 vehicles and 8 people.',
  },
  {
    q: 'What facilities are available at Ethlathini Rest Camp?',
    a: 'Currently open: 4 cleared overland campsites, firepits at each site with free firewood from the forest, clean water points, power points in the main house for charging devices, WiFi in selected areas, and a portable braai. Coming soon: ablutions and showers, more campsites, chalets, a coffee shop and nursery, a restaurant, and a community skills centre. We are honest about what is and is not ready yet.',
  },
  {
    q: 'Can I braai / make a fire at my campsite?',
    a: 'Yes — every site has a designated firepit and we provide free firewood from the forest. We ask that fires are kept within the designated pits only, and that generators and excessive noise stop at 22:00. Quiet hours are 22:00–06:00.',
  },
  {
    q: 'What is there to do near Ethlathini Rest Camp?',
    a: 'The main attraction is Hluhluwe-iMfolozi Park — Africa\'s oldest game reserve (established 1895) and a Big 5 destination just 2km away. The park is world-famous for its white rhino population and wildlife density. Beyond the park: Hluhluwe town (10 minutes) has fuel, shops, restaurants, and ATMs. iSimangaliso Wetland Park (UNESCO World Heritage Site) and St Lucia are about 45 minutes away. The Zululand birding route passes through the area.',
  },
  {
    q: 'How do I book a campsite — is there an online booking system?',
    a: 'Yes — use the Book & Rates page on this website to submit a booking request. We confirm availability and send a deposit invoice within 4 hours (07:00–20:00). You can also WhatsApp us directly at ' + SITE.phoneDisplay + ' for a faster response. We require a 50% deposit to confirm your booking, with the balance payable on arrival.',
  },
  {
    q: 'What does "Ethlathini" mean?',
    a: '"Ethlathini" is an isiZulu word meaning "in the forest". It perfectly describes the property — a mahogany, wild fig, and tree aloe forest on a hillside just off the main road to Hluhluwe-iMfolozi Park. The name was chosen to honour the land and the isiZulu heritage of the Hluhluwe community.',
  },
  {
    q: 'Are pets allowed at Ethlathini?',
    a: 'Yes — well-behaved dogs are welcome on a lead. Please be mindful of other campers and the wildlife in the area. Note that pets are not permitted inside Hluhluwe-iMfolozi Park itself.',
  },
  {
    q: 'Is there power at the campsites?',
    a: 'Currently there are power points available in the main house for charging phones, laptops, and batteries. There is no mains power at the individual campsites yet. We recommend bringing a portable power station or solar setup for extended stays. Power to individual sites is on our development roadmap.',
  },
  {
    q: 'How close are supplies and fuel?',
    a: 'Hluhluwe town is approximately 10 minutes away and has a Shoprite supermarket, Engen and BP fuel stations, an ATM, pharmacy, KFC, Debonairs, and various local restaurants. We strongly recommend filling up with fuel and stocking up on supplies before arriving, especially if you plan to spend multiple days game-viewing.',
  },
  {
    q: 'Can we volunteer at Ethlathini?',
    a: 'Yes — we welcome volunteers who want to be part of building something meaningful in the Hluhluwe community. We have volunteer rooms available in the main house. Tasks range from clearing invasive plants and building infrastructure to gardening and community skills development. Visit our Volunteer page for full details.',
  },
]

export default function FAQPage() {
  return (
    <>
      <StructuredData data={[
        faqSchema(FAQS),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'FAQ',  path: '/faq' },
        ]),
      ]} />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className="wrap">
          <span className="eyebrow">Frequently Asked Questions</span>
          <h1>FAQ — Camping at Ethlathini</h1>
          <p>Everything you need to know before you visit. Can&apos;t find your answer? <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp us directly.</a></p>
        </div>
      </section>

      {/* ── Quick links ── */}
      <div className={styles.quicklinks}>
        <div className="wrap">
          <span className={styles.quicklinksLabel}>Quick answers:</span>
          <div className={styles.quicklinksRow}>
            {['Self-contained?', 'Distance to gate', 'Facilities', 'Braai & fire', 'How to book', 'What is Ethlathini?'].map((label, i) => (
              <a key={i} href={`#faq-${i}`} className={styles.quicklink}>{label}</a>
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
              <div className={styles.sidebarIcon}>🏕️</div>
              <h3>Ready to visit?</h3>
              <p>Book your overland campsite directly — no platform fees.</p>
              <Link href="/book" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem' }}>
                Book a site →
              </Link>
            </div>
            <div className={styles.sidebarCard}>
              <div className={styles.sidebarIcon}>💬</div>
              <h3>Still have questions?</h3>
              <p>WhatsApp us — we&apos;re usually online from 06:30.</p>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem', background: '#25D366' }}>
                WhatsApp us
              </a>
            </div>
            <div className={styles.sidebarCard}>
              <div className={styles.sidebarIcon}>🌿</div>
              <h3>Want to volunteer?</h3>
              <p>Be part of building something meaningful in Hluhluwe.</p>
              <Link href="/volunteer" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem' }}>
                Learn more →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
