// app/not-found.jsx
import Link from 'next/link'

export const metadata = { title: 'Page not found' }

export default function NotFound() {
  return (
    <section style={{
      minHeight: '70vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      padding: '3rem var(--px)', background: 'var(--cream-bg)'
    }}>
      <div style={{ fontSize: 56, marginBottom: '1rem' }}>🌿</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,5vw,48px)', color: 'var(--forest)', marginBottom: '1rem' }}>
        Lost in the forest?
      </h1>
      <p style={{ fontSize: 16, color: 'var(--bark)', maxWidth: 420, lineHeight: 1.7, marginBottom: '2rem' }}>
        This page doesn&apos;t exist — but the forest does. Head back and find your way.
      </p>
      <Link href="/" className="btn-primary">Back to home</Link>
    </section>
  )
}
