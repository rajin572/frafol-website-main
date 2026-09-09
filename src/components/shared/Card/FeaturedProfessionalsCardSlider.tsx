'use client';
import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { AllImages } from "../../../../public/assets/AllImages";
import { getServerUrl } from '@/helpers/config/envConfig';
import Image, { StaticImageData } from 'next/image';
import { IProfessional } from '@/types';




const FeaturedProfessionalsCardSlider = ({ item }: { item: IProfessional }) => {
    const serverUrl = getServerUrl();
    const [currentIndex, setCurrentIndex] = useState(0);


    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Touch swipe tracking (mobile)
    const touchStart = useRef<{ x: number; y: number } | null>(null);
    const touchDelta = useRef<{ x: number; y: number }>({ x: 0, y: 0 });


    const getImageSrc = (src: string | StaticImageData): string | StaticImageData => {
        // If it's a static import (not a string), return as-is
        if (typeof src !== "string") {
            return src;
        }

        // Check if it's already a full URL
        if (src.startsWith("http://") || src.startsWith("https://")) {
            return src;
        }

        // Check if it starts with /uploads and add server URL
        if (src.startsWith("/uploads")) {
            return serverUrl + src;
        }

        // Check if it starts with /assets (local assets)
        if (src.startsWith("/assets")) {
            return src;
        }

        // If no leading slash, prepend /uploads and server URL
        if (!src.startsWith("/")) {
            return serverUrl + "/uploads/" + src;
        }

        // Default case
        return serverUrl + src;
    };


    // ✅ CORRECTED GALLERY LOGIC WITH PROPER PRIORITY
    const gallery = [
        // Priority 1: introVideo (if available)
        ...(item?.introVideo && item.introVideo.length > 0
            ? [{ type: "video", src: item.introVideo, alt: "Intro Video" }]
            : []),

        // Priority 2: bannerImages (show with introVideo OR alone if no introVideo)
        ...(item?.bannerImages && item.bannerImages.length > 0
            ? item.bannerImages.map((img) => ({ type: "image", src: img, alt: "Banner" }))
            : []),
    ];

    // Priority 3: If no introVideo and no bannerImages, use gallery images
    const galleryImages =
        (item?.introVideo || (item?.bannerImages && item.bannerImages.length > 0))
            ? []
            : (item?.gallery && item.gallery.length > 0
                ? item.gallery
                    .filter((file: string) =>
                        /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
                    ) // ✅ only images
                    .slice(0, 3)
                    .map((img: string) => ({
                        type: "image",
                        src: img,
                        alt: "Gallery",
                    }))
                : []);

    const finalGallery = [
        ...gallery,
        ...galleryImages,
    ];

    // Priority 4 & 5: Fallback to profileImage or dummyProfile
    const displayGallery =
        finalGallery.length > 0
            ? finalGallery
            : (item?.profileImage && item.profileImage.length > 0
                ? [{ type: "image", src: item.profileImage, alt: "Profile" }]
                : [{ type: "image", src: AllImages.dummyProfile, alt: "Dummy Profile" }]);

    const currentMedia = displayGallery[currentIndex];
    const hasMultipleItems = displayGallery.length > 1;
    const isCurrentMediaVideo = currentMedia.type === "video";

    // Poster shown instantly while the (heavy) video defers downloading until hover/play
    const posterCandidate =
        displayGallery.find((m) => m.type === "image")?.src ?? item?.profileImage;
    // item?.profileImage;
    const posterSrc =
        typeof posterCandidate === "string"
            ? (getImageSrc(posterCandidate) as string)
            : undefined;

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % displayGallery.length);
        if (videoRef.current) {
            videoRef.current.pause();
        }
        setIsVideoPlaying(false);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? displayGallery.length - 1 : prev - 1
        );
        if (videoRef.current) {
            videoRef.current.pause();
        }
        setIsVideoPlaying(false);
    };

    const handleNext = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        goToNext();
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        goToPrev();
    };

    // Swipe to change the image/video on touch screens
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        touchDelta.current = { x: 0, y: 0 };
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!touchStart.current) return;
        touchDelta.current = {
            x: e.touches[0].clientX - touchStart.current.x,
            y: e.touches[0].clientY - touchStart.current.y,
        };
    };

    const handleTouchEnd = () => {
        const { x, y } = touchDelta.current;
        const SWIPE_THRESHOLD = 50; // px
        // Only act on a mostly-horizontal swipe so vertical page scrolling still works
        if (Math.abs(x) > SWIPE_THRESHOLD && Math.abs(x) > Math.abs(y)) {
            if (x < 0) {
                goToNext(); // swipe left → next
            } else {
                goToPrev(); // swipe right → previous
            }
        }
        touchStart.current = null;
        touchDelta.current = { x: 0, y: 0 };
    };



    // Video control handlers
    const handlePlayPause = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!videoRef.current) return;

        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsVideoPlaying(true);
        } else {
            videoRef.current.pause();
            setIsVideoPlaying(false);
        }
    };

    const handleMuteToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!videoRef.current) return;

        videoRef.current.muted = !videoRef.current.muted;
        setIsVideoMuted(videoRef.current.muted);
    };

    return (
        <div
            className={`relative w-full aspect-video bg-gray-200 overflow-hidden rounded-tl-lg rounded-tr-lg ${hasMultipleItems ? "swiper-no-swiping" : ""}`}
            onTouchStart={hasMultipleItems ? handleTouchStart : undefined}
            onTouchMove={hasMultipleItems ? handleTouchMove : undefined}
            onTouchEnd={hasMultipleItems ? handleTouchEnd : undefined}
        >
            {/* Frafol Choice Badge */}
            {item?.hasActiveSubscription && (
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-secondary-color px-2 py-1 rounded-full z-10 shadow-md">
                    <Image
                        src={AllImages?.batch}
                        width={16}
                        height={16}
                        alt="Frafol Choice Badge"
                        className="size-2.5 sm:size-3 lg:size-4"
                    />
                    <p className="text-white text-[8px] sm: lg:text-sm font-bold">
                        Frafol Choice
                    </p>
                </div>
            )}

            {/* Current Media Display */}
            {currentMedia.type === "image" ? (
                <Image
                    fill
                    src={getImageSrc(currentMedia.src)}
                    alt={currentMedia.alt}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    fetchPriority="high"
                    preload={true}
                    className="w-full !max-h-[250px] sm:!max-h-[250px] lg:!max-h-[300px] aspect-video object-cover rounded-tl-lg rounded-tr-lg "
                />
            ) : (
                <video
                    ref={videoRef}
                    src={typeof currentMedia.src === 'string' ? serverUrl + currentMedia.src : ''} className="w-full h-full object-cover"
                    muted={isVideoMuted}
                    loop
                    playsInline
                    preload="none"
                    poster={posterSrc}
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    onError={() => {
                        console.warn(`Failed to load video: ${currentMedia.src}`);
                    }}
                />
            )}

            {isCurrentMediaVideo && (
                <div className="absolute bottom-5 flex items-center gap-4 px-3 bg-gradient-to-r from-black/20 via-transparent to-black/20 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    {/* Play/Pause Button */}
                    <button
                        onClick={handlePlayPause}
                        className="bg-white/80 hover:bg-white text-gray-900 p-1 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
                        aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                    >
                        {isVideoPlaying ? (
                            <Pause className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                        ) : (
                            <Play className="w-3 h-3 sm:w-4 sm:h-4 fill-current ml-0.5" />
                        )}
                    </button>

                    {/* Mute/Unmute Button */}
                    <button
                        onClick={handleMuteToggle}
                        className="bg-white/80 hover:bg-white text-gray-900 p-1 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
                        aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
                    >
                        {isVideoMuted ? (
                            <VolumeX className="w-3 h-3 sm:w-4 sm:h-4" />
                        ) : (
                            <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                    </button>
                </div>
            )}


            {/* Previous Button */}
            {hasMultipleItems && (
                <button
                    onClick={handlePrev}
                    className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full transition-all duration-200 opacity-100 lg:opacity-0 group-hover:opacity-100"
                    aria-label="Previous media"
                >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            )}

            {/* Next Button */}
            {hasMultipleItems && (
                <button
                    onClick={handleNext}
                    className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full transition-all duration-200 opacity-100 lg:opacity-0 group-hover:opacity-100"
                    aria-label="Next media"
                >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            )}

            {/* Slide Counter / Indicator Dots */}
            {hasMultipleItems && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1">
                    {displayGallery.map((_, index) => (
                        <button
                            key={index}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setCurrentIndex(index);
                            }}
                            className={`transition-all duration-200 rounded-full ${index === currentIndex
                                ? "bg-white w-1.5 h-1.5 sm:w-2 sm:h-2"
                                : "bg-white/50 w-1.5 h-1.5 sm:w-2 sm:h-2"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FeaturedProfessionalsCardSlider;