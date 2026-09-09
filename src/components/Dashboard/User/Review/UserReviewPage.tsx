import ReusableTabs from "@/components/ui/ReusableTabs";
import React from "react";
import UserAllReviews from "./UserAllReviews";
import UserAllPendingReview from "./UserAllPendingReview";
import UserReviewOverview from "./UserReviewOverview";
import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";

const UserReviewPage = async ({
  activeTab,
  page,
  limit,
}: {
  activeTab: "allReviews" | "pendingReviews";
  page: number;
  limit: number;
}) => {
  let allReviews = [];
  let total: number = 0;

  if (activeTab === "allReviews") {
    const allReviewRes = await fetchWithAuth(
      `/review/my?page=${page}&limit=${limit}`,
      {
        next: {
          tags: [TagTypes.review],
        },
      }
    );

    const allReviewData = await allReviewRes.json();

    allReviews = allReviewData?.data?.result || [];
    total = allReviewData?.data?.meta?.total;
  } else if (activeTab === "pendingReviews") {
    const allPendingReviewRes = await fetchWithAuth(
      `/review/my/pending?page=${page}&limit=${limit}`,
      {
        next: {
          tags: [TagTypes.review],
        },
      }
    );

    const allPendingReviewData = await allPendingReviewRes.json();

    allReviews = allPendingReviewData?.data || [];
    total = allPendingReviewData?.data?.meta?.total;
  }

  return (
    <div>
      {/* <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl  font-bold mb-10">
        Reviews
      </h1> */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl  font-bold mb-10">
        Moje recenzie
      </h1>
      <UserReviewOverview />
      {/* <UserPaymentCard /> */}
      <div className="mt-10">
        <ReusableTabs
          activeTab={activeTab}
          align="left"
          tabs={[
            {
              /* label: "All Reviews", */
              label: "Všetky recenzie",
              value: "allReviews",
              content: (
                <UserAllReviews
                  activeTab={activeTab}
                  total={total}
                  allReviews={allReviews}
                  page={page}
                  limit={limit}
                />
              ),
            },
            {
              /* label: "Pending Reviews", */
              label: "Čakajúce recenzie",
              value: "pendingReviews",
              content: (
                <UserAllPendingReview
                  activeTab={activeTab}
                  total={total}
                  allReviews={allReviews}
                  page={page}
                  limit={limit}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default UserReviewPage;
