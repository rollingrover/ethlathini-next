import Image from 'next/image'
import Link from 'next/link'
import { pageMeta } from '../../lib/seo'
import styles from './vision.module.css'

export const metadata = pageMeta({
  path: '/vision',
  title: 'Our Vision — Skills Hub & Eco-Social Enterprise, Hluhluwe',
  description: 'Ethlathini is building a living classroom in the forest — hospitality, agriculture and future skills development for the Hluhluwe community. See the vision.',
})

const PILLARS = [
  {
    icon: "/images/icons/hospitality-skills-icon.png",
    title: "Hospitality Skills",
    desc: "The campsites, coffee shop, restaurant, and future chalets will train people in guest relations, housekeeping, lodge management, and food & beverage service.",
    alt: "Hospitality skills icon"
  },
  {
    icon: "/images/icons/trade-agri-skills-icon.png",
    title: "Trade & Agricultural Skills",
    desc: "The community garden, fish farm, nursery, and workshop will train people in sustainable food production, aquaculture, indigenous plant propagation, and carpentry, plumbing, and welding.",
    alt: "Trade and agricultural skills icon"
  },
  {
    icon: "/images/icons/future-skills-icon.png",
    title: "Future Skills",
    desc: "The conference center will train people in IT, AI fundamentals, events management, and digital literacy. It will also host weddings, functions and corporate events.",
    alt: "Future skills icon"
  },
]

// ── Open Now Images ──
const OPEN_NOW = [
  { src: "/images/icons/overland-campsites-icon.png", label: "4 Overland Campsites", alt: "Overland campsites" },
  { src: "/images/icons/firepits-icon.png", label: "Firepits with Free Firewood", alt: "Firepit icon" },
  { src: "/images/icons/clean-water-icon.png", label: "Clean Water Points", alt: "Clean water points" },
  { src: "/images/icons/wifi-icon.png", label: "WiFi in Selected Areas", alt: "WiFi icon" },
  { src: "/images/icons/portable-braai-icon.png", label: "Shared Portable Braai", alt: "Portable braai" },
  { src: "/images/icons/volunteer-rooms-icon.png", label: "2 Volunteer Rooms", alt: "Volunteer rooms" },
]

// ── Coming Soon Images ──
const COMING_SOON = [
  { src: "/images/icons/coming-ablutions-more-campsites-icon.png", label: "More Campsites with Ablutions", alt: "Campsites with ablutions" },
  { src: "/images/icons/chalets-clean-icon.png", label: "Chalets", alt: "Chalets" },
  { src: "/images/icons/coffee-shop-nursery-icon.png", label: "Coffee Shop & Indigenous Nursery", alt: "Coffee shop and nursery" },
  { src: "/images/icons/restaurant-icon.png", label: "Restaurant", alt: "Restaurant" },
  { src: "/images/icons/skills-development-icon.png", label: "Skills Development Center", alt: "Skills development center" },
  { src: "/images/icons/fishfarm-icon.png", label: "Fish Farm", alt: "Fish farm" },
  { src: "/images/icons/foodgarden-icon.png", label: "Community Food Garden", alt: "Community food garden" },
  { src: "/images/icons/workshop-tradeskills-icon.png", label: "Workshop for Trades Training", alt: "Workshop" },
  { src: "/images/icons/conference-center-it-skills-wedding-functions-icon.png", label: "Conference Center (Weddings, Functions, IT & AI)", alt: "Conference center" },
]

export default function VisionPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <Image src="/images/social_post_forest.jpg" alt="Ethlathini forest canopy" fill className={styles.heroBg} sizes="100vw" priority />
        <div className={styles.heroOverlay} />
        <div className={"wrap " + styles.heroContent}>
          <span className="eyebrow" style={{color:"#C4874A"}}>Our Vision</span>
          <h1>Building a<br /><em>living classroom</em></h1>
          <p className={styles.heroSub}>A skills hub in the forest — hospitality, agriculture, technology.</p>
        </div>
      </section>

      {/* ── Aerial Proposed Plan ── */}
      <section className={styles.aerial}>
        <div className="wrap">
          <div className={styles.aerialText}>
            <span className="eyebrow">The Plan</span>
            <h2 className={styles.h2}>From forest to<br /><em>community hub</em></h2>
            <p className={styles.aerialDesc}>
              This is the vision — a living classroom nestled in the forest canopy. 
              The aerial plan shows how Ethlathini will grow into a complete 
              eco-social destination with campsites, chalets, skills center, 
              fish farm, coffee shop, nursery, and community garden.
            </p>
            <p className={styles.aerialNote}>
              <em>📍 View from above — watch the forest and the dream grow together.</em>
            </p>
          </div>
          <div className={styles.aerialImage}>
            <Image
              src="/images/aerial-site-planned.png"
              alt="Ethlathini proposed aerial plan showing campsites, chalets, skills center, fish farm, coffee shop, nursery, and community garden"
              width={1000}
              height={700}
              className={styles.aerialImg}
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Skills Pillars ── */}
      <section className={styles.pillars}>
        <div className="wrap">
          <span className="eyebrow">A Skills Hub</span>
          <h2 className={styles.h2}>Three Pillars of Learning</h2>
          <p className={styles.pillarsSub}>Ethlathini is being built as a <strong>living classroom</strong> — a place where local youth and community members gain real, marketable skills.</p>
          <div className={styles.pillarsGrid}>
            {PILLARS.map(p => (
              <div key={p.title} className={styles.pillar}>
                <div className={styles.pillarIcon}>
                  <Image
                    src={p.icon}
                    alt={p.alt}
                    width={80}
                    height={80}
                    className={styles.pillarIconImg}
                  />
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We're Building — Image Grid ── */}
      <section className={styles.building}>
        <div className={"wrap " + styles.buildingInner}>
          <span className="eyebrow">Progress</span>
          <h2 className={styles.h2}>What We Are Building</h2>
          
          <div className={styles.buildingGrid}>
            {/* Open Now Column */}
            <div className={styles.buildingCol}>
              <h4 className={styles.buildingColTitle}>✅ Open Now</h4>
              <div className={styles.buildingIconGrid}>
                {OPEN_NOW.map((item, idx) => (
                  <div key={idx} className={styles.buildingIconItem}>
                    <div className={styles.buildingIconWrap}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={48}
                        height={48}
                        className={styles.buildingIconImg}
                      />
                    </div>
                    <span className={styles.buildingIconLabel}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Coming Soon Column */}
            <div className={styles.buildingCol}>
              <h4 className={styles.buildingColTitle}>🚧 Coming Soon</h4>
              <div className={styles.buildingIconGrid}>
                {COMING_SOON.map((item, idx) => (
                  <div key={idx} className={styles.buildingIconItem}>
                    <div className={styles.buildingIconWrap}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={48}
                        height={48}
                        className={styles.buildingIconImg}
                      />
                    </div>
                    <span className={styles.buildingIconLabel}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <div className={"wrap " + styles.ctaInner}>
          <h2>Be part of the vision</h2>
          <p>Book a site, volunteer, or just come see what we are building.</p>
          <div className={styles.ctaBtns}>
            <Link href="/book" className="btn-primary">Book a site</Link>
            <Link href="/dream" className="btn-secondary">Read the story</Link>
          </div>
        </div>
      </section>
    </>
  )
}