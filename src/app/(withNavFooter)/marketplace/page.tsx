import MarketPlace from "@/components/MarketPlace/MarketPlacePage";
import React from "react";

export const metadata = {
  title: "Bazár foto a video techniky | Frafol",
};

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
