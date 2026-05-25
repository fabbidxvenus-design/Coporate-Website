/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
    // Cho phép load ảnh local
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
};

export default nextConfig;