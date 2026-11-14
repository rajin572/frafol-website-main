import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  className?: string;
  title?: string;
  subTitle?: string;
  /** Short label above the title (e.g. "Kategórie"). */
  eyebrow?: string;
  description?: string;
  /** "dark" for sections on a dark background. */
  tone?: "light" | "dark";
}

// Shared section / page heading, used across the whole website. Plain typography, no decoration.
const SectionHeader: React.FC<SectionHeaderProps> = ({
  className = "",
  subTitle,
  eyebrow,
  title,
  description,
  tone = "light",
}) => {
  const dark = tone === "dark";
  return (
    <div className={cn("flex flex-col justify-center items-center text-center mb-10", className)}>
      {eyebrow && (
        <p className={cn("mb-3 text-sm font-semibold", dark ? "text-third-color" : "text-secondary-color")}>
          {eyebrow}
        </p>
      )}
      {subTitle && (
        <h2 className="text-sm sm:text-base lg:text-lg text-secondary-color font-semibold mb-3">
          {subTitle}
        </h2>
      )}
      {title && (
        <h1
          className={cn(
            "mb-4 text-2xl sm:text-3xl lg:text-[2.5rem] font-bold tracking-tight leading-tight",
            dark ? "text-white" : "text-base-color"
          )}
        >
          {title}
        </h1>
      )}
      {description && (
        <p
          className={cn(
            "text-base lg:text-lg w-full sm:w-[90%] lg:w-[70%] xl:w-[55%] mx-auto leading-relaxed",
            dark ? "text-white/65" : "text-base-color/65"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
