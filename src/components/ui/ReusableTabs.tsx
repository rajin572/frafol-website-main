"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, {
  useEffect,
  useLayoutEffect,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from "react";
import { motion } from "framer-motion";
import PendingBar from "@/components/shared/PendingBar";
import TabContentLoader from "@/components/shared/TabContentLoader";

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

// The URL is the only state of a tab: tapping a tab changes the URL, the server page re-reads
// `searchParams` and fetches that tab's data. That round trip can take a while on a phone, so the
// tab itself reacts at once (optimistic highlight) and a loading indicator shows until the
// server's answer arrives.
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
  const [indicatorStyle, setIndicatorStyle] = useState({ offset: 0, width: 0 });
  const [isPending, startTransition] = useTransition();

  // `activeTab` only changes once the server has re-rendered with the new URL. Show the tapped tab
  // immediately; React falls back to the real `activeTab` when the navigation settles.
  const [shownTab, setShownTab] = useOptimistic<T, T>(activeTab, (_current, next) => next);

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const { replace } = router;

  // Put the pill under the shown tab. Layout offsets (relative to the scrolling row) need no
  // scroll listener and no per-frame work.
  useLayoutEffect(() => {
    const row = tabRowRef.current;
    if (!row) return;

    const measure = () => {
      const el = row.querySelector<HTMLElement>(`button[tab-value="${shownTab}"]`);
      if (!el) return;
      setIndicatorStyle({ offset: el.offsetLeft, width: el.offsetWidth });
    };

    measure();
    // Web fonts can swap in after the first paint and change label widths.
    document.fonts?.ready?.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [shownTab]);

  // On narrow screens the row scrolls sideways: keep the shown tab in view.
  useEffect(() => {
    const row = tabRowRef.current;
    if (!row || row.scrollWidth <= row.clientWidth) return;
    const el = row.querySelector<HTMLElement>(`button[tab-value="${shownTab}"]`);
    if (!el) return;
    row.scrollTo({
      left: el.offsetLeft + el.offsetWidth / 2 - row.clientWidth / 2,
      behavior: "smooth",
    });
  }, [shownTab]);

  const justifyClass =
    align === "left"
      ? "justify-start"
      : align === "right"
        ? "justify-end"
        : "justify-center";

  const handleTabChange = (value: T) => {
    if (value === shownTab) return;

    const params = new URLSearchParams(searchParams);
    params.set(tabName, value);
    if (resetPage) {
      params.delete("page");
      params.delete("search");
    }

    startTransition(() => {
      setShownTab(value);
      replace(`${pathName}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="w-full overflow-hidden">
      <div className={`w-full flex ${justifyClass}`}>
        <div
          ref={tabRowRef}
          role="tablist"
          className={`max-w-full scrollbar-thin scrollbar-thumb-[#a13200] scrollbar-track-gray-200 hover:scrollbar-thumb-[#d14200] ${variant === "bordered" ? " p-1 rounded-xl flex gap-2 relative overflow-x-auto" : "bg-[#f3f3f3] p-1 rounded-xl flex gap-2 relative overflow-x-auto"}`}
        >
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={shownTab === tab.value}
              tab-value={tab.value}
              disabled={tab.disabled || false}
              onClick={() => handleTabChange(tab.value)}
              className={`px-4 z-10 py-1.5 rounded-md bg-transparent font-medium text-sm sm:text-base transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer text-nowrap touch-manipulation select-none
                ${shownTab === tab.value ? (variant !== "bordered" ? "text-white" : "text-[#a13200]") : (variant !== "bordered" ? "text-[#a13200]" : "text-[#707070]")}
            `}
            >
              {tab.label}
            </button>
          ))}
          <motion.div
            aria-hidden
            className={`${variant === "bordered" ? "indicator absolute bottom-1 top-1 left-0 border-b-2 border-secondary-color z-0 pointer-events-none" : "indicator absolute bottom-1 top-1 left-0 rounded-md bg-secondary-color z-0 pointer-events-none"} `}
            animate={{
              x: indicatorStyle.offset,
              width: indicatorStyle.width,
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            initial={false}
          />
        </div>
      </div>

      {/* Top bar + pill: visible wherever the visitor has scrolled to */}
      <PendingBar pending={isPending} />

      <div aria-busy={isPending} className={cn("mt-10", tabContentStyle)}>
        {/* While the server fetches the chosen tab, show a spinner instead of the previous tab's
            content, which would look frozen. */}
        {isPending ? (
          <TabContentLoader />
        ) : (
          tabs.find((tab) => tab.value === activeTab)?.content
        )}
      </div>
    </div>
  );
};

export default ReusableTabs;
