/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import ReuseButton from "../Button/ReuseButton";

interface AcceptModalProps<T> {
  isModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: T | null;

  handleConfirm: any;
  description?: string;
}

const AcceptModal: React.FC<AcceptModalProps<any>> = ({
  isModalVisible,
  handleCancel,
  currentRecord,
  handleConfirm,
  description = " Are You Sure You want to Delivery This Event ?",
}) => {
  //   const [blockUser] = useBlockUserMutation();

  return (
    <Modal
      // title="Confirm Delete"
      open={isModalVisible}
      onOk={() => handleConfirm(currentRecord)}
      onCancel={handleCancel}
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
            onClick={handleCancel}
          >
            Cancel
          </ReuseButton>
          <ReuseButton
            variant="secondary"
            className="!px-6 !py-5 w-fit flex items-center justify-center gap-2"
            onClick={() => handleConfirm(currentRecord)}
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

export default AcceptModal;
