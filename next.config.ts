import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**", // Matches all domains using HTTP
      },
      {
        protocol: "https",
        hostname: "**", // Matches all domains using HTTPS
      },
    ],
  },
  // Testing / preview deployments: tell search engines not to index anything, including files and
  // API responses that have no <meta name="robots"> (see src/lib/seo/site.ts).
  async headers() {
    if (process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true") return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "200mb",
    },
    middlewareClientMaxBodySize: "500mb",
  },
};

export default nextConfig;
