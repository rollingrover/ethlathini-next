/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin')
const withNextIntl = createNextIntlPlugin('./i18n/request.js')

const isProd = process.env.VERCEL_ENV === 'production'

const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'ALLOW-FROM https://rollingrover.co.za',
  },
  {
    key: 'Content-Security-Policy',
    value: "frame-ancestors 'self' https://rollingrover.co.za https://www.rollingrover.co.za",
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
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'ethlathini.co.za' }],
        destination: 'https://www.ethlathini.co.za/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = withNextIntl(nextConfig)