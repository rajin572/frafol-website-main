import Image from "next/image";
import React from "react";
import ReuseButton from "../ui/Button/ReuseButton";

import { StaticImageData } from "next/image";

interface Idata {
  image: StaticImageData;
  title: string;
  description: string;
  reverse?: boolean;
  buttonText?: string | null;
  redirectUrl?: string;
}

interface AboutUsCardProps {
  data: Idata;
}
const AboutUsCard = ({ data }: AboutUsCardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-7 ">
      <div className={`${data?.reverse ? "md:order-2" : ""} relative`}>
        <Image
          src={data?.image}
          alt={data?.title}
          className="w-full object-cover h-[400px] md:h-[500px] lg:!h-[600px] rounded-2xl"
        />
      </div>
      <div className={` ${data?.reverse ? "md:order-1" : ""}`}>
        <h2 className="text-xl sm:text-2xl lg:text-3xl text-secondary-color font-bold">
          {data?.title}
        </h2>
        <p className="mt-4 text-base sm:text-lg lg:text-xl text-base-color font-medium">
          {data?.description}
        </p>
        {data?.buttonText && (
          <ReuseButton
            variant="secondary"
            url={data?.redirectUrl}
            className="mt-4 !w-fit !text-sm sm:!text-sm lg:!text-base"
          >
            {data?.buttonText}
          </ReuseButton>
        )}
      </div>
    </div>
  );
};

export default AboutUsCard;
