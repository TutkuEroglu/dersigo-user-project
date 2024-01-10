/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['randomuser.me','img.dummyapi.io', 'upload.wikimedia.org'],
  },
}

module.exports = nextConfig
