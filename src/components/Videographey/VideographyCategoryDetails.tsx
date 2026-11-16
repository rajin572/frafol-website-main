/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "../ui/Container";
import FeaturedProfessionalsCard from "../shared/FeaturedProfessionalsCard";
import { AllImages } from "../../../public/assets/AllImages";
import { getMediaUrl } from "@/utils/mediaUrl";
import NoResultFound from "../shared/NoResultFound";
import BrowseHeader from "../shared/BrowseHeader";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PhotographyCategorySeacrhFiltre from "../Photography/PhotographyCategorySeacrhFiltre";
import { ITown } from "@/app/(Auth)/sign-up/professional/legal-invoice/page";
import JsonLd from "@/components/seo/JsonLd";
import { professionalListSchema } from "@/lib/seo/schema";
import { categoryPath } from "@/utils/categoryPath";

const VideographyCategoryDetails = ({
  categories,
  data,
  townData,
}: {
  categories: any[];
  data: { id: string; title: string | string[]; src: string | string[]; subTitle?: string | string[] };
  townData: ITown[];
}) => {
  return (
    <main className="pb-20">
      {categories?.length > 0 && (
        <JsonLd
          data={professionalListSchema(
            data?.title as string,
            categoryPath("videography", {
              _id: data?.id,
              title: data?.title as string,
              image: data?.src as string,
              subTitle: data?.subTitle as string,
            }),
            categories
          )}
        />
      )}
      <BrowseHeader
        title={data?.title as string}
        description={data?.subTitle as string}
        image={data?.src ? getMediaUrl(data?.src as string) : AllImages.dummyCover?.src}
      />

      <Container>
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Link
            href="/videography"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-base-color/15 bg-white px-5 py-3 text-sm sm:text-base font-semibold text-base-color shadow-sm transition-colors hover:border-secondary-color hover:text-secondary-color"
          >
            <ArrowLeft className="size-4" />
            {/* Back To Categories */}
            Späť na kategórie
          </Link>
          <PhotographyCategorySeacrhFiltre townData={townData} />
        </div>
        {categories?.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories?.map((item, index) => (
              <FeaturedProfessionalsCard key={index} item={item} />
            ))}
          </div>
        ) : (
          <div className="py-20">
            {/* <NoResultFound title="No Videographer Available" /> */}
            <NoResultFound title="Nenašiel sa žiadny výsledok" />
          </div>
        )}
      </Container>
    </main>
  );
};

export default VideographyCategoryDetails;
