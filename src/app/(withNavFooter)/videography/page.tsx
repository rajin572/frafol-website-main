import VideographeyPage from "@/components/Videographey/VideographeyPage";
import React from "react";

export const metadata = {
  title: "Natáčanie videa – Video služby a kategórie | Frafol",
};

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
