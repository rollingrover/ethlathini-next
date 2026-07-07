// app/book/RatesTable.jsx
// ─────────────────────────────────────────────────────────────────
// PURE SERVER COMPONENT — no 'use client', no JS shipped to browser.
// Renders fully in initial HTML — visible to crawlers and curl.
// Targets: "Hluhluwe camping rates", "overland campsite KZN price",
//          "Hluhluwe-iMfolozi camping cost"
//
// ── OWNER: UPDATE RATES HERE ─────────────────────────────────────
// Fill in the R___ placeholders below. These render as static HTML.
// After updating, redeploy to Vercel (or push to GitHub if connected).

const RATES = {
  // ── Nightly site rates ────────────────────────────────────────
  overland:       'R___',   // overland/rooftop tent site (up to 2 people)
  group:          'R___',   // group site (up to 3 vehicles / 8 people)
  volunteer:      'R___',   // volunteer room in main house

  // ── Additional per-person charges ────────────────────────────
  extraAdult:     'R___',   // per adult beyond base 2 included
  childUnder12:   'R___',   // per child under 12
  extraVehicle:   'R___',   // per additional vehicle beyond site allocation
  childUnder5:    'Free',   // children under 5

  // ── Deposit ───────────────────────────────────────────────────
  deposit:        '50%',    // deposit required to confirm booking

  // ── Updated date ─────────────────────────────────────────────
  ratesDate:      '2026',
}

export default function RatesTable() {
  return (
    <section id="rates" className="rates-table-section">
      <div className="wrap">

        {/* ── Section header ── */}
        <div className="rates-table-header">
          <span className="eyebrow">Camping Rates — Hluhluwe, KwaZulu-Natal</span>
          <h2>Campsite Rates &amp; Pricing</h2>
          <p className="rates-table-intro">
            Self-contained overland campsites in a mahogany and fig forest,
            2km from Memorial Gate, Hluhluwe-iMfolozi Park. Direct booking only —
            no platform fees, no middleman.
          </p>
        </div>

        {/* ── Main rates table ── */}
        <div className="rates-table-wrap">
          <table className="rates-table">
            <caption className="rates-table-caption">
              Ethlathini Rest Camp nightly camping rates — {RATES.ratesDate}
            </caption>
            <thead>
              <tr>
                <th scope="col">Site type</th>
                <th scope="col">Rate</th>
                <th scope="col">Includes</th>
                <th scope="col">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Overland / Rooftop Tent Site</strong>
                  <span className="rates-table-badge">Most popular</span>
                </td>
                <td className="rates-table-price">
                  <span className="rates-table-amount">{RATES.overland}</span>
                  <span className="rates-table-unit"> / night</span>
                </td>
                <td>Up to 2 people · 1 vehicle + trailer · firepit · free firewood</td>
                <td>Self-contained rigs only — no ablutions available yet</td>
              </tr>
              <tr>
                <td><strong>Group Site</strong></td>
                <td className="rates-table-price">
                  <span className="rates-table-amount">{RATES.group}</span>
                  <span className="rates-table-unit"> / night</span>
                </td>
                <td>Up to 8 people · 3 vehicles · communal firepit · free firewood</td>
                <td>Ideal for convoys and 4x4 clubs</td>
              </tr>
              <tr>
                <td><strong>Volunteer Room (main house)</strong></td>
                <td className="rates-table-price">
                  <span className="rates-table-amount">{RATES.volunteer}</span>
                  <span className="rates-table-unit"> / night</span>
                </td>
                <td>Indoor room · shared bathroom · WiFi</td>
                <td>Contact us for availability — limited rooms</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Additional charges table ── */}
        <div className="rates-table-wrap" style={{ marginTop: '1.5rem' }}>
          <table className="rates-table rates-table--extras">
            <caption className="rates-table-caption">Additional charges per night</caption>
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Extra adult (beyond 2 included)</td>
                <td className="rates-table-price">
                  <span className="rates-table-amount">{RATES.extraAdult}</span>
                  <span className="rates-table-unit"> / person</span>
                </td>
              </tr>
              <tr>
                <td>Child under 12</td>
                <td className="rates-table-price">
                  <span className="rates-table-amount">{RATES.childUnder12}</span>
                  <span className="rates-table-unit"> / child</span>
                </td>
              </tr>
              <tr>
                <td>Extra vehicle</td>
                <td className="rates-table-price">
                  <span className="rates-table-amount">{RATES.extraVehicle}</span>
                  <span className="rates-table-unit"> / vehicle</span>
                </td>
              </tr>
              <tr>
                <td>Child under 5</td>
                <td className="rates-table-price">
                  <span className="rates-table-amount rates-table-free">{RATES.childUnder5}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Deposit note ── */}
        <p className="rates-table-note">
          <strong>{RATES.deposit} deposit</strong> required to confirm your booking.
          Balance payable on arrival. EFT and cash accepted.
        </p>

        {/* ── Footer note ── */}
        <p className="rates-table-footer">
          <small>
            Rates current as at {RATES.ratesDate} · Book directly via WhatsApp or the form below —
            no platform fees · Hluhluwe-iMfolozi Park Big 5 country · KwaZulu-Natal, South Africa
          </small>
        </p>

      </div>
    </section>
  )
}
