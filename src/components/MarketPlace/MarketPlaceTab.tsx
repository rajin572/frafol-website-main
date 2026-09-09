"use client";
import { ICategory } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const MarketPlaceTab = ({ categories }: { categories: ICategory[] }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const { replace } = router;

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    if (tab) {
      params.set("category", tab);
    } else {
      params.delete("category");
    }

    replace(`${pathName}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div
        onClick={() => handleTabChange("all")}
        className={`${
          searchParams.get("category") === "all"
            ? "bg-secondary-color text-white border-secondary-color"
            : "bg-transparent text-secondary-color border-base-color/30"
        } px-4 py-1.5 cursor-pointer rounded-md transition-all duration-300 border text-sm sm:text-base`}
      >
        All
      </div>
      {categories?.map((category) => (
        <div
          key={category?._id}
          onClick={() => handleTabChange(category?._id)}
          className={`${
            searchParams.get("category") === category?._id
              ? "bg-secondary-color text-white border-secondary-color"
              : "bg-transparent text-secondary-color border-base-color/30"
          } px-4 py-1.5 cursor-pointer rounded-md transition-all duration-300 border text-sm sm:text-base`}
        >
          {category?.title}
        </div>
      ))}
    </div>
  );
};

export default MarketPlaceTab;
