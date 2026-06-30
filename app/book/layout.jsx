// app/book/layout.jsx
// Needed because page.jsx uses 'use client' — metadata must live in a Server Component
import { pageMeta } from '../../lib/seo'

export const metadata = pageMeta({
  path: '/book',
  title: 'Book Overland Campsite — Hluhluwe-iMfolozi, KZN',
  description: 'Book an overland campsite at Ethlathini Rest Camp — 2km from Memorial Gate, Hluhluwe-iMfolozi Park. Self-contained rigs only. Direct booking, no platform fees.',
})

export default function BookLayout({ children }) {
  return children
}
