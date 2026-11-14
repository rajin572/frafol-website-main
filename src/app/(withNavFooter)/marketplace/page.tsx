import { staticPageMetadata } from "@/lib/seo/pages";
import MarketPlace from "@/components/MarketPlace/MarketPlacePage";
import React from "react";

export const metadata = staticPageMetadata("marketplace");

const MarketPlacePage = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <main>
      <MarketPlace searchParams={searchParams} />
    </main>
  );
};

export default MarketPlacePage;
