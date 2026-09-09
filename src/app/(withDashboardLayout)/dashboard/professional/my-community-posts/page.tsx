import MyCommunityPostsPage from "@/components/Dashboard/Professional/MyCommunityPosts/MyCommunityPostsPage";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { ICommunityPost } from "@/types";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = 12;
  const search = (params?.search as string) || "";

  const gearOrderRes = await fetchWithAuth(
    `/community/my?page=${page}&limit=${limit}&search=${search}`,
    {
      next: {
        tags: [TagTypes.communityForum],
      },
    }
  );

  const communityData = await gearOrderRes.json();

  const myCommunityPosts: ICommunityPost[] = communityData?.data?.result || [];
  const totalData = communityData?.data?.meta?.total;

  return (
    <div>
      <MyCommunityPostsPage
        myCommunityPosts={myCommunityPosts}
        totalData={totalData}
        page={page}
        limit={limit}
      />
    </div>
  );
};

export default page;
