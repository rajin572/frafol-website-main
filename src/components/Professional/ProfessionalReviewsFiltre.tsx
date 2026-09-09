"use client";
import { Dropdown, MenuProps, Button } from "antd";
import { DownOutlined, StarFilled } from "@ant-design/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const sortItems: MenuProps["items"] = [
  {
    key: "newest",
    label: "Newest",
  },
  {
    key: "oldest",
    label: "Oldest",
  },
];

const ProfessionalReviewsFiltre = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const { replace } = router;

  const sort = searchParams?.get("sort") || "newest";
  const rating = searchParams?.get("rating") || "5";

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const text = e.key;
    const params = new URLSearchParams(searchParams);
    if (text) {
      params.set("sort", text);
    } else {
      params.delete("sort");
    }

    replace(`${pathName}?${params.toString()}`, { scroll: false });
  };
  const handleRatingClick = (star: number) => {
    const text = star.toString();
    const params = new URLSearchParams(searchParams);
    if (text) {
      params.set("rating", text);
    } else {
      params.delete("rating");
    }

    replace(`${pathName}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mt-5">
      {/* Sort Dropdown */}
      <Dropdown
        menu={{ items: sortItems, onClick: handleMenuClick }}
        placement="bottomLeft"
      >
        <Button>
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
            onClick={() => handleRatingClick(star)}
            className={`flex items-center gap-1 px-3 py-1 rounded-full border text-sm sm:text-sm lg:text-base font-medium cursor-pointer
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
