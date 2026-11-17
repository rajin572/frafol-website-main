import type { NextConfig } from "next";
import { CRAWLER_UA_RE } from "./src/lib/seo/crawlers";

// Crawlers that get the page metadata (title, description, canonical, robots) in <head> before the
// body starts streaming. Next does this only for its own list of HTML-only bots; Googlebot and the
// AI crawlers (which do not run JavaScript) are added. Visitors keep streaming metadata, so the page
// skeleton still shows at once for them.
const htmlLimitedBots = CRAWLER_UA_RE;

const nextConfig: NextConfig = {
  htmlLimitedBots,
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
