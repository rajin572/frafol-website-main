import MarketPlaceDetailsPage from "@/components/MarketPlace/MarketPlaceDetailsPage";
import Container from "@/components/ui/Container";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { IGear } from "@/types";
import React from "react";
import { notFound } from "next/navigation";
import { isMissingRecord } from "@/lib/isMissingRecord";
import { readJson } from "@/lib/readJson";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, productSchema } from "@/lib/seo/schema";
import { pageMetadata, toPlainText } from "@/lib/seo/site";
import { getMediaUrl } from "@/utils/mediaUrl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let status: number | undefined;
  let gear: IGear | undefined;
  try {
    const res = await fetchWithAuth(`/marketPlace/${id}`, {
      next: {
        tags: [TagTypes.gear],
      },
    });
    status = res.status;
    gear = (await res.json())?.data;
  } catch {
    // API not reachable, use the generic title below
  }
  // Outside the try: notFound() works by throwing. Unknown id → real 404, not an empty page.
  if (status !== undefined && isMissingRecord(status, gear)) notFound();

  if (gear?.name) {
    const image = getMediaUrl(gear?.gallery?.[0]);
    return pageMetadata({
      title: `${gear.name} – Foto a video technika | Frafol`,
      description: descriptionOf(gear),
      path: `/marketplace/${id}`,
      images: image ? [{ url: image, alt: gear.name }] : undefined,
    });
  }
  return { title: "Bazár foto a video techniky | Frafol", alternates: { canonical: `/marketplace/${id}` } };
}

// Meta description: the start of the product text, or name, condition and price when it is short.
const descriptionOf = (gear: IGear) => {
  const text = toPlainText(gear?.description, 160);
  if (text.length >= 50) return text;
  const condition = gear?.condition === "new" ? "nové" : "použité";
  const price = Number(gear?.mainPrice ?? gear?.price ?? 0);
  return `${gear.name} (${condition})${price > 0 ? ` za ${price.toFixed(2).replace(".", ",")} €` : ""} v bazári foto a video techniky Frafol.`;
};

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
  const data = await readJson(res, `/marketPlace/${id}`);
  if (isMissingRecord(res.status, data?.data)) notFound();
  const gear: IGear = data?.data;

  return (
    <main className="py-14 sm:py-20">
      {gear?.name && (
        <JsonLd
          data={[
            productSchema(gear, `/marketplace/${id}`),
            breadcrumbSchema([
              { name: "Domov", path: "/" },
              { name: "Bazár", path: "/marketplace" },
              { name: gear.name, path: `/marketplace/${id}` },
            ]),
          ]}
        />
      )}
      <Container>
        <MarketPlaceDetailsPage data={gear} />
      </Container>
    </main>
  );
};

export default ProductDetailPage;
