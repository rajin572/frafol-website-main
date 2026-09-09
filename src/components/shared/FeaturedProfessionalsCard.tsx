import { IProfessional } from "@/types";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import FeaturedProfessionalsCardSlider from "./Card/FeaturedProfessionalsCardSlider";

interface FeaturedProfessionalsCardProps {
  item: IProfessional;
}

const FeaturedProfessionalsCard: React.FC<FeaturedProfessionalsCardProps> = ({
  item,
}) => {

  console.log(item)
  return (
    <div className="flex flex-col gap-2 bg-base-color/[0.01] rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group" >
      {/* Image/Video Carousel Container */}
      <FeaturedProfessionalsCardSlider item={item} />
      {/* Content Section */}
      <Link href={`/professionals/${item?._id}`}>
        <div className="p-2 cursor-pointer ">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-secondary-color text-sm sm:text-base lg:text-lg font-bold line-clamp-1">
              {item?.name}
            </h3>
            {item?.averageRating > 0 && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <FaStar className="text-secondary-color text-sm sm:text-base lg:text-lg" />
                <p className="text-secondary-color text-sm sm:text-base lg:text-lg">
                  {item?.averageRating?.toFixed(1)}
                </p>
              </div>
            )}
          </div>
          <p className="text-base-color text-sm lg:text-sm font-medium mt-1">
            {item?.role === "both"
              ? "Fotograf a Kameraman"
              : item?.role === "photographer"
                ? "Fotograf"
                : "Kameraman"}
          </p>
          <p className="flex items-center gap-1 text-base-color text-sm lg:text-sm font-medium mt-1 line-clamp-1">
            <IoLocationSharp className="flex-shrink-0" /> {item?.town}
          </p>
          <p className="text-base-color text-sm lg:text-sm font-medium mt-1">
            {item?.minHourlyRate}€ - {item?.maxHourlyRate}€
          </p>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedProfessionalsCard;
