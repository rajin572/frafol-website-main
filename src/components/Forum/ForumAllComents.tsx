import React from "react";
import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";
import { ICommunityComment } from "@/types";
import ForumCommentsThread from "./ForumCommentsThread";

const ForumAllComents = async ({ id, page }: { id: string; page: number }) => {
  const limit = 5;
  const res = await fetchWithAuth(`/community/comments/${id}`, {
    next: {
      tags: [TagTypes.comment],
    },
  });

  const data = await res.json();

  const allComments: ICommunityComment[] = Array.isArray(data?.data) ? data.data : [];

  // Newest first: the comment box is above the list, so a new comment appears right under it
  // (the API returns them oldest first, which put a new comment at the end of the last page).
  const newestFirst = [...allComments].sort(
    (a, b) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime()
  );

  const paginatedData = newestFirst.slice((page - 1) * limit, page * limit);

  return (
    <section className="mt-10 rounded-2xl border border-base-color/10 bg-white flex flex-col p-6 sm:p-8 items-start">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-base-color">
        {/* Replies */} Odpovede
      </h2>

      <ForumCommentsThread
        id={id}
        comments={paginatedData}
        totalComments={allComments.length}
        page={page}
        limit={limit}
      />
    </section>
  );
};

export default ForumAllComents;
