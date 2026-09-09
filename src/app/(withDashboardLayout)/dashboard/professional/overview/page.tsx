import ProfessionalOverviewPage from "@/components/Dashboard/Professional/Overview/ProfessionalOverviewPage";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const currentyear = new Date().getFullYear();
  const params = await searchParams;

  const year = Number(params?.year) || currentyear;

  return (
    <div>
      <ProfessionalOverviewPage year={year} />
    </div>
  );
};

export default page;
