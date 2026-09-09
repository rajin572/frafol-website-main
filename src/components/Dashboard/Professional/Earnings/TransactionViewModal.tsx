/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";

interface TransactionViewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any | null;
}
const TransactionViewModal: React.FC<TransactionViewModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
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
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-secondary-color">
            {/* Transaction Details */}
            Detaily transakcie
          </h3>

          <div className="text-sm sm:text-sm lg:text-base mt-3">
            <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2 gap-2 mb-2">
              <span className="font-semibold">{/* Date: */}Dátum: </span>
              <span className="">March 13, 2023</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2 gap-2 mb-2">
              <span className="font-semibold">Method:</span>
              <span>Photography</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2 gap-2 mb-2">
              <span className="font-semibold">{/* Transaction ID: */}ID transakcie: </span>
              <span>4646123456789</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2 gap-2 mb-2">
              <span className="font-semibold">{/* Payment Method: */}Spôsob platby: </span>
              <span>Card</span>
            </div>
            <div className="flex items-center justify-between pb-2 gap-2 mb-2 font-bold">
              <span className=" text-secondary-color">{/* Amount: */}Suma: </span>
              <span className="text-success">${currentRecord?.amount?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionViewModal;
