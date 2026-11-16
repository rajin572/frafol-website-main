import type { MetadataRoute } from "next";
import { IS_INDEXABLE, PRIVATE_PATHS, SITE_URL } from "@/lib/seo/site";

// AI search / assistant crawlers (GEO). They are allowed the same public pages as search engines,
// so ChatGPT, Claude, Perplexity, Gemini, Copilot and Apple can read and recommend Frafol. A
// crawler that matches its own group ignores "*", so each one gets the same rules.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI (training)
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT browsing on a user's request
  "ClaudeBot", // Anthropic
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini / AI Overviews grounding
  "Applebot-Extended", // Apple Intelligence
  "Bingbot", // Bing + Microsoft Copilot (also feeds ChatGPT search)
  "CCBot", // Common Crawl (used by many AI models)
  "meta-externalagent", // Meta AI
];

// /robots.txt. Testing / preview deployments (NEXT_PUBLIC_ALLOW_INDEXING not "true") block every
// crawler. The live site allows the public pages and keeps crawlers out of the private ones.
export default function robots(): MetadataRoute.Robots {
  if (!IS_INDEXABLE) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  const disallow = [...PRIVATE_PATHS, "/api/"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: AI_CRAWLERS, allow: ["/", "/llms.txt", "/llms-full.txt"], disallow },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
