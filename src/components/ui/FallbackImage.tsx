"use client";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

// next/image that falls back to loading the original file when the optimizer fails.
// The optimizer gives up when it cannot download the original within about 7 s (seen with large
// S3 photos, e.g. a 3.5 MB PNG) and answers 500, which shows a broken image. On that error this
// re-renders the same image with `unoptimized`, so the browser loads it straight from the source.
const FallbackImage = (props: ImageProps) => {
  const [failed, setFailed] = useState(false);
  const { onError, unoptimized, alt, ...rest } = props;

  return (
    <Image
      {...rest}
      alt={alt}
      unoptimized={failed || unoptimized}
      onError={(e) => {
        if (!failed) setFailed(true);
        onError?.(e);
      }}
    />
  );
};

export default FallbackImage;
