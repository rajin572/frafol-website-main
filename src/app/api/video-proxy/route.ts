import { NextRequest } from 'next/server';
import { getServerUrl } from '@/helpers/config/envConfig';

// The backend serves /uploads/* as static files without CORS headers, so a
// crossOrigin="anonymous" <video> (needed to read frames into a canvas for
// thumbnails) gets blocked by the browser even though playback itself works
// fine. Proxying through our own origin sidesteps that: same-origin requests
// aren't subject to CORS checks at all.
export async function GET(request: NextRequest) {
    const src = request.nextUrl.searchParams.get('src');

    if (!src || !src.startsWith('/') || src.startsWith('//') || src.includes('..')) {
        return new Response('Invalid src', { status: 400 });
    }

    const upstreamUrl = `${getServerUrl()}${src}`;
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
