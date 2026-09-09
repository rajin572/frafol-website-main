/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "@/utils/ReuseTable";
import Image from "next/image";
import { MdDelete, MdEdit } from "react-icons/md";
import { getServerUrl } from "@/helpers/config/envConfig";
import { AllImages } from "../../../../public/assets/AllImages";

// Define the type for the props
interface GearMarketPlaceTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: any) => void; // Function to handle viewing a user
  showDeleteModal: (record: any) => void; // Optional function to handle adding a new item
  showEditModal: (record: any) => void; // Optional function to handle editing
  page: number;
  total: number;
  limit: number;
}

const GearMarketPlaceTable: React.FC<GearMarketPlaceTableProps> = ({
  data,
  loading,
  showViewModal,
  showDeleteModal,
  showEditModal,
  page,
  total,
  limit,
}) => {
  const serverUrl = getServerUrl();
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      /* title: "Item Image", */
      title: "Obrázok",
      dataIndex: "gallery",
      key: "gallery",
      render: (text: string[]) => (
        <Image
          src={text?.[0] ? serverUrl + text[0] : AllImages.dummyCover?.src}
          alt="Item"
          width={50}
          height={50}
          className="rounded w-10 h-10 object-cover"
        />
      ),
    },
    {
      /* title: "Item Name", */
      title: "Názov",
      dataIndex: "name",
      key: "name",
    },
    {
      /* title: "Item Price (€)", */
      title: "Cena (€)",
      dataIndex: "mainPrice",
      key: "mainPrice",
      align: "center",
      render: (price: number) => `${price?.toFixed(2)}€`,
    },
    {
      title: "Approval Status",
      dataIndex: "approvalStatus",
      key: "approvalStatus",
      render: (status: string) => (
        <span
          className={`text-sm font-semibold capitalize ${status === "approved"
            ? "text-green-600"
            : status === "cancelled"
              ? "text-red-500"
              : "text-yellow-500"
            }`}
        >
          {status === "approved"
            ? "Approved"
            : status === "cancelled"
              ? "Rejected"
              : "Pending"}
        </span>
      ),
    },
    {
      /* title: "Status", */
      title: "Stav",
      dataIndex: "status",
      key: "status",
      align: "center",
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
              onClick={() => showEditModal(record)}
            >
              <MdEdit style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
          <Tooltip placement="right" /* title="View Details" */ title="Zobraziť detaily">
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
              onClick={() => showDeleteModal(record)}
            >
              <MdDelete style={{ fontSize: "24px", color: "red" }} />
            </button>
          </Tooltip>
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
      keyValue={"_id"}
    />
  );
};

export default GearMarketPlaceTable;
