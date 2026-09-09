import React from "react";
import AnimatedUnderline from "./Animation/AnimatedUnderline";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  className?: string;
  title?: string;
  subTitle?: string;
  description?: string;
}
const SectionHeader: React.FC<SectionHeaderProps> = ({
  className = "",
  subTitle,
  title,
  description,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center text-center mb-10",
        className
      )}
    >
      {subTitle && (
        <h2 className="text-sm sm:text-base lg:text-lg text-secondary-color font-semibold mb-3">
          {subTitle}
        </h2>
      )}
      {title && (
        <div className="mb-3">
          {" "}
          <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-secondary-color font-bold mb-2">
            {title}
          </h1>
          <AnimatedUnderline className="mx-auto" />
        </div>
      )}
      {description && (
        <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-base-color w-full sm:w-[90%] lg:w-[80%] xl:w-[65%] mx-auto font-medium">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
