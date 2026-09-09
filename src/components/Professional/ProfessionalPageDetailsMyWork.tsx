import React, { useMemo } from "react";
import SectionHeader from "../ui/SectionHeader";
import ImageGallery from "../ui/ImageGallery";
import ReuseButton from "../ui/Button/ReuseButton";
import NoResultFound from "../shared/NoResultFound";
import ProfessionalPageVideoWorks from "./ProfessionalPageVideoWorks";

const columnsCountBreakPoints = { 350: 1, 600: 2, 1024: 3, 1440: 4 };

const ProfessionalPageDetailsMyWork = ({
  gallery,
  professionalId,
}: {
  gallery: string[];
  professionalId: string;
}) => {


  const { galleryImages, galleryVideos } = useMemo(() => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', ".avif", ".tiff", ".heic", ".ico"];
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];


    const images = gallery?.filter((item) =>
      imageExtensions.some((ext) => item.toLowerCase().endsWith(ext))
    ) || [];


    const videos = gallery?.filter((item) =>
      videoExtensions.some((ext) => item.toLowerCase().endsWith(ext))
    ) || [];


    return { galleryImages: images, galleryVideos: videos };
  }, [gallery]);

  return (
    <div className="mt-16">
      <SectionHeader title="My Work" className="mb-3" />
      {(galleryImages?.length > 0 || galleryVideos?.length > 0) ? (
        <div>
          <div className="my-10">
            <ImageGallery<string>
              data={galleryImages}
              showOnlyImage={true}
              columnsCountBreakPoints={columnsCountBreakPoints}
              arrayOfImages={true}
            />
          </div>
          <ProfessionalPageVideoWorks galleryVideos={galleryVideos} />
          <div className="mt-10 flex justify-center items-center">
            <ReuseButton
              variant="secondary"
              className="!text-sm sm:!text-base lg:!text-lg !py-4.5 !px-4 !w-fit"
              url={`/professionals/${professionalId}/works`}
            >
              View More
            </ReuseButton>
          </div>
        </div>
      ) : (
        <NoResultFound
          title="No Work Found"
          description="This professional has not uploaded any work"
        />
      )}
    </div>
  );
};

export default ProfessionalPageDetailsMyWork;
