import UserReviewPage from "@/components/Dashboard/User/Review/UserReviewPage";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const tab = (params?.tab as "allReviews" | "pendingReviews") || "allReviews";

  const page = Number(params?.page) || 1;
  const limit = 12;
  return (
    <div>
      <UserReviewPage activeTab={tab} page={page} limit={limit} />
    </div>
  );
};

export default page;
