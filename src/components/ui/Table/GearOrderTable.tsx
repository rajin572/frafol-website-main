/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tag, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "@/utils/ReuseTable";
import { IGearOrder } from "@/types";
import { gearOrderStatus } from "@/utils/budgetLabels";

// Define the type for the props
interface GearOrderTableProps {
  data: IGearOrder[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: IGearOrder) => void; // Function to handle viewing a user
  page?: number;
  total?: number;
  limit?: number;
}

const GearOrderTable: React.FC<GearOrderTableProps> = ({
  data,
  loading,
  showViewModal,
  page,
  total,
  limit,
}) => {
  console.log("data", data)
  const columns = [
    {
      /* title: "Client Name", */
      title: "Meno klienta",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => {
        return (
          <span>{record?.loginAsCompany ? record?.companyName : text}</span>
        );
      }
    },
    {
      /* title: "Item Name", */
      title: "Názov produktu",
      dataIndex: ["gearMarketplaceId", "name"],
      key: ["gearMarketplaceId", "name"],
    },
    {
      /* title: "Amount", */
      title: "Suma",
      dataIndex: ["gearMarketplaceId", "mainPrice"],
      key: "amount",
      render: (price: number, record: any) => `${(price - record?.gearMarketplaceId?.platformCommission)?.toFixed(2)}€`,
    },
    {
      title: "Shipping Details",
      dataIndex: ["gearMarketplaceId", "shippingCompany"],
      key: "shippingDetails",
      render: (shippingCompany: { name: string; price: number }) =>
        `${shippingCompany?.name} - ${shippingCompany?.price?.toFixed(2)}€`,
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (_: string, record: IGearOrder) => {
        const status = record?.orderStatus as string;
        const color =
          status === "delivered"
            ? "green"
            : status === "cancelled"
            ? "red"
            : "orange";
        return <Tag color={color}>{gearOrderStatus[status] || status}</Tag>;
      },
    },
    {
      /* title: "Action", */
      title: "Akcia",
      key: "action",
      render: (_: unknown, record: IGearOrder) => (
        <Space size="middle">
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
      keyValue={"orderId"}
    />
  );
};

export default GearOrderTable;
