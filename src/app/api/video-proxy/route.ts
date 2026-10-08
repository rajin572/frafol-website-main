import { NextRequest } from 'next/server';
import { getMediaUrl } from '@/utils/mediaUrl';
import { getServerUrl } from '@/helpers/config/envConfig';

// Media is served either by our file server (/uploads/*) or from the Frafol S3 buckets as
// full https URLs. Neither sends CORS headers, so a crossOrigin="anonymous" <video> (needed
// to read frames into a canvas for thumbnails) gets blocked by the browser even though
// playback itself works fine. Proxying through our own origin sidesteps that: same-origin
// requests aren't subject to CORS checks at all.
const S3_HOST = /^frafol-media-[a-z0-9-]+\.s3[.-][a-z0-9-]+\.amazonaws\.com$/i;

// Resolves `src` to an upstream URL we're willing to fetch, or null. This is an open-proxy
// risk, so absolute URLs are limited to our own storage hosts.
const resolveUpstream = (src: string): string | null => {
    if (src.includes('..') || src.includes('\\')) return null;

    if (/^https:\/\//i.test(src)) {
        let url: URL;
        try {
            url = new URL(src);
        } catch {
            return null;
        }
        let serverHost = '';
        try {
            serverHost = new URL(getServerUrl() ?? '').host;
        } catch { /* no/invalid server URL — only S3 is allowed */ }
        const allowed = S3_HOST.test(url.hostname) || (!!serverHost && url.host === serverHost);
        return allowed && !url.username && !url.password ? url.href : null;
    }

    // Any other scheme (http:, blob:, data:, …), protocol-relative "//host", or the app's
    // own static files are not ours to proxy.
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(src) || /^\/(?:assets|_next)\//.test(src)) return null;

    // "/uploads/x.mp4" as well as a bare "profile/x.mp4" (same mapping as the UI).
    return getMediaUrl(src);
};

export async function GET(request: NextRequest) {
    const src = request.nextUrl.searchParams.get('src');
    const upstreamUrl = src ? resolveUpstream(src) : null;

    if (!upstreamUrl) {
        return new Response('Invalid src', { status: 400 });
    }

    const range = request.headers.get('range');

    const upstreamRes = await fetch(upstreamUrl, {
        headers: range ? { range } : undefined,
        cache: 'no-store',
    });

    if (!upstreamRes.ok && upstreamRes.status !== 206) {
        return new Response('Not found', { status: upstreamRes.status });
    }

    const headers = new Headers();
    (['content-type', 'content-length', 'content-range', 'accept-ranges'] as const).forEach((key) => {
        const value = upstreamRes.headers.get(key);
        if (value) headers.set(key, value);
    });

    return new Response(upstreamRes.body, {
        status: upstreamRes.status,
        headers,
    });
}
