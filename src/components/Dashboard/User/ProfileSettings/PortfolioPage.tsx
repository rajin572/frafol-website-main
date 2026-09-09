"use client";
import React from "react";

import { IProfile } from "@/types";
import PortfolioBannerImage from "./PortfolioBannerImage";
import PortfolioIntroVideo from "./PortfolioIntroVideo";
import ReusableTabs from "@/components/ui/ReusableTabs";
import PortfolioGalleryImage from "./PortfolioGalleryImage";


const PortfolioPage = ({ activeTab, myData }: {
  activeTab: "introVideo" | "bannerImage" | "galleryImage"; myData: IProfile
}) => {

  console.log(myData)

  return (
    <div>
      <ReusableTabs
        tabName="portfolio"
        activeTab={activeTab}
        align="left"
        tabs={[
          {
            label: "Intro Video",
            value: "introVideo",
            content: <PortfolioIntroVideo myData={myData} />,
          },
          {
            label: "Banner Image",
            value: "bannerImage",
            content: <PortfolioBannerImage myData={myData} />, // Placeholder for portfolio content
          },
          {
            label: "Gallery Image",
            value: "galleryImage",
            content: <PortfolioGalleryImage myData={myData} />, // Placeholder for account credentials content
          },
        ]}
        variant="bordered"
      />
    </div>
  );
};

export default PortfolioPage;
