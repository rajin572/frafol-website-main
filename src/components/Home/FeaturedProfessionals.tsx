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
    <section className="pb-28">
      <Container>
        {/* title="Featured Professionals" */}
        {/* description="Discover our top-rated photographers and videographers" */}
        <SectionHeader
          title="Odporúčaní fotografi a kameramani"
          description="Objavte našich najlepšie hodnotených fotografov a kameramanov"
        />

        <div className="mt-16">
          <FeaturedProfessionalSlider data={professionals} />
        </div>

        <div className="flex justify-center items-center !mt-10">
          <ReuseButton
            url="/professionals"
            className="mt-10 w-fit mx-auto !text-sm sm:!text-base lg:!text-lg !py-4.5"
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