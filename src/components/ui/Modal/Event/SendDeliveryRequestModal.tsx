/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import ReuseButton from "../../Button/ReuseButton";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { sendDeliveryRequest } from "@/services/EventOrderService/EventOrderServiceApi";

interface SendDeliveryRequestModalProps<T> {
  isSendDeliveryRequestModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: T | null;
  setIsSendDeliveryRequestModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  description?: string;
}

const SendDeliveryRequestModal: React.FC<
  SendDeliveryRequestModalProps<any>
> = ({
  isSendDeliveryRequestModalVisible,
  handleCancel,
  currentRecord,
  setIsSendDeliveryRequestModalVisible,
  description = " Are You Sure You want to Delivery This Event ?",
}) => {
    //   const [blockUser] = useBlockUserMutation();

    const handleDelivery = async (data: any) => {
      const res = await tryCatchWrapper(
        sendDeliveryRequest,
        { params: data?._id },
        {
          toastLoadingMessage: "Sending Delivery Request...",
          toastSuccessMessage: "Delivery Request Sent Successfully!",
          toastErrorMessage: "Something went wrong! Please try again.",
        }
      );

      if (res?.success) {
        setIsSendDeliveryRequestModalVisible(false);
        handleCancel();
      }
    };

    return (
      <Modal
        // title="Confirm Delete"
        open={isSendDeliveryRequestModalVisible}
        onOk={() => handleDelivery(currentRecord)}
        onCancel={() => {
          setIsSendDeliveryRequestModalVisible(false);
        }}
        okText="Unblock"
        cancelText="Cancel"
        centered
        style={{ textAlign: "center" }}
        // styles.body={{ textAlign: "center" }}
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "40px",
              marginTop: "30px",
            }}
          >
            <ReuseButton
              variant="highlight"
              className="!px-6 !py-5 mr-4 w-fit flex items-center justify-center gap-2"
              onClick={() => setIsSendDeliveryRequestModalVisible(false)}
            >
              Cancel
            </ReuseButton>
            <ReuseButton
              variant="secondary"
              className="!px-6 !py-5 w-fit flex items-center justify-center gap-2"
              onClick={() => handleDelivery(currentRecord)}
            >
              Confirm
            </ReuseButton>
          </div>
        }
      >
        <p className="text-3xl font-semibold pt-10 pb-4 text-base-color">
          {description}
        </p>
      </Modal>
    );
  };

export default SendDeliveryRequestModal;
