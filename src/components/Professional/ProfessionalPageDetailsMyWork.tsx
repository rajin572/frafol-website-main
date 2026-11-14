import React, { useMemo } from "react";
import ProfileSectionTitle from "./ProfileSectionTitle";
import ImageGallery from "../ui/ImageGallery";
import ReuseButton from "../ui/Button/ReuseButton";
import { ArrowRight } from "lucide-react";
import NoResultFound from "../shared/NoResultFound";
import ProfessionalPageVideoWorks from "./ProfessionalPageVideoWorks";

const columnsCountBreakPoints = { 350: 1, 600: 2, 1024: 3 };

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
    <section id="work" className="scroll-mt-24">
      <ProfileSectionTitle>Moja tvorba</ProfileSectionTitle>
      {(galleryImages?.length > 0 || galleryVideos?.length > 0) ? (
        <div>
          <div className="mt-6 mb-3">
            <ImageGallery<string>
              data={galleryImages}
              showOnlyImage={true}
              columnsCountBreakPoints={columnsCountBreakPoints}
              arrayOfImages={true}
            />
          </div>
          <ProfessionalPageVideoWorks galleryVideos={galleryVideos} />
          <div className="mt-8">
            <ReuseButton
              variant="secondary"
              className="!text-sm sm:!text-base !py-5 !px-7 !rounded-lg !font-semibold !w-fit hover:!bg-secondary-color/90 flex items-center gap-2"
              url={`/professionals/${professionalId}/works`}
            >
              Zobraziť viac
              <ArrowRight className="size-4" />
            </ReuseButton>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-base-color/10 py-8">
          <NoResultFound
            title="Nenašla sa žiadna tvorba"
            description="Tento profesionál zatiaľ nenahral žiadnu tvorbu"
          />
        </div>
      )}
    </section>
  );
};

export default ProfessionalPageDetailsMyWork;
