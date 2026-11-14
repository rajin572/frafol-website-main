import React from "react";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import FeaturedProfessionalSlider from "./FeaturedProfessionalSlider";
import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";
import { IProfessional } from "@/types";
import ReuseButton from "../ui/Button/ReuseButton";

const FeaturedProfessionals = async () => {
  const res = await fetchWithAuth(`/users/professionals`, {
    next: {
      tags: [TagTypes.prfessional],
      revalidate: 180
    },
  });
  const data = await res.json();
  const professionals: IProfessional[] = data?.data?.result;

  console.log(professionals)

  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        {/* title="Featured Professionals" */}
        {/* description="Discover our top-rated photographers and videographers" */}
        <SectionHeader
          eyebrow="Tvorcovia"
          title="Odporúčaní fotografi a kameramani"
          description="Objavte našich najlepšie hodnotených fotografov a kameramanov"
        />

        <div className="mt-12">
          <FeaturedProfessionalSlider data={professionals} />
        </div>

        <div className="flex justify-center items-center mt-12">
          <ReuseButton
            url="/professionals"
            className="w-fit mx-auto !text-sm sm:!text-base lg:!text-lg !py-5 !px-8 !rounded-lg"
            variant="secondary"
          >
            {/* See All Professionals */}
            Zobraziť všetkých fotografov a kameramanov
          </ReuseButton>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProfessionals;