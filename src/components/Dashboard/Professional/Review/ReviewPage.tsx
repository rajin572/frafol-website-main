"use client";
import { useState } from "react";
import ProfessionalReviewTable from "@/components/ui/Table/ProfessionalReviewTable";
import ReportViewModal from "./ReviewViewModal";
import { IProfessionalReview } from "@/types";

const ReviewPage = ({
  allReviews,
  total,
  page,
  limit,
}: {
  allReviews: IProfessionalReview[];
  total: number;
  page: number;
  limit: number;
}) => {
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] =
    useState<IProfessionalReview | null>(null);

  const showViewUserModal = (record: IProfessionalReview) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };
  return (
    <div>
      <div className="mt-5 min-h-[80vh] rounded-xl px-4">
        <div className="bg-primary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between">
            {/* <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold  my-5">
              Review
            </h1> */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold  my-5">
              Recenzie
            </h1>
          </div>
        </div>
        <ProfessionalReviewTable
          data={allReviews}
          loading={false}
          showViewModal={showViewUserModal}
          page={page}
          total={total}
          limit={limit}
        />
        <ReportViewModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default ReviewPage;
