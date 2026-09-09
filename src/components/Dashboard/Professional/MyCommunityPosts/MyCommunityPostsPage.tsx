"use client";
import SearchInput from "@/components/ui/Form/ReuseSearchInput";
import React, { Suspense, useState } from "react";
import { ICommunityPost } from "@/types";
import PaginationSection from "@/components/shared/PaginationSection";
import ForumCard from "@/components/Forum/ForumCard";
import DeleteModal from "@/components/ui/Modal/DeleteModal";
import EditForumModal from "@/components/ui/Modal/Forum/EditForumModal";
import { deleteCommunityPost } from "@/services/CommunityForumService/CommunityForumServiceApi";
import tryCatchWrapper from "@/utils/tryCatchWrapper";

const MyCommunityPostsPage = ({
  myCommunityPosts,
  totalData,
  page,
  limit = 12,
}: {
  myCommunityPosts: ICommunityPost[];
  totalData: number;
  page: number;
  limit?: number;
}) => {
  //   const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<ICommunityPost | null>(
    null
  );

  const showEditModal = (record: ICommunityPost) => {
    setIsEditModalVisible(true);
    setCurrentRecord(record);
  };

  const showDeleteModal = (record: ICommunityPost) => {
    setIsDeleteModalVisible(true);
    setCurrentRecord(record);
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDeletePost = async (data: ICommunityPost) => {
    const res = await tryCatchWrapper(
      deleteCommunityPost,
      { params: data?._id },
      {
        toastLoadingMessage: "Deleting...",
        toastSuccessMessage: "Deleted Successfully!",
        toastErrorMessage: "Something went wrong! Please try again.",
      }
    );

    if (res?.success) {
      handleCancel();
    }
  };
  //   const handleCancelGearOrder = async (
  //     values: { reason: string },
  //     data: IGearOrder
  //   ) => {
  //     const res = await tryCatchWrapper(
  //       cancelGearOrder,
  //       { body: values, params: data?._id },
  //       "Please wait...",
  //       "Order Canceled Successfully!",
  //       "Something went wrong! Please try again."
  //     );

  //     if (res?.success) {
  //       setIsCancelModalVisible(false);
  //       handleCancel();
  //     }
  //   };

  return (
    <div>
      <div className=" min-h-[80vh] rounded-xl px-4">
        <div className=" w-full p-4   rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-5">
              My Community Posts
            </h1>
            <SearchInput placeholder="Search ..." />
          </div>
        </div>

        <div className="mt-16 space-y-6">
          {myCommunityPosts.map((item, index) => (
            <ForumCard
              key={index}
              item={item}
              mypost={true}
              showDeleteModal={showDeleteModal}
              showEditModal={showEditModal}
            />
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

        <DeleteModal
          isDeleteModalVisible={isDeleteModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleDelete={handleDeletePost}
        />
        <EditForumModal
          isAddModalVisible={isEditModalVisible}
          currentRecord={currentRecord}
          handleCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default MyCommunityPostsPage;
