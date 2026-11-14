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
        "mb-3 rounded-xl border bg-primary-color transition-colors duration-200",
        isOpen
          ? "border-base-color/20"
          : "border-base-color/10 hover:border-base-color/20",
        className
      )}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={!!isOpen}
        className="flex justify-between gap-5 items-center p-4 sm:p-5 cursor-pointer"
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle?.();
          }
        }}
      >
        <div className="flex items-center gap-4 sm:gap-5">
          <span
            className={cn(
              "text-sm font-semibold tabular-nums shrink-0 transition-colors duration-200",
              isOpen ? "text-secondary-color" : "text-base-color/35"
            )}
          >
            0{index + 1}
          </span>
          <h3 className="text-base-color text-base md:text-lg font-semibold">
            {title}
          </h3>
        </div>
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
            isOpen ? "border-secondary-color bg-secondary-color text-white" : "border-base-color/15 text-base-color/70"
          )}
        >
          {isOpen ? <HiMinus className="text-lg" /> : <GoPlus className="text-lg" />}
        </span>
      </div>
      <div
        ref={contentRef}
        style={{
          height: `${height}px`,
          overflow: "hidden",
          transition: "height 0.5s ease",
        }}
      >
        <div className="px-4 sm:px-5 pb-5 sm:pl-[3.25rem] text-sm lg:text-base text-base-color/70 leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
