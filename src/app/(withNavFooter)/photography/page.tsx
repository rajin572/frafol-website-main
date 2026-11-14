import PhotographyPage from "@/components/Photography/PhotographyPage";
import React from "react";

export const metadata = {
  title: "Fotografi na Slovensku – Vyberte si fotografa | Frafol",
};

const page = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <div className="py-20">
      <PhotographyPage searchParams={searchParams} />
    </div>
  );
};

export default page;
