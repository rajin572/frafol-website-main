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
    <div>
      {
        userData?.userId && (
          <div className=" mt-5 flex justify-end">
            <ReuseButton
              variant="secondary"
              onClick={() => setIsAddModalOpen(true)}
              className="w-fit !text-sm sm:!text-base lg:!text-lg !py-4.5"
            >
              <FaPlus className="mt-1" />
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
