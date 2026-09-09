import { Modal } from "antd";
import { IGear } from "@/types";
import MarketPlaceImageTab from "@/components/MarketPlace/MarketPlaceImageTab";

interface GearMarketViewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IGear | null;
}
const GearMarketViewModal: React.FC<GearMarketViewModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      className="lg:!w-[1000px]"
    >
      <div className="p-5 text-[#1a1a1a]">
        <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-5">
          Gear Details
        </h3>

        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-2 rounded border border-[#E1E1E1]">
              <h3 className="text-sm sm:text-sm lg:text-base xl:text-lg font-bold mb-5">
                Gear Information
              </h3>

              <div>
                <h4 className="text-sm sm:text-sm lg:text-base font-medium mb-1">
                  {/* Product Name */}
                  Názov príslušenstva
                </h4>
                <p className="text-sm sm:text-sm lg:text-base bg-zinc-100 p-2 rounded mb-5">
                  {currentRecord?.name}
                </p>
              </div>

              <div>
                <h4 className="text-sm sm:text-sm lg:text-base font-medium mb-1">
                  {/* Product Category */}
                  Kategória
                </h4>
                <p className="text-sm sm:text-sm lg:text-base bg-zinc-100 p-2 rounded mb-5">
                  {currentRecord?.categoryId?.title}
                </p>
              </div>
              <div>
                <h4 className="text-sm sm:text-sm lg:text-base font-medium mb-1">
                  {/* Product Price */}
                  Cena
                </h4>
                <p className="text-sm sm:text-sm lg:text-base bg-zinc-100 p-2 rounded mb-5">
                  {currentRecord?.price?.toFixed(2)}€
                </p>
              </div>
              <div>
                <h4 className="text-sm sm:text-sm lg:text-base font-medium mb-1">
                  {/* VAT Amount (%) */}
                  DPH (%)
                </h4>
                <p className="text-sm sm:text-sm lg:text-base bg-zinc-100 p-2 rounded mb-5">
                  {currentRecord?.vatAmount}%
                </p>
              </div>
              <div>
                <h4 className="text-sm sm:text-sm lg:text-base font-medium mb-1">
                  {/* Item Price After Adding Service Charges & VAT */}
                  Cena po pripočítaní poplatkov a DPH
                </h4>
                <p className="text-sm sm:text-sm lg:text-base bg-zinc-100 p-2 rounded mb-5">
                  {currentRecord?.mainPrice?.toFixed(2)}€
                </p>
              </div>
              <div>
                <h4 className="text-sm sm:text-sm lg:text-base font-medium mb-1">
                  {/* Condition */}
                  Stav
                </h4>
                <p className="text-sm sm:text-sm lg:text-base bg-zinc-100 p-2 rounded mb-5">
                  {currentRecord?.condition === "new" ? "Nové" : "Použité"}
                </p>
              </div>
              <div>
                <h4 className="text-sm sm:text-sm lg:text-base font-medium mb-1">
                  Shipping Details
                </h4>
                <p className="text-sm sm:text-sm lg:text-base bg-zinc-100 p-2 rounded mb-5">
                  {currentRecord?.shippingCompany?.name} -
                  {currentRecord?.shippingCompany?.price?.toFixed(2)}€
                </p>
              </div>
              <div>
                <h4 className="text-sm sm:text-sm lg:text-base font-medium mb-1">
                  {/* Description */}
                  Popis
                </h4>
                <p className="text-sm sm:text-sm lg:text-base bg-zinc-100 p-2 rounded mb-5">
                  {currentRecord?.description}
                </p>
              </div>
            </div>
            <div className="p-2 rounded border border-[#E1E1E1]">
              <MarketPlaceImageTab images={currentRecord?.gallery || []} />
              {/* <div>
                <h4 className="text-sm sm:text-sm lg:text-base font-medium mb-1 mt-5">
                  Extra Information
                </h4>
                <p className="text-sm sm:text-sm lg:text-base bg-zinc-100 p-2 rounded mb-5">
                  {currentRecord?.extraInformation}
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GearMarketViewModal;
