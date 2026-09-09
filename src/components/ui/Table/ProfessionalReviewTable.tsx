/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rate, Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "@/utils/ReuseTable";
import { formatDate } from "@/utils/dateFormet";
const ProfessionalReviewTable = ({
  data,
  loading,
  showViewModal,
  page,
  total,
  limit,
}: // showFilters = true,
  any) => {
  const columns = [
    {
      title: "#UID",
      dataIndex: "_id",
      key: "_id",
      render: (_: any, __: any, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      /* title: "Client Name", */
      title: "Meno klienta",
      dataIndex: "userId",
      key: "userId",
      render: (user: any) => user?.name || "N/A", // uses actual user name
    },
    {
      /* title: "Feedback", */
      title: "Recenzia",
      dataIndex: "message",
      key: "message",
      render: (message: string) => (
        <div className="max-w-[200px] truncate">
          {message || "No feedback provided"}
        </div>
      ),
    },
    {
      /* title: "Rating", */
      title: "Hodnotenie",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <div className="flex items-center gap-2">
          <Rate
            disabled
            value={rating}
            allowHalf
            className="!text-secondary-color"
          />
          <span>{rating}</span>
        </div>
      ),
    },
    {
      /* title: "Date", */
      title: "Dátum",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => <p>{formatDate(date)}</p>,
    },
    {
      /* title: "Action", */
      title: "Akcia",
      key: "action",
      render: (_: any, record: any) => (
        <>
          <Space size="middle">
            {/* View Details Tooltip */}
            <Tooltip placement="right" /* title="View Details" */ title="Zobraziť podrobnosti">
              <button
                className="!p-0 !bg-transparent !border-none !text-secondary-color !cursor-pointer"
                onClick={() => showViewModal(record)}
              >
                <GoEye style={{ fontSize: "24px" }} />
              </button>
            </Tooltip>
          </Space>
        </>
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

export default ProfessionalReviewTable;
