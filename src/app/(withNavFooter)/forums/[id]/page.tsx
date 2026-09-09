import ForumDetailsPage from "@/components/Forum/ForumDetailsPage";
import Container from "@/components/ui/Container";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { ICommunityPost } from "@/types/communityForum.type";
import React from "react";

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>; // Type params as a Promise
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id } = await params;
  const page = Number((await searchParams)?.page) || 1;
  const res = await fetchWithAuth(`/community/${id}`, {
    next: {
      tags: [TagTypes.communityForum],
    },
  });

  const data = await res.json();

  const communityPosts: ICommunityPost = data?.data || {};
  return (
    <main>
      <Container>
        <ForumDetailsPage communityPosts={communityPosts} id={id} page={page} />
      </Container>
    </main>
  );
};

export default page;
