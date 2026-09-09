import { IPayment } from "@/types";
import { formatDate } from "@/utils/dateFormet";
import { Modal } from "antd";

interface PaymenViewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IPayment | null;
}

const PaymenViewModal: React.FC<PaymenViewModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  console.log(currentRecord)
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="p-5">
        <div className="text-base-color">
          {/* <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-secondary-color">
            Transaction Details
          </h3> */}
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-secondary-color">
            Detaily transakcie
          </h3>

          <div className="text-sm sm:text-sm lg:text-base mt-3">
            {/* Date */}
            <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2 mb-2 gap-2">
              {/* <span className="font-semibold">Date:</span> */}
              <span className="font-semibold">Dátum:</span>
              <span>
                {currentRecord ? formatDate(currentRecord?.createdAt) : "--"}
              </span>
            </div>

            {/* Payment Type */}
            <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2 mb-2 gap-2">
              {/* <span className="font-semibold">Type:</span> */}
              <span className="font-semibold">Typ:</span>
              <span>{currentRecord?.paymentType || "--"}</span>
            </div>

            {/* Transaction ID */}
            <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2 mb-2 gap-2 overflow-x-scroll">
              {/* <span className="font-semibold">Transaction ID:</span> */}
              <span className="font-semibold">ID transakcie:</span>
              <span className="text-wrap">
                {currentRecord?.transactionId || "--"}
              </span>
            </div>

            {/* Payment Method */}
            <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2 mb-2 gap-2">
              {/* <span className="font-semibold">Payment Method:</span> */}
              <span className="font-semibold">Spôsob platby:</span>
              <span>{currentRecord?.paymentMethod || "--"}</span>
            </div>

            {/* Amount */}
            <div className="flex items-center justify-between pb-2 mb-2 gap-2 font-bold">
              {/* <span className="text-secondary-color">Amount:</span> */}
              <span className="text-secondary-color">Suma:</span>
              <span className="text-success">
                {currentRecord?.amount ? `${currentRecord.amount?.toFixed(2)}€` : "--"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PaymenViewModal;
