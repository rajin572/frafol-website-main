"use client";
import React from "react";
const ExploreCategoryTab = () => {
  const [activeTab, setActiveTab] = React.useState<
    "photography" | "videography"
  >("photography");
  return (
    <div>
      <div className="bg-background-color p-1.5 rounded-lg w-fit mx-auto">
        <div className="flex justify-center items-center gap-2 font-semibold text-sm sm:text-sm lg:text-base xl:text-lg">
          <button
            className={`${activeTab === "photography"
                ? "bg-secondary-color text-white"
                : "bg-transparent text-secondary-color"
              } px-3 py-1 cursor-pointer rounded-lg transition-all duration-500 relative group`}
            onClick={() => setActiveTab("photography")}
          >
            Photography
          </button>
          <button
            className={`${activeTab === "videography"
                ? "bg-secondary-color text-white"
                : "bg-transparent text-secondary-color"
              } px-3 py-1 cursor-pointer rounded-lg transition-all duration-500 relative group`}
            onClick={() => setActiveTab("videography")}
          >
            Videography
          </button>
        </div>
      </div>
      <div className="mt-10">
        {activeTab === "photography" && <div></div>}
        {activeTab === "videography" && <div></div>}
      </div>
    </div>
  );
};

export default ExploreCategoryTab;
