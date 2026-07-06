# TODO-before-launch.md
# Ethlathini Rest Camp — Pre-launch checklist
# Items flagged during Tasks A1–B3 for owner action before go-live

---

## 🔴 MUST DO (site broken or misleading without these)

### 1. Fill in real campsite rates
- **File:** `app/book/page.jsx`
- **Search for:** `R___`
- Rate placeholders: site nightly rate, extra adult, extra child, extra vehicle
- Currently: `calculateTotal()` function uses hardcoded test values (R200/R450) — update to real rates

### 2. Create OG social share image
- **File needed:** `public/images/ethlathini-rest-camp-hluhluwe-forest-social-share.jpg`
- **Size:** exactly 1200×630px
- **Current:** this file does not exist — social shares will have no image preview
- **Recommendation:** Use `tree-aloe-clean-silhouette-sunrise-ethlathini-kzn.jpg` cropped to 1200×630 in Canva/Photoshop

### 3. Connect booking form to email backend
- **File:** `app/book/page.jsx`, function `handleSubmit` (~line 82)
- Currently: form sets `submitted=true` locally but does NOT send any data
- **Easiest fix:** Formspree (formspree.io) — free, no backend needed:
  ```js
  const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })
  if (res.ok) setSubmitted(true)
  ```

### 4. Fill in real phone number and WhatsApp link
- **File:** `lib/seo.js` — `SITE.phone` and `SITE.whatsapp`
- Confirm: `+27610118513` — correct?

### 5. Confirm GPS coordinates
- **File:** `lib/seo.js` — `SITE.address.lat/lng`
- Current: `-28.056694, 32.154616`
- Verify these are correct for the actual property entrance

---

## 🟡 SHOULD DO (SEO and performance impact)

### 6. Add Google Analytics or similar
- No analytics currently installed
- Recommendation: Vercel Analytics (free, privacy-friendly, no cookie consent needed for basic stats)
- Or: Google Analytics 4 via `@next/third-parties` (Next.js 14 built-in)

### 7. Update social media URLs in lib/seo.js
- **File:** `lib/seo.js` — `SITE.social.*`
- Update Instagram, Facebook, TikTok URLs once accounts are live

### 8. Add real Twitter/X handle for twitter:site meta tag
- **File:** `app/layout.jsx` — twitter metadata
- Currently: no `site` property set (Task C7 item)

### 9. Google Business Profile — verify embed
- **File:** `app/find-us/page.jsx` — Google Maps embed iframe src
- Test the embed URL works and shows the correct location

### 10. Verify domain redirect at DNS level
- apex `ethlathini.co.za` → `www.ethlathini.co.za` is set in `next.config.js`
- Also set this at the Vercel dashboard level for DNS-layer redirect
- Important: without DNS-level redirect, apex requests may not reach Next.js

---

## 🟢 NICE TO HAVE

### 11. Add more photos
- **Current library:** 19 photos, all sunrises/sunsets and forest
- **Needed:** actual campsite photos (vehicles, rigs, braai fires, happy campers)
- **High priority:** a real photo of the property entrance (new signage)

### 12. Dependency audit — candidates for removal
*These packages appear in the codebase but evaluate before removing:*
- `useEffect` in `app/book/page.jsx`: used for `setMounted(true)` — check if mounted state is actually needed anywhere (it's imported but may not be used downstream)

### 13. Add `quality={80}` to all icon images
- Currently icons (48px, 32px) use default quality
- At small sizes this makes no meaningful difference but is consistent with the spec

### 14. Consider adding a sitemap index for Part D (multilingual)
- Current `app/sitemap.js` generates 7 English-only URLs
- After Part D, update to generate 77 URLs (7 pages × 11 locales)

---

## ✅ CONFIRMED CORRECT (no action needed)

- `public/robots.txt` → references `https://www.ethlathini.co.za/sitemap.xml` ✅
- Security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy) → in `next.config.js` ✅
- X-Robots-Tag: production = `index, follow`; staging = `noindex, nofollow` ✅
- All hero images → `priority`, `fetchPriority="high"`, `quality={80}` ✅
- All images → `sizes` prop set correctly ✅
- Fonts → self-hosted via `next/font/local` (woff2 files in `public/fonts/`) ✅
- `display: swap` on all fonts ✅
- `viewport` and `themeColor` → set in `app/layout.jsx` ✅
- No page bundle exceeds 100KB ✅
