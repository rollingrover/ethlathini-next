// app/book/metadata.js — separate because book/page.jsx is 'use client'
// Next.js 14: export metadata from a layout or a separate file for client pages

import { pageMeta } from '../../lib/seo'

export const metadata = pageMeta({
  path: '/book',
  title: 'Book Overland Campsite — Hluhluwe-iMfolozi, KZN',
  description: 'Book an overland campsite at Ethlathini Rest Camp — 2km from Memorial Gate, Hluhluwe-iMfolozi Park. Self-contained rigs only. Direct booking, no platform fees.',
})
