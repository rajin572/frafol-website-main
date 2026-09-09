import { getServerUrl } from "@/helpers/config/envConfig";
import { ICategory } from "@/types";
import Image from "next/image";
import React from "react";
import { AllImages } from "../../../public/assets/AllImages";

// Define the props interface that expects a 'service' object
interface CategoryCardProps {
  item: ICategory;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ item }) => {
  const serverUrl = getServerUrl();
  return (
    <div className="relative group w-full">
      <Image
        width={2000}
        height={2000}
        src={serverUrl + item?.image || AllImages.dummyProfile}
        alt={item?.title || "Category Image"}
        className="w-full !h-[360px] object-cover rounded-lg"
        fetchPriority="high"
        priority={true}
      />

      <div className=" absolute inset-0 bg-gradient-to-b from-[#00000066] via-[#0000005A] to-[#000000AA] flex flex-col justify-end p-3 rounded-lg transition-all duration-300">
        <p className="text-primary-color !text-base sm:!text-lg lg:!text-xl !font-bold !mb-1 cursor-pointer">
          {item?.title || "Category Title"}
        </p>
        <p className="text-primary-color text-sm sm:text-sm lg:text-base font-medium !mb-1 cursor-pointer">
          {item?.subTitle || "Category Sub Title"}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
