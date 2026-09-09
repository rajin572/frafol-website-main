import AllProfessionals from "@/components/Professional/AllProfessionalPage";
import React from "react";

export const metadata = {
  title: "Frafol – Tvorcovia",
};

const page = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return <AllProfessionals searchParams={searchParams} />;
};

export default page;
