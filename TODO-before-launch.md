# TODO-before-launch.md
# Ethlathini Rest Camp — Pre-launch checklist
# Consolidated after Tasks A–C5 audit + Tasks C6, C7, Part D (i18n)

---

## 🔴 MUST DO (site broken or misleading without these)

### 1. Create OG social share image
- **File needed:** `public/images/ethlathini-rest-camp-hluhluwe-forest-social-share.jpg`
- **Size:** exactly 1200×630px
- This file does not exist yet — social shares currently have no image preview. `lib/seo.js` (`SITE.ogImage`) and the root layout already reference the correct final filename, so once the file is added, no code changes are needed anywhere (all 11 locales pull from the same constant).

### 2. Confirm GPS coordinates
- **File:** `lib/seo.js` — `SITE.address.lat/lng` (currently `-28.056694, 32.154616`)
- Verify these match the actual property entrance. This value is now used across every locale's JSON-LD, sitemap, and Find Us page — one fix updates all 11 languages.

### 3. Verify domain redirect at DNS level
- apex `ethlathini.co.za` → `www.ethlathini.co.za` is set in `next.config.js`, but also confirm this at the Vercel dashboard / DNS level.

### 4. Native-speaker review of translations
- All 10 non-English `messages/*.json` files were produced with AI-assisted translation. Per the original brief's own instruction:
  - [ ] **isiZulu (`messages/zu.json`)** — highest priority. This is the home language of the Bhejane/Mdledshe community and the source of the brand name itself ("Ethlathini" = "in the forest"). Please have a native isiZulu speaker read through it, especially `/dream` and `/volunteer` where the tone needs to land right.
  - [ ] **Hindi (`messages/hi.json`)** — review for phrasing naturalness, especially around tourism-industry terms.
  - [ ] **Russian, Chinese (Simplified), German, French, Italian, Spanish, Portuguese, Dutch** — lower risk (more resourced languages, more training data) but a native/fluent-speaker skim before launch is still recommended, particularly for `/dream` (the most emotionally loaded page) and the booking form field labels (where a mistranslation could cause a real booking mix-up).
- There is no in-code way to flag specific strings for review (JSON doesn't support comments), so this list is the tracking mechanism — check off each locale as it's reviewed.

---

## 🟡 SHOULD DO (SEO, security, and performance impact)

### 5. Add real Twitter/X handle
- **Files:** `lib/seo.js` (`pageMeta()`) and `app/[locale]/layout.jsx` (root `generateMetadata()`) — both have `twitter.site` explicitly set to `undefined` with a `// TODO` comment. Fill in once the account exists (Task C7).

### 6. Add real sameAs social profile URLs
- **File:** `lib/seo.js` — `SITE.social.{instagram,facebook,tiktok}` currently point at placeholder handles. Update once accounts are live — these feed the `sameAs` field in the Organization/LocalBusiness JSON-LD across all 11 locales.

### 7. Keep Next.js patched
- Audited and fixed during the Part A–C5 pass: was pinned to `next@14.2.5` (multiple critical CVEs), upgraded to `next@14.2.35`. Keep an eye on future patch releases — Server Actions and the RSC protocol are actively used here.

### 8. Rotate Resend/email credentials if `.env.local` was ever exposed
- Debug `console.log` statements that printed whether `RESEND_API_KEY` was set were found and removed during the earlier audit. As a precaution, confirm the key hasn't leaked via logs or screenshots.

### 9. Google Search Console + sitemap submission
- Set up Search Console, verify `ethlathini.co.za`, and submit `sitemap.xml` (now 99 URLs across 11 locales with full hreflang annotations).
- After a few weeks live, check Search Console's **International Targeting** report for hreflang errors, per the original acceptance criteria.

### 10. Google Analytics 4
- Vercel Analytics is already installed and wired in. Add GA4 via `@next/third-parties` if Search Console / Ads integration is wanted.

### 11. Google Business Profile
- Create at business.google.com, and verify the Google Maps embed on `/find-us` and `/contact` resolves to the correct pin once claimed.

---

## 🟢 NICE TO HAVE

### 12. More photos
- Current library leans heavily on sunrises/sunsets and forest shots. Real campsite-in-use photos (vehicles, rigs, braai fires, campers) would strengthen the hero rotation.

### 13. Flag any raw photo files over 4MB
- Per Task A2, none were flagged in the current `public/images/photos/` directory — re-check if new photos are added later.

### 14. Backlinks & directory listings
- Request backlinks from listed partners: Diza-Travels, ZAtours, Mzamo Cultural Village.
- List on sa-venues.com, campsites.co.za, iSimangaliso tourism directory.

---

## ✅ CONFIRMED CORRECT (no action needed)

- `public/robots.txt` → references `sitemap.xml` correctly ✅
- Security headers, X-Robots-Tag staging/production split → in `next.config.js` ✅
- All hero images across all pages → `priority`, `fetchPriority="high"`, `quality={80}`, `sizes` ✅
- Every `<Image>` component site-wide has a `sizes` prop ✅
- Fonts self-hosted via `next/font/local` + `next/font/google` (Cyrillic/CJK/Devanagari subsets for ru/zh/hi) ✅
- Rates table (`RatesTable.jsx`) → real values, mirrored in `campingOfferSchema()` JSON-LD ✅
- Booking + contact forms → real Resend-backed server actions, HTML-escaped against markup injection ✅
- **Part D — 11-language i18n:**
  - [x] `next-intl` installed and routed (`as-needed` prefix — English at `/`, others at `/de`, `/zu`, etc.)
  - [x] All 11 `messages/*.json` files have 100% key coverage vs. English (verified programmatically)
  - [x] No hardcoded English strings remain in any rewritten page component
  - [x] Language switcher shows each language in its own script, preserves path on switch
  - [x] Every page emits the complete 12-entry hreflang set (11 locales + x-default), verified in a running build
  - [x] `<html lang>` correct per locale (`en-ZA`, `zh-Hans`, plain codes elsewhere)
  - [x] Sitemap contains 99 URLs (9 pages × 11 locales) with hreflang annotations, verified by count
  - [x] `next build` completes with zero errors across all 99 routes
- **Task C6** — internal `/book` links added to `/about`, `/vision` body text (in addition to existing CTAs); `/dream` already had inline links, a second one to `/book` was added. GPS/address alt text includes literal coordinates.
- **Task C7** — `twitter:site` present (empty, flagged for real handle), `og:image` confirmed on the final Task A1 filename, `og:image:type` added.
