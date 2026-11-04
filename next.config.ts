import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  // Don't advertise the framework in responses (`X-Powered-By: Next.js`).
  poweredByHeader: false,
  // Hide the "N" route badge in development; errors still surface.
  devIndicators: false,
};

export default nextConfig;
