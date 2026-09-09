"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useRef, useState } from "react";
import ImageGallery from "@/components/ui/ImageGallery";
import Container from "@/components/ui/Container";
import ReuseButton from "../ui/Button/ReuseButton";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { IProfessionalUser } from "@/types";
import { FiChevronDown } from "react-icons/fi";
import { getServerUrl } from "@/helpers/config/envConfig";

const columnsCountBreakPoints = { 350: 1, 600: 2, 1024: 3 };

const ProfessionalAllImages = ({
  id,
  professionalUser,
}: {
  id: string;
  professionalUser: IProfessionalUser;
}) => {
  const serverUrl = getServerUrl();
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
        <div className="my-16">
          <ReuseButton
            variant="outline"
            className="!px-0 !py-0 flex items-center w-fit !border-none !border-transparent !text-secondary-color"
            url={`/professionals/${id}`}
          >
            <MdOutlineArrowBackIosNew className="mr-2" /> Back
          </ReuseButton>
        </div>
        <div className="space-y-4">
          {/* Images Section */}
          {galleryImages.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection('images')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold">
                  Images ({galleryImages.length})
                </h3>
                <FiChevronDown
                  className={`text-2xl transition-transform duration-300 ${openSections.images ? 'transform rotate-180' : ''
                    }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${openSections.images ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="p-6 pt-10 ">
                  <ImageGallery<any>
                    data={galleryImages}
                    showOnlyImage={true}
                    columnsCountBreakPoints={columnsCountBreakPoints}
                    arrayOfImages={true}
                    photoView={true}
                  />
                </div>

              </div>
            </div>
          )}


          {/* Videos Section */}
          {galleryVideos.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection('videos')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold">
                  Videos ({galleryVideos.length})
                </h3>
                <FiChevronDown
                  className={`text-2xl transition-transform duration-300 ${openSections.videos ? 'transform rotate-180' : ''
                    }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${openSections.videos ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="p-6 pt-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryVideos.map((item, index) => (
                      <div key={index} className="relative group w-full">
                        <video
                          ref={(el) => {
                            if (el) {
                              videoRefs.current[index] = el;
                            }
                          }}
                          src={serverUrl + item}
                          controls
                          className="w-full h-full object-cover rounded-lg"
                          preload="metadata"
                          onPlay={() => handleVideoPlay(index)}
                          controlsList="nodownload noplaybackrate"
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </Container>
    </main>
  );
};

export default ProfessionalAllImages;
