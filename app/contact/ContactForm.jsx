'use client'
// app/contact/ContactForm.jsx
import { useState } from 'react'
import { sendContactEmail } from '../actions/contact'
import styles from './contact.module.css'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('')

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setStatusMessage('')

    // Create FormData from the form
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('subject', form.subject)
    formData.append('message', form.message)

    const result = await sendContactEmail(formData)

    if (result.success) {
      setStatus('success')
      setStatusMessage('Message sent successfully! We\'ll get back to you within 24 hours.')
      setForm({ name: '', email: '', subject: '', message: '' }) // Clear form
    } else {
      setStatus('error')
      setStatusMessage(result.message || 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.formSuccess}>
        <div style={{ fontSize: 36 }}>🌿</div>
        <h3>Message received!</h3>
        <p>We&apos;ll be in touch within 24 hours. For urgent enquiries, WhatsApp us directly.</p>
        <button 
          onClick={() => setStatus('idle')} 
          className="btn-secondary" 
          style={{ marginTop: '0.5rem' }}
        >
          Send another message
        </button>
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
            disabled={status === 'sending'}
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
            disabled={status === 'sending'}
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
          disabled={status === 'sending'}
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
          disabled={status === 'sending'}
        />
      </div>

      {status === 'error' && (
        <div style={{ color: '#d32f2f', fontSize: '14px', marginBottom: '0.75rem', textAlign: 'center' }}>
          {statusMessage}
        </div>
      )}

      <button 
        type="submit" 
        className="btn-primary" 
        style={{ width: '100%', justifyContent: 'center' }}
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Sending...' : 'Send message →'}
      </button>
      <p className={styles.formNote}>
        We reply within 24 hours · For faster response WhatsApp us directly
      </p>
    </form>
  )
}