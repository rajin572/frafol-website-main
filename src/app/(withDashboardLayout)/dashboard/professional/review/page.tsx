import ReviewPage from "@/components/Dashboard/Professional/Review/ReviewPage";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { ISignInUser } from "@/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;

  const page = Number(params?.page) || 1;
  const limit = 12;

  const token = (await cookies()).get("frafolMainAccessToken")?.value;
  const user: ISignInUser = jwtDecode(token!);
  const allReviewRes = await fetchWithAuth(
    `/review/service-provider/${user?.userId}?page=${1}&limit=${10}`,
    {
      next: {
        tags: [TagTypes.review],
      },
    }
  );

  const allReviewData = await allReviewRes.json();

  const allReviews = allReviewData?.data?.reviews || [];
  const total = allReviewData?.data?.meta?.total;
  console.log(allReviews)

  return (
    <ReviewPage
      allReviews={allReviews}
      total={total}
      page={page}
      limit={limit}
    />
  );
};

export default page;
