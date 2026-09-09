import React from "react";
import ForumReplyCard from "./ForumReplyCard";
import ForumSubmitReply from "./ForumSubmitReply";
import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";
import { ICommunityComment } from "@/types";
import PaginationSection from "../shared/PaginationSection";

const ForumAllComents = async ({ id, page }: { id: string; page: number }) => {
  const limit = 5;
  const res = await fetchWithAuth(`/community/comments/${id}`, {
    next: {
      tags: [TagTypes.comment],
    },
  });

  const data = await res.json();

  const allComments: ICommunityComment[] = data?.data;

  const paginatedData =
    allComments?.slice((page - 1) * limit, page * limit) || [];
  return (
    <div className="rounded-xl border border-background-color flex flex-col gap-2 p-5 items-start mt-16">
      <p className="text-base sm:text-lg lg:text-xl font-bold">{/* Replies */} Odpovede</p>

      {paginatedData?.map((item, index) => (
        <ForumReplyCard item={item} key={index} />
      ))}

      <div className="w-full flex justify-center items-center my-5">
        {(allComments?.length || 0) > limit && (
          <PaginationSection
            page={page}
            limit={limit}
            totalData={allComments?.length || 0}
          />
        )}
      </div>
      <ForumSubmitReply id={id} />
    </div>
  );
};

export default ForumAllComents;
