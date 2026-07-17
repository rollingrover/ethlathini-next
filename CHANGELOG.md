# CHANGELOG.md
Ethlathini Rest Camp — Tasks C6, C7, Part D (11-language i18n)

---

## Task C6 — Internal linking & alt text pass
- **Modified:** `app/[locale]/about/page.jsx` — added inline body-text link to `/book` (`p_book_link` key), not just a footer/CTA link.
- **Modified:** `app/[locale]/vision/page.jsx` — added inline body-text link to `/book` (`pillars_book_link` key), in addition to the existing CTA button.
- **Modified:** `app/[locale]/dream/page.jsx` — this page already had a `/volunteer` link inline; added a second inline link to `/book` (`p11_link`).
- **Modified:** `app/[locale]/find-us/page.jsx` — GPS/address image alt text now includes literal coordinates (`card_gps_alt`, `card_address_alt`).
- Audited all non-logo images for duplicate alt text — none found within the same page.

## Task C7 — Social meta completion
- **Modified:** `lib/seo.js` — `pageMeta()` and root layout `generateMetadata()` twitter block now include a `site` field, explicitly set to `undefined` with a `// TODO` comment pointing at Task C7 in `TODO-before-launch.md` (no real handle exists yet).
- **Modified:** `lib/seo.js` — `SITE.ogImage` confirmed to use the final Task A1 SEO filename (`ethlathini-rest-camp-hluhluwe-forest-social-share.jpg`) at the production domain.
- **Modified:** `lib/seo.js`, `app/[locale]/layout.jsx` — added `SITE.ogImageType` (`image/jpeg`) and wired it into every `og:image` object (`pageMeta()` and the root layout's default metadata) as `type`.

## Part D — Multilingual (i18n) + Multilingual SEO

### D1 — next-intl install & routing
- **Added:** `next-intl` dependency.
- **Added:** `i18n/routing.js` — central locale list (11 locales), `localePrefix: 'as-needed'`, locale-aware `Link`/`usePathname`/`useRouter` via `createNavigation`, plus display-name/hreflang/OG-locale lookup tables.
- **Added:** `i18n/request.js` — `getRequestConfig` resolving the active locale and loading its message catalog.
- **Added:** `middleware.js` — `next-intl` middleware for locale detection (Accept-Language + cookie) and `as-needed` prefix routing.
- **Modified:** `next.config.js` — wrapped with `next-intl`'s plugin.
- **Restructured:** every route moved from `app/*` into `app/[locale]/*` (`page.jsx`, `about/`, `book/`, `contact/`, `dream/`, `faq/`, `find-us/`, `vision/`, `volunteer/`, `not-found.jsx`, `layout.jsx`). `app/sitemap.js` and `app/actions/*` remain at the top level (shared across locales / not a localized route).
- **Modified:** `app/[locale]/layout.jsx` — locale-aware root layout: `<html lang>` per locale (`en-ZA`, `zh-Hans`, etc. via `htmlLangMap`), script-font class wiring for ru/zh/hi, `NextIntlClientProvider` with server-resolved `messages`, `generateStaticParams()` for all 11 locales.

### D2 — Message catalogs
- **Added:** `messages/en.json` — single source of truth, ~260 keys across 13 namespaces (`meta`, `nav`, `footer`, `common`, `home`, `about`, `vision`, `dream`, `book`, `findUs`, `contact`, `faq`, `volunteer`).
- **Added:** `messages/{zu,de,nl,fr,it,ru,zh,hi,es,pt}.json` — full translations, 100% key parity with `en.json` (verified programmatically — see build notes below).
- Every page component rewritten to consume `useTranslations`/`getTranslations` instead of hardcoded strings; repeating structures (feature grids, FAQ arrays, icon lists) moved to `t.raw()` so translated arrays stay data-driven rather than flattened into hundreds of indexed keys.

### D3 — Language switcher
- **Added:** `components/LanguageSwitcher.jsx` + `.module.css` — dropdown showing each language in its own script (Deutsch, 中文, हिन्दी, isiZulu...), current locale highlighted, preserves the current path when switching (via `next-intl`'s locale-aware router), compact 2-letter codes on mobile, dark-theme variant for the navbar's forest-green background.
- **Modified:** `components/Navbar.jsx`, `components/Footer.jsx` — rebuilt to use `next-intl`'s `Link`/`usePathname` (auto locale-prefixing) and translated nav/footer labels.

### D4 — Multilingual SEO
- **Modified:** `lib/seo.js` — `pageMeta()` now takes a `locale` and returns: locale-correct `canonical`, a complete reciprocal `hreflang` set (11 locales + `x-default`) via `hreflangAlternates()`, locale-correct `openGraph.locale` + `alternateLocale` via `ogLocaleFor()`/`alternateOgLocales()`.
- **Modified:** `lib/seo.js` — all JSON-LD builders (`localBusinessSchema`, `breadcrumbSchema`, `faqSchema`, `campingOfferSchema`, `webPageSchema`, `organizationSchema`) accept a `locale` argument and stamp `"inLanguage"`. Address/geo/phone/email remain identical across locales per spec.
- **Modified:** `app/[locale]/layout.jsx` — `<html lang>` set per locale via `htmlLangMap`.
- **Modified:** `app/sitemap.js` — rewritten to emit one entry per page × locale (9 pages × 11 locales = **99 URLs**), each with the full reciprocal `hreflang` alternate set. Verified via build output (`grep -c "<url>" sitemap.xml` → 99).

---

## Files touched (all Parts, this pass)

**New files:**
`i18n/routing.js`, `i18n/request.js`, `middleware.js`, `messages/en.json`, `messages/zu.json`, `messages/de.json`, `messages/nl.json`, `messages/fr.json`, `messages/it.json`, `messages/ru.json`, `messages/zh.json`, `messages/hi.json`, `messages/es.json`, `messages/pt.json`, `components/LanguageSwitcher.jsx`, `components/LanguageSwitcher.module.css`, `app/[locale]/book/RatesTable.jsx` (rewritten in place), `app/[locale]/contact/ContactForm.jsx` (rewritten in place)

**Moved (app/* → app/[locale]/*):**
`page.jsx`, `page.module.css`, `not-found.jsx`, `layout.jsx`, `about/`, `book/`, `contact/`, `dream/`, `faq/`, `find-us/`, `vision/`, `volunteer/`

**Rewritten in place (locale-aware content, same filenames):**
`app/[locale]/layout.jsx`, `app/[locale]/page.jsx`, `app/[locale]/about/page.jsx`, `app/[locale]/vision/page.jsx`, `app/[locale]/dream/page.jsx`, `app/[locale]/book/page.jsx`, `app/[locale]/book/BookingWidget.jsx`, `app/[locale]/find-us/page.jsx`, `app/[locale]/contact/page.jsx`, `app/[locale]/faq/page.jsx`, `app/[locale]/volunteer/page.jsx`, `components/Navbar.jsx`, `components/Footer.jsx`, `lib/seo.js`, `app/sitemap.js`, `next.config.js`

**Removed (stale wrapper, no longer needed once book/page.jsx became a server component):**
`app/book/layout.jsx`

---

## Build verification
- `next build` completes with **zero errors**. All **99 locale × page routes** statically generated (9 pages × 11 locales), plus `/_not-found` and `/sitemap.xml`.
- `messages/*.json` — 100% key parity confirmed programmatically (English key set diffed against all 10 other locales; zero missing, zero extra keys in each).
- `sitemap.xml` — confirmed 99 `<url>` entries.
- Spot-checked `/de/book` and `/fr/about` against a running production server: `<html lang>` correct per locale, full 12-entry hreflang set present (`hrefLang` attribute — same thing as `hreflang`, just React's camelCase DOM prop name), canonical correct, `og:locale` correct (`de_DE`, etc.), rates table (`R200`) renders in the static HTML, and rich-text tags (`<strong>`, inline `/book` links) render correctly through `t.rich()`.

## Known limitation — translation review
Machine/AI-assisted translation was used for all 10 non-English locales. Per the original task brief's own instruction, **isiZulu and Hindi in particular should get a native-speaker review pass** before launch — isiZulu is the home language of the Bhejane/Mdledshe community and the source of the brand name itself, so getting tone and idiom right matters more here than anywhere else on the site. Realistically, the same recommendation applies to all 10 translated locales before they go live: a native or fluent speaker skim of each `messages/{locale}.json` against `messages/en.json`, focused on the emotionally-loaded copy on `/dream` and `/volunteer` in particular. See `TODO-before-launch.md` for the full checklist.
