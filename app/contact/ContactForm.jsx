'use client'
// app/contact/ContactForm.jsx
import { useState } from 'react'
import styles from './contact.module.css'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  // TODO: connect to email service (Formspree, EmailJS, or Resend)
  // Example with Formspree:
  //   const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  //     method: 'POST', headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(form),
  //   })
  //   if (res.ok) setSubmitted(true)
  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={styles.formSuccess}>
        <div style={{ fontSize: 36 }}>🌿</div>
        <h3>Message received!</h3>
        <p>We&apos;ll be in touch within 24 hours. For urgent enquiries, WhatsApp us directly.</p>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label htmlFor="contact-name">Your name *</label>
          <input
            id="contact-name"
            required
            value={form.name}
            onChange={set('name')}
            placeholder="Your name"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-email">Email address *</label>
          <input
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={set('email')}
            placeholder="you@email.com"
          />
        </div>
      </div>
      <div className={styles.field} style={{ marginBottom: '1rem' }}>
        <label htmlFor="contact-subject">Subject</label>
        <input
          id="contact-subject"
          value={form.subject}
          onChange={set('subject')}
          placeholder="e.g. Booking enquiry, volunteer, general question"
        />
      </div>
      <div className={styles.field} style={{ marginBottom: '1rem' }}>
        <label htmlFor="contact-message">Message *</label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={form.message}
          onChange={set('message')}
          placeholder="Tell us what you need..."
        />
      </div>
      <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
        Send message →
      </button>
      <p className={styles.formNote}>
        We reply within 24 hours · For faster response WhatsApp us directly
      </p>
    </form>
  )
}
