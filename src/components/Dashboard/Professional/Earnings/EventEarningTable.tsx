/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Tag, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "@/utils/ReuseTable";

const EventEarningTable = ({
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
      render: (_: any, record: any) => <span className="font-medium">{record.userId?.name || "—"}</span>,
    },
    {
      /* title: "Service Type", */
      title: "Typ služby",
      key: "serviceType",
      render: (_: any, record: any) => capitalize(record.eventOrderId?.serviceType === "both" ? "Fotenie a natáčanie" : record.eventOrderId?.serviceType === "photography" ? "Fotenie" : "Natáčanie"),
    },
    {
      title: "Order Type",
      key: "orderType",
      render: (_: any, record: any) => (
        <Tag color={record.eventOrderId?.orderType === "direct" ? "blue" : "purple"}>
          {capitalize(record.eventOrderId?.orderType === "direct" ? "Balík" : "Formulár")}
        </Tag>
      ),
    },
    {
      /* title: "Event Date", */
      title: "Dátum",
      key: "eventDate",
      render: (_: any, record: any) => formatDate(record.eventOrderId?.date),
    },
    {
      /* title: "Amount", */
      title: "Suma",
      key: "amount",
      render: (_: any, record: any) => <span>{record?.eventOrderId?.price?.toFixed(2)}€</span>,
    },
    {
      /* title: "Amount", */
      title: "VAT",
      key: "amount",
      render: (_: any, record: any) => <span>{record?.eventOrderId?.vatAmount?.toFixed(2)}€</span>,
    },
    {
      title: "Commission",
      key: "commission",
      render: (_: any, record: any) => (
        <span className=""> {record.commission?.toFixed(2)}€</span>
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
      title: "Paid",
      key: "paid",
      render: (_: any, record: any) => (
        <Tag color={record.serviceProviderPaid ? "green" : "red"}>
          {record.serviceProviderPaid ? "Paid" : "Pending"}
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

export default EventEarningTable;
