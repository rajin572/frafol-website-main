// hooks/useVideoThumbnails.ts
import { useEffect, useRef, useState } from 'react';

const NEAR_BLACK_THRESHOLD = 16; // 0-255 average luminance
const STALL_TIMEOUT_MS = 4000; // max time to wait between steps before giving up
// A thumbnail never needs the video's full size. Capturing a 4K frame into a canvas costs ~33 MB
// per video, and several at once make iPhone Safari run out of memory and reload the page. 960px
// stays sharp as a poster on large tiles (2x screens included) at about 2 MB per frame.
const MAX_THUMBNAIL_WIDTH = 960;
// Videos prepared at the same time, across the whole page. One would let a single slow video hold
// up every later one; unlimited is what crashed iPhones.
const MAX_CONCURRENT_THUMBNAILS = 2;

// Downsamples a frame and checks whether it's essentially black — screen
// recordings and some clips open on a black/loading frame, which makes a
// technically-correct but useless thumbnail.
const isFrameNearBlack = (source: CanvasImageSource) => {
    try {
        const size = 16;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) return false;
        ctx.drawImage(source, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);
        let sum = 0;
        for (let i = 0; i < data.length; i += 4) {
            sum += (data[i] + data[i + 1] + data[i + 2]) / 3;
        }
        return sum / (data.length / 4) < NEAR_BLACK_THRESHOLD;
    } catch {
        return false;
    }
};

// A small page-wide limiter. Many hidden <video> elements decoding at once is what exhausts memory
// on iPhones. A task must call `done` exactly once; if it throws, its slot is released anyway so
// one failure can never block the videos behind it.
let activeThumbnails = 0;
const pendingThumbnails: Array<() => void> = [];

const runNextThumbnail = () => {
    while (activeThumbnails < MAX_CONCURRENT_THUMBNAILS && pendingThumbnails.length > 0) {
        pendingThumbnails.shift()?.();
    }
};

const scheduleThumbnail = (task: (done: () => void) => void) => {
    pendingThumbnails.push(() => {
        activeThumbnails += 1;
        let released = false;
        const done = () => {
            if (released) return;
            released = true;
            activeThumbnails -= 1;
            runNextThumbnail();
        };
        try {
            task(done);
        } catch {
            done();
        }
    });
    runNextThumbnail();
};

// Generates a poster image for each video by grabbing a frame client-side,
// so video tiles show an actual preview instead of a blank player.
const useVideoThumbnails = (videoSrcs: (string | undefined | null)[]) => {
    const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
    const processedSrcs = useRef<Set<string>>(new Set());
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        const validSrcs = videoSrcs.filter((src): src is string => !!src);

        const generate = (src: string, done: () => void) => {
            let finished = false;
            const finish = () => {
                if (finished) return;
                finished = true;
                done();
            };

            const previewVideo = document.createElement('video');
            previewVideo.muted = true;
            previewVideo.playsInline = true;
            previewVideo.preload = 'metadata';
            // Chrome/Safari can fail to decode a seeked frame for a video that's
            // never attached to the DOM, so keep it real (but invisible).
            previewVideo.style.position = 'fixed';
            previewVideo.style.top = '-9999px';
            previewVideo.style.left = '-9999px';
            previewVideo.style.width = '1px';
            previewVideo.style.height = '1px';
            previewVideo.setAttribute('aria-hidden', 'true');

            let captured = false;
            let offsets: number[] = [0];
            let offsetIndex = 0;
            let stallTimeoutId: ReturnType<typeof setTimeout> | undefined;
            let loadedDataTimeoutId: ReturnType<typeof setTimeout> | undefined;

            const cleanup = () => {
                clearTimeout(stallTimeoutId);
                clearTimeout(loadedDataTimeoutId);
                previewVideo.removeEventListener('loadedmetadata', handleLoadedMetadata);
                previewVideo.removeEventListener('loadeddata', handleLoadedData);
                previewVideo.removeEventListener('seeked', handleSeeked);
                previewVideo.removeEventListener('error', handleError);
                // Detach the source so the browser releases the video decoder; a removed <video>
                // that still has a src can keep its buffers alive.
                previewVideo.removeAttribute('src');
                previewVideo.load();
                previewVideo.remove();
                finish();
            };

            // Trying multiple candidate timestamps (each a fresh network seek over
            // a possibly slow connection) can take a while — rearm on every step
            // instead of one fixed deadline, so only a genuine stall gives up.
            const armStallTimeout = () => {
                clearTimeout(stallTimeoutId);
                stallTimeoutId = setTimeout(() => {
                    attemptCapture();
                    cleanup();
                }, STALL_TIMEOUT_MS);
            };

            // Tries the current frame; if it looks black and another candidate
            // timestamp is queued, seeks there instead of settling for it.
            const attemptCapture = () => {
                // `finished` makes a late timer or event after cleanup a harmless no-op.
                if (captured || finished) return;

                const videoWidth = previewVideo.videoWidth;
                const videoHeight = previewVideo.videoHeight;
                if (!videoWidth || !videoHeight) return;
                const scale = Math.min(1, MAX_THUMBNAIL_WIDTH / videoWidth);
                const canvas = document.createElement('canvas');
                canvas.width = Math.max(1, Math.round(videoWidth * scale));
                canvas.height = Math.max(1, Math.round(videoHeight * scale));
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    // No canvas available (e.g. the browser is out of canvas memory): waiting
                    // longer cannot help, so give up now and free the slot for the next video.
                    cleanup();
                    return;
                }
                ctx.drawImage(previewVideo, 0, 0, canvas.width, canvas.height);

                const isLastCandidate = offsetIndex >= offsets.length - 1;
                if (!isLastCandidate && isFrameNearBlack(canvas)) {
                    offsetIndex += 1;
                    previewVideo.currentTime = offsets[offsetIndex];
                    armStallTimeout();
                    return;
                }

                try {
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                    captured = true;
                    setThumbnails((prev) => ({ ...prev, [src]: dataUrl }));
                } catch {
                    // Cross-origin video without a matching CORS response taints the canvas: no
                    // thumbnail is possible, the cleanup below releases the slot straight away.
                }
                // Free the canvas bitmap right away instead of waiting for garbage collection.
                canvas.width = 0;
                canvas.height = 0;
                cleanup();
            };

            const handleLoadedMetadata = () => {
                const duration = previewVideo.duration;
                offsets = isFinite(duration) && duration > 0
                    ? [0.15, 0.4, 0.7].map((fraction) => Math.max(0, Math.min(duration * fraction, duration - 0.05)))
                    : [0];
                offsetIndex = 0;
                armStallTimeout();

                if (offsets[0] > 0) {
                    previewVideo.currentTime = offsets[0];
                } else {
                    attemptCapture();
                }
            };

            const handleSeeked = () => attemptCapture();

            // Safety net: some browsers never fire "seeked" for an offscreen video,
            // so also try shortly after the first frame becomes available.
            const handleLoadedData = () => {
                clearTimeout(loadedDataTimeoutId);
                loadedDataTimeoutId = setTimeout(attemptCapture, 300);
            };

            const handleError = () => cleanup();

            previewVideo.addEventListener('loadedmetadata', handleLoadedMetadata);
            previewVideo.addEventListener('loadeddata', handleLoadedData);
            previewVideo.addEventListener('seeked', handleSeeked);
            previewVideo.addEventListener('error', handleError);

            armStallTimeout();

            // Routed through our own origin: the backend serves /uploads/*
            // without CORS headers, which would otherwise taint the canvas above.
            previewVideo.src = `/api/video-proxy?src=${encodeURIComponent(src)}`;
            document.body.appendChild(previewVideo);
        };

        validSrcs.forEach((src) => {
            if (processedSrcs.current.has(src)) return;
            processedSrcs.current.add(src);

            scheduleThumbnail((done) => {
                // Left the page before its turn: don't start a download nobody waits for.
                if (!isMounted.current) {
                    done();
                    return;
                }
                generate(src, done);
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoSrcs.join('|')]);

    return thumbnails;
};

export default useVideoThumbnails;
