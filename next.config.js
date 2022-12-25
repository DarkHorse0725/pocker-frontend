// /** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  reactStrictMode: true,
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
  },
});