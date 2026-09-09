/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Tag, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "@/utils/ReuseTable";

const WorkshopEarningTable = ({
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

  console.log(data)

  const formatDate = (dateStr: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
      : "—";

  const capitalize = (str: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "—";

  const columns = [
    {
      /* title: "Client", */
      title: "Meno klienta",
      key: "client",
      render: (_: any, record: any) => <span className="font-medium">{record.clientId?.name || "—"}</span>,
    },
    {
      title: "Workshop",
      key: "workshop",
      render: (_: any, record: any) => record.workshopId?.title || "—",
    },
    {
      title: "Workshop Date",
      key: "workshopDate",
      render: (_: any, record: any) => formatDate(record.workshopId?.date),
    },
    {
      /* title: "Price", */
      title: "Cena",
      key: "price",
      render: (_: any, record: any) => <span>{record.workshopId?.price?.toFixed(2)}€</span>,
    },
    {
      title: "VAT Amount",
      key: "price",
      render: (_: any, record: any) => <span>{record.workshopId?.vatAmount?.toFixed(2)}€</span>,
    },
    {
      title: "Commission",
      key: "mainPrice",
      render: (_: any, record: any) => (
        <span className="font-semibold">{(Number(record?.workshopId?.mainPrice) - Number(record?.netAmount))?.toFixed(2)}€</span>
      ),
    },
    {
      title: "Net Earning",
      key: "netAmount",
      render: (_: any, record: any) => (
        <span className="text-green-600 font-semibold">{record.netAmount?.toFixed(2)}€</span>
      ),
    },
    {
      title: "Admin Paid",
      key: "instructorPaid",
      render: (_: any, record: any) => (
        <Tag color={record.instructorPayment?.status === "received" ? "green" : "orange"}>
          {capitalize(record.instructorPayment?.status || "pending")}
        </Tag>
      ),
      align: "center",
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

export default WorkshopEarningTable;
