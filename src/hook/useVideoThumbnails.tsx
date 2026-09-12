// hooks/useVideoThumbnails.ts
import { useEffect, useRef, useState } from 'react';

const NEAR_BLACK_THRESHOLD = 16; // 0-255 average luminance
const STALL_TIMEOUT_MS = 4000; // max time to wait between steps before giving up

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

// Generates a poster image for each video by grabbing a frame client-side,
// so video tiles show an actual preview instead of a blank player.
const useVideoThumbnails = (videoSrcs: (string | undefined | null)[]) => {
    const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
    const processedSrcs = useRef<Set<string>>(new Set());

    useEffect(() => {
        const validSrcs = videoSrcs.filter((src): src is string => !!src);

        validSrcs.forEach((src) => {
            if (processedSrcs.current.has(src)) return;
            processedSrcs.current.add(src);

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

            const cleanup = () => {
                clearTimeout(stallTimeoutId);
                previewVideo.removeEventListener('loadedmetadata', handleLoadedMetadata);
                previewVideo.removeEventListener('loadeddata', handleLoadedData);
                previewVideo.removeEventListener('seeked', handleSeeked);
                previewVideo.removeEventListener('error', handleError);
                previewVideo.remove();
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
                if (captured) return;

                const canvas = document.createElement('canvas');
                canvas.width = previewVideo.videoWidth;
                canvas.height = previewVideo.videoHeight;
                if (!canvas.width || !canvas.height) return;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;
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
                    // Cross-origin video without a matching CORS response taints the canvas.
                }
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
                setTimeout(attemptCapture, 300);
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
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoSrcs.join('|')]);

    return thumbnails;
};

export default useVideoThumbnails;
