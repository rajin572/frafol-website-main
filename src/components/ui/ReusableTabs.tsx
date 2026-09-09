"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { motion } from "framer-motion";

type Tab<T extends string> = {
  label: string;
  value: T;
  disabled?: boolean;
  content: React.ReactNode;
};

type ReusableTabsProps<T extends string> = {
  tabs: Tab<T>[];
  activeTab: T;
  align?: "left" | "center" | "right";
  resetPage?: boolean;
  tabContentStyle?: string;
  tabName?: string;
  variant?: "default" | "bordered";
};

const ReusableTabs = <T extends string>({
  tabs,
  activeTab,
  align = "center",
  resetPage = false,
  tabContentStyle = "",
  tabName = "tab",
  variant = "default",
}: ReusableTabsProps<T>) => {
  const tabRowRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ offset: 0, width: 0 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition(); // 2. Initialize transition

  const updateIndicator = (target: HTMLElement) => {
    const tabBounds = target.getBoundingClientRect();
    const rowBounds = tabRowRef.current?.getBoundingClientRect();

    if (rowBounds && indicatorRef.current && tabRowRef.current) {
      // Add scrollLeft to account for horizontal scroll
      const offset = tabBounds.left - rowBounds.left + tabRowRef.current.scrollLeft;
      const width = tabBounds.width;

      setIndicatorStyle({ offset, width });
    }
  };


  useEffect(() => {
    const activeTabElement = document.querySelector(
      `button[tab-value="${activeTab}"]`
    );
    if (activeTabElement) {
      updateIndicator(activeTabElement as HTMLElement);
    }

    // Update indicator on window resize
    const handleResize = () => {
      const activeTabElement = document.querySelector(
        `button[tab-value="${activeTab}"]`
      );
      if (activeTabElement) {
        updateIndicator(activeTabElement as HTMLElement);
      }
    };

    // Update indicator on scroll
    const handleScroll = () => {
      const activeTabElement = document.querySelector(
        `button[tab-value="${activeTab}"]`
      );
      if (activeTabElement) {
        updateIndicator(activeTabElement as HTMLElement);
      }
    };

    const tabRowElement = tabRowRef.current;

    window.addEventListener('resize', handleResize);
    tabRowElement?.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      tabRowElement?.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab]);


  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const { replace } = router;

  const justifyClass =
    align === "left"
      ? "justify-start"
      : align === "right"
        ? "justify-end"
        : "justify-center";

  const handleTabChange = (value: string) => {
    const text = value;
    const params = new URLSearchParams(searchParams);
    if (text) {
      params.set(tabName, text);
      if (resetPage) {
        params.delete("page");
        params.delete("search");
      }
    } else {
      params.delete(tabName);
    }

    startTransition(() => {
      replace(`${pathName}?${params.toString()}`, { scroll: false });
    });
    const activeTabElement = document.querySelector(
      `button[tab-value="${value}"]`
    );
    if (activeTabElement) {
      updateIndicator(activeTabElement as HTMLElement);
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <div className={`w-full flex ${justifyClass}`}>
        <div
          ref={tabRowRef}
          className={`max-w-full scrollbar-thin scrollbar-thumb-[#a13200] scrollbar-track-gray-200 hover:scrollbar-thumb-[#d14200] ${variant === "bordered" ? " p-1 rounded-xl flex gap-2 relative overflow-x-auto" : "bg-[#f3f3f3] p-1 rounded-xl flex gap-2 relative overflow-x-auto"}`}
        >
          {tabs.map((tab) => (
            <button
              key={tab.value}
              tab-value={tab.value}
              disabled={tab.disabled || false}
              onClick={() => handleTabChange(tab.value)}
              className={`px-4 z-10 py-1.5 rounded-md bg-transparent font-medium text-sm sm:text-base transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer text-nowrap
                ${activeTab === tab.value ? (variant !== "bordered" ? "text-white" : "text-[#a13200]") : (variant !== "bordered" ? "text-[#a13200]" : "text-[#707070]")}
            `}
            >
              {tab.label}
            </button>
          ))}
          <motion.div
            ref={indicatorRef}
            className={`${variant === "bordered" ? "indicator absolute bottom-1 top-1 border-b-2 border-secondary-color z-0" : "indicator absolute bottom-1 top-1 rounded-md bg-secondary-color z-0"} `}
            animate={{
              transform: `translateX(${indicatorStyle.offset - 4}px)`,
              width: `${indicatorStyle.width}px`,
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            initial={false}
          />
        </div>
      </div>

      <div className={cn("mt-10", tabContentStyle)}>
        {tabs.find((tab) => tab.value === activeTab)?.content}
      </div>
    </div>
  );
};

export default ReusableTabs;
