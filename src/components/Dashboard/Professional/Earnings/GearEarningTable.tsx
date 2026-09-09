/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Tag, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "@/utils/ReuseTable";

const GearEarningTable = ({
  data,
  total,
  page,
  limit,
  onView,
}: {
  data: any[];
  total: number;
  page: number;
  limit: number;
  onView: (record: any) => void;
}) => {
  const formatDate = (dateStr: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
      : "—";

  // const capitalize = (str: string) =>
  //   str ? str.charAt(0).toUpperCase() + str.slice(1) : "—";

  const columns = [
    {
      /* title: "Client", */
      title: "Meno klienta",
      key: "client",
      render: (_: any, record: any) => (
        <span className="font-medium">{record.clientId?.name || record.name || "—"}</span>
      ),
    },
    {
      title: "Gear Item",
      key: "gear",
      render: (_: any, record: any) => record.gearMarketplaceId?.name || "—",
    },
    {
      title: "Commission",
      key: "commission",
      render: (_: any, record: any) => (
        <span className="">
          {record.gearMarketplaceId?.platformCommission?.toFixed(2)}€
        </span>
      ),
    },
    {
      title: "Net Earning",
      key: "netAmount",
      render: (_: any, record: any) => {
        const gear = record.gearMarketplaceId;
        const shippingPrice = gear?.shippingCompany?.price || 0;
        const net = gear ? gear.mainPrice - gear.platformCommission + shippingPrice : 0;
        return <span className="text-green-600 font-semibold">{net?.toFixed(2)}€</span>;
      },
    },
    {
      title: "Admin Paid",
      key: "adminPaid",
      render: (_: any, record: any) => (
        <Tag color={record.adminPaid ? "green" : ""}>
          {record.adminPaid ? "Paid" : "Pending"}
        </Tag>
      ),
      align: "center",
    },
    {
      /* title: "Date", */
      title: "Dátum",
      key: "date",
      render: (_: any, record: any) => formatDate(record.createdAt),
    },
    {
      /* title: "Action", */
      title: "Akcia",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip placement="right" /* title="View Details" */ title="Zobraziť detaily">
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
              onClick={() => onView(record)}
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
      loading={false}
      total={total}
      limit={limit}
      page={page}
      keyValue="_id"
    />
  );
};

export default GearEarningTable;
