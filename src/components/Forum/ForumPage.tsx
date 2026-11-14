import React, { Suspense } from "react";
import ForumCard from "./ForumCard";
import ForumNewPost from "./ForumNewPost";
import { ICommunityPost } from "@/types";
import PaginationSection from "../shared/PaginationSection";
import PhotographyPageSearch from "../Photography/PhotographyPageSearch";

// The title and intro are in the page banner (see app/(withNavFooter)/forums/page.tsx).
// Search and "Nový príspevok" on top, then the post feed across the full container.
const ForumPage = ({
  communityPosts,
  totalData,
  page,
  limit,
}: {
  communityPosts: ICommunityPost[];
  totalData: number;
  page: number;
  limit: number;
}) => {
  return (
    <div className="mt-10 sm:mt-12">
      {/* Search + new post */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-md">
          <PhotographyPageSearch />
        </div>
        <ForumNewPost />
      </div>

      <div className="mt-8 space-y-4">
        {communityPosts.map((item, index) => (
          <ForumCard key={index} item={item} />
        ))}
      </div>

      <div className="mt-14 flex justify-center items-center">
        {totalData !== 0 && (
          <Suspense fallback={<div>Načítava sa...</div>}>
            <PaginationSection
              page={page}
              limit={limit}
              totalData={totalData}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default ForumPage;
