/** @type {import('next').NextConfig} */

const isProd = process.env.VERCEL_ENV === 'production'

const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self)',
  },
  {
    // Block staging from indexing; production gets index, follow
    key: 'X-Robots-Tag',
    value: isProd ? 'index, follow' : 'noindex, nofollow',
  },
]

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // quality is set per-<Image> component via quality={80} prop
  },

  trailingSlash: false,

  async headers() {
    return [
      {
        // Apply security headers to every route
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },

  async redirects() {
    return [
      // Redirect apex domain → www for canonical consistency (Task C4)
      // Note: This redirect works at Next.js level; also set in Vercel dashboard
      // for DNS-level redirect (before Next.js handles the request).
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'ethlathini.co.za' }],
        destination: 'https://www.ethlathini.co.za/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
