import type { Metadata } from "next";

// ---------------------------------------------------------------------------------------------
// Site-wide SEO settings.
//
// NEXT_PUBLIC_SITE_URL       Public address of this deployment, e.g. https://frafol.sk. Used for
//                            canonical URLs, the sitemap, Open Graph and JSON-LD.
// NEXT_PUBLIC_ALLOW_INDEXING "true" only on the live website. Anywhere else (testing, preview,
//                            local) every page is noindex, robots.txt blocks all crawlers and the
//                            sitemap is empty, so a testing copy never ends up in Google.
// ---------------------------------------------------------------------------------------------

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://frafol.sk").replace(/\/+$/, "");
export const SITE_NAME = "Frafol";
export const IS_INDEXABLE = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const DEFAULT_TITLE = "Frafol – Fotografi a kameramani na Slovensku";
export const DEFAULT_DESCRIPTION =
  "Nájdite skúsených fotografov a kameramanov, pozrite si ich portfóliá a jednoducho si objednajte svoje ďalšie fotenie alebo natáčanie.";

export const OG_IMAGE = { url: "/og-image.png", width: 1200, height: 630, alt: "Frafol" };

// Company details (same as on /contact-us), used by the Organization JSON-LD.
export const ORGANIZATION = {
  legalName: "FRAFOL s.r.o.",
  email: "cvak@frafol.sk",
  telephone: "+421917174707",
  vatID: "2122571286", // DIČ
  taxID: "57113904", // IČO
  address: {
    streetAddress: "Vysokoškolákov 8556/33B",
    postalCode: "010 08",
    addressLocality: "Žilina",
    addressCountry: "SK",
  },
  sameAs: ["https://www.instagram.com/frafol.sk", "https://www.tiktok.com/@frafol.sk"],
};

// Private pages (dashboard, messages, cart, sign-in, sign-up, join, notifications, success) are kept
// out of search results by NOINDEX_METADATA in their layout or page, NOT by robots.txt: a URL that
// robots.txt blocks is never fetched, so the crawler never sees its noindex and can still list it.

// AI search / assistant crawlers (GEO). robots.ts gives them the same access as search engines, and
// next.config.ts serves them the full metadata in <head> (they do not run JavaScript).
export const AI_CRAWLERS = [
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

export const absoluteUrl = (path = "/") => (/^https?:\/\//.test(path) ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`);

const ROBOTS_INDEX: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
};
const ROBOTS_NOINDEX: Metadata["robots"] = { index: false, follow: false, googleBot: { index: false, follow: false } };

export const robotsFor = (noIndex = false): Metadata["robots"] => (IS_INDEXABLE && !noIndex ? ROBOTS_INDEX : ROBOTS_NOINDEX);

// Metadata for private pages (login, cart, dashboards, messages …): no index, no canonical.
export const NOINDEX_METADATA: Metadata = { robots: ROBOTS_NOINDEX };

// Turns rich text (forum posts, product descriptions) into a short plain-text description.
export const toPlainText = (html?: string, maxLength = 160) => {
  if (!html) return "";
  const text = html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength - 1);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), maxLength * 0.6)).trim()}…`;
};

type PageMetadataInput = {
  title: string;
  description: string;
  // Path of the canonical URL, e.g. "/photography" (query params allowed when they change the content).
  path: string;
  images?: { url: string; width?: number; height?: number; alt?: string }[];
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
};

// Title, description, canonical URL, Open Graph and Twitter card for one public page.
export const pageMetadata = ({ title, description, path, images, type = "website", noIndex }: PageMetadataInput): Metadata => {
  const ogImages = images?.length ? images : [OG_IMAGE];
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: robotsFor(noIndex),
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "sk_SK",
      type,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages.map((image) => image.url),
    },
  };
};
