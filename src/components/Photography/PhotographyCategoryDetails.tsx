/* eslint-disable @typescript-eslint/no-explicit-any */
import SectionBanner from "../ui/SectionBanner";
import Container from "../ui/Container";
import ReuseButton from "../ui/Button/ReuseButton";
import { FaArrowLeftLong } from "react-icons/fa6";
import PhotographyCategorySeacrhFiltre from "./PhotographyCategorySeacrhFiltre";
import FeaturedProfessionalsCard from "../shared/FeaturedProfessionalsCard";
import { AllImages } from "../../../public/assets/AllImages";
import { getServerUrl } from "@/helpers/config/envConfig";
import NoResultFound from "../shared/NoResultFound";
import { ITown } from "@/app/(Auth)/sign-up/professional/legal-invoice/page";

const PhotographyCategoryDetails = ({
  categories,
  data,
  townData,
}: {
  categories: any[];
  data: { id: string; title: string | string[]; src: string | string[] };
  townData: ITown[];
}) => {
  const serverUrl: string = getServerUrl() || "";

  return (
    <main className="pb-20">
      <SectionBanner
        image={data?.src ? serverUrl + data?.src : AllImages.dummyCover?.src}
        title={data?.title as string}
      />

      <Container>
        <div className="mt-10 flex flex-col lg:flex-row justify-between lg:items-center gap-5">
          <ReuseButton
            url="/photography"
            variant="secondary"
            className="w-fit !text-sm sm:!text-base lg:!text-xl  !flex !items-center gap-2"
          >
            <FaArrowLeftLong className="!mt-1" />
            {/* Back To Categories */}
            Späť na kategórie
          </ReuseButton>
          <PhotographyCategorySeacrhFiltre townData={townData} />
        </div>
        {categories?.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {categories?.map((item, index) => (
              <FeaturedProfessionalsCard key={index} item={item} />
            ))}
          </div>
        ) : (
          <div className="py-20">
            {/* <NoResultFound title="No Photographer Available" /> */}
            <NoResultFound title="Nenašiel sa žiadny výsledok" />
          </div>
        )}
      </Container>
    </main>
  );
};

export default PhotographyCategoryDetails;
