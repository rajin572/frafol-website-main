/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import ReuseButton from "../Button/ReuseButton";

interface DeleteModalProps<T> {
  isDeleteModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: T | null;
  handleDelete: (data: T) => void;
  buttonText?: string;
  description?: string;
}

const DeleteModal: React.FC<DeleteModalProps<any>> = ({
  isDeleteModalVisible,
  handleCancel,
  currentRecord,
  handleDelete,
  buttonText = "Delete",
  description = " Are You Sure You want to Delete This?",
}) => {
  //   const [blockUser] = useBlockUserMutation();

  return (
    <Modal
      // title="Confirm Delete"
      open={isDeleteModalVisible}
      onOk={() => handleDelete(currentRecord)}
      onCancel={handleCancel}
      okText="delete"
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
            className="!px-6 !py-5 w-fit flex items-center justify-center gap-2 "
            onClick={() => handleDelete(currentRecord)}
          >
            {buttonText}
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

export default DeleteModal;
