"use client";
import { cn } from "@/lib/utils";
import { ICategory } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const MarketPlaceTab = ({ categories }: { categories: ICategory[] }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const { replace } = router;

  // No ?category= means everything is listed, so "Všetko" is shown as the active chip then too.
  const activeCategory = searchParams.get("category") || "all";

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    if (tab) {
      params.set("category", tab);
    } else {
      params.delete("category");
    }

    replace(`${pathName}?${params.toString()}`, { scroll: false });
  };

  const chipClass = (active: boolean) =>
    cn(
      "px-4 py-2 cursor-pointer rounded-lg transition-colors duration-200 border text-sm sm:text-base font-medium",
      active
        ? "bg-secondary-color text-white border-secondary-color"
        : "bg-transparent text-secondary-color border-base-color/20 hover:border-secondary-color"
    );

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <button type="button" onClick={() => handleTabChange("all")} className={chipClass(activeCategory === "all")}>
        Všetko
      </button>
      {categories?.map((category) => (
        <button
          type="button"
          key={category?._id}
          onClick={() => handleTabChange(category?._id)}
          className={chipClass(activeCategory === category?._id)}
        >
          {category?.title}
        </button>
      ))}
    </div>
  );
};

export default MarketPlaceTab;
