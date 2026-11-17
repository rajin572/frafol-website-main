import { NextResponse, type NextRequest } from "next/server";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { isMissingRecord } from "@/lib/isMissingRecord";
import { CRAWLER_UA_RE } from "./crawlers";

// Detail pages whose record may not exist, and the API endpoint that holds the record.
const DETAIL_PAGES: { page: RegExp; api: (id: string) => string }[] = [
  { page: /^\/professionals\/([^/]+)(?:\/works)?\/?$/, api: (id) => `/users/${id}` },
  { page: /^\/marketplace\/([^/]+)\/?$/, api: (id) => `/marketPlace/${id}` },
  { page: /^\/forums\/([^/]+)\/?$/, api: (id) => `/community/${id}` },
];

// Real 404 status for search engine and AI crawlers on a missing profile, product or post.
//
// The pages call notFound() themselves, but the loading skeleton (loading.tsx) is streamed first,
// so the status is already "200" when the page finds out the record is missing: visitors get the
// "Nič sa nenašlo" page with noindex, crawlers would see a soft 404. For crawlers only, the record is
// checked here, before rendering, so the status can still be 404. Visitors skip this check, so their
// pages get no extra API call.
//
// Returns undefined for other paths, NextResponse.next() when the page may render normally.
export const missingRecordForCrawlers = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const match = DETAIL_PAGES.map(({ page, api }) => ({ id: page.exec(pathname)?.[1], api })).find(({ id }) => id);
  if (!match?.id) return undefined;
  if (!CRAWLER_UA_RE.test(request.headers.get("user-agent") ?? "")) return NextResponse.next();

  try {
    const res = await fetch(`${getBaseUrl()}${match.api(encodeURIComponent(match.id))}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    let record: unknown = null;
    try {
      record = JSON.parse(await res.text())?.data;
    } catch {
      // empty or non-JSON body: no record data
    }
    if (isMissingRecord(res.status, record)) {
      // No route matches this path, so Next renders the not-found page with a 404 status.
      return NextResponse.rewrite(new URL("/_not-found-record", request.url));
    }
  } catch {
    // API not reachable or too slow: let the page render (a server error is not "missing")
  }
  return NextResponse.next();
};
