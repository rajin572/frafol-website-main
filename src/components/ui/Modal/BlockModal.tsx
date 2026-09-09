/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import ReuseButton from "../Button/ReuseButton";

interface BlockModalProps<T> {
  isBlockModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: T | null;
  handleBlock: (data: T) => void;
  description?: string;
}

const BlockModal: React.FC<BlockModalProps<any>> = ({
  isBlockModalVisible,
  handleCancel,
  currentRecord,
  handleBlock,
  description = " Are You Sure You want to Block ?",
}) => {
  //   const [blockUser] = useBlockUserMutation();

  return (
    <Modal
      // title="Confirm Delete"
      open={isBlockModalVisible}
      onOk={handleBlock}
      onCancel={handleCancel}
      okText="Block"
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
            variant="error"
            className="!px-6 !py-5 w-fit flex items-center justify-center gap-2"
            onClick={() => handleBlock(currentRecord)}
          >
            Block
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

export default BlockModal;
