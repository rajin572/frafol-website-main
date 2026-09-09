import React from "react";
import CategoryCard from "../shared/CategoryCard";
import ReuseButton from "../ui/Button/ReuseButton";
import Link from "antd/es/typography/Link";
import { ICategory } from "@/types";

const ExplorePhotographyCategory = ({
  categories,
}: {
  categories: ICategory[];
}) => {
  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 items-stretch gap-5">
        {categories?.map((item, index) => (
          <Link key={index} href={`/photography/${item?._id}`}>
            <CategoryCard key={index} item={item} />
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center !mt-10">
        <ReuseButton
          url="/photography"
          className="w-fit  mt-5 !text-sm sm:!text-base lg:!text-lg !py-4.5"
          variant="secondary"
        >
          {/* See All Categories */}
          Zobraziť všetky kategórie
        </ReuseButton>
      </div>
    </div>
  );
};

export default ExplorePhotographyCategory;
