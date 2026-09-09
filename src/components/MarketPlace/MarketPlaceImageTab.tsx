"use client";
import React from "react";
import Image from "next/image";
import { getServerUrl } from "@/helpers/config/envConfig";
import { AllImages } from "../../../public/assets/AllImages";

const MarketPlaceImageTab = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = React.useState(images[0]);

  React.useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  const serverurl = getServerUrl();
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        {images.map((item) => (
          <Image
            width={80}
            height={80}
            key={item}
            src={item ? serverurl + item : AllImages.dummyCover?.src}
            alt="product"
            className={`object-cover cursor-pointer border-2 rounded-md ${
              item === selectedImage
                ? "border-secondary-color"
                : "border-transparent"
            }`}
            onClick={() => setSelectedImage(item)}
          />
        ))}
      </div>

      <div className="flex-1">
        <Image
          key={selectedImage} // <-- Force remount & reload on change
          width={1000}
          height={1000}
          src={
            selectedImage
              ? serverurl + selectedImage
              : AllImages.dummyCover?.src
          }
          alt="selected product"
          className="w-[90%] h-auto object-cover "
          fetchPriority="high"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default MarketPlaceImageTab;
