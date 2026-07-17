// app/[locale]/book/RatesTable.jsx
// ─────────────────────────────────────────────────────────────────
// PURE SERVER COMPONENT — no 'use client', no JS shipped to browser.
// Renders fully in initial HTML — visible to crawlers and curl.
// Targets: "Hluhluwe camping rates", "overland campsite KZN price",
//          "Hluhluwe-iMfolozi camping cost"
//
// ── OWNER: UPDATE RATES HERE ─────────────────────────────────────
// Fill in real amounts below. These render as static HTML.
// Prices also appear in lib/seo.js campingOfferSchema() — keep both in sync.

import { getTranslations } from 'next-intl/server'

const RATES = {
  overland:       'R200',   // overland/rooftop tent site (up to 2 people)
  group:          'R450',   // group site (up to 3 vehicles / 8 people)
  volunteer:      'packages available',   // volunteer room in main house

  extraAdult:     'R50',
  childUnder12:   'R20',
  extraVehicle:   'R75',
  childUnder5:    'Free',

  deposit:        '50%',
  ratesDate:      '2026',
}

export default async function RatesTable({ locale }) {
  const t = await getTranslations({ locale, namespace: 'book' })

  return (
    <section id="rates" className="rates-table-section">
      <div className="wrap">

        {/* ── Section header ── */}
        <div className="rates-table-header">
          <span className="eyebrow">{t('rates_eyebrow')}</span>
          <h2>{t('rates_title')}</h2>
          <p className="rates-table-intro">{t('rates_intro')}</p>
        </div>

        {/* ── Main rates table ── */}
        <div className="rates-table-wrap">
          <table className="rates-table">
            <caption className="rates-table-caption">
              {t('rates_caption', { year: RATES.ratesDate })}
            </caption>
            <thead>
              <tr>
                <th scope="col">{t('rates_th_type')}</th>
                <th scope="col">{t('rates_th_rate')}</th>
                <th scope="col">{t('rates_th_includes')}</th>
                <th scope="col">{t('rates_th_notes')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>{t('rates_row_overland_name')}</strong>
                  <span className="rates-table-badge">{t('mostPopular')}</span>
                </td>
                <td className="rates-table-price">
                  <span className="rates-table-amount">{RATES.overland}</span>
                  <span className="rates-table-unit"> {t('perNight')}</span>
                </td>
                <td>{t('rates_row_overland_includes')}</td>
                <td>{t('rates_row_overland_notes')}</td>
              </tr>
              <tr>
                <td><strong>{t('rates_row_group_name')}</strong></td>
                <td className="rates-table-price">
                  <span className="rates-table-amount">{RATES.group}</span>
                  <span className="rates-table-unit"> {t('perNight')}</span>
                </td>
                <td>{t('rates_row_group_includes')}</td>
                <td>{t('rates_row_group_notes')}</td>
              </tr>
              <tr>
                <td><strong>{t('rates_row_volunteer_name')}</strong></td>
                <td className="rates-table-price">
                  <span className="rates-table-amount">{RATES.volunteer}</span>
                </td>
                <td>{t('rates_row_volunteer_includes')}</td>
                <td>{t('rates_row_volunteer_notes')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Additional charges table ── */}
        <div className="rates-table-wrap" style={{ marginTop: '1.5rem' }}>
          <table className="rates-table rates-table--extras">
            <caption className="rates-table-caption">{t('rates_extras_caption')}</caption>
            <thead>
              <tr>
                <th scope="col">{t('rates_extras_th_item')}</th>
                <th scope="col">{t('rates_extras_th_rate')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t('rates_extras_extraAdult')}</td>
                <td className="rates-table-price">
                  <span className="rates-table-amount">{RATES.extraAdult}</span>
                  <span className="rates-table-unit"> {t('rates_extras_perPerson')}</span>
                </td>
              </tr>
              <tr>
                <td>{t('rates_extras_childUnder12')}</td>
                <td className="rates-table-price">
                  <span className="rates-table-amount">{RATES.childUnder12}</span>
                  <span className="rates-table-unit"> {t('rates_extras_perChild')}</span>
                </td>
              </tr>
              <tr>
                <td>{t('rates_extras_extraVehicle')}</td>
                <td className="rates-table-price">
                  <span className="rates-table-amount">{RATES.extraVehicle}</span>
                  <span className="rates-table-unit"> {t('rates_extras_perVehicle')}</span>
                </td>
              </tr>
              <tr>
                <td>{t('rates_extras_childUnder5')}</td>
                <td className="rates-table-price">
                  <span className="rates-table-amount rates-table-free">{RATES.childUnder5}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Deposit note ── */}
        <p className="rates-table-note">
          {t.rich('rates_deposit_note', { strong: (chunks) => <strong>{chunks}</strong>, deposit: RATES.deposit })}
        </p>

        {/* ── Footer note ── */}
        <p className="rates-table-footer">
          <small>{t('rates_footer_note', { year: RATES.ratesDate })}</small>
        </p>

      </div>
    </section>
  )
}
