import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'substackcdn.com',
        port: '',
        pathname: '/image/**',
      },
    ],
  },
};

export default nextConfig;
