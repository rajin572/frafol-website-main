import React from "react";
import ProfessionalAllImages from "@/components/Professional/ProfessionalAllWork";
import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";
import { IProfessionalUser } from "@/types";
import { pageMetadata } from "@/lib/seo/site";

// "Meno tvorcu – Portfólio | Frafol", canonical /professionals/<id>/works.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const path = `/professionals/${id}/works`;
  try {
    const res = await fetchWithAuth(`/users/${id}`, {
      next: {
        tags: [TagTypes.prfessional],
      },
    });
    const user: IProfessionalUser | undefined = (await res.json())?.data;
    const fullName = [user?.name, user?.sureName].filter(Boolean).join(" ");
    if (fullName) {
      return pageMetadata({
        title: `${fullName} – Portfólio | Frafol`,
        description: `Portfólio – ${fullName}: ukážky fotografií a videí na Frafol.`,
        path,
      });
    }
  } catch {
    // no profile data, use the generic title below
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
  const data = await res.json();
  const professionalUser: IProfessionalUser = data?.data;

  return <ProfessionalAllImages id={id} professionalUser={professionalUser} />;
};

export default page;
