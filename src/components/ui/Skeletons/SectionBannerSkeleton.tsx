import React from "react";

const SectionBannerSkeleton = () => {
  return (
    <section>
      <div className="relative h-full lg:h-[55vh] bg-gray-300 animate-pulse flex items-center justify-center select-none">
        {/* Image Placeholder */}
        <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>

        {/* Text Content Placeholder */}
        <div className="absolute w-full h-full z-10 flex items-end p-10">
          <div className="w-full">
            <div className="flex justify-between items-center gap-2 mb-[2%] ml-[4%]">
              <div className="">
                <div className="h-8 mb-2 bg-gray-500 animate-pulse rounded w-60"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionBannerSkeleton;
