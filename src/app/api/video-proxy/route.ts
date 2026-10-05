import { NextRequest } from 'next/server';
import { getMediaUrl } from '@/utils/mediaUrl';

// The backend serves /uploads/* as static files without CORS headers, so a
// crossOrigin="anonymous" <video> (needed to read frames into a canvas for
// thumbnails) gets blocked by the browser even though playback itself works
// fine. Proxying through our own origin sidesteps that: same-origin requests
// aren't subject to CORS checks at all.
export async function GET(request: NextRequest) {
    const src = request.nextUrl.searchParams.get('src');

    // Only paths on our own file server: no scheme (http:, blob:, …), no protocol-relative
    // "//host", no backslashes, no traversal, and not the app's own static files.
    if (
        !src ||
        /^(?:[a-z][a-z\d+.-]*:|\/\/|\\)/i.test(src) ||
        /^\/(?:assets|_next)\//.test(src) ||
        src.includes('..')
    ) {
        return new Response('Invalid src', { status: 400 });
    }

    // Accepts "/uploads/x.mp4" as well as a bare "profile/x.mp4" (same mapping as the UI).
    const upstreamUrl = getMediaUrl(src);
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
