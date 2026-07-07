'use client'
// app/book/BookingWidget.jsx
// ─────────────────────────────────────────────────────────────────
// Interactive booking form + FAQ accordion.
// 'use client' is confined here — the page and RatesTable are static.

import { useState } from 'react'
import Image from 'next/image'
import { SITE } from '../../lib/seo'
import styles from './book.module.css'

const SITE_TYPES = [
  {
    id: 'overland',
    icon: '/images/icons/overland-campsite-booking-icon.png',
    name: 'Overland / Rooftop',
    desc: 'Cleared site for rooftop tents, trailers & overland rigs. Shaded bush clearing.',
    price: 'R___',
    popular: true,
    includes: ['Up to 4 persons', 'Vehicle + trailer', 'Extra space for awning', 'Firepit & free firewood'],
    alt: 'Overland campsite icon',
  },
  {
    id: 'group',
    icon: '/images/icons/community-heart-icon.png',
    name: 'Group Site',
    desc: 'For convoys, 4x4 clubs & group travel. Up to 3 vehicles.',
    price: 'R___',
    popular: false,
    includes: ['Up to 8 persons', '3 vehicles included', 'Communal fire pit', 'Free firewood'],
    alt: 'Group site icon',
  },
]

const INCLUSIONS = [
  { icon: '/images/icons/clean-water-points-icon.png',         label: 'Power points in main house for charging',  alt: 'Power points icon' },
  { icon: '/images/icons/firepit-free-firewood-icon.png',      label: 'Firepit & free firewood from the forest',  alt: 'Firepit and firewood icon' },
  { icon: '/images/icons/wifi-campsite-icon.png',              label: 'WiFi in selected areas',                   alt: 'WiFi campsite icon' },
  { icon: '/images/icons/mahogany-fig-forest-icon.png',        label: 'Dark skies, zero light pollution',         alt: 'Dark sky icon' },
  { icon: '/images/icons/mahogany-fig-forest-icon.png',        label: 'Mahogany, fig & tree aloe forest',         alt: 'Forest canopy icon' },
  { icon: '/images/icons/clean-water-points-icon.png',         label: 'Refuse removal',                           alt: 'Refuse removal icon' },
  { icon: '/images/icons/big5-game-reserve-icon-hluhluwe.png', label: '2km from Memorial Gate',                   alt: 'Location pin icon' },
]

const FAQS = [
  { q: 'How far from the park gate?',    a: '2km from Memorial Gate — you\'re inside Hluhluwe-iMfolozi within 5 minutes of leaving camp.' },
  { q: 'Are pets allowed?',              a: 'Yes — well-behaved dogs on a lead. Note: pets cannot enter the park itself.' },
  { q: 'Do sites have power?',           a: 'Currently only power points in the main house for charging. Bring your own extension lead.' },
  { q: 'Can we book just one night?',    a: 'Absolutely. A 2-night minimum may apply over peak school holidays.' },
  { q: 'Supplies nearby?',              a: 'Hluhluwe town has fuel, Shoprite, pharmacy, KFC, Debonairs, and other takeaway options.' },
  { q: 'How many sites?',               a: 'Currently 4 cleared areas. More sites, chalets, and facilities are under development.' },
]

export default function BookingWidget() {
  const [site, setSite] = useState('overland')
  const [form, setForm] = useState({
    name: '', surname: '', email: '', phone: '',
    arrive: '', depart: '', adults: '2', children: '0',
    vehicle: '', notes: '', newsletter: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const nights = (() => {
    if (!form.arrive || !form.depart) return 0
    const n = Math.round((new Date(form.depart) - new Date(form.arrive)) / 86400000)
    return n > 0 ? n : 0
  })()

  const set = k => e => setForm(f => ({
    ...f,
    [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
  }))

  return (
    <>
      {/* ── Site selector cards (visual, interactive) ── */}
      <section className={styles.rates}>
        <div className="wrap">
          <span className="eyebrow">Select your site type</span>
          <div className={styles.ratesGrid}>
            {SITE_TYPES.map(s => (
              <div
                key={s.id}
                onClick={() => setSite(s.id)}
                className={`${styles.rateCard} ${s.popular ? styles.featured : ''} ${site === s.id ? styles.selected : ''}`}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setSite(s.id)}
                aria-pressed={site === s.id}
              >
                {s.popular && <div className={styles.badge}>Most popular</div>}
                <div className={styles.rateIcon}>
                  <Image src={s.icon} alt={s.alt} width={56} height={56} sizes="56px" className={styles.rateIconImg} />
                </div>
                <div className={styles.rateName}>{s.name}</div>
                <div className={styles.rateDesc}>{s.desc}</div>
                <div className={styles.ratePrice}>{s.price} <span>/ night</span></div>
                <ul className={styles.rateList}>{s.includes.map(i => <li key={i}>✓ {i}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inclusions ── */}
      <div className={styles.inclusions}>
        <div className="wrap">
          <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>All sites include</span>
          <div className={styles.inclGrid}>
            {INCLUSIONS.map(i => (
              <div key={i.label} className={styles.inclItem}>
                <div className={styles.inclIcon}>
                  <Image src={i.icon} alt={i.alt} width={32} height={32} sizes="32px" className={styles.inclIconImg} />
                </div>
                <span>{i.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Important notice ── */}
      <div className={styles.important}>
        <div className="wrap">
          <div className={styles.importantBox}>
            <h4>⚠️ Important — Please Read Before Booking</h4>
            <ul>
              <li><strong>🛑 Only self-contained overlanders</strong> — no ablutions available yet</li>
              <li><strong>🔌 No power at sites</strong> — charging in the main house only</li>
              <li><strong>🚗 4 cleared sites</strong> — more coming as we grow</li>
              <li><strong>🌳 Bring your own water</strong> — clean water points on site, bring extra for peace of mind</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Policies ── */}
      <section className={styles.policies}>
        <div className={`wrap ${styles.policiesGrid}`}>
          {[
            { title: '📅 Booking & payment',  items: ['50% deposit confirms booking', 'Balance due on arrival', 'EFT & cash accepted', 'Minimum stay: 1 night'] },
            { title: '❌ Cancellation',        items: ['7+ days notice: full refund', '3–7 days: 50% refund', 'Under 3 days: no refund', 'No-shows forfeit deposit'] },
            { title: '🕐 Check-in & out',      items: ['Check-in: 12:00–17:00', 'Check-out: by 10:00', 'Gate unlocks at 6:00 and locks at 17:00', 'WhatsApp us for after-hours assistance'] },
            { title: '🛡️ Camp rules',          items: ['Quiet hours: 22:00–06:00', 'Pets welcome, on lead', 'No generator after 21:00', 'Fires in designated pits only'] },
          ].map(p => (
            <div key={p.title} className={styles.policy}>
              <div className={styles.policyTitle}>{p.title}</div>
              {p.items.map(i => <div key={i} className={styles.policyItem}>— {i}</div>)}
            </div>
          ))}
        </div>
      </section>

      {/* ── Booking form ── */}
      <section className={styles.formSection}>
        <div className="wrap">
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h2>Request a booking</h2>
              <p>We confirm availability and send your deposit invoice within 4 hours (07:00–20:00)</p>
            </div>
            {submitted ? (
              <div className={styles.success}>
                <div style={{ fontSize: 40 }}>🌿</div>
                <h3>Booking request received!</h3>
                <p>We&apos;ll be in touch within 4 hours to confirm your site and send the deposit invoice.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
                <div className={styles.formGrid}>
                  <div className={styles.field}><label>First name *</label><input required value={form.name} onChange={set('name')} placeholder="Your first name" /></div>
                  <div className={styles.field}><label>Surname *</label><input required value={form.surname} onChange={set('surname')} placeholder="Your surname" /></div>
                  <div className={styles.field}><label>Email *</label><input required type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" /></div>
                  <div className={styles.field}><label>WhatsApp / phone *</label><input required value={form.phone} onChange={set('phone')} placeholder="0XX XXX XXXX" /></div>
                  <div className={styles.field}><label>Arrival date *</label><input required type="date" value={form.arrive} onChange={set('arrive')} /></div>
                  <div className={styles.field}><label>Departure date *</label><input required type="date" value={form.depart} onChange={set('depart')} /></div>
                  <div className={styles.field}><label>Adults *</label>
                    <select value={form.adults} onChange={set('adults')}>
                      {[1,2,3,4,5,6,7,8].map(n => <option key={n}>{n}</option>)}
                    </select>
                  </div>
                  <div className={styles.field}><label>Children under 12</label>
                    <select value={form.children} onChange={set('children')}>
                      {[0,1,2,3,4].map(n => <option key={n}>{n}</option>)}
                    </select>
                  </div>
                </div>

                <div className={styles.field} style={{ marginBottom: '1rem' }}>
                  <label>Site type *</label>
                  <div className={styles.siteGrid}>
                    {SITE_TYPES.map(s => (
                      <div
                        key={s.id}
                        onClick={() => setSite(s.id)}
                        className={`${styles.siteOpt} ${site === s.id ? styles.siteSelected : ''}`}
                        role="button" tabIndex={0}
                        onKeyDown={e => e.key === 'Enter' && setSite(s.id)}
                      >
                        <div className={styles.siteOptIcon}>
                          <Image src={s.icon} alt={s.alt} width={32} height={32} sizes="32px" className={styles.siteOptIconImg} />
                        </div>
                        <div className={styles.siteOptName}>{s.name}</div>
                        <div className={styles.sitePrice}>{s.price}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.field} style={{ marginBottom: '1rem' }}>
                  <label>Vehicle details</label>
                  <input value={form.vehicle} onChange={set('vehicle')} placeholder="e.g. Toyota Land Cruiser, rooftop tent + fridge trailer" />
                </div>
                <div className={styles.field} style={{ marginBottom: '1rem' }}>
                  <label>Anything else we should know?</label>
                  <textarea rows={3} value={form.notes} onChange={set('notes')} placeholder="Special requests, pets, late arrival..." />
                </div>

                {nights > 0 && (
                  <div className={styles.total}>
                    <div>
                      <div className={styles.totalLabel}>Estimated stay</div>
                      <div className={styles.totalNights}>{nights} night{nights !== 1 ? 's' : ''}</div>
                    </div>
                    <div className={styles.totalAmount}>
                      <div className={styles.totalLabel}>Deposit on confirmation</div>
                      <div className={styles.totalDeposit}>50% of total</div>
                    </div>
                  </div>
                )}

                <label className={styles.check}>
                  <input type="checkbox" checked={form.newsletter} onChange={set('newsletter')} />
                  Notify me when chalets, coffee shop &amp; restaurant open
                </label>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', fontSize: '15px', marginTop: '0.5rem' }}>
                  Send booking request →
                </button>
                <p className={styles.formNote}>We reply within 4 hours (07:00–20:00). By submitting you agree to our cancellation policy.</p>
              </form>
            )}
          </div>

          <div className={styles.wa}>
            <span>Prefer to chat? <strong>WhatsApp us directly</strong> — usually online from 06:30</span>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.waBtn}>💬 WhatsApp us</a>
          </div>
        </div>
      </section>

      {/* ── FAQ accordion ── */}
      <section className={styles.faq}>
        <div className="wrap">
          <span className="eyebrow">Common questions</span>
          <h2 className={styles.faqH2}>FAQs</h2>
          {FAQS.map((f, i) => (
            <div key={i} className={styles.faqItem} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className={styles.faqQ}><span>{f.q}</span><span>{openFaq === i ? '−' : '+'}</span></div>
              {openFaq === i && <div className={styles.faqA}>{f.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
