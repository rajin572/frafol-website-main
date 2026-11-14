import Image from "next/image";
import React from "react";
import { AllImages } from "../../../public/assets/AllImages";
import { IoCalendarOutline } from "react-icons/io5";
import ServiceCardBookNow from "../Professional/ServiceCardBookNow";
import { IPackage, IProfessionalUser, IProfile } from "@/types";
import { getMediaUrl } from "@/utils/mediaUrl";
import { formatDuration, formatWeeks } from "@/utils/durationLabels";
import { LuClock } from "react-icons/lu";
import { FaEuroSign } from "react-icons/fa6";
import ExpandableText from "./ExpandableText";

const ProfessionalServiceCard = ({
  data,
  myData,
  professionalUser
}: {
  data: IPackage;
  myData: IProfile;
  professionalUser: IProfessionalUser;

}) => {

  return (
    <div className="p-2 rounded-2xl border border-base-color/10 bg-white relative flex flex-col justify-between h-full">
      <div className="">
        <Image
          width={800}
          height={600}
          src={
            data?.thumbnailImage
              ? getMediaUrl(data?.thumbnailImage)
              : AllImages?.dummyCover
          }
          alt="workspace"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="w-full h-52 object-cover rounded-xl"
        />
        <div className="flex items-center justify-start gap-2 absolute top-4 w-full px-4">
          {data?.vatAmount > 0 ? (
            <span className="text-xs sm:text-sm font-semibold bg-white/95 text-base-color py-1 px-2.5 rounded-md">
              Vrátane DPH: {data?.vatAmount}%
            </span>
          ) : (
            <span></span>
          )}
        </div>
        <div className="px-3 mt-4">
          <span className="text-xs sm:text-sm font-semibold bg-secondary-color/10 text-secondary-color py-1 px-2.5 rounded-md capitalize">
            {data?.category === "photography" ? "Fotenie" : data?.category === "videography" ? "Natáčanie" : data?.category === "both" ? "Fotenie a natáčanie" : ""}
          </span>
          <p className="text-lg sm:text-xl font-bold leading-snug text-base-color mt-3">
            {data.title}
          </p>
          <ExpandableText
            text={data.description}
            maxChars={100}
            className="text-sm sm:text-base leading-relaxed text-base-color/75 mt-1.5"
          />
          <div className="flex flex-col gap-1.5 mt-4 text-sm sm:text-base">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <FaEuroSign className="text-secondary-color" />
                <p className="font-semibold">
                  Cena:
                </p>
              </div>
              <p>{data.mainPrice?.toFixed(2)}€ </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <LuClock className="text-secondary-color" />
                <p className="font-semibold">
                  Trvanie:
                </p>
              </div>
              <p>{formatDuration(data?.duration)}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <IoCalendarOutline className="text-secondary-color" />
                <p className="font-semibold">
                  Čas dodania:
                </p>
              </div>
              <p>
                {formatWeeks(data?.deliveryTime / 7)}
              </p>
            </div>
          </div>

        </div>
      </div>

      {myData?.role === "user" ? (
        <div className="px-3 pb-3 mt-5">
          <ServiceCardBookNow myData={myData} packageData={data} professionalUser={professionalUser} />
        </div>
      ) : myData?.role === "company" ? (
        <div className="px-3 pb-3 mt-5">
          <ServiceCardBookNow myData={myData} packageData={data} professionalUser={professionalUser} />
        </div>
      ) : (
        !myData?._id && (
          <div className="px-3 pb-3 mt-5">
            <ServiceCardBookNow myData={myData} packageData={data} professionalUser={professionalUser} />
          </div>
        )
      )}

    </div>
  );
};

export default ProfessionalServiceCard;
