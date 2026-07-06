# Ethlathini Rest Camp — Next.js 14 Website

## Quick start

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Build & deploy

```bash
npm run build
npm start              # preview production build locally
```

**Deploy to Vercel (recommended — free tier):**
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → import the repo
3. Vercel auto-detects Next.js — hit Deploy
4. Add your custom domain `ethlathini.co.za` in Vercel settings

**Deploy to Netlify:**
```bash
npm run build          # creates .next folder
# In Netlify: set build command to `npm run build`, publish dir to `.next`
# Or use the Netlify Next.js plugin
```

---

## Project structure

```
app/
  layout.jsx            — root layout: Navbar, Footer, JSON-LD, global metadata
  page.jsx              — Home page (/)
  page.module.css       — Home CSS
  sitemap.js            — auto-generates /sitemap.xml
  not-found.jsx         — custom 404
  book/
    layout.jsx          — metadata wrapper (page is 'use client')
    page.jsx            — Book & rates page
    book.module.css
  about/
    page.jsx            — About page
    about.module.css
  vision/
    page.jsx            — Our Vision page
    vision.module.css
  dream/
    page.jsx            — The Dream page
    dream.module.css
  find-us/
    page.jsx            — Find Us + Google Maps embed
    findus.module.css

components/
  Navbar.jsx / .module.css
  Footer.jsx / .module.css

lib/
  seo.js               — SINGLE SOURCE OF TRUTH for all SEO metadata
                          Update SITE object here → applies everywhere

public/
  images/              — all brand & property photos
  robots.txt
  site.webmanifest
  favicon.svg / .png files

styles/
  globals.css          — brand tokens (CSS variables) + reset + utilities
```

---

## SEO — what's built in

| Feature | Where |
|---|---|
| Per-page `<title>` & `<meta description>` | `pageMeta()` in each page |
| Open Graph / Twitter cards | `pageMeta()` |
| JSON-LD LocalBusiness schema | `app/layout.jsx` |
| JSON-LD BreadcrumbList | Home page |
| `canonical` URLs | `pageMeta()` |
| `robots.txt` | `public/robots.txt` |
| `sitemap.xml` (auto) | `app/sitemap.js` |
| `site.webmanifest` | `public/site.webmanifest` |
| `lang="en-ZA"` | `app/layout.jsx` |
| Next.js Image optimisation (WebP/AVIF) | All `<Image>` components |
| Semantic HTML (header, nav, main, footer, article, section) | All pages |

---

## Things to update before going live

```
lib/seo.js
  → SITE.phone        — confirm +27610118513
  → SITE.email        — confirm info@ethlathini.co.za
  → SITE.address.lat/lng — confirm GPS coordinates
  → SITE.social.*    — update social profile URLs when live

app/book/page.jsx
  → Search R [XX0]   — replace with real campsite rates
  → Search R [XX]    — replace with real per-person rates
  → handleSubmit     — connect to email service (Formspree or EmailJS)

app/find-us/page.jsx
  → MAPS_EMBED       — already has your GPS; verify embed works live

public/images/ethlathini-rest-camp-hluhluwe-forest-social-share.jpg
  → Add a 1200×630 hero photo for social sharing previews
  → Until then, social_post_forest.jpg will be used as fallback
```

---

## Connecting the booking form (no backend needed)

**Option A — Formspree (easiest):**
1. Sign up at formspree.io → create a form → copy your form ID
2. In `app/book/page.jsx`, change `handleSubmit` to:
```js
const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
})
if (res.ok) setSubmitted(true)
```

**Option B — EmailJS (also free):**
See emailjs.com for setup — works similarly.

---

## Partners (update URLs in components/Footer.jsx)

- Diza-Travels: https://www.dizatravels.co.za
- ZAtours: https://www.zatours.co.za
- Mzamo Cultural Village: https://www.mzamovillagehomestead.co.za
- OpDesk: https://www.opdesk.app
