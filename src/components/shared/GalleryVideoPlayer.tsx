import React, { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { getServerUrl } from '@/helpers/config/envConfig';

interface GalleryVideoPlayerProps {
    src: string;
    poster?: string;
    className?: string;
    wrapperClassName?: string;
    onPlay?: () => void;
    videoRef?: (el: HTMLVideoElement | null) => void;
    children?: React.ReactNode;
}

// Poster-first video tile matching the professional card's video preview:
// shows a real frame + play button instead of a blank player until clicked.
const GalleryVideoPlayer = ({
    src,
    poster,
    className,
    wrapperClassName,
    onPlay,
    videoRef,
    children,
}: GalleryVideoPlayerProps) => {
    const serverUrl = getServerUrl();
    const internalRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div
            className={`relative group w-full overflow-hidden ${wrapperClassName ?? 'aspect-video bg-gray-200 rounded-lg'}`}
        >
            <video
                ref={(el) => {
                    internalRef.current = el;
                    videoRef?.(el);
                }}
                src={serverUrl + src}
                poster={poster}
                controls={isPlaying}
                playsInline
                preload="metadata"
                controlsList="nodownload noplaybackrate"
                className={className ?? 'w-full h-full object-cover'}
                onPlay={() => {
                    setIsPlaying(true);
                    onPlay?.();
                }}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
            >
                Your browser does not support the video tag.
            </video>

            {!isPlaying && (
                <button
                    type="button"
                    onClick={() => internalRef.current?.play()}
                    className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors cursor-pointer"
                    aria-label="Play video"
                >
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/85 shadow-lg transition-transform duration-200 group-hover:scale-110">
                        <Play className="w-5 h-5 text-gray-900 fill-current ml-0.5" />
                    </span>
                </button>
            )}

            {children}
        </div>
    );
};

export default GalleryVideoPlayer;
