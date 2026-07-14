# TODO-before-launch.md
# Ethlathini Rest Camp — Pre-launch checklist
# Updated after codebase audit (Tasks A–C5 review)

---

## 🔴 MUST DO (site broken or misleading without these)

### 1. Create OG social share image
- **File needed:** `public/images/ethlathini-rest-camp-hluhluwe-forest-social-share.jpg`
- **Size:** exactly 1200×630px
- **Current:** this file does not exist — social shares will have no image preview.
  `lib/seo.js` (`SITE.ogImage` and `localBusinessSchema()`) both reference it already,
  so once the file is added no code changes are needed.
- **Recommendation:** crop `tree-aloe-clean-silhouette-sunrise-ethlathini-kzn.jpg` or another
  strong forest/hero shot to 1200×630 in Canva/Photoshop.

### 2. Confirm GPS coordinates
- **File:** `lib/seo.js` — `SITE.address.lat/lng`
- Current: `-28.056694, 32.154616`
- Verify these are correct for the actual property entrance.

### 3. Verify domain redirect at DNS level
- apex `ethlathini.co.za` → `www.ethlathini.co.za` is set in `next.config.js`
- Also set this at the Vercel dashboard level for DNS-layer redirect
- Important: without DNS-level redirect, apex requests may not reach Next.js

---

## 🟡 SHOULD DO (SEO, security, and performance impact)

### 4. Rotate Resend/email credentials if `.env.local` was ever committed or shared
- Audit found debug `console.log` statements in `app/actions/contact.js` that printed
  whether `RESEND_API_KEY` was set — these have been removed, but as a precaution confirm
  the key hasn't leaked via logs/screenshots, and rotate it if unsure.

### 5. Keep Next.js patched
- Audit found the project was pinned to `next@14.2.5`, which has multiple disclosed
  critical vulnerabilities (RCE/DoS in Server Actions and the RSC protocol, cache
  poisoning, image-optimization DoS). **Fixed in this pass** — upgraded to `next@14.2.35`
  (latest patched 14.x release) and regenerated `package-lock.json`.
- `npm audit` still reports a few moderate/high advisories in **dev-only** tooling
  (eslint 8.x → glob/minimatch transitive deps). These don't ship to production and
  fixing them requires a breaking `eslint@10`/`eslint-config-next@16` upgrade — evaluate
  separately, don't do it reflexively via `--force`.

### 6. Add Google Analytics or similar
- Vercel Analytics is already installed (`@vercel/analytics`) and wired into `app/layout.jsx`.
- Consider also adding Google Analytics 4 via `@next/third-parties` if the owner wants
  Search Console / Ads integration.

### 7. Update social media URLs in lib/seo.js
- **File:** `lib/seo.js` — `SITE.social.*`
- Update Instagram, Facebook, TikTok URLs once accounts are live.

### 8. Add real Twitter/X handle for twitter:site meta tag
- **File:** `app/layout.jsx` and `lib/seo.js` `pageMeta()` — twitter metadata
- Currently no `site` property set.

### 9. Google Business Profile — verify embed
- **File:** `app/find-us/page.jsx` — Google Maps embed iframe src
- Test the embed URL works and shows the correct location.

---

## 🟢 NICE TO HAVE

### 10. Add more photos
- **Current library:** mostly sunrises/sunsets and forest.
- **Needed:** actual campsite photos (vehicles, rigs, braai fires, happy campers).
- **High priority:** a real photo of the property entrance (new signage).

### 11. Sitemap index for Part D (multilingual)
- Current `app/sitemap.js` generates 9 English-only URLs.
- After Part D (11-language i18n) lands, update to generate the full locale × page matrix.

---

## ✅ CONFIRMED CORRECT (no action needed)

- `public/robots.txt` → references `https://www.ethlathini.co.za/sitemap.xml` ✅
- Security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy) → in `next.config.js` ✅
- X-Robots-Tag: production = `index, follow`; staging = `noindex, nofollow` ✅
- All hero images → `priority`, `fetchPriority="high"`, `quality={80}`, `sizes` ✅ (contact/faq/volunteer heroes brought into line with the rest during this audit)
- All `<Image>` components across the site now have a `sizes` prop ✅ (20 instances were missing this — fixed during audit)
- Fonts → self-hosted via `next/font/local` (woff2 files in `public/fonts/`), Part D script-font wiring documented and ready ✅
- `display: swap` on all fonts ✅
- `viewport` and `themeColor` → set in `app/layout.jsx` ✅
- No page bundle exceeds 100KB ✅
- Rates table (`app/book/RatesTable.jsx`) → real values filled in, no more `R___` placeholders ✅
- `campingOfferSchema()` JSON-LD → now mirrors the real rates (was still showing `TBC`) ✅
- Booking + contact forms → real backend via Resend server actions (`app/actions/`), not just client-side state ✅
- Email templates now HTML-escape user input (name/email/message/etc.) to prevent markup injection ✅
