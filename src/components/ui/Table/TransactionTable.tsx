/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "@/utils/ReuseTable";

// Define the type for the props
interface TransactionTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: any) => void; // Function to handle viewing a user
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  data,
  loading,
  showViewModal,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "UID",
      dataIndex: "uid",
      key: "uid",
    },
    {
      /* title: "Client Name", */
      title: "Meno klienta",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      render: () => <span>Photography</span>,
    },
    {
      /* title: "Transaction ID", */
      title: "ID transakcie",
      dataIndex: "transactionId",
      key: "transactionId",
      render: () => <span>56456632164594</span>,
    },
    {
      /* title: "Amount", */
      title: "Suma",
      dataIndex: "amount",
      key: "amount",
      render: () => <span>$500</span>,
    },
    {
      /* title: "Date", */
      title: "Dátum",
      dataIndex: "date",
      key: "date",
      render: () => <span>May 23, 2023</span>,
    },
    {
      /* title: "Action", */
      title: "Akcia",
      key: "action",
      render: (_: unknown, record: any) => (
        <Space size="middle">
          {/* View Details Tooltip */}
          <Tooltip placement="right" /* title="View Details" */ title="Zobraziť detaily">
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
        </Space>
      ),
      align: "center",
    },
  ];

  return (
    <ReuseTable
      columns={columns}
      data={data}
      loading={loading}
      total={total}
      limit={limit}
      page={page}
      keyValue={"email"}
    />
  );
};

export default TransactionTable;
