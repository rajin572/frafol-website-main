import MarketPlaceDetailsPage from "@/components/MarketPlace/MarketPlaceDetailsPage";
import Container from "@/components/ui/Container";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { IGear } from "@/types";
import React from "react";

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>; // Type params as a Promise
}) => {
  const { id } = await params; // Await the params to resolve the Promise
  const res = await fetchWithAuth(`/marketPlace/${id}`, {
    next: {
      tags: [TagTypes.gear],
    },
  });
  const data = await res.json();
  const gear: IGear = data?.data;

  return (
    <main className="py-20">
      <Container>
        <MarketPlaceDetailsPage data={gear} />
      </Container>
    </main>
  );
};

export default ProductDetailPage;
