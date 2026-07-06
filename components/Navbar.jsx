'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'

const NAV = [
  { href: '/',         label: 'Home' },
  { href: '/book',     label: 'Book & rates' },
  { href: '/about',    label: 'About' },
  { href: '/vision',   label: 'Our Vision' },
  { href: '/dream',    label: 'The Dream' },
  { href: '/find-us',  label: 'Find us' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

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
            Book now
          </Link>
        </nav>

        <button
          className={styles.burger}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
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
