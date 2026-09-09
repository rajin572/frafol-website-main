"use client";
import { Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

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

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }

    replace(`${pathName}?${params.toString()}`, { scroll: false });
  };
  return (
    <Pagination
      showSizeChanger={false}
      onChange={(page) => handlePageChange(page)}
      pageSize={limit}
      total={totalData}
      current={page}
    />
  );
};

export default PaginationSection;
