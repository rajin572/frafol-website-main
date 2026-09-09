"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type ProductDetailAccordionProps = {
  title: string;
  content: React.ReactNode;
  className?: string;
};

const ProductDetailAccordion: React.FC<ProductDetailAccordionProps> = ({
  title,
  content,
  className,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      className={cn("border-y border-[#2C2C2C] duration-500 py-2", className)}
    >
      <div
        className="flex justify-between items-center p-2 cursor-pointer duration-500"
        onClick={toggleAccordion}
      >
        <h3 className="text-base-color text-sm sm:text-base lg:text-lg xl:text-xl font-bold">
          {title}
        </h3>
        {isOpen ? (
          <IoIosArrowUp className="text-2xl duration-500" />
        ) : (
          <IoIosArrowDown className="text-2xl duration-500" />
        )}
      </div>

      <div
        ref={contentRef}
        style={{
          height: `${height}px`,
          overflow: "hidden",
          transition: "height 0.5s ease",
        }}
      >
        <div className="p-2 text-base-color duration-500 text-sm sm:text-base lg:text-lg xl:text-lg">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailAccordion;
