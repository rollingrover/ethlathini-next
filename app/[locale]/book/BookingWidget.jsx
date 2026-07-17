'use client'
// app/[locale]/book/BookingWidget.jsx
// ─────────────────────────────────────────────────────────────────
// Interactive booking form + FAQ accordion.
// 'use client' is confined here — the page and RatesTable are static.

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { SITE } from '../../../lib/seo'
import { sendBookingEmail } from '../../actions/booking'
import styles from './book.module.css'

export default function BookingWidget() {
  const t = useTranslations('book')
  const tc = useTranslations('common')
  const SITE_TYPES = t.raw('site_types')
  const INCLUSIONS = t.raw('inclusions')
  const IMPORTANT_ITEMS = t.raw('important_items')
  const POLICIES = t.raw('policies')
  const FAQS = t.raw('faqs')

  const [site, setSite] = useState(SITE_TYPES[0]?.id ?? 'overland')
  const [form, setForm] = useState({
    name: '', surname: '', email: '', phone: '',
    arrive: '', depart: '', adults: '2', children: '0',
    vehicle: '', notes: '', newsletter: false,
  })
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('')
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setStatusMessage('')

    const selectedSite = SITE_TYPES.find(s => s.id === site)

    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('surname', form.surname)
    formData.append('email', form.email)
    formData.append('phone', form.phone)
    formData.append('arrive', form.arrive)
    formData.append('depart', form.depart)
    formData.append('adults', form.adults)
    formData.append('children', form.children)
    formData.append('vehicle', form.vehicle)
    formData.append('notes', form.notes)
    formData.append('siteType', selectedSite?.name ?? site)

    const result = await sendBookingEmail(formData)

    if (result.success) {
      setStatus('success')
      setStatusMessage(t('success_message'))
    } else {
      setStatus('error')
      setStatusMessage(result.message || t('error_default'))
    }
  }

  // If successfully submitted, show success message
  if (status === 'success') {
    return (
      <>
        <section className={styles.formSection}>
          <div className="wrap">
            <div className={styles.formCard}>
              <div className={styles.success}>
                <div style={{ fontSize: 40 }}>🌿</div>
                <h3>{t('success_h3')}</h3>
                <p>{t('success_p')}</p>
                <button
                  onClick={() => {
                    setStatus('idle')
                    setForm({
                      name: '', surname: '', email: '', phone: '',
                      arrive: '', depart: '', adults: '2', children: '0',
                      vehicle: '', notes: '', newsletter: false,
                    })
                  }}
                  className="btn-secondary"
                  style={{ marginTop: '0.5rem' }}
                >
                  {t('sendAnother')}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ still shows below */}
        <section className={styles.faq}>
          <div className="wrap">
            <span className="eyebrow">{t('faq_eyebrow')}</span>
            <h2 className={styles.faqH2}>{t('faq_h2')}</h2>
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

  return (
    <>
      {/* ── Site selector cards (visual, interactive) ── */}
      <section className={styles.rates}>
        <div className="wrap">
          <span className="eyebrow">{t('select_site_eyebrow')}</span>
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
                {s.popular && <div className={styles.badge}>{t('mostPopular')}</div>}
                <div className={styles.rateIcon}>
                  <Image src={s.icon} alt={s.alt} width={56} height={56} sizes="56px" className={styles.rateIconImg} />
                </div>
                <div className={styles.rateName}>{s.name}</div>
                <div className={styles.rateDesc}>{s.desc}</div>
                <div className={styles.ratePrice}>{s.price} <span>{t('perNight')}</span></div>
                <ul className={styles.rateList}>{s.includes.map(i => <li key={i}>✓ {i}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inclusions ── */}
      <div className={styles.inclusions}>
        <div className="wrap">
          <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>{t('inclusions_eyebrow')}</span>
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
            <h4>{t('important_title')}</h4>
            <ul>
              {IMPORTANT_ITEMS.map((item, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Policies ── */}
      <section className={styles.policies}>
        <div className={`wrap ${styles.policiesGrid}`}>
          {POLICIES.map(p => (
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
              <h2>{t('form_h2')}</h2>
              <p>{t('form_sub')}</p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.field}><label>{t('field_firstName')}</label><input required value={form.name} onChange={set('name')} placeholder={t('field_firstName_placeholder')} disabled={status === 'sending'} /></div>
                <div className={styles.field}><label>{t('field_surname')}</label><input required value={form.surname} onChange={set('surname')} placeholder={t('field_surname_placeholder')} disabled={status === 'sending'} /></div>
                <div className={styles.field}><label>{t('field_email')}</label><input required type="email" value={form.email} onChange={set('email')} placeholder={t('field_email_placeholder')} disabled={status === 'sending'} /></div>
                <div className={styles.field}><label>{t('field_phone')}</label><input required value={form.phone} onChange={set('phone')} placeholder={t('field_phone_placeholder')} disabled={status === 'sending'} /></div>
                <div className={styles.field}><label>{t('field_arrive')}</label><input required type="date" value={form.arrive} onChange={set('arrive')} disabled={status === 'sending'} /></div>
                <div className={styles.field}><label>{t('field_depart')}</label><input required type="date" value={form.depart} onChange={set('depart')} disabled={status === 'sending'} /></div>
                <div className={styles.field}><label>{t('field_adults')}</label>
                  <select value={form.adults} onChange={set('adults')} disabled={status === 'sending'}>
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
                <div className={styles.field}><label>{t('field_children')}</label>
                  <select value={form.children} onChange={set('children')} disabled={status === 'sending'}>
                    {[0,1,2,3,4].map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
              </div>

              <div className={styles.field} style={{ marginBottom: '1rem' }}>
                <label>{t('field_siteType')}</label>
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
                <label>{t('field_vehicle')}</label>
                <input value={form.vehicle} onChange={set('vehicle')} placeholder={t('field_vehicle_placeholder')} disabled={status === 'sending'} />
              </div>
              <div className={styles.field} style={{ marginBottom: '1rem' }}>
                <label>{t('field_notes')}</label>
                <textarea rows={3} value={form.notes} onChange={set('notes')} placeholder={t('field_notes_placeholder')} disabled={status === 'sending'} />
              </div>

              {nights > 0 && (
                <div className={styles.total}>
                  <div>
                    <div className={styles.totalLabel}>{t('estimatedStay')}</div>
                    <div className={styles.totalNights}>{nights} {nights !== 1 ? t('night_other') : t('night_one')}</div>
                  </div>
                  <div className={styles.totalAmount}>
                    <div className={styles.totalLabel}>{t('depositLabel')}</div>
                    <div className={styles.totalDeposit}>{t('depositValue')}</div>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div style={{ color: '#d32f2f', fontSize: '14px', marginBottom: '0.75rem', textAlign: 'center' }}>
                  {statusMessage}
                </div>
              )}

              <label className={styles.check}>
                <input type="checkbox" checked={form.newsletter} onChange={set('newsletter')} disabled={status === 'sending'} />
                {t('newsletter_label')}
              </label>
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', fontSize: '15px', marginTop: '0.5rem' }} disabled={status === 'sending'}>
                {status === 'sending' ? t('submit_sending') : t('submit_default')}
              </button>
              <p className={styles.formNote}>{t('form_footnote')}</p>
            </form>
          </div>

          <div className={styles.wa}>
            <span>{t('wa_prompt_pre')}<strong>{t('wa_prompt_strong')}</strong>{t('wa_prompt_post')}</span>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.waBtn}>{tc('whatsappUs')}</a>
          </div>
        </div>
      </section>

      {/* ── FAQ accordion ── */}
      <section className={styles.faq}>
        <div className="wrap">
          <span className="eyebrow">{t('faq_eyebrow')}</span>
          <h2 className={styles.faqH2}>{t('faq_h2')}</h2>
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
