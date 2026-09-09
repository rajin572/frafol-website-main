// Accordion.jsx
"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { GoPlus } from "react-icons/go";
import { HiMinus } from "react-icons/hi";

interface AccordionProps {
  title: string;
  index: number;
  content: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  index,
  content,
  className,
  isOpen,
  onToggle,
}) => {
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight); // Access only if not null
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      className={cn(
        "mb-5 bg-primary-color duration-500 border-b-2 border-[#CDD6DA40]",
        className
      )}
    >
      <div
        className="flex justify-between gap-5 items-center p-4 cursor-pointer duration-500"
        onClick={onToggle}
      >
        <div className="flex items-center gap-5">
          <span className="text-[#3C3C4380] !text-lg sm:!text-xl md:!text-2xl lg:!text-3xl xl:!text-4xl font-semibold text-nowrap whitespace-nowrap shrink-0">
            0{index + 1}
          </span>
          <h3 className="text-base-color text-base md:text-lg lg:text-xl font-semibold">
            {title}
          </h3>
        </div>
        {isOpen ? (
          <div className="p-[2px] rounded-full border border-secondary-color">
            <HiMinus className="text-secondary-color text-base md:text-lg lg:text-xl duration-500" />
          </div>
        ) : (
          <div className="p-[2px] rounded-full border border-secondary-color">
            <GoPlus className="text-secondary-color text-base md:text-lg lg:text-xl duration-500" />
          </div>
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
        <div className="p-2 w-[98%] ml-auto duration-500 text-sm md:text-sm lg:text-base text-[#3C3C43D9] font-medium">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
