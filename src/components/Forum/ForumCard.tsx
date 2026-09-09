import Image from "next/image";
import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";
import { BsFillEyeFill, BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { ICommunityPost } from "@/types";
import { getServerUrl } from "@/helpers/config/envConfig";
import { AllImages } from "../../../public/assets/AllImages";
import { formatDateTime } from "@/utils/dateFormet";
import { Tooltip } from "antd";
import { stripHtmlTags } from "@/utils/stripHtmlTags";

const ForumCard = ({
  item,
  mypost = false,
  showDeleteModal,
  showEditModal,
}: {
  item: ICommunityPost;
  mypost?: boolean;
  showDeleteModal?: (record: ICommunityPost) => void;
  showEditModal?: (record: ICommunityPost) => void;
}) => {
  const serverUrl = getServerUrl();


  const showEditAndDeleteOptions = () => {
    return (
      <div className="flex flex-col w-24 items-center gap-2 p-1">
        <div
          onClick={() => showEditModal && showEditModal(item)}
          className="text-primary-color bg-base-color py-1 px-2 rounded-lg cursor-pointer w-full text-center"
        >
          {/* Edit */} Upraviť
        </div>
        <div
          onClick={() => showDeleteModal && showDeleteModal(item)}
          className="text-primary-color bg-secondary-color py-1 px-2 rounded-lg cursor-pointer w-full text-center"
        >
          {/* Delete */} Zmazať
        </div>
      </div>
    );
  };
  return (
    <div className="p-2 border-b border-base-color/30">
      <div className="flex justify-between items-center gap-5  mb-3">
        <div className="flex items-center gap-2">
          <Image
            width={1000}
            height={1000}
            src={
              item?.authorId?.profileImage
                ? serverUrl + item?.authorId?.profileImage
                : AllImages.dummyProfile.src
            }
            alt={item?.authorId?.name || "Profile Image"}
            className="w-10 h-10 object-cover rounded-full "
          />
          <div>
            {
              item?.authorId?.role === "both" || item?.authorId?.role === "photographer" || item?.authorId?.role === "videographer" ? (
                <Link href={`/professionals/${item?.authorId?._id}`} className="text-secondary-color text-sm sm:text-sm lg:text-base font-medium cursor-pointer">
                  {item?.authorId?.name}
                </Link>
              ) : (
                <p className="text-base-color text-sm sm:text-sm lg:text-base font-medium">
                  {item?.authorId?.name}
                </p>
              )
            }

            <p className="text-base-color text-sm sm:text-sm lg:text-base font-medium  cursor-pointer">
              {formatDateTime(item?.createdAt)}
            </p>
          </div>
        </div>
        {mypost && (
          <Tooltip
            title={showEditAndDeleteOptions()}
            placement="bottom"
            color="white"
          >
            <BsThreeDotsVertical className="text-secondary-color cursor-pointer" />
          </Tooltip>
        )}
      </div>
      <Link href={`/forums/${item?._id}`}>
        <h1 className="text-secondary-color font-bold text-base sm:text-lg lg:text-xl xl:text-2xl mb-1">
          {item?.title}
        </h1>
      </Link>
      <p className="text-base-color text-sm sm:text-sm lg:text-base xl:text-lg font-medium mb-1 line-clamp-2">
        {stripHtmlTags(item?.text || "")}
      </p>
      <div className="flex items-center gap-3 mt-5 text-sm sm:text-base lg:text-lg font-semibold">
        <div className="flex items-center gap-2">
          <AiOutlineLike className="text-secondary-color " />
          <p className="text-base-color  cursor-pointer">
            {item?.totalLikes || 0}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <GoCommentDiscussion className="text-secondary-color " />
          <p className="text-base-color cursor-pointer">
            {item?.totalComments || 0}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <BsFillEyeFill className="text-secondary-color " />
          <p className="text-base-color cursor-pointer">
            {item?.totalViewers || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForumCard;
