/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Table } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ReuseTableProps<T> {
  loading?: boolean;
  columns: any; // Type for columns
  data: T[]; // Type for dataSource
  total?: any; // Total any of items
  limit?: any; // Items per page
  page?: any; // Current page
  scroll?: any;
  onChange?: (
    pagination: any,
    filters: Record<string, any>,
    sorter: any
  ) => void; // Optional onChange handler
  keyValue: string | ((record: T) => string); // Row key
}

const ReuseTable: React.FC<ReuseTableProps<any>> = ({
  loading,
  columns,
  data,
  total,
  limit,
  page,
  scroll = { x: "max-content" },
  onChange,
  keyValue,
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
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      onChange={onChange}
      bordered
      pagination={
        total > 0
          ? {
            current: page,
            onChange: (page) => {
              handlePageChange(page);
            },
            showSizeChanger: false,
            total,
            pageSize: limit,
          }
          : false
      }
      scroll={scroll}
      rowKey={keyValue}
    />
  );
};

export default ReuseTable;
