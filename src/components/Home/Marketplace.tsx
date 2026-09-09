import React from "react";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import ProductCard from "../shared/ProductCard";
import ReuseButton from "../ui/Button/ReuseButton";
import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";
import { IGear } from "@/types";

const Marketplace = async () => {
  const res = await fetchWithAuth(`/marketPlace?limit=4`, {
    next: {
      tags: [TagTypes.gear],
    },
  });
  const data = await res.json();
  const categories: IGear[] = data?.data?.result;
  return (
    <section className="pb-28">
      <Container>
        <SectionHeader
          /* title="Marketplace" */
          title="Bazár"
          /* description="Browse and buy equipment from professionals in the industry." */
          description="Prezrite si ponuku príslušenstva a nakúpte od fotografov a kameramanov"
        />
        <div className="mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories?.map((item, i) => (
              <ProductCard key={i} product={item} />
            ))}
          </div>
          <div className="flex justify-center items-center !mt-10">
            <ReuseButton
              url="/marketplace"
              className="w-fit  mt-5 !text-sm sm:!text-base lg:!text-lg !py-4.5"
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