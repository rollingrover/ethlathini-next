'use client'
// app/[locale]/contact/ContactForm.jsx
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { sendContactEmail } from '../../actions/contact'
import styles from './contact.module.css'

export default function ContactForm() {
  const t = useTranslations('contact')
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
      setStatusMessage(t('form_success_message'))
      setForm({ name: '', email: '', subject: '', message: '' }) // Clear form
    } else {
      setStatus('error')
      setStatusMessage(result.message || t('form_error_default'))
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.formSuccess}>
        <div style={{ fontSize: 36 }}>🌿</div>
        <h3>{t('form_success_h3')}</h3>
        <p>{t('form_success_p')}</p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-secondary"
          style={{ marginTop: '0.5rem' }}
        >
          {t('form_sendAnother')}
        </button>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label htmlFor="contact-name">{t('field_name')}</label>
          <input
            id="contact-name"
            required
            value={form.name}
            onChange={set('name')}
            placeholder={t('field_name_placeholder')}
            disabled={status === 'sending'}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-email">{t('field_email')}</label>
          <input
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={set('email')}
            placeholder={t('field_email_placeholder')}
            disabled={status === 'sending'}
          />
        </div>
      </div>
      <div className={styles.field} style={{ marginBottom: '1rem' }}>
        <label htmlFor="contact-subject">{t('field_subject')}</label>
        <input
          id="contact-subject"
          value={form.subject}
          onChange={set('subject')}
          placeholder={t('field_subject_placeholder')}
          disabled={status === 'sending'}
        />
      </div>
      <div className={styles.field} style={{ marginBottom: '1rem' }}>
        <label htmlFor="contact-message">{t('field_message')}</label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={form.message}
          onChange={set('message')}
          placeholder={t('field_message_placeholder')}
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
        {status === 'sending' ? t('submit_sending') : t('submit_default')}
      </button>
      <p className={styles.formNote}>
        {t('form_footnote')}
      </p>
    </form>
  )
}
