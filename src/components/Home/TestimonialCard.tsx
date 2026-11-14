"use client";
import { getMediaUrl } from "@/utils/mediaUrl";
import { ITestimonial } from "@/types/testimonial.type";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Modal } from "antd";
import { MdClose } from "react-icons/md";
import { Quote } from "lucide-react";
import { AllImages } from "../../../public/assets/AllImages";

interface TestimonialCardProps {
  testimonial: ITestimonial;
}

const CHAR_LIMIT = 100;

const PROFESSIONAL_ROLES = ["photographer", "videographer", "both"];

const isProfessionalUser = (user: ITestimonial["userId"]) =>
  PROFESSIONAL_ROLES.includes(user?.role) ||
  PROFESSIONAL_ROLES.includes(user?.switchRole);

// Author block (picture + name). Professionals have a public profile, so it links there;
// clients and admins have none, so it stays plain.
const AuthorLink = ({
  user,
  className,
  children,
}: {
  user: ITestimonial["userId"];
  className: string;
  children: React.ReactNode;
}) => {
  return isProfessionalUser(user) && user?._id ? (
    <Link
      href={`/professionals/${user._id}`}
      className={`${className} cursor-pointer hover:opacity-80 transition-opacity`}
    >
      {children}
    </Link>
  ) : (
    <div className={className}>{children}</div>
  );
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(testimonial)
  const text = testimonial?.text || "";
  const isLong = text.length > CHAR_LIMIT;
  const previewText = isLong ? `${text.slice(0, CHAR_LIMIT).trimEnd()}...` : text;

  // Red name = a professional (their profile is linked); anyone else keeps the normal text colour.
  const nameColor = isProfessionalUser(testimonial?.userId)
    ? "text-secondary-color"
    : "text-base-color";

  const profileImage =
    testimonial?.userId?.profileImage?.length > 0
      ? getMediaUrl(testimonial?.userId?.profileImage)
      : AllImages.dummyProfile;


  const roleLabels: Record<string, string> = {
    photographer: "Fotograf",
    videographer: "Kameraman",
    client: "Klient",
    both: "Fotograf a kameraman",
    company: "Firma", // or "Spoločnosť"
  };
  return (
    <>
      <div className="relative flex min-h-[240px] h-full flex-col justify-between rounded-xl border border-base-color/10 bg-white p-6">
        <Quote aria-hidden className="mb-4 size-6 text-secondary-color/40" />
        <p className="mb-6 grow whitespace-pre-line text-sm lg:text-base leading-relaxed text-base-color/80">
          {previewText}
          {isLong && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="ml-1 text-secondary-color font-semibold hover:underline cursor-pointer"
            >
              Zobraziť viac
            </button>
          )}
        </p>
        <AuthorLink user={testimonial?.userId} className="flex items-center gap-3 border-t border-base-color/10 pt-4">
          <Image
            src={profileImage}
            alt={testimonial?.userId?.name || "Profile Image"}
            width={64}
            height={64}
            className="w-11 h-11 lg:w-12 lg:h-12 rounded-full object-cover"
          />
          <div>
            <p className={`text-sm sm:text-base font-semibold ${nameColor}`}>
              {testimonial?.userId?.name}
            </p>
            <p className="text-sm sm:text-sm lg:text-base text-lighter-color">
              {roleLabels[testimonial?.userId?.switchRole?.toLowerCase() ?? ""] || testimonial?.userId?.switchRole}
            </p>
          </div>
        </AuthorLink>
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
          <AuthorLink user={testimonial?.userId} className="flex items-center gap-2 mb-5">
            <Image
              src={profileImage}
              alt={testimonial?.userId?.name || "Profile Image"}
              width={64}
              height={64}
              className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover"
            />
            <div>
              <p className={`text-base lg:text-lg font-semibold ${nameColor}`}>
                {testimonial?.userId?.name}
              </p>
              <p className="text-sm lg:text-base text-lighter-color">
                {testimonial?.userId?.switchRole}
              </p>
            </div>
          </AuthorLink>
          <p className="font-medium text-sm sm:text-base whitespace-pre-line leading-relaxed">
            {text}
          </p>
        </div>
      </Modal>
    </>
  );
};

export default TestimonialCard;
