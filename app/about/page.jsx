import Image from 'next/image'
import { pageMeta } from '../../lib/seo'
import styles from './about.module.css'

export const metadata = pageMeta({
  path: '/about',
  title: 'About — Forest campsite in Hluhluwe, KZN',
  description: "Ethlathini Rest Camp is a mahogany and fig forest campsite 2km from Memorial Gate, Hluhluwe-iMfolozi Park. Our story, our community, our honest journey.",
})

export default function AboutPage() {
  return (
    <>
      <section className={styles.hero}>
        <Image src="/images/social_post_forest.jpg" alt="Ethlathini forest canopy Hluhluwe" fill className={styles.heroBg} sizes="100vw" priority />
        <div className={styles.heroOverlay} />
        <div className={"wrap " + styles.heroContent}>
          <span className="eyebrow" style={{color:"#C4874A"}}>About Ethlathini</span>
          <h1>A forest on a hillside,<br /><em>growing something real</em></h1>
        </div>
      </section>
      <section className={styles.body}>
        <div className={"wrap " + styles.bodyInner}>
          <div className={styles.text}>
            <h2>Ethlathini — "In the Forest"</h2>
            <p>Nestled in a lush canopy of <strong>mahogany, wild fig, and tree aloe</strong> on a hillside just off the main road to Memorial Gate, Ethlathini Rest Camp is a growing eco-friendly destination rooted in KwaZulu-Natal and the heart of the Hluhluwe community.</p>
            <h3>The Place</h3>
            <p>The property sits on a hillside with the forest canopy breaking through. Tree aloes stand tall above the fig trees, and the mahogany provide deep, cool shade for the campsites below. When we arrived, the land was <strong>completely overgrown</strong> — chromolaena and lantana had taken over. We are still fighting that bush today, clearing metre by metre.</p>
            <h3>What is Here Now</h3>
            <p>Today we have <strong>four cleared areas</strong> for overland campers — natural bush clearings for fully self-contained travellers with rooftop tents, trailers, and overlanding rigs. Each site has a firepit with free firewood, clean water points, and WiFi in selected areas.</p>
            <p><strong>Ablution facilities are under development</strong> — self-sufficient overlanders only at this stage.</p>
            <div className={styles.location}>
              <h3>Our Location</h3>
              <p>Just <strong>2km from Memorial Gate, Hluhluwe-iMfolozi Park</strong> — Africa oldest proclaimed game reserve (established 1895). Big 5 country, the last major stronghold of the southern white rhino, and one of the most biodiverse wilderness areas on the continent.</p>
            </div>
            <div className={styles.facts}>
              <h3>Quick Facts</h3>
              <ul>
                <li><strong>Name:</strong> Ethlathini — isiZulu for "in the forest"</li>
                <li><strong>Location:</strong> Memorial Gate Road, Hluhluwe, KZN</li>
                <li><strong>Distance to gate:</strong> 2 km</li>
                <li><strong>Open:</strong> 4 overland campsites (self-contained only)</li>
                <li><strong>Coming:</strong> Chalets, coffee shop, nursery, restaurant, skills center, fish farm, community garden</li>
              </ul>
            </div>
            <p className={styles.signoff}><strong>Siyakwamukela. Welcome. We are glad you are here.</strong></p>
          </div>
          <div className={styles.sidebar}>
            <Image src="/images/logo_stacked.jpg" alt="Ethlathini Rest Camp" width={200} height={240} className={styles.logo} />
            {[
              {label:"The Name", val:'"Ethlathini"', note:'In isiZulu: "in the forest"'},
              {label:"Location", val:"Hluhluwe", note:"KwaZulu-Natal, South Africa"},
              {label:"Distance to Gate", val:"2 km", note:"Memorial Gate, Hluhluwe-iMfolozi Park"},
              {label:"Open Now", val:"4 Overland Sites", note:"Self-contained campers only"},
            ].map(c => (
              <div key={c.label} className={styles.card}>
                <div className={styles.cardLabel}>{c.label}</div>
                <div className={styles.cardVal}>{c.val}</div>
                <div className={styles.cardNote}>{c.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
