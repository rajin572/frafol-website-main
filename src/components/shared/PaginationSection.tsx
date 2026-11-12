"use client";
import { Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useOptimistic, useTransition } from "react";
import PendingBar from "./PendingBar";

const PaginationSection = ({
  page,
  limit = 12,
  totalData,
}: {
  page: number;
  limit: number;
  totalData: number;
}) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const { replace } = router;
  const [isPending, startTransition] = useTransition();

  // The page number in the URL only changes once the server has answered: move the highlight now,
  // React falls back to the real `page` when the navigation settles.
  const [shownPage, setShownPage] = useOptimistic<number, number>(page, (_current, next) => next);

  const handlePageChange = (nextPage: number) => {
    const params = new URLSearchParams(searchParams);
    if (nextPage) {
      params.set("page", nextPage.toString());
    } else {
      params.delete("page");
    }

    startTransition(() => {
      setShownPage(nextPage || 1);
      replace(`${pathName}?${params.toString()}`, { scroll: false });
    });
  };
  return (
    <>
      <PendingBar pending={isPending} label="Načítava sa strana…" />
      <Pagination
        showSizeChanger={false}
        onChange={(nextPage) => handlePageChange(nextPage)}
        pageSize={limit}
        total={totalData}
        current={shownPage}
        className={isPending ? "opacity-60 pointer-events-none" : ""}
      />
    </>
  );
};

export default PaginationSection;
