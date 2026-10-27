/* eslint-disable @typescript-eslint/no-explicit-any */
import ViewDetailsTooltip from "@/components/ui/Table/ViewDetailsTooltip";
import React from "react";
import { Space } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "@/utils/ReuseTable";
import Image from "next/image";
import { MdDelete, MdEdit } from "react-icons/md";
import { getMediaUrl } from "@/utils/mediaUrl";
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
          src={text?.[0] ? getMediaUrl(text[0]) : AllImages.dummyCover?.src}
          alt="Položka"
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
      dataIndex: "price",
      key: "price",
      align: "center",
      // The professional's own price, VAT included if there is any, without the FRAFOL service fee.
      render: (price: number, record: any) => {
        const vat = record?.totalVatAmount ?? (price || 0) * ((record?.vatAmount || 0) / 100);
        return `${((price || 0) + vat).toFixed(2)}€`;
      },
    },
    {
      title: "Stav schválenia",
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
            ? "Schválené"
            : status === "cancelled"
              ? "Zamietnuté"
              : "Čaká na schválenie"}
        </span>
      ),
    },
    {
      /* title: "Status", */
      title: "Stav",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status: string) =>
        status === "In Stock" ? "Na sklade" : status === "Sold Out" ? "Vypredané" : status,
    },
    {
      /* title: "Action", */
      title: "Akcia",
      key: "action",
      render: (_: unknown, record: any) => (
        <Space size="middle">
          {/* View Details Tooltip */}
          <ViewDetailsTooltip>
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
              onClick={() => showEditModal(record)}
            >
              <MdEdit style={{ fontSize: "24px" }} />
            </button>
          </ViewDetailsTooltip>
          <ViewDetailsTooltip>
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
              onClick={() => showDeleteModal(record)}
            >
              <MdDelete style={{ fontSize: "24px", color: "red" }} />
            </button>
          </ViewDetailsTooltip>
          <ViewDetailsTooltip>
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
            </button>
          </ViewDetailsTooltip>
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
