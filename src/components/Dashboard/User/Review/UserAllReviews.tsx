"use client";
import React from "react";
import ReviewCard from "./ReviewCard";
import UserReviewEditModal from "./UserReviewEditModal";
import { IPendingReview } from "@/types";
import PaginationSection from "@/components/shared/PaginationSection";

const UserAllReviews = ({
  activeTab,
  total,
  allReviews,
  page,
  limit,
}: {
  activeTab: string;
  total: number;
  allReviews: IPendingReview[];
  page: number;
  limit: number;
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentRecord, setCurrentRecord] =
    React.useState<IPendingReview | null>(null);
  const openModal = (record: IPendingReview) => {
    setIsModalOpen(true);
    setCurrentRecord(record);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentRecord(null);
  };
  return (
    <div className="space-y-10">
      <div className="space-y-5">
        {allReviews?.map((review, index) => (
          <ReviewCard
            data={review}
            activeTab={activeTab}
            key={index}
            openModal={openModal}
          />
        ))}
      </div>
      <PaginationSection page={page} limit={limit} totalData={total} />
      <UserReviewEditModal
        isViewModalVisible={isModalOpen}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default UserAllReviews;
