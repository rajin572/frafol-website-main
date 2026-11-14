import { staticPageMetadata } from "@/lib/seo/pages";
import PhotographyPage from "@/components/Photography/PhotographyPage";
import React from "react";

export const metadata = staticPageMetadata("photography");

const page = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <div>
      <PhotographyPage searchParams={searchParams} />
    </div>
  );
};

export default page;
