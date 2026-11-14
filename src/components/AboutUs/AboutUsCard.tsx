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
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-7 md:gap-10 lg:gap-16">
      <div className={`${data?.reverse ? "md:order-2" : ""} relative`}>
        <Image
          src={data?.image}
          alt={data?.title}
          placeholder="blur"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="w-full object-cover h-[340px] sm:h-[420px] md:h-[480px] lg:!h-[560px] rounded-2xl"
        />
      </div>
      <div className={` ${data?.reverse ? "md:order-1" : ""}`}>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight text-secondary-color font-bold">
          {data?.title}
        </h2>
        <p className="mt-5 text-base sm:text-lg lg:text-xl leading-relaxed text-base-color/80">
          {data?.description}
        </p>
        {data?.buttonText && (
          <ReuseButton
            variant="secondary"
            url={data?.redirectUrl}
            className="mt-7 !w-fit !py-6 !px-7 !rounded-lg !font-semibold !text-sm sm:!text-sm lg:!text-base"
          >
            {data?.buttonText}
          </ReuseButton>
        )}
      </div>
    </div>
  );
};

export default AboutUsCard;
