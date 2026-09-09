/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import FeaturedProfessionalsCard from "../shared/FeaturedProfessionalsCard";

//! Import Swiper styles
// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/navigation";

import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";
import { IProfessional } from "@/types";
import PaginationSection from "../shared/PaginationSection";
import NoResultFound from "../shared/NoResultFound";
import PhotographyCategorySeacrhFiltre from "../Photography/PhotographyCategorySeacrhFiltre";
import ReuseButton from "../ui/Button/ReuseButton";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ITown } from "@/app/(Auth)/sign-up/professional/legal-invoice/page";

const AllProfessionals = async ({ searchParams }: { searchParams: any }) => {
  const params = await searchParams;
  const search = params?.search || "";
  const type = params?.type || null;
  const minPrice = (params?.min as string) || null;
  const maxPrice = (params?.max as string) || null;
  const availity = (params?.availity as string) || null;
  const towns = (params?.towns as string) || null;

  const role =
    params?.role === "videographer"
      ? "videographer"
      : params?.role === "photographer"
        ? "photographer"
        : "";

  const page = params?.page || 1;
  const limit = 12;

  const res = await fetchWithAuth(
    `/users/professionals?page=${page}&limit=${limit}&role=${role}&searchTerm=${search}&travelTowns=${towns || ""}${type ? `&hasActiveSubscription=true` : ''}&minPrice=${minPrice || ""}&maxPrice=${maxPrice || ""}&availableDate=${availity || ""}`,
    {
      next: {
        tags: [TagTypes.prfessional],
      },
    }
  );
  const data = await res.json();
  const totalData = data?.data?.meta?.total;
  const professionals: IProfessional[] = data?.data?.result;

  const Townres = await fetchWithAuth(
    `/town`,
    {
      next: {
        tags: [TagTypes.town],
      },
    }
  );

  const Tdata = await Townres.json();
  const townData: ITown[] = Tdata?.data || [];

  return (
    <section className="py-16">
      <Container>
        {/* title="Our Professionals" */}
        {/* description="Discover our top-rated Professionals" */}
        <SectionHeader title="Naši tvorcovia" description="Objavte našich najlepšie hodnotených tvorcov" />
        <div className="mt-16 flex flex-col md:flex-row gap-y-5 md:gap-y-0 justify-between mb-10">
          {
            role === "videographer" ? (
              <ReuseButton
                url="/videography"
                variant="secondary"
                className="w-fit !text-sm sm:!text-base lg:!text-xl  !flex !items-center gap-2"
              >
                <FaArrowLeftLong className="!mt-1" />
                {/* Back To Categories */}
                Späť na kategórie
              </ReuseButton>
            ) : role === "photographer" ? (
              <ReuseButton
                url="/photography"
                variant="secondary"
                className="w-fit !text-sm sm:!text-base lg:!text-xl  !flex !items-center gap-2"
              >
                <FaArrowLeftLong className="!mt-1" />
                {/* Back To Categories */}
                Späť na kategórie
              </ReuseButton>
            ) : <div></div>
          }

          <PhotographyCategorySeacrhFiltre townData={townData} />
        </div>
        {professionals?.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {professionals?.map((item, index) => (
              <FeaturedProfessionalsCard key={index} item={item} />
            ))}
          </div>
        ) : (
          <NoResultFound />
        )}

        <div className="mt-16 flex justify-center items-center">
          <Suspense fallback={<div>Loading...</div>}>
            <PaginationSection
              page={page}
              limit={limit}
              totalData={totalData}
            />
          </Suspense>
        </div>
      </Container>
    </section>
  );
};

export default AllProfessionals;
