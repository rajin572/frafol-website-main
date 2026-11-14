"use client";
import React from "react";
import Image from "next/image";
import { getMediaUrl } from "@/utils/mediaUrl";
import { AllImages } from "../../../public/assets/AllImages";
import { cn } from "@/lib/utils";

// Product photos: thumbnails in a column on the left, the selected photo next to them.
const MarketPlaceImageTab = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = React.useState(images?.[0]);

  React.useEffect(() => {
    setSelectedImage(images?.[0]);
  }, [images]);

  return (
    <div className="flex gap-3 sm:gap-4">
      <div className="flex flex-col gap-2">
        {(images ?? []).map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => setSelectedImage(item)}
            aria-pressed={item === selectedImage}
            className={cn(
              "shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-colors",
              item === selectedImage ? "border-secondary-color" : "border-transparent hover:border-base-color/20"
            )}
          >
            <Image
              width={80}
              height={80}
              src={item ? getMediaUrl(item) : AllImages.dummyCover?.src}
              alt="product"
              className="size-16 sm:size-20 object-cover"
            />
          </button>
        ))}
      </div>

      <div className="min-w-0 flex-1">
        <Image
          key={selectedImage} // <-- Force remount & reload on change
          width={1000}
          height={1000}
          src={
            selectedImage
              ? getMediaUrl(selectedImage)
              : AllImages.dummyCover?.src
          }
          alt="selected product"
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="w-full h-auto object-cover rounded-xl"
          fetchPriority="high"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default MarketPlaceImageTab;
