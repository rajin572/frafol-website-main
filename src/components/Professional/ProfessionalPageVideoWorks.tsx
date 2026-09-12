"use client";
import React, { useCallback, useMemo, useRef } from 'react';
import GalleryVideoPlayer from '@/components/shared/GalleryVideoPlayer';
import useVideoThumbnails from '@/hook/useVideoThumbnails';

const ProfessionalPageVideoWorks = ({ galleryVideos }: { galleryVideos: string[] }) => {

    const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
    const topVideos = useMemo(() => galleryVideos?.slice(0, 3) ?? [], [galleryVideos]);
    const videoThumbnails = useVideoThumbnails(topVideos);

    const handlePlay = useCallback((currentIndex: number) => {
        videoRefs.current.forEach((video, idx) => {
            if (!video) return;
            if (idx !== currentIndex && !video.paused) {
                video.pause();
            }
        });
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topVideos.map((item, index) => (
                <GalleryVideoPlayer
                    key={index}
                    src={item}
                    poster={videoThumbnails[item]}
                    videoRef={(el) => {
                        videoRefs.current[index] = el;
                    }}
                    onPlay={() => handlePlay(index)}
                />
            ))}
        </div>
    );
};

export default ProfessionalPageVideoWorks;