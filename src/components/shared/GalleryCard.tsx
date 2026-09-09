/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerUrl } from "@/helpers/config/envConfig";
import { Image as AntdImage } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface GalleryCardProps {
  gallery: any;
  showOnlyImage?: boolean;
  arrayOfImages?: boolean;
  photoView?: boolean;
  previewGroup?: boolean;
}

const GalleryCard = ({
  gallery,
  showOnlyImage = false,
  arrayOfImages = false,
  photoView = false,
}: GalleryCardProps) => {
  const serverUrl = getServerUrl();

  const content = (
    <div className="relative group w-full">
      {photoView ? (
        <AntdImage
          src={arrayOfImages ? serverUrl + gallery : serverUrl + gallery?.image}
          alt={gallery?.name ? gallery?.name : gallery || "gallery Image"}
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <Image
          width={2000}
          height={2000}
          src={arrayOfImages ? serverUrl + gallery : serverUrl + gallery?.image}
          alt={gallery?.name ? gallery?.name : gallery?.name || "gallery Image"}
          className="w-full h-full object-cover rounded-lg"
          fetchPriority="high"
          priority={true}
        />
      )}

      {!showOnlyImage && (
        <div className="opacity-0 group-hover:opacity-100 group-focus:opacity-100 absolute inset-0 bg-gradient-to-b from-[#0000001A] via-[#0000005A] to-[#000000AA] flex flex-col justify-end p-5 rounded-lg transition-all duration-300">
          <p className="text-primary-color text-base sm:text-lg lg:text-xl font-semibold mb-3 cursor-pointer">
            {gallery?.name}
          </p>
        </div>
      )}
    </div>
  );
  return (
    <div>
      {!showOnlyImage ? (
        <Link href={`/professionals/${gallery?.userId}`}>{content}</Link>
      ) : (
        content
      )}
    </div>
  );
};

export default GalleryCard;
