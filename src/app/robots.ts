import type { MetadataRoute } from "next";
import { AI_CRAWLERS, IS_INDEXABLE, SITE_URL } from "@/lib/seo/site";

// AI crawlers (GEO) get the same public pages as search engines, so ChatGPT, Claude, Perplexity,
// Gemini, Copilot and Apple can read and recommend Frafol. A crawler that matches its own group
// ignores "*", so each one gets the same rules.

// /robots.txt. Testing / preview deployments (NEXT_PUBLIC_ALLOW_INDEXING not "true") block every
// crawler. The live site lets crawlers fetch every page, private ones included: those carry a
// noindex meta tag (NOINDEX_METADATA), and a crawler can only see it on a page it may fetch.
export default function robots(): MetadataRoute.Robots {
  if (!IS_INDEXABLE) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  const disallow = ["/api/"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: AI_CRAWLERS, allow: ["/", "/llms.txt", "/llms-full.txt"], disallow },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
