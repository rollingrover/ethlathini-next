import Link from 'next/link'
import Image from 'next/image'
import { SITE } from '../lib/seo'
import styles from './Footer.module.css'

const PARTNERS = [
  { href: 'https://www.dizatravels.co.za',           label: 'Diza-Travels' },
  { href: 'https://www.zatours.co.za',                label: 'ZAtours' },
  { href: 'https://www.mzamovillagehomestead.co.za',  label: 'Mzamo Cultural Village & Homestead' },
  { href: 'https://www.opdesk.app',                   label: 'OpDesk' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={'wrap ' + styles.inner}>
        {/* Brand */}
        <div className={styles.brand}>
          <Image
            src="/images/ethlathini-rest-camp-logo.jpg"
            alt="Ethlathini Rest Camp"
            width={100}
            height={120}
            sizes="100px"
            quality={90}
            className={styles.logo}
          />
          <div>
            <div className={styles.name}>Ethlathini Rest Camp</div>
            <div className={styles.loc}>Memorial Gate Road · Hluhluwe · KwaZulu-Natal</div>
          </div>
        </div>

        {/* Nav */}
        <nav className={styles.nav} aria-label="Footer navigation">
          <Link href="/">Home</Link>
          <Link href="/book">Book & rates</Link>
          <Link href="/about">About</Link>
          <Link href="/vision">Our Vision</Link>
          <Link href="/dream">The Dream</Link>
          <Link href="/find-us">Find us</Link>
        </nav>

        {/* Contact */}
        <div className={styles.contact}>
          <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">💬 WhatsApp us</a>
        </div>
      </div>

      {/* Partners */}
      <div className={styles.partners}>
        <div className={'wrap ' + styles.partnersInner}>
          <span className={styles.partnersLabel}>Our Partners</span>
          <div className={styles.partnersList}>
            {PARTNERS.map(p => (
              <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer" className={styles.partner}>
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Base */}
      <div className={styles.base}>
        <div className={'wrap ' + styles.baseInner}>
          <span>© {new Date().getFullYear()} {SITE.name}</span>
          <span>2km from Hluhluwe-iMfolozi Memorial Gate · Africa&apos;s oldest game reserve</span>
          <span>
            Web design by{' '}
            <a href="https://rollingrover.co.za" target="_blank" rel="noopener noreferrer">
              RollingRover Productions
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}