import Image from 'next/image'
import { pageMeta, SITE } from '../../lib/seo'
import styles from './findus.module.css'

export const metadata = pageMeta({
  path: '/find-us',
  title: 'Find Us — Directions to Ethlathini Rest Camp, Hluhluwe',
  description: 'Find Ethlathini Rest Camp on the main road to Memorial Gate, Hluhluwe-iMfolozi Park. GPS: -28.056694, 32.154616. 2km from the gate.',
})

const MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3463.612568476143!2d32.15461667594398!3d-28.056694476318793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDAzJzI0LjEwIlMgMzLCsDA5JzE2LjYyIkU!5e1!3m2!1sen!2sza!4v1749744000000!5m2!1sen!2sza"
const MAPS_DIR  = "https://www.google.com/maps/dir/?api=1&destination=28.056694,32.154616"

export default function FindUsPage() {
  return (
    <>
      <section className={styles.hero}>
        <Image
          src="/images/photos/main-road-sunrise-approach-ethlathini-hluhluwe.jpg"
          alt="Sunrise on the main road approaching Ethlathini Rest Camp and Hluhluwe-iMfolozi Memorial Gate"
          fill
          className={styles.heroBg}
          priority
          fetchPriority="high"
          quality={80}
          sizes="100vw"
        />
        <div className={styles.heroOverlay} />
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <span className="eyebrow" style={{ color: '#C4874A' }}>Getting here</span>
          <h1>Find us</h1>
          <p>On the main road to Memorial Gate, 2km before the entrance to Hluhluwe-iMfolozi Park.</p>
        </div>
      </section>
      <section className={styles.body}>
        <div className={"wrap " + styles.bodyInner}>
          <div className={styles.mapWrap}>
            <iframe src={MAPS_EMBED} width="100%" height="100%"
              style={{border:0,borderRadius:"12px"}} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ethlathini Rest Camp location — Memorial Gate Road, Hluhluwe, KZN"
              className={styles.mapIframe} />
          </div>
          <div className={styles.details}>
            {[
              {label:"📍 Address", val:<>Memorial Gate Road<br />Hluhluwe, KwaZulu-Natal<br />South Africa</>},
              {label:"🗺️ GPS", val:`28°03'24.10"S, 32°09'16.62"E`, note:"Decimal: -28.056694, 32.154616"},
              {label:"🚗 Distance from Memorial Gate", val:"2 km", note:"Just off the main road"},
            ].map((c,i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardLabel}>{c.label}</div>
                <div className={styles.cardVal}>{c.val}</div>
                {c.note && <div className={styles.cardNote}>{c.note}</div>}
              </div>
            ))}
            <div className={styles.card}>
              <div className={styles.cardLabel}>📞 Phone / WhatsApp</div>
              <div className={styles.cardVal}><a href={"tel:" + SITE.phone}>{SITE.phoneDisplay}</a></div>
              <div className={styles.cardNote}><a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">💬 Message us on WhatsApp</a></div>
            </div>
            <div className={styles.btnRow}>
              <a href={MAPS_DIR} target="_blank" rel="noopener noreferrer" className="btn-primary">🗺️ Open in Google Maps</a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-secondary">💬 WhatsApp us</a>
            </div>
            <div className={styles.directions}>
              <h4>Directions from Memorial Gate</h4>
              <ol>
                <li>Exit Memorial Gate heading away from the park</li>
                <li>Drive <strong>2km</strong> along the main road</li>
                <li>Look for the <strong>Ethlathini</strong> sign on your right</li>
                <li>Turn in, enter the gate, and follow the gravel track up the hill</li>
              </ol>
              <p className={styles.directionsNote}><em>🚙 The property is on a hillside — the forest canopy is visible from the road.</em></p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}