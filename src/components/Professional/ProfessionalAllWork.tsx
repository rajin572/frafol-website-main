"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import ImageGallery from "@/components/ui/ImageGallery";
import Container from "@/components/ui/Container";
import { IProfessionalUser } from "@/types";
import { FiChevronDown } from "react-icons/fi";
import GalleryVideoPlayer from "@/components/shared/GalleryVideoPlayer";
import useVideoThumbnails from "@/hook/useVideoThumbnails";

const columnsCountBreakPoints = { 350: 1, 600: 2, 1024: 3 };

// Collapsible block (photos / videos) of the full portfolio page.
const WorkSection = ({
  title,
  count,
  open,
  onToggle,
  children,
}: {
  title: string;
  count: number;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <button
      type="button"
      aria-expanded={open}
      onClick={onToggle}
      className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-base-color">
        {title} ({count})
      </h3>
      <FiChevronDown className={`text-2xl transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
    </button>

    <div
      className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[10000px] opacity-100" : "max-h-0 opacity-0"}`}
    >
      <div className="p-6 pt-8">{children}</div>
    </div>
  </div>
);

const ProfessionalAllImages = ({
  id,
  professionalUser,
}: {
  id: string;
  professionalUser: IProfessionalUser;
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    images: true,
    videos: true
  });

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const { galleryImages, galleryVideos } = useMemo(() => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', ".avif", ".tiff", ".heic", ".ico"];
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];


    const images = professionalUser?.gallery?.filter((item) =>
      imageExtensions.some((ext) => item.toLowerCase().endsWith(ext))
    ) || [];


    const videos = professionalUser?.gallery?.filter((item) =>
      videoExtensions.some((ext) => item.toLowerCase().endsWith(ext))
    ) || [];


    return { galleryImages: images, galleryVideos: videos };
  }, [professionalUser?.gallery]);

  const videoThumbnails = useVideoThumbnails(galleryVideos);


  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleVideoPlay = (currentIndex: number) => {
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex && !video.paused) {
        video.pause();
      }
    });
  };

  return (
    <main className="pb-20 pt-10 min-h-screen">
      <Container>
        <div className="my-12">
          <Link
            href={`/professionals/${id}`}
            className="inline-flex w-fit items-center gap-2 text-base sm:text-lg font-semibold text-secondary-color transition-colors hover:text-secondary-color/80"
          >
            <MdOutlineArrowBackIosNew className="text-sm" /> Späť
          </Link>
        </div>
        <div className="space-y-4">
          {/* Images Section */}
          {galleryImages.length > 0 && (
            <WorkSection
              title="Fotografie"
              count={galleryImages.length}
              open={openSections.images}
              onToggle={() => toggleSection("images")}
            >
              <ImageGallery<any>
                data={galleryImages}
                showOnlyImage={true}
                columnsCountBreakPoints={columnsCountBreakPoints}
                arrayOfImages={true}
                photoView={true}
              />
            </WorkSection>
          )}

          {/* Videos Section */}
          {galleryVideos.length > 0 && (
            <WorkSection
              title="Videá"
              count={galleryVideos.length}
              open={openSections.videos}
              onToggle={() => toggleSection("videos")}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryVideos.map((item, index) => (
                  <GalleryVideoPlayer
                    key={index}
                    src={item}
                    poster={videoThumbnails[item]}
                    videoRef={(el) => {
                      if (el) {
                        videoRefs.current[index] = el;
                      }
                    }}
                    onPlay={() => handleVideoPlay(index)}
                  />
                ))}
              </div>
            </WorkSection>
          )}
        </div>

      </Container>
    </main>
  );
};

export default ProfessionalAllImages;
