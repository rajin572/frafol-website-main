import React from "react";
import ProfessionalAllImages from "@/components/Professional/ProfessionalAllWork";
import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";
import { IProfessionalUser } from "@/types";
import { pageMetadata } from "@/lib/seo/site";
import { notFound } from "next/navigation";
import { isMissingRecord } from "@/lib/isMissingRecord";

// "Meno tvorcu – Portfólio | Frafol", canonical /professionals/<id>/works.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const path = `/professionals/${id}/works`;
  let status: number | undefined;
  let user: IProfessionalUser | undefined;
  try {
    const res = await fetchWithAuth(`/users/${id}`, {
      next: {
        tags: [TagTypes.prfessional],
      },
    });
    status = res.status;
    user = (await res.json())?.data;
  } catch {
    // API not reachable, use the generic title below
  }
  // Outside the try: notFound() works by throwing. Unknown creator → real 404.
  if (status !== undefined && isMissingRecord(status, user)) notFound();

  const fullName = [user?.name, user?.sureName].filter(Boolean).join(" ");
  if (fullName) {
    return pageMetadata({
      title: `${fullName} – Portfólio | Frafol`,
      description: `Portfólio – ${fullName}: ukážky fotografií a videí na Frafol.`,
      path,
    });
  }
  return { title: "Portfólio | Frafol", alternates: { canonical: path } };
}

const page = async ({
  params,
}: {
  params: Promise<{ id: string }>; // Type params as a Promise
}) => {
  const { id } = await params; // Await the params to resolve the Promise
  const res = await fetchWithAuth(`/users/gallery/${id}`, {
    next: {
      tags: [TagTypes.prfessional],
    },
  });
  // Only the status: a creator without uploaded works may legitimately return no gallery data.
  if (res.status === 404 || res.status === 400) notFound();
  const data = await res.json();
  const professionalUser: IProfessionalUser = data?.data;

  return <ProfessionalAllImages id={id} professionalUser={professionalUser} />;
};

export default page;
