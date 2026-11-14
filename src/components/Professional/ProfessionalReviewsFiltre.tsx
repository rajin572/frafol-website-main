"use client";
import { useOptimistic, useTransition } from "react";
import { Dropdown, MenuProps, Button } from "antd";
import { DownOutlined, StarFilled } from "@ant-design/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PendingBar from "../shared/PendingBar";

const sortItems: MenuProps["items"] = [
  {
    key: "newest",
    label: "Najnovšie",
  },
  {
    key: "oldest",
    label: "Najstaršie",
  },
];

type ReviewFilter = { sort: string; rating: string };

const ProfessionalReviewsFiltre = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const { replace } = router;
  const [isPending, startTransition] = useTransition();

  const urlSort = searchParams?.get("sort") || "newest";
  const urlRating = searchParams?.get("rating") || "5";

  // The URL (and so the server-rendered review list) only changes after the server has answered.
  // Show the tapped sort / star at once; React falls back to the real values when the navigation
  // settles.
  const [{ sort, rating }, setShownFilter] = useOptimistic<ReviewFilter, Partial<ReviewFilter>>(
    { sort: urlSort, rating: urlRating },
    (current, change) => ({ ...current, ...change })
  );

  const applyFilter = (key: keyof ReviewFilter, value: string) => {
    if (value === (key === "sort" ? sort : rating)) return;

    const params = new URLSearchParams(searchParams);
    params.set(key, value);

    startTransition(() => {
      setShownFilter({ [key]: value });
      replace(`${pathName}?${params.toString()}`, { scroll: false });
    });
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => applyFilter("sort", e.key);
  const handleRatingClick = (star: number) => applyFilter("rating", star.toString());

  return (
    <div className="flex flex-wrap items-center gap-3 mt-6">
      <PendingBar pending={isPending} label="Načítavajú sa recenzie…" />

      {/* Sort Dropdown */}
      <Dropdown
        menu={{ items: sortItems, onClick: handleMenuClick }}
        placement="bottomLeft"
      >
        <Button className="!h-9 !rounded-full !px-4 !font-medium !shadow-none">
          {(() => {
            const found = sortItems.find((item) => item?.key === sort);
            return found && "label" in found ? found.label : "";
          })()}{" "}
          <DownOutlined />
        </Button>
      </Dropdown>

      {/* Star Filter Buttons */}
      <div className="flex items-center gap-2">
        {[5, 4, 3, 2, 1].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingClick(star)}
            className={`flex h-9 items-center gap-1 px-3.5 rounded-full border text-sm sm:text-base font-medium cursor-pointer touch-manipulation select-none transition-colors
              ${Number(rating) === star
                ? "bg-yellow-400 text-white border-yellow-400"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
          >
            <StarFilled
              className={
                Number(rating) === star ? "text-white" : "text-gray-400"
              }
            />
            {star}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalReviewsFiltre;
