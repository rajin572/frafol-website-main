/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React from "react";
import { AllImages } from "../../../public/assets/AllImages";
import { IoCalendarOutline } from "react-icons/io5";
import { LuClock } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import ReuseButton from "../ui/Button/ReuseButton";
import { IWorkshop } from "@/types";
import { getServerUrl } from "@/helpers/config/envConfig";
import { formatDate, formetTime } from "@/utils/dateFormet";
import { useGetUserData } from "@/context/useGetUserData";
import Link from "next/link";

const WorkShopsCards = ({ data, handleModalOpen }: { data: IWorkshop, handleModalOpen: any }) => {

  const serverUrl = getServerUrl();
  const userData = useGetUserData();
  console.log(data)
  return (
    <div className="p-1.5 rounded-xl border border-background-color flex flex-col justify-between relative">
      <div>
        <Image
          width={1000}
          height={1000}
          src={data?.image ? serverUrl + data?.image : AllImages?.dummyCover}
          alt="workspace"
          className="w-full h-80 sm:h-60 lg:h-72 xl:h-80 object-cover rounded-lg "
        />
        {data?.vatPercent > 0 && <p className="absolute top-3 left-3 bg-secondary-color px-1 py-0.5 text-primary-color rounded">
          VAT Included: {data?.vatPercent}%
        </p>}
        <div className="px-1 flex flex-col justify-between">
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold mt-3 break-all">
            {data?.title}
          </p>
          <p className="text-sm sm:text-sm lg:text-base mt-1 break-all">
            {data?.description?.length > 100
              ? (
                <>
                  {data.description.substring(0, 100)}...
                  <span className="font-medium text-secondary-color cursor-pointer" onClick={() => handleModalOpen(data)}> Show More</span>
                </>
              )
              : data?.description
            }
          </p>

          <div className="flex items-center gap-2 mt-3">
            <Image
              width={1000}
              height={1000}
              src={
                data?.authorId?.profileImage
                  ? serverUrl + data?.authorId?.profileImage
                  : AllImages?.dummyProfile
              }
              alt={data?.authorId?.name || "Profile Image"}
              className="w-8 h-8 object-cover rounded-full "
            />
            {
              data?.authorId?.role === "photographer" || data?.authorId?.role === "both" || data?.authorId?.role === "videographer" ? (
                <Link href={`/professionals/${data?.authorId?._id}`} className="text-secondary-color text-sm sm:text-sm lg:text-base font-bold cursor-pointer">

                  <p className="text-sm sm:text-sm lg:text-base font-bold">
                    {data?.authorId?.name}
                  </p>
                </Link>
              ) : <p className="text-sm sm:text-sm lg:text-base font-bold">
                {data?.authorId?.name}
              </p>
            }

          </div>
          <div className="flex items-center gap-2 mt-2">
            <IoCalendarOutline className="text-secondary-color text-sm sm:text-base lg:text-lg" />
            <p className="text-sm sm:text-sm lg:text-base font-semibold">
              {formatDate(data?.date)}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <LuClock className="text-secondary-color text-sm sm:text-base lg:text-lg" />
            <p className="text-sm sm:text-sm lg:text-base font-semibold">
              {formetTime(data?.time)}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <FaLocationDot className="text-secondary-color text-sm sm:text-base lg:text-lg" />
            <p className="text-sm sm:text-sm lg:text-base font-semibold capitalize">
              {data?.locationType}
            </p>
          </div>
          {data?.locationType !== "online" && (
            <div className="flex items-center gap-2 mt-1">
              <FaLocationDot className="text-secondary-color text-sm sm:text-base lg:text-lg" />
              <p className="text-sm sm:text-sm lg:text-base font-semibold">
                {data?.location}
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 mt-1">
            <LuUsers className="text-secondary-color text-sm sm:text-base lg:text-lg" />
            <p className="text-sm sm:text-sm lg:text-base font-semibold">
              {data?.totalParticipants} / {data?.maxParticipant} participants
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-5 justify-between">
        <p className="text-base sm:text-lg lg:text-xl font-semibold">
          {data?.mainPrice?.toFixed(2)}€
        </p>
        {(userData?.userId && userData?.userId !== data?.authorId?._id) && (
          <ReuseButton
            variant="secondary"
            className="!text-sm sm:!text-sm lg:!text-base w-fit !px-2 !py-1"
            onClick={() => handleModalOpen(data)}
          >
            Register Now
          </ReuseButton>
        )}
      </div>
    </div >
  );
};

export default WorkShopsCards;
