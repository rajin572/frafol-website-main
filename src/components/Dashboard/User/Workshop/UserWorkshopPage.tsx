"use client";

import Image from "next/image";
import { useState } from "react";
import { AllImages } from "../../../../../public/assets/AllImages";
import { IoCalendarOutline } from "react-icons/io5";
import { LuClock } from "react-icons/lu";
import { FaLink, FaLocationDot } from "react-icons/fa6";
import { IMyRegisteredWorkshop } from "@/types";
import { getMediaUrl } from "@/utils/mediaUrl";
import { formatDate, formetTime } from "@/utils/dateFormet";
import Link from "next/link";
import PaginationSection from "@/components/shared/PaginationSection";
import { buildWorkshopInvoices, isWorkshopCompleted } from "@/utils/invoice/workshopInvoices";
import { finalInvoices, paymentInvoices } from "@/utils/invoice/assembleInvoices";
import { downloadInvoices } from "@/utils/invoice/downloadInvoices";
import React from "react";

const DESCRIPTION_LIMIT = 100;

const UserWorkshopPage = ({
  workshops,
  totalData,
  page,
  limit,
}: {
  workshops: IMyRegisteredWorkshop[];
  totalData: number;
  page: number;
  limit: number;
}) => {
  console.log(workshops)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const buildInvoices = (workshop: IMyRegisteredWorkshop) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instructor = (workshop as any).workshopId?.authorId || (workshop as any).workshop?.authorId;
    return buildWorkshopInvoices(workshop, instructor);
  };

  const handleDownloadPaymentInvoices = (workshop: IMyRegisteredWorkshop) =>
    downloadInvoices(
      paymentInvoices(buildInvoices(workshop)),
      `${workshop.orderId}-faktury-platba.pdf`
    );

  const handleDownloadFinalInvoices = (workshop: IMyRegisteredWorkshop) =>
    downloadInvoices(
      finalInvoices(buildInvoices(workshop)),
      `${workshop.orderId}-faktury-konecne.pdf`
    );

  const toggleDescription = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  return (
    <div>
      {/* <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl  font-bold mb-10">
        My Workshop
      </h1> */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl  font-bold mb-10">
        Prihlásené kurzy
      </h1>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-5">
        {workshops?.map((workshop, index) => (
          <div
            key={workshop._id || index}
            className="p-1.5 rounded-xl border border-background-color"
          >
            <Image
              width={1000}
              height={1000}
              src={
                workshop?.workshop?.image
                  ? getMediaUrl(workshop?.workshop?.image)
                  : AllImages?.dummyCover
              }
              alt="workspace"
              className="w-full h-80 sm:h-60 lg:h-72 xl:h-80 object-cover rounded-lg "
            />
            <div className="px-1 flex flex-col justify-between">
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold mt-3">
                {workshop?.workshop?.title}
              </p>
              {workshop?.workshop?.description && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    {expandedIds.has(workshop._id)
                      ? workshop.workshop.description
                      : workshop.workshop.description.slice(0, DESCRIPTION_LIMIT)}
                    {workshop.workshop.description.length > DESCRIPTION_LIMIT && (
                      <button
                        onClick={() => toggleDescription(workshop._id)}
                        className="ml-1 text-secondary-color font-semibold text-xs"
                      >
                        {expandedIds.has(workshop._id) ? "Zobraziť menej" : "...Zobraziť viac"}
                      </button>
                    )}
                  </p>
                </div>
              )}
              <div className="flex items-center gap-2 mt-3">
                <Image
                  width={1000}
                  height={1000}
                  src={
                    workshop?.workshop?.authorId?.profileImage
                      ? getMediaUrl(workshop?.workshop?.authorId?.profileImage)
                      : AllImages?.dummyProfile
                  }
                  alt={workshop?.workshop?.authorId?.name || "Profile Image"}
                  className="w-8 h-8 object-cover rounded-full "
                />
                <p className="text-sm sm:text-sm lg:text-base font-bold">
                  {workshop?.workshop?.authorId?.name}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <IoCalendarOutline className="text-secondary-color text-sm sm:text-base lg:text-lg" />
                <p className="text-sm sm:text-sm lg:text-base font-semibold">
                  {formatDate(workshop?.workshop?.date)}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <LuClock className="text-secondary-color text-sm sm:text-base lg:text-lg" />
                <p className="text-sm sm:text-sm lg:text-base font-semibold">
                  {formetTime(workshop?.workshop?.time)}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <FaLocationDot className="text-secondary-color text-sm sm:text-base lg:text-lg" />
                <p className="text-sm sm:text-sm lg:text-base font-semibold capitalize">
                  {workshop?.workshop?.locationType}
                </p>
              </div>
              {workshop?.workshop?.locationType !== "online" ? (
                <div className="flex items-center gap-2 mt-1">
                  <FaLocationDot className="text-secondary-color text-sm sm:text-base lg:text-lg" />
                  <p className="text-sm sm:text-sm lg:text-base font-semibold">
                    {workshop?.workshop?.location}
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <FaLink className="text-secondary-color text-sm sm:text-base lg:text-lg" />
                  <Link
                    href={workshop?.workshop?.workshopLink}
                    target="_blank"
                    className="text-sm sm:text-sm lg:text-base font-semibold"
                  >
                    {workshop?.workshop?.workshopLink}
                  </Link>
                </div>
              )}

              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm sm:text-sm lg:text-base font-semibold">
                  {workshop?.workshop?.mainPrice?.toFixed(2)}€
                </p>
              </div>
              <button
                onClick={() => handleDownloadPaymentInvoices(workshop)}
                className="mt-4 w-full py-2 text-sm font-semibold text-white bg-secondary-color rounded-lg hover:opacity-90 transition"
              >
                {/* Download payment invoices */}
                Stiahnuť faktúry (platba)
              </button>
              {isWorkshopCompleted(workshop) && (
                <button
                  onClick={() => handleDownloadFinalInvoices(workshop)}
                  className="mt-2 w-full py-2 text-sm font-semibold text-white bg-secondary-color rounded-lg hover:opacity-90 transition"
                >
                  {/* Download final settlement invoices */}
                  Stiahnuť konečné faktúry
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-center items-center">
        <PaginationSection page={page} totalData={totalData} limit={limit} />
      </div>
    </div>
  );
};

export default UserWorkshopPage;
