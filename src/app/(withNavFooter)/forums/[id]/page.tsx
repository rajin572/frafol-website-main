import ForumDetailsPage from "@/components/Forum/ForumDetailsPage";
import Container from "@/components/ui/Container";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { ICommunityPost } from "@/types/communityForum.type";
import React from "react";
import { notFound } from "next/navigation";
import { isMissingRecord } from "@/lib/isMissingRecord";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, forumPostSchema } from "@/lib/seo/schema";
import { pageMetadata, toPlainText } from "@/lib/seo/site";
import { getMediaUrl } from "@/utils/mediaUrl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let status: number | undefined;
  let post: ICommunityPost | undefined;
  try {
    const res = await fetchWithAuth(`/community/${id}`, {
      next: {
        tags: [TagTypes.communityForum],
      },
    });
    status = res.status;
    post = (await res.json())?.data;
  } catch {
    // API not reachable, use the generic title below
  }
  // Outside the try: notFound() works by throwing. Unknown id → real 404, not an empty post.
  if (status !== undefined && isMissingRecord(status, post)) notFound();

  if (post?.title) {
    const image = getMediaUrl(post?.images?.[0]);
    return pageMetadata({
      title: `${post.title} – Fórum | Frafol`,
      description: toPlainText(post?.text, 160) || `${post.title} – diskusia na fóre fotografov a kameramanov Frafol.`,
      path: `/forums/${id}`,
      type: "article",
      images: image ? [{ url: image, alt: post.title }] : undefined,
    });
  }
  return { title: "Fórum fotografov a kameramanov | Frafol", alternates: { canonical: `/forums/${id}` } };
}

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
  if (isMissingRecord(res.status, data?.data)) notFound();

  const communityPosts: ICommunityPost = data?.data || {};
  return (
    <main>
      {communityPosts?.title && (
        <JsonLd
          data={[
            forumPostSchema(communityPosts, `/forums/${id}`),
            breadcrumbSchema([
              { name: "Domov", path: "/" },
              { name: "Fórum", path: "/forums" },
              { name: communityPosts.title, path: `/forums/${id}` },
            ]),
          ]}
        />
      )}
      <Container>
        <ForumDetailsPage communityPosts={communityPosts} id={id} page={page} />
      </Container>
    </main>
  );
};

export default page;
