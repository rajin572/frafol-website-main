import { getMediaUrl } from "@/utils/mediaUrl";
import { ICategory } from "@/types";
import Image from "next/image";
import React from "react";
import { ArrowUpRight } from "lucide-react";
import { AllImages } from "../../../public/assets/AllImages";

interface CategoryCardProps {
  item: ICategory;
}

// Photo/video category tile: full-bleed photo, title on a dark gradient, arrow that lights up on hover.
const CategoryCard: React.FC<CategoryCardProps> = ({ item }) => {
  return (
    <div className="group relative w-full overflow-hidden rounded-xl bg-base-color">
      <Image
        width={800}
        height={1000}
        src={getMediaUrl(item?.image) || AllImages.dummyProfile}
        alt={item?.title || "Kategória"}
        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="w-full !h-[360px] object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="flex items-center justify-between gap-2 text-lg sm:text-xl font-bold text-white leading-tight">
          {item?.title || "Kategória"}
          <ArrowUpRight className="size-5 shrink-0 opacity-70 transition-opacity group-hover:opacity-100" />
        </p>
        {item?.subTitle && (
          <p className="mt-1 text-sm text-white/75 line-clamp-2">{item.subTitle}</p>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
