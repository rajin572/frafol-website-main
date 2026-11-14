"use client";
import React from "react";
import ReuseButton from "../ui/Button/ReuseButton";
import { FaPlus } from "react-icons/fa6";
import AddNewForumMoidal from "../ui/Modal/Forum/AddNewForumMoidal";
import { useGetUserData } from "@/context/useGetUserData";

const ForumNewPost = () => {
  const userData = useGetUserData();
  const [isAddModalVisible, setIsAddModalOpen] = React.useState(false);
  const handleCancle = () => setIsAddModalOpen(false);
  console.log(userData)
  return (
    <div className="shrink-0 empty:hidden">
      {
        userData?.userId && (
          <div className="flex justify-end">
            <ReuseButton
              variant="secondary"
              onClick={() => setIsAddModalOpen(true)}
              className="!w-full sm:!w-fit !text-sm sm:!text-base !py-6 !px-6 !rounded-xl !font-semibold flex items-center justify-center gap-2"
            >
              <FaPlus />
              { /* New Post */}
              Nový príspevok
            </ReuseButton>
          </div>
        )
      }

      <AddNewForumMoidal
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancle}
      />
    </div>
  );
};

export default ForumNewPost;
