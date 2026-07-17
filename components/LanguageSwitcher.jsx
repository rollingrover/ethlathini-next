'use client'
// components/LanguageSwitcher.jsx
import { useState, useRef, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter, locales, localeNames, localeCodes } from '../i18n/routing'
import styles from './LanguageSwitcher.module.css'

export default function LanguageSwitcher({ variant = 'light' }) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function switchTo(nextLocale) {
    setOpen(false)
    // next-intl's router preserves the current path, only swapping the locale prefix
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        type="button"
        className={`${styles.trigger} ${variant === 'dark' ? styles.dark : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
      >
        <span className={styles.code}>{localeCodes[locale]}</span>
        <span className={styles.name}>{localeNames[locale]}</span>
        <span className={styles.caret} aria-hidden="true">▾</span>
      </button>

      {open && (
        <ul className={styles.menu} role="listbox">
          {locales.map(l => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                className={`${styles.item} ${l === locale ? styles.active : ''}`}
                onClick={() => switchTo(l)}
              >
                <span className={styles.itemCode}>{localeCodes[l]}</span>
                <span>{localeNames[l]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
