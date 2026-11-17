import { HTML_LIMITED_BOT_UA_RE } from "next/dist/shared/lib/router/utils/html-bots";
import { AI_CRAWLERS } from "./site";

// User agents of search engine and AI crawlers: Next's own list of HTML-only bots, plus Googlebot and
// the AI crawlers allowed in robots.txt. Used by next.config.ts (metadata in <head> for them) and by
// the proxy (real 404 status for missing profiles, products and posts).
export const CRAWLER_UA_RE = new RegExp([HTML_LIMITED_BOT_UA_RE.source, "Googlebot", ...AI_CRAWLERS].join("|"), "i");
