import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchSkeleton = () => {
  return (
    <div className="flex justify-baseline items-center gap-5 py-3 px-2 bg-gray-200 animate-pulse rounded-lg overflow-hidden w-60 lg:w-80 animate-pulse">
      <FiSearch className="text-gray-400 size-4.5 animate-pulse" />
    </div>
  );
};

export default SearchSkeleton;
