import React from "react";
import ProfessionalAllImages from "@/components/Professional/ProfessionalAllWork";
import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";
import { IProfessionalUser } from "@/types";

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
