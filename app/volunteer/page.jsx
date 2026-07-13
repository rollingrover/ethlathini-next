// app/volunteer/page.jsx
import Link from 'next/link'
import Image from 'next/image'
import { pageMeta, breadcrumbSchema, SITE } from '../../lib/seo'
import { StructuredData } from '../../components/StructuredData'
import styles from './volunteer.module.css'

export const metadata = pageMeta({
  path: '/volunteer',
  title: 'Volunteer — Be Part of the Build, Hluhluwe KZN',
  description: 'Volunteer at Ethlathini Rest Camp in Hluhluwe, KwaZulu-Natal. Eco camp volunteer program, workaway South Africa, skills development, community garden, Big 5 game reserve.',
})

function volunteerSchema() {
  return {
    '@context':  'https://schema.org',
    '@type':     'VolunteerAction',
    name:        `Volunteer at ${SITE.name}`,
    description: 'Volunteer at an eco-social camp in Hluhluwe, KwaZulu-Natal — clearing invasive plants, building infrastructure, community garden, skills development.',
    agent: {
      '@type': 'Organization',
      name:    SITE.name,
      url:     SITE.domain,
    },
    location: {
      '@type':           'Place',
      name:              SITE.name,
      address: {
        '@type':          'PostalAddress',
        streetAddress:    SITE.address.street,
        addressLocality:  SITE.address.city,
        addressRegion:    SITE.address.province,
        addressCountry:   'ZA',
      },
      geo: {
        '@type':    'GeoCoordinates',
        latitude:   SITE.address.lat,
        longitude:  SITE.address.lng,
      },
    },
    participant: {
      '@type':      'Person',
      description:  'Volunteers from South Africa and internationally — eco-tourism, conservation, community development, or simply wanting to help build something real.',
    },
  }
}

const TASKS = [
  { 
    icon: "/images/icons/volunteer/clearing-invasive-species-icon.png",
    title: 'Clearing invasive plants',     
    desc: 'Chromolaena, lantana, and prickly pear are being cleared metre by metre to restore indigenous forest. Physical, rewarding, and directly visible progress.',
    alt: 'Clearing invasive species icon'
  },
  { 
    icon: "/images/icons/volunteer/building-infrastructure-icon.png",
    title: 'Building infrastructure',      
    desc: 'Ablutions, site improvements, fencing, signage, and general property maintenance. Basic tools provided — building experience a bonus but not required.',
    alt: 'Building infrastructure icon'
  },
  { 
    icon: "/images/icons/volunteer/community-garden-icon.png",
    title: 'Community food garden',         
    desc: 'Planting, watering, weeding, and maintaining the food garden that feeds the community development programme.',
    alt: 'Community garden icon'
  },
  { 
    icon: "/images/icons/volunteer/fishfarm-development-icon.png",
    title: 'Fish farm development',         
    desc: 'Help set up aquaculture infrastructure as part of the community skills programme.',
    alt: 'Fish farm development icon'
  },
  { 
    icon: "/images/icons/volunteer/skills-development-support-icon.png",
    title: 'Skills development support',    
    desc: 'If you have skills in hospitality, IT, agriculture, trades, or teaching — there is meaningful work here training the next generation.',
    alt: 'Skills development support icon'
  },
  { 
    icon: "/images/icons/volunteer/forest-restoration-icon.png",
    title: 'Forest restoration',            
    desc: 'Propagating indigenous trees and plants in the nursery, replanting cleared areas, and general forest care.',
    alt: 'Forest restoration icon'
  },
  { 
    icon: "/images/icons/volunteer/wildilfe-monitoring-rehabilitation-icon.png",
    title: 'Wildlife monitoring & rehabilitation',            
    desc: 'Assist with wildlife tracking, data collection, and rehabilitation efforts in and around Hluhluwe-iMfolozi Park. Learn about conservation first-hand.',
    alt: 'Wildlife monitoring and rehabilitation icon'
  },
  { 
    icon: "/images/icons/volunteer/community-educational-programmes-icon.png",
    title: 'Community schools & educational activities',            
    desc: 'Support local pre-schools and community schools with teaching, reading programmes, arts and crafts, and educational activities that make a real difference.',
    alt: 'Community educational programmes icon'
  },
]

const PACKAGE_INCLUDES = [
  { icon: "/images/icons/volunteer/volunteer-rooms-in-main-house-icon.png", label: 'Accommodation in the main house (shared bathroom)', alt: 'Volunteer rooms icon' },
  { icon: "/images/icons/volunteer/meals-included-icon.png", label: 'Meals included (we cook together)', alt: 'Meals included icon' },
  { icon: "/images/icons/volunteer/transport-to-and-from-activities-icon.png", label: 'Transport to and from local activities', alt: 'Transport icon' },
  { icon: "/images/icons/volunteer/hluhluwe-imfolozi-park-icon.png", label: 'Access to Hluhluwe-iMfolozi Park (2km away) on your days off', alt: 'Hluhluwe-iMfolozi Park icon' },
  { icon: "/images/icons/volunteer/forest-icon.png", label: 'Live and work in a mahogany and fig forest', alt: 'Forest icon' },
  { icon: "/images/icons/volunteer/real-community-connection-icon.png", label: 'Real community connection — not tourist-facing', alt: 'Community connection icon' },
  { icon: "/images/icons/volunteer/reference-letter-icon.png", label: 'Reference letter on completion of a meaningful stay', alt: 'Reference letter icon' },
  { icon: "/images/icons/volunteer/coffee-shop-access-when-open-icon.png", label: 'Coffee shop access when it opens', alt: 'Coffee shop icon' },
]

const STAY_DETAILS = [
  { icon: "/images/icons/volunteer/min-stay-1-week-icon.png", label: 'Minimum stay', value: '1 week' },
  { icon: "/images/icons/volunteer/work-hours-icon.png", label: 'Work hours', value: '4 hrs/day, weekdays' },
  { icon: "/images/icons/volunteer/who-icon.png", label: 'Who', value: '18+ · all nationalities' },
  { icon: "/images/icons/volunteer/language-icon.png", label: 'Language', value: 'English required' },
  { icon: "/images/icons/volunteer/custom-packages-icon.png", label: 'Packages', value: 'Customised — enquire for details' },
]

const CUSTOM_ACTIVITIES = [
  'Guided walks in the forest',
  'Birdwatching excursions',
  'Visits to local community projects',
  'Game viewing in Hluhluwe-iMfolozi Park',
  'Cultural experiences with the Bhejane community',
  'Day trips to nearby attractions',
]

export default function VolunteerPage() {
  return (
    <>
      <StructuredData data={[
        volunteerSchema(),
        breadcrumbSchema([
          { name: 'Home',      path: '/' },
          { name: 'Volunteer', path: '/volunteer' },
        ]),
      ]} />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <Image
          src="/images/photos/hero-volunteer-schools-project.jpg"
          alt="Volunteers working with community schools project in Hluhluwe"
          fill
          className={styles.heroBg}
          priority
          sizes="100vw"
        />
        <div className={styles.heroOverlay} />
        <div className={`wrap ${styles.heroContent}`}>
          <span className="eyebrow">Voluntourism · Workaway South Africa · Eco Camp</span>
          <h1>Be part of<br /><em>building something real</em></h1>
          <p>
            Help us clear, build, plant, and grow an eco-social destination in the heart of
            KwaZulu-Natal — 2km from Africa&apos;s oldest game reserve.
            No experience required. Just willingness.
          </p>
          <div className={styles.heroBtns}>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
              💬 WhatsApp us to enquire
            </a>
            <a href={`mailto:${SITE.email}`} className="btn-ghost">
              ✉️ Email us
            </a>
          </div>
        </div>
      </section>

      {/* ── The honest ask ── */}
      <div className={styles.honestBanner}>
        <div className="wrap">
          <strong>Honest about what this is:</strong> We&apos;re not a polished volunteer resort.
          We&apos;re a property being built from scratch by a small team with limited resources and
          a big vision. If you want comfortable tourism with light volunteering — this is not it.
          If you want to do real work that matters, in a forest, next to a game reserve,
          with a community that will welcome you — come.
        </div>
      </div>

      {/* ── What you'll do ── */}
      <section className={styles.tasks}>
        <div className="wrap">
          <span className="eyebrow">What volunteers do</span>
          <h2 className={styles.h2}>Real work. Real impact.</h2>
          <div className={styles.tasksGrid}>
            {TASKS.map(t => (
              <div key={t.title} className={styles.taskCard}>
                <div className={styles.taskIcon}>
                  <Image
                    src={t.icon}
                    alt={t.alt}
                    width={48}
                    height={48}
                    className={styles.taskIconImg}
                  />
                </div>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What you get ── */}
      <section className={styles.benefits}>
        <div className={`wrap ${styles.benefitsInner}`}>
          <div>
            <span className="eyebrow">What volunteers receive</span>
            <h2 className={styles.h2}>Your stay, fully arranged.</h2>
            <p className={styles.benefitsSub}>
              We offer <strong>paid volunteer packages</strong> that include accommodation, meals, 
              transport, and activities — fully customised to your interests and availability. 
              This is a true partnership — your contribution directly strengthens Ethlathini, uplifts the Bhejane community, and supports conservation across the greater Big Five Hlabisa region, all while immersing you in the real KwaZulu-Natal.
            </p>
            <ul className={styles.benefitsList}>
              {PACKAGE_INCLUDES.map((item, i) => (
                <li key={i} className={styles.benefitItem}>
                  <div className={styles.benefitIcon}>
                    <Image
                      src={item.icon}
                      alt={item.alt}
                      width={28}
                      height={28}
                      className={styles.benefitIconImg}
                    />
                  </div>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.stayCard}>
            <h3>Volunteer packages</h3>
            <p>
              We offer <strong>customised volunteer packages</strong> to suit your needs.
              Accommodation, meals, transport, and activities are all included.
            </p>
            {STAY_DETAILS.map((detail, i) => (
              <div key={i} className={styles.stayDetail}>
                <div className={styles.stayDetailIcon}>
                  <Image
                    src={detail.icon}
                    alt={detail.label}
                    width={24}
                    height={24}
                    className={styles.stayDetailIconImg}
                  />
                </div>
                <span>{detail.label}</span>
                <strong>{detail.value}</strong>
              </div>
            ))}
            <div className={styles.customActivities}>
              <p><strong>Custom activities may include:</strong></p>
              <ul>
                {CUSTOM_ACTIVITIES.map((activity, i) => (
                  <li key={i}>{activity}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── The story ── */}
      <section className={styles.story}>
        <div className="wrap">
          <span className="eyebrow">Why this matters</span>
          <h2 className={styles.h2}>More than a campsite</h2>
          <p>
            Ethlathini was born from a second chance. The property was overgrown, the buildings
            dilapidated, and the land reclaimed by invasive species. The Mdledshe family opened
            the land with one question: <em>&ldquo;Can you build a skills development centre?&rdquo;</em>
          </p>
          <p>
            That question is still driving everything. The campsites fund the build. The build
            creates the skills centre. The skills centre trains the community. Volunteers are
            part of that chain — not tourists observing it.
          </p>
          <p>
            Hluhluwe-iMfolozi Park — Africa&apos;s oldest game reserve — is 2km down the road.
            The Bhejane and Mdledshe communities surround us. This is a real place, with real
            stakes, and room for real people who want to contribute.
          </p>
          <Link href="/dream" className="btn-secondary" style={{ marginTop: '1.25rem', display: 'inline-flex' }}>
            Read the full story →
          </Link>
        </div>
      </section>

      {/* ── Apply CTA ── */}
      <section className={styles.cta}>
        <div className={`wrap ${styles.ctaInner}`}>
          <h2>Ready to enquire?</h2>
          <p>
            WhatsApp or email us with a short introduction — who you are, when you&apos;re available,
            what you&apos;d like to contribute, and what kind of package you&apos;re interested in. 
            No CV needed. Just be honest.
          </p>
          <div className={styles.ctaBtns}>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
              💬 WhatsApp {SITE.phoneDisplay}
            </a>
            <a href={`mailto:${SITE.email}?subject=Volunteer package enquiry — Ethlathini`} className="btn-ghost">
              ✉️ {SITE.email}
            </a>
          </div>
          <p className={styles.ctaNote}>
            We reply to all enquiries within 48 hours · Custom packages available · Spaces are limited
          </p>
        </div>
      </section>
    </>
  )
}