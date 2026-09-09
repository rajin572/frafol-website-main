"use client";
import { getServerUrl } from "@/helpers/config/envConfig";
import { ITestimonial } from "@/types/testimonial.type";
import Image from "next/image";
import React, { useState } from "react";
import { Modal } from "antd";
import { MdClose } from "react-icons/md";
import { AllImages } from "../../../public/assets/AllImages";

interface TestimonialCardProps {
  testimonial: ITestimonial;
}

const CHAR_LIMIT = 100;

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const serverUrl = getServerUrl();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const text = testimonial?.text || "";
  const isLong = text.length > CHAR_LIMIT;
  const previewText = isLong ? `${text.slice(0, CHAR_LIMIT).trimEnd()}...` : text;

  const profileImage =
    testimonial?.userId?.profileImage?.length > 0
      ? serverUrl + testimonial?.userId?.profileImage
      : AllImages.dummyProfile;

  return (
    <>
      <div className=" p-5 rounded-xl flex flex-col justify-between min-h-[220px] hover:shadow-sm border border-[#E1E1E1]">
        <p className="font-semibold text-xs sm:text-am lg:text-base mb-5 whitespace-pre-line">
          {previewText}
          {isLong && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="ml-1 text-secondary-color font-semibold hover:underline cursor-pointer"
            >
              Show more
            </button>
          )}
        </p>
        <div className="flex items-center gap-2">
          <Image
            src={profileImage}
            alt={testimonial?.userId?.name || "Profile Image"}
            width={64}
            height={64}
            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full object-cover"
          />
          <div>
            <p className=" text-sm sm:text-base lg:text-lg text-secondary-color font-semibold ">
              {testimonial?.userId?.name}
            </p>
            <p className=" text-sm sm:text-sm lg:text-base text-lighter-color">
              {testimonial?.userId?.switchRole}
            </p>
          </div>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        closeIcon={<MdClose className="text-secondary-color text-xl" />}
        className="lg:!w-[600px]"
      >
        <div className="p-2 text-[#1a1a1a] max-h-[80vh] overflow-y-auto my-6">
          <div className="flex items-center gap-2 mb-5">
            <Image
              src={profileImage}
              alt={testimonial?.userId?.name || "Profile Image"}
              width={64}
              height={64}
              className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover"
            />
            <div>
              <p className="text-base lg:text-lg text-secondary-color font-semibold">
                {testimonial?.userId?.name}
              </p>
              <p className="text-sm lg:text-base text-lighter-color">
                {testimonial?.userId?.switchRole}
              </p>
            </div>
          </div>
          <p className="font-medium text-sm sm:text-base whitespace-pre-line leading-relaxed">
            {text}
          </p>
        </div>
      </Modal>
    </>
  );
};

export default TestimonialCard;
