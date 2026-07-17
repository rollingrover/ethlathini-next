'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '../i18n/routing'
import LanguageSwitcher from './LanguageSwitcher'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const t = useTranslations('nav')

  const NAV = [
    { href: '/',          label: t('home') },
    { href: '/book',      label: t('book') },
    { href: '/about',     label: t('about') },
    { href: '/vision',    label: t('vision') },
    { href: '/dream',     label: t('dream') },
    { href: '/volunteer', label: t('volunteer') },
    { href: '/faq',       label: t('faq') },
    { href: '/find-us',   label: t('findUs') },
    { href: '/contact',   label: t('contact') },
  ]

  return (
    <header className={styles.navbar}>
      <div className={`wrap ${styles.inner}`}>
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          {/* Icon only on mobile */}
          <Image
            src="/images/logos/ethlathini-logo-icon-transparent.png"
            alt="Ethlathini"
            width={40}
            height={40}
            sizes="40px"
            quality={90}
            className={styles.logoIcon}
            priority
          />
          {/* Horizontal lockup on desktop */}
          <Image
            src="/images/ethlathini-rest-camp-logo.jpg"
            alt="Ethlathini Rest Camp"
            width={220}
            height={44}
            sizes="220px"
            quality={90}
            className={styles.logoWide}
            priority
          />
        </Link>

        <nav className={`${styles.links} ${open ? styles.open : ''}`} aria-label="Main navigation">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.link} ${pathname === href ? styles.active : ''}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link href="/book" className={styles.cta} onClick={() => setOpen(false)}>
            {t('bookNow')}
          </Link>
          <div className={styles.langSwitcherMobile}>
            <LanguageSwitcher variant="dark" />
          </div>
        </nav>

        <div className={styles.langSwitcherDesktop}>
          <LanguageSwitcher variant="dark" />
        </div>

        <button
          className={styles.burger}
          onClick={() => setOpen(!open)}
          aria-label={open ? t('closeMenu') : t('openMenu')}
          aria-expanded={open}
        >
          <span className={open ? styles.burgerOpen : ''} />
          <span className={open ? styles.burgerOpen : ''} />
          <span className={open ? styles.burgerOpen : ''} />
        </button>
      </div>
    </header>
  )
}
