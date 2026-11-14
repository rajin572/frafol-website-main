/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React from "react";
import { AllImages } from "../../../public/assets/AllImages";
import { IoCalendarOutline } from "react-icons/io5";
import { LuClock } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { MdOutlineLaptop } from "react-icons/md";
import ReuseButton from "../ui/Button/ReuseButton";
import { IWorkshop } from "@/types";
import { getMediaUrl } from "@/utils/mediaUrl";
import { formatDate, formetTime } from "@/utils/dateFormet";
import { useGetUserData } from "@/context/useGetUserData";
import Link from "next/link";

const metaClass = "flex min-w-0 items-center gap-2 text-sm sm:text-[15px] font-medium text-base-color/80";
const metaIconClass = "size-4 shrink-0 text-secondary-color";

// Workshop (kurz) card: photo with price, title + description, date / time / place, how full it is,
// and the author with the register button.
const WorkShopsCards = ({ data, handleModalOpen }: { data: IWorkshop, handleModalOpen: any }) => {

  const userData = useGetUserData();
  const total = Number(data?.totalParticipants) || 0;
  const max = Number(data?.maxParticipant) || 0;
  const filledPercent = max > 0 ? Math.min(100, Math.round((total / max) * 100)) : 0;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-base-color/10 bg-white transition-colors hover:border-base-color/25">
      {/* Photo + price */}
      <div className="relative aspect-[4/3] overflow-hidden bg-background-color">
        <Image
          fill
          src={data?.image ? getMediaUrl(data?.image) : AllImages?.dummyCover}
          alt={data?.title || "workspace"}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {data?.vatPercent > 0 && (
          <p className="absolute top-3 left-3 rounded-md bg-secondary-color px-2.5 py-1 text-xs sm:text-sm font-semibold text-white shadow-sm">
            Vrátane DPH: {data?.vatPercent}%
          </p>
        )}
        <p className="absolute bottom-3 left-3 rounded-lg bg-base-color px-3 py-1.5 text-lg font-bold text-white shadow-sm">
          {data?.mainPrice?.toFixed(2)}€
        </p>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg sm:text-xl font-bold leading-snug text-base-color line-clamp-2">
          {data?.title}
        </h3>
        <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-base-color/70">
          {data?.description?.length > 100
            ? (
              <>
                {data.description.substring(0, 100)}...
                <span className="font-semibold text-secondary-color cursor-pointer hover:underline" onClick={() => handleModalOpen(data)}> Zobraziť viac</span>
              </>
            )
            : data?.description
          }
        </p>

        {/* When and where */}
        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl bg-background-color/50 p-4">
          <div className={metaClass}>
            <IoCalendarOutline className={metaIconClass} />
            <p className="truncate">{formatDate(data?.date)}</p>
          </div>
          <div className={metaClass}>
            <LuClock className={metaIconClass} />
            <p className="truncate">{formetTime(data?.time)}</p>
          </div>
          <div className={metaClass}>
            {data?.locationType === "online" ? (
              <MdOutlineLaptop className={metaIconClass} />
            ) : (
              <FaLocationDot className={metaIconClass} />
            )}
            <p className="truncate capitalize">{data?.locationType}</p>
          </div>
          {data?.locationType !== "online" && (
            <div className={metaClass}>
              <FaLocationDot className={metaIconClass} />
              <p className="truncate" title={data?.location}>{data?.location}</p>
            </div>
          )}
        </div>

        {/* How full the workshop is */}
        <div className="mt-4">
          <div className={metaClass}>
            <LuUsers className={metaIconClass} />
            <p>
              {data?.totalParticipants} / {data?.maxParticipant} participants
            </p>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-background-color">
            <div className="h-full rounded-full bg-secondary-color" style={{ width: `${filledPercent}%` }} />
          </div>
        </div>

        {/* Author + register */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-base-color/10 pt-4 mt-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <Image
              width={72}
              height={72}
              src={
                data?.authorId?.profileImage
                  ? getMediaUrl(data?.authorId?.profileImage)
                  : AllImages?.dummyProfile
              }
              alt={data?.authorId?.name || "Profile Image"}
              className="size-9 shrink-0 object-cover rounded-full"
            />
            {
              data?.authorId?.role === "photographer" || data?.authorId?.role === "both" || data?.authorId?.role === "videographer" ? (
                <Link href={`/professionals/${data?.authorId?._id}`} className="truncate text-sm sm:text-base font-semibold text-base-color hover:text-secondary-color">
                  {data?.authorId?.name}
                </Link>
              ) : <p className="truncate text-sm sm:text-base font-semibold text-base-color">
                {data?.authorId?.name}
              </p>
            }
          </div>
          {(userData?.userId && userData?.userId !== data?.authorId?._id) && (
            <ReuseButton
              variant="secondary"
              className="!w-fit !shrink-0 !text-sm !py-4 !px-4 !rounded-lg !font-semibold"
              onClick={() => handleModalOpen(data)}
            >
              Zaregistrovať sa
            </ReuseButton>
          )}
        </div>
      </div>
    </article>
  );
};

export default WorkShopsCards;
