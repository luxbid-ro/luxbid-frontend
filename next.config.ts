import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://luxbid-backend.onrender.com',
  },
  serverExternalPackages: [],
  // Force all pages to use SSR to ensure middleware runs
  experimental: {
    forceSwcTransforms: true,
  },
  // Disable static optimization to ensure middleware runs on all requests
  trailingSlash: false,
  poweredByHeader: false,
};

export default nextConfig;
