import type { MetadataRoute } from "next";
import { IS_INDEXABLE, PRIVATE_PATHS, SITE_URL } from "@/lib/seo/site";

// /robots.txt. Testing / preview deployments (NEXT_PUBLIC_ALLOW_INDEXING not "true") block every
// crawler. The live site allows the public pages and keeps crawlers out of the private ones.
export default function robots(): MetadataRoute.Robots {
  if (!IS_INDEXABLE) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...PRIVATE_PATHS, "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
