// components/StructuredData.jsx
// Pure Server Component — no 'use client', zero JS shipped to browser.
// Renders one or more JSON-LD <script> tags in the page <head> area.
//
// Usage:
//   import { StructuredData } from '../components/StructuredData'
//   <StructuredData data={mySchema} />
//   <StructuredData data={[schema1, schema2]} />  ← multiple schemas

export function StructuredData({ data }) {
  // Support single schema object or array of schemas
  const schemas = Array.isArray(data) ? data : [data]
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
