import SectionBanner from "@/components/ui/SectionBanner";
import React from "react";
import { AllImages } from "../../../../public/assets/AllImages";
import Container from "@/components/ui/Container";
import ForumPage from "@/components/Forum/ForumPage";
import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";
import { ICommunityPost } from "@/types";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;

  const page = Number(params?.page) || 1;
  const searchText = params?.search || "";
  const limit = 12;

  const res = await fetchWithAuth(
    `/community?page=${page}&limit=${limit}&searchTerm=${searchText}`,
    {
      next: {
        tags: [TagTypes.communityForum],
      },
    }
  );

  const data = await res.json();

  const totalData = data?.data?.meta?.total;

  const communityPosts: ICommunityPost[] = data?.data?.result || [];
  console.log(communityPosts)

  return (
    <main className="pb-20">
      {/* title="Forum" */}
      <SectionBanner image={AllImages?.forum?.src} title="Diskusie" />
      <Container>
        <ForumPage
          communityPosts={communityPosts}
          totalData={totalData}
          page={page}
          limit={limit}
        />
      </Container>
    </main>
  );
};

export default page;
