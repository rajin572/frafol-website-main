import React, { Suspense } from "react";
import SectionHeader from "../ui/SectionHeader";
import ForumCard from "./ForumCard";
import ForumNewPost from "./ForumNewPost";
import { ICommunityPost } from "@/types";
import PaginationSection from "../shared/PaginationSection";
import PhotographyPageSearch from "../Photography/PhotographyPageSearch";

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
    <div className="mt-20">
      {/* title="Community Forum" */}
      {/* description="Connect with other photographers and videographers to discuss gear, techniques, and more." */}
      <SectionHeader title="Komunitná diskusia" description="Prepojte sa s inými fotografmi a kameramanmi na diskusiu o príslušenství, technikách a ďalších témach." />

      <div className="flex justify-center mb-3 mt-5">
        <PhotographyPageSearch />
      </div>

      <ForumNewPost />

      <div className="mt-16 space-y-6">
        {communityPosts.map((item, index) => (
          <ForumCard key={index} item={item} />
        ))}
      </div>

      <div className="mt-16 flex justify-center items-center">
        {totalData !== 0 && (
          <Suspense fallback={<div>Loading...</div>}>
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
