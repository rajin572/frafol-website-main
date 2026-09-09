"use client";
import React, { useRef, useEffect } from "react";

interface WatermarkedImageProps
  extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  src: string;
  watermark?: string;
  font?: string;
  fontSize?: number;
  color1?: string; // first color (white)
  opacity1?: number; // opacity for first color
  color2?: string; // second color (black)
  opacity2?: number; // opacity for second color
  angle?: number; // degrees
  gap?: number; // space between watermarks
}

const WatermarkedImage: React.FC<WatermarkedImageProps> = ({
  src,
  watermark = "©oriboshi",
  font = "Verdana, Arial, sans-serif",
  fontSize = 20,
  color1 = "#ffffff",
  opacity1 = 0.5,
  color2 = "#000000",
  opacity2 = 0.5,
  angle = -30,
  gap = 100,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const rad = (Math.PI / 180) * angle;
      const textWidth = ctx.measureText(watermark).width;

      // Function to draw tiled watermark with given color and opacity and offset
      const drawWatermark = (
        color: string,
        opacity: number,
        offsetX: number,
        offsetY: number
      ) => {
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.font = `${fontSize}px ${font}`;
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (let y = -canvas.height; y < canvas.height * 2; y += gap) {
          for (
            let x = -canvas.width + offsetX;
            x < canvas.width * 2;
            x += textWidth + gap
          ) {
            ctx.save();
            ctx.translate(x, y + offsetY);
            ctx.rotate(rad);
            ctx.fillText(watermark, 0, 0);
            ctx.restore();
          }
        }
        ctx.restore();
      };

      // Draw white watermark layer
      drawWatermark(color1, opacity1, 0, 0);
      // Draw black watermark layer, offset by half gap & half textWidth
      drawWatermark(color2, opacity2, (textWidth + gap) / 2, gap / 2);
    };
    img.src = src;
  }, [
    src,
    watermark,
    font,
    fontSize,
    color1,
    opacity1,
    color2,
    opacity2,
    angle,
    gap,
  ]);

  return <canvas ref={canvasRef} {...props} />;
};

export default WatermarkedImage;
