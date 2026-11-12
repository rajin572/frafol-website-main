/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatShortDate } from "@/utils/dateFormet";
import ViewDetailsTooltip from "@/components/ui/Table/ViewDetailsTooltip";
import { Space, Tag } from "antd";
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

  const formatDate = (dateStr: string) => (dateStr ? formatShortDate(dateStr) : "—");

  const columns = [
    {
      /* title: "Client", */
      title: "Meno klienta",
      key: "client",
      render: (_: any, record: any) => <span className="font-medium">{record.clientId?.name || "—"}</span>,
    },
    {
      title: "Kurz",
      key: "workshop",
      render: (_: any, record: any) => record.workshopId?.title || "—",
    },
    {
      title: "Dátum kurzu",
      key: "workshopDate",
      render: (_: any, record: any) => formatDate(record.workshopId?.date),
    },
    {
      title: "Čistý zárobok",
      key: "netAmount",
      render: (_: any, record: any) => (
        <span className="text-green-600 font-semibold">{record.netAmount?.toFixed(2)}€</span>
      ),
    },
    {
      title: "Vyplatené administrátorom",
      key: "instructorPaid",
      render: (_: any, record: any) => (
        <Tag color={record.instructorPayment?.status === "received" ? "green" : "orange"}>
          {record.instructorPayment?.status === "received" ? "Vyplatené" : "Čakajúce"}
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
          <ViewDetailsTooltip>
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
              onClick={() => onView(record)}
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
      loading={false}
      total={total}
      limit={limit}
      page={page}
      keyValue="_id"
    />
  );
};

export default WorkshopEarningTable;
