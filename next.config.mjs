/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
  // Payload CMS is optional — skip bundling if not installed
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), 'payload'];
    }
    return config;
  },
};

export default nextConfig;