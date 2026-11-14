"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

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
    <div className={cn("border-y border-base-color/30 py-2", className)}>
      <button
        type="button"
        aria-expanded={isOpen}
        className="flex w-full justify-between items-center p-2 cursor-pointer text-left"
        onClick={toggleAccordion}
      >
        <h3 className="text-base-color text-base sm:text-lg lg:text-xl font-bold">
          {title}
        </h3>
        <IoIosArrowDown
          className={cn("text-2xl transition-transform duration-300", isOpen && "rotate-180")}
        />
      </button>

      <div
        ref={contentRef}
        style={{
          height: `${height}px`,
          overflow: "hidden",
          transition: "height 0.5s ease",
        }}
      >
        <div className="p-2 text-base-color text-sm sm:text-base lg:text-lg">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailAccordion;
