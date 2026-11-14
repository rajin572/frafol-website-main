import { staticPageMetadata } from "@/lib/seo/pages";
import VideographeyPage from "@/components/Videographey/VideographeyPage";
import React from "react";

export const metadata = staticPageMetadata("videography");

const page = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <div>
      <VideographeyPage searchParams={searchParams} />
    </div>
  );
};

export default page;
