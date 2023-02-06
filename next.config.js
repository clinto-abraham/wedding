/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '3000' || process.env.NODE_ENV,
        pathname: 'https://firebasestorage.googleapis.com/v0/b/wedding-clinto-chippy.appspot.com/o/**',
      },
    ],
  },
}

module.exports = nextConfig
