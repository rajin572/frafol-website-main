"use client";
import { useState } from "react";
import { Image as AntdImage } from "antd";
import { Maximize2 } from "lucide-react";
import FallbackImage from "../ui/FallbackImage";

// The forum post photo. Clicking it opens the Ant Design image preview (zoom, rotate, close) with
// the original file, the same viewer the portfolio galleries use.
const ForumPostImage = ({ src }: { src: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative mb-8 block w-full cursor-zoom-in overflow-hidden rounded-xl"
      >
        <FallbackImage
          width={1400}
          height={900}
          src={src}
          alt="user"
          sizes="(min-width: 1024px) 70vw, 100vw"
          className="w-full h-auto max-h-[480px] object-cover rounded-xl"
        />
        <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-black/55 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 className="size-4" />
        </span>
      </button>

      {/* Hidden antd image that only provides the preview overlay */}
      <AntdImage
        src={src}
        alt="user"
        style={{ display: "none" }}
        preview={{
          visible: open,
          src,
          onVisibleChange: (visible) => setOpen(visible),
        }}
      />
    </>
  );
};

export default ForumPostImage;
