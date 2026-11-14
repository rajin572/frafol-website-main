import MarketPlaceDetailsPage from "@/components/MarketPlace/MarketPlaceDetailsPage";
import Container from "@/components/ui/Container";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { IGear } from "@/types";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  try {
    const res = await fetchWithAuth(`/marketPlace/${id}`, {
      next: {
        tags: [TagTypes.gear],
      },
    });
    const gear: IGear | undefined = (await res.json())?.data;
    if (gear?.name) return { title: `${gear.name} – Foto a video technika | Frafol` };
  } catch {
    // no gear data, use the generic title below
  }
  return { title: "Bazár foto a video techniky | Frafol" };
}

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
