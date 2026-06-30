import Image from 'next/image'
import Link from 'next/link'
import { pageMeta, SITE } from '../../lib/seo'
import styles from './dream.module.css'

export const metadata = pageMeta({
  path: '/dream',
  title: 'The Dream — Our Story',
  description: 'A second chance, a community that believed, a purpose found. The honest story behind Ethlathini Rest Camp in Hluhluwe, KwaZulu-Natal.',
})

export default function DreamPage() {
  return (
    <>
      <section className={styles.hero}>
        <Image src="/images/social_post_forest.jpg" alt="Ethlathini forest" fill className={styles.heroBg} sizes="100vw" priority />
        <div className={styles.heroOverlay} />
        <div className={"wrap " + styles.heroContent}>
          <span className="eyebrow" style={{color:"#C4874A"}}>The Dream</span>
          <h1>Getting Back on<br /><em>the Right Path</em></h1>
          <p className={styles.heroSub}>A second chance. A community that believed. A purpose found.</p>
        </div>
      </section>
      <section className={styles.body}>
        <div className={"wrap " + styles.bodyInner}>
          <div className={styles.text}>
            <p>We came to Hluhluwe carrying a dream. But somewhere along the way, we trusted the wrong people. Slowly, they stripped away our direction and our hope. We drifted far from the path we were meant to walk.</p>
            
            <p>Through divine timing, the <strong>Mdledshe family</strong> came into our lives — and with them, the truth about the people we had been trusting. By the time they entered our lives, we had nothing left to offer but a story of failure and hearts that still believed in something better.</p>
            
            <p>Yet they opened their land to us. They asked nothing in return. They simply asked one question: <em>"Can you build some kind of skills development center?"</em></p>
            
            <p>That question brought us back to life. Because that was the dream we had before we lost our way — a place where people could learn, grow, and find their own path. A place that gave back to the community that was now giving us a second chance.</p>
            
            <hr className={styles.divider} />
            
            <h2>The Reality of Rebuilding</h2>
            
            <p>When we first set foot on this property, it was <strong>completely overgrown</strong> — bush so thick you could not see the buildings. Some structures were dilapidated, roofs caved in, walls crumbling. Invasive species had taken over, choking out the indigenous growth.</p>
            
            <p>We are still fighting that bush today. But slowly, with limited resources and a lot of sweat, we have been clearing, cleaning, and fixing. Every patch of ground we open up is a small victory.</p>
            
            <hr className={styles.divider} />
            
            <h2>Come Help Us Build</h2>
            
            <p>We have <strong>two rooms available in the main house</strong> for volunteers who want to be part of this journey. If you are handy with tools, love the outdoors, or just want to contribute to something meaningful, we would love to have you.</p>
            
            <p><strong>Volunteer packages are available</strong> — contact us for details.</p>
            
            <hr className={styles.divider} />
                                  
            <h2>Honest Hospitality</h2>
            
            <p>The forest is real, the welcome is warm, and everything else is growing step by step with love, limited resources, and a community that refuses to let this dream fail.</p>
            
            <p>We lost everything once. But we found something more valuable — a second chance, a community that believed in us, and a purpose that was always waiting for us to come back to it.</p>
            
            <div className={styles.signoff}>
              <p><strong>Siyakwamukela. Welcome. We are glad you are here.</strong></p>
              <p className={styles.signoffSmall}>— Ethlathini Rest Camp, Hluhluwe, KwaZulu-Natal</p>
            </div>
          </div>
          <div className={styles.sidebar}>
            <Image src="/images/logo_stacked.jpg" alt="Ethlathini" width={180} height={216} className={styles.logo} />
            <div className={styles.card + " " + styles.highlight}>
              <div className={styles.cardLabel}>The Question</div>
              <div className={styles.cardVal}>"Can you build a skills center?"</div>
              <div className={styles.cardNote}>— The Mdledshe family</div>
            </div>
            {[
              {label:"Started", val:"3 years ago", note:"With nothing but a second chance"},
              {label:"Community", val:"Bhejane · Mdledshe · Hluhluwe", note:"The people who made this possible"},
              {label:"Volunteer Rooms", val:"2 Available", note:"In the main house — packages available"},
            ].map(c => (
              <div key={c.label} className={styles.card}>
                <div className={styles.cardLabel}>{c.label}</div>
                <div className={styles.cardVal}>{c.val}</div>
                <div className={styles.cardNote}>{c.note}</div>
              </div>
            ))}
            <Link href="/book" className={"btn-primary " + styles.dreamCta}>🌿 Book a site & support the dream</Link>
          </div>
        </div>
      </section>
    </>
  )
}