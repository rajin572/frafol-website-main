import React from "react";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import ProductCard from "../shared/ProductCard";
import ReuseButton from "../ui/Button/ReuseButton";
import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";
import { IGear } from "@/types";

const Marketplace = async () => {
  // Only items that are still in stock — sold-out gear must not be offered on the home page.
  const res = await fetchWithAuth(`/marketPlace?limit=4&status=In Stock`, {
    next: {
      tags: [TagTypes.gear],
    },
  });
  const data = await res.json();
  const categories: IGear[] = data?.data?.result;

  // Nothing in stock → no section at all (same as the Frafol Choice block).
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeader
          /* title="Marketplace" */
          eyebrow="Foto a video technika"
          title="Bazár"
          /* description="Browse and buy equipment from professionals in the industry." */
          description="Prezrite si ponuku príslušenstva a nakúpte od fotografov a kameramanov"
        />
        <div className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories?.map((item, i) => (
              <ProductCard key={i} product={item} />
            ))}
          </div>
          <div className="flex justify-center items-center mt-12">
            <ReuseButton
              url="/marketplace"
              className="w-fit !text-sm sm:!text-base lg:!text-lg !py-5 !px-8 !rounded-lg"
              variant="secondary"
            >
              {/* View All */}
              Zobraziť všetko
            </ReuseButton>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Marketplace;