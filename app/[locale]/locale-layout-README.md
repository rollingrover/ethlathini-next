# Locale Layout — Part D Instructions
# ─────────────────────────────────────────────────────────────────
# When Part D (next-intl i18n) is implemented, this directory becomes
# app/[locale]/layout.jsx and replaces app/layout.jsx as the root layout.
#
# The font wiring pattern per locale:
#
# app/[locale]/layout.jsx:
#
#   import { lora, dmSans, notoSansCyrillic, notoSansSC, notoSansDevanagari } from '@/lib/fonts'
#
#   // Map locale → extra font variable class
#   const scriptFontClass = {
#     ru: notoSansCyrillic.variable,
#     zh: notoSansSC.variable,
#     hi: notoSansDevanagari.variable,
#   }[locale] ?? ''
#
#   // Map locale → html lang attribute
#   const htmlLang = {
#     en:  'en-ZA',
#     zh:  'zh-Hans',
#     pt:  'pt',      // acceptable for both PT and BR
#   }[locale] ?? locale
#
#   return (
#     <html lang={htmlLang}>
#       <body className={`${lora.variable} ${dmSans.variable} ${scriptFontClass}`}>
#         {children}
#       </body>
#     </html>
#   )
#
# The CSS in globals.css already handles the rest:
#   :lang(zh)  → uses var(--font-body-zh)   = Noto Sans SC + DM Sans
#   :lang(hi)  → uses var(--font-body-hi)   = Noto Sans Devanagari + DM Sans
#   :lang(ru)  → uses var(--font-body-ru)   = Noto Sans (Cyrillic) + DM Sans
#   All others → uses var(--font-body)       = DM Sans (Latin covers en/de/nl/fr/it/es/pt/zu)
