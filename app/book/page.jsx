// app/book/page.jsx
'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { SITE } from '../../lib/seo'
import styles from './book.module.css'

const SITE_TYPES = [
  {
    id: 'overland', 
    icon: "/images/icons/overland-campsites-icon.png",
    name: 'Overland / Rooftop',
    desc: 'Cleared site for rooftop tents, trailers & overland rigs. Shaded bush clearing.',
    price: 'R200', 
    popular: true,
    includes: ['Up to 4 persons', 'Vehicle + trailer', 'Extra space for awning', 'Firepit & free firewood'],
    alt: 'Overland campsite icon'
  },
  {
    id: 'group', 
    icon: "/images/icons/community-at-heart-ico.png",
    name: 'Group Site',
    desc: 'For convoys, 4x4 clubs & group travel. Up to 3 vehicles.',
    price: 'R450', 
    popular: false,
    includes: ['Up to 8 persons', '3 vehicles included', 'Communal fire pit', 'Free firewood'],
    alt: 'Group site icon'
  },
]

const INCLUSIONS = [
  { icon:"/images/icons/clean-water-icon.png", label:'Power points in main house for charging', alt: 'Power points' },
  { icon:"/images/icons/firepits-icon.png", label:'Firepit & free firewood from the forest', alt: 'Firepit' },
  { icon:"/images/icons/wifi-icon.png", label:'WiFi in selected areas', alt: 'WiFi' },
  { icon:"/images/icons/forrest-icon.png", label:'Dark skies, zero light pollution', alt: 'Dark skies' },
  { icon:"/images/icons/forrest-icon.png", label:'Mahogany, fig & tree aloe forest', alt: 'Forest' },
  { icon:"/images/icons/clean-water-icon.png", label:'Refuse removal', alt: 'Refuse removal' },
  { icon:"/images/icons/big5-at-doorstep.png", label:'2km from Memorial Gate', alt: 'Location' },
]

const FAQS = [
  { q:'How far from the park gate?', a:'2km from Memorial Gate — you&apos;re inside Hluhluwe-iMfolozi within 5 minutes of leaving camp.' },
  { q:'Are pets allowed?', a:'Yes — well-behaved dogs on a lead. Note: pets cannot enter the park itself.' },
  { q:'Do sites have power?', a:'Currently only power points in the main house for charging. Bring your own extension lead.' },
  { q:'Can we book just one night?', a:'Absolutely. A 2-night minimum may apply over peak school holidays.' },
  { q:'Supplies nearby?', a:'Hluhluwe town has fuel, Shoprite, pharmacy, KFC, Debonairs, and other takeaway options.' },
  { q:'How many sites?', a:'Currently 4 cleared areas. More sites, chalets, and facilities are under development.' },
]

export default function BookPage() {
  const [mounted, setMounted] = useState(false)
  const [site, setSite] = useState('overland')
  const [form, setForm] = useState({ 
    name:'', surname:'', email:'', phone:'', 
    arrive:'', depart:'', adults:'2', children:'0', 
    vehicle:'', notes:'', newsletter:false 
  })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const nights = (() => {
    if (!form.arrive || !form.depart) return 0
    const n = Math.round((new Date(form.depart) - new Date(form.arrive)) / 86400000)
    return n > 0 ? n : 0
  })()

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const calculateTotal = () => {
    if (nights === 0) return 0
    const sitePrice = site === 'overland' ? 200 : 450
    const adults = parseInt(form.adults) || 0
    const children = parseInt(form.children) || 0
    const extraAdults = adults > 2 ? adults - 2 : 0
    const extraChildren = children > 0 ? children : 0
    const total = (sitePrice * nights) + (extraAdults * 50 * nights) + (extraChildren * 20 * nights)
    return total
  }

  // Don't render on server during hydration
  if (!mounted) {
    return null
  }

  return (
    <>
      <section className={styles.hero}>
        <div className="wrap">
          <span className="eyebrow">Overland Campsites · Self-Contained Only</span>
          <h1>Book your site in the forest</h1>
          <p>4 cleared sites under mahogany, fig & tree aloe canopy, 2km from Memorial Gate. Firepits. Pure bush quiet.</p>
        </div>
      </section>

      <div className={styles.notice}>
        <div className="wrap">
          🏕️ <strong>4 overland sites open now</strong> — ablutions under development, self-contained campers only. Chalets, coffee shop & restaurant coming soon.
        </div>
      </div>

      {/* Rates */}
      <section className={styles.rates}>
        <div className="wrap">
          <span className="eyebrow">Campsite rates per night</span>
          <div className={styles.ratesGrid}>
            {SITE_TYPES.map(s => (
              <div key={s.id} onClick={() => setSite(s.id)}
                className={`${styles.rateCard} ${s.popular ? styles.featured : ''} ${site === s.id ? styles.selected : ''}`}>
                {s.popular && <div className={styles.badge}>Most popular</div>}
                <div className={styles.rateIcon}>
                  <Image
                    src={s.icon}
                    alt={s.alt}
                    width={56}
                    height={56}
                    className={styles.rateIconImg}
                  />
                </div>
                <div className={styles.rateName}>{s.name}</div>
                <div className={styles.rateDesc}>{s.desc}</div>
                <div className={styles.ratePrice}>{s.price} <span>/ night</span></div>
                <ul className={styles.rateList}>{s.includes.map(i => <li key={i}>✓ {i}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className={styles.extras}>
            <span className="eyebrow" style={{display:'block',marginBottom:'0.75rem'}}>Additional charges</span>
            <div className={styles.extrasGrid}>
              {[
                ['R50', 'Extra adult'],
                ['R20', 'Child under 12'],
                ['R50', 'Extra vehicle'],
                ['Free', 'Child under 5']
              ].map(([p,l]) => (
                <div key={l} className={styles.extra}>
                  <div className={styles.extraPrice}>{p}</div>
                  <div className={styles.extraLabel}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inclusions */}
      <div className={styles.inclusions}>
        <div className="wrap">
          <span className="eyebrow" style={{display:'block',marginBottom:'1rem'}}>All sites include</span>
          <div className={styles.inclGrid}>
            {INCLUSIONS.map(i => (
              <div key={i.label} className={styles.inclItem}>
                <div className={styles.inclIcon}>
                  <Image
                    src={i.icon}
                    alt={i.alt}
                    width={32}
                    height={32}
                    className={styles.inclIconImg}
                  />
                </div>
                <span>{i.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Important notice */}
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

      {/* Policies */}
      <section className={styles.policies}>
        <div className={`wrap ${styles.policiesGrid}`}>
          {[
            { 
              title:'📅 Booking & payment', 
              items:['50% deposit confirms booking','Balance due on arrival','EFT & cash accepted','Minimum stay: 1 night'] 
            },
            { 
              title:'❌ Cancellation', 
              items:['7+ days notice: full refund','3–7 days: 50% refund','Under 3 days: no refund','No-shows forfeit deposit'] 
            },
            { 
              title:'🕐 Check-in & out', 
              items:[
                'Check-in: 12:00–17:00',
                'Check-out: by 10:00',
                'Gate unlocks at 6:00 and locks at 17:00',
                'WhatsApp us for after-hours assistance'
              ] 
            },
            { 
              title:'🛡️ Camp rules', 
              items:['Quiet hours: 22:00–06:00','Pets welcome, on lead','No generator after 21:00','Fires in designated pits only'] 
            },
          ].map(p => (
            <div key={p.title} className={styles.policy}>
              <div className={styles.policyTitle}>{p.title}</div>
              {p.items.map(i => <div key={i} className={styles.policyItem}>— {i}</div>)}
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className={styles.formSection}>
        <div className="wrap">
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h2>Request a booking</h2>
              <p>We confirm availability and send your deposit invoice within 4 hours (07:00–20:00)</p>
            </div>
            {submitted ? (
              <div className={styles.success}>
                <div style={{fontSize:40}}>🌿</div>
                <h3>Booking request received!</h3>
                <p>We&apos;ll be in touch within 4 hours to confirm your site and send the deposit invoice.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
                <div className={styles.formGrid}>
                  <div className={styles.field}><label>First name *</label><input required value={form.name} onChange={set('name')} placeholder="Your first name"/></div>
                  <div className={styles.field}><label>Surname *</label><input required value={form.surname} onChange={set('surname')} placeholder="Your surname"/></div>
                  <div className={styles.field}><label>Email *</label><input required type="email" value={form.email} onChange={set('email')} placeholder="you@email.com"/></div>
                  <div className={styles.field}><label>WhatsApp / phone *</label><input required value={form.phone} onChange={set('phone')} placeholder="0XX XXX XXXX"/></div>
                  <div className={styles.field}><label>Arrival date *</label><input required type="date" value={form.arrive} onChange={set('arrive')}/></div>
                  <div className={styles.field}><label>Departure date *</label><input required type="date" value={form.depart} onChange={set('depart')}/></div>
                  <div className={styles.field}><label>Adults *</label><select value={form.adults} onChange={set('adults')}>{[1,2,3,4,5,6,7,8].map(n=><option key={n}>{n}</option>)}</select></div>
                  <div className={styles.field}><label>Children under 12</label><select value={form.children} onChange={set('children')}>{[0,1,2,3,4].map(n=><option key={n}>{n}</option>)}</select></div>
                </div>
                <div className={styles.field} style={{marginBottom:'1rem'}}>
                  <label>Site type *</label>
                  <div className={styles.siteGrid}>
                    {SITE_TYPES.map(s => (
                      <div key={s.id} onClick={() => setSite(s.id)} className={`${styles.siteOpt} ${site === s.id ? styles.siteSelected : ''}`}>
                        <div className={styles.siteOptIcon}>
                          <Image
                            src={s.icon}
                            alt={s.alt}
                            width={32}
                            height={32}
                            className={styles.siteOptIconImg}
                          />
                        </div>
                        <div className={styles.siteOptName}>{s.name}</div>
                        <div className={styles.sitePrice}>{s.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.field} style={{marginBottom:'1rem'}}>
                  <label>Vehicle details</label>
                  <input value={form.vehicle} onChange={set('vehicle')} placeholder="e.g. Toyota Land Cruiser, rooftop tent + fridge trailer"/>
                </div>
                <div className={styles.field} style={{marginBottom:'1rem'}}>
                  <label>Anything else we should know?</label>
                  <textarea rows={3} value={form.notes} onChange={set('notes')} placeholder="Special requests, pets, late arrival..."/>
                </div>
                {nights > 0 && (
                  <div className={styles.total}>
                    <div>
                      <div className={styles.totalLabel}>Estimated stay</div>
                      <div className={styles.totalNights}>{nights} night{nights !== 1 ? 's' : ''}</div>
                      <div className={styles.totalBreakdown}>
                        {site === 'overland' ? 'R200' : 'R450'} × {nights} night{nights !== 1 ? 's' : ''}
                        {(() => {
                          const adults = parseInt(form.adults) || 0
                          const children = parseInt(form.children) || 0
                          const extraAdults = adults > 2 ? adults - 2 : 0
                          const extraChildren = children > 0 ? children : 0
                          let extras = []
                          if (extraAdults > 0) extras.push(`${extraAdults} × R50`)
                          if (extraChildren > 0) extras.push(`${extraChildren} × R20`)
                          return extras.length > 0 ? ` + ${extras.join(' + ')}` : ''
                        })()}
                      </div>
                    </div>
                    <div className={styles.totalAmount}>
                      <div className={styles.totalLabel}>Estimated total</div>
                      <div className={styles.totalPrice}>R{calculateTotal()}</div>
                      <div className={styles.totalDeposit}>50% deposit: R{Math.round(calculateTotal() * 0.5)}</div>
                    </div>
                  </div>
                )}
                <label className={styles.check}>
                  <input type="checkbox" checked={form.newsletter} onChange={set('newsletter')}/>
                  Notify me when chalets, coffee shop & restaurant open
                </label>
                <button type="submit" className="btn-primary" style={{width:'100%',justifyContent:'center',padding:'0.9rem',fontSize:'15px',marginTop:'0.5rem'}}>
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

      {/* FAQ */}
      <section className={styles.faq}>
        <div className="wrap">
          <span className="eyebrow">Common questions</span>
          <h2 className={styles.faqH2}>FAQs</h2>
          {FAQS.map((f,i) => (
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