/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other config settings
  images: {
    // This is the array where you configure all external image domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Your previous domain
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // **NEW: The Sanity CDN domain**
      },
    ],
  },
};

module.exports = nextConfig;