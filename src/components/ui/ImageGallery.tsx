"use client";
import React from "react";
import { Image as AntdImage } from "antd"; // import this
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import GalleryCard from "../shared/GalleryCard";

interface ImageGalleryProps<T> {
  data: T[];
  columnsCountBreakPoints?: { [key: number]: number };
  showOnlyImage?: boolean;
  arrayOfImages?: boolean;
  photoView?: boolean;
}

const ImageGallery = <T,>({
  data,
  columnsCountBreakPoints,
  showOnlyImage = false,
  arrayOfImages = false,
  photoView = false,
}: ImageGalleryProps<T>) => {
  return (
    <AntdImage.PreviewGroup>
      <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
        <Masonry gutter="10px">
          {data?.map((item, index) => (
            <GalleryCard
              showOnlyImage={showOnlyImage}
              key={index}
              gallery={item}
              arrayOfImages={arrayOfImages}
              photoView={photoView}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </AntdImage.PreviewGroup>
  );
};

export default ImageGallery;
