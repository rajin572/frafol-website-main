/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReuseButton from "../Button/ReuseButton";
import ReusableForm from "../Form/ReuseForm";
import ReuseInput from "../Form/ReuseInput";

interface CancleOrderModalProps<T> {
  isCancleOrderModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: T | null;
  handleCancelOrder: any;
  description?: string;
}

const CancleOrderModal: React.FC<CancleOrderModalProps<any>> = ({
  isCancleOrderModalVisible,
  handleCancel,
  currentRecord,
  handleCancelOrder,
  description = "Are You Sure You want to Cancle This Order ?",
}) => {
  const [form] = Form.useForm();
  //   const [blockUser] = useBlockUserMutation();

  const submit = async (values: any) => {
    handleCancelOrder(values, currentRecord);
    form.resetFields();
  };

  return (
    <Modal
      // title="Confirm Delete"
      open={isCancleOrderModalVisible}
      onOk={handleCancelOrder}
      onCancel={() => {
        handleCancel();
        form.resetFields();
      }}
      okText="Cancle Order"
      centered
      // styles.body={{ textAlign: "center" }}
      footer={null}
    >
      <p className="text-3xl font-semibold pt-10 pb-4 text-base-color">
        {description}
      </p>
      <ReusableForm handleFinish={submit} form={form}>
        <ReuseInput
          inputType="textarea"
          name="reason"
          label="Reason"
          placeholder="Enter Reason"
          rules={[{ required: true, message: "Reason is required" }]}
        />

        <ReuseButton
          htmlType="submit"
          variant="error"
          className="!px-6 !py-5 w-fit flex items-center justify-center gap-2"
        >
          Cancle Order
        </ReuseButton>
      </ReusableForm>
    </Modal>
  );
};

export default CancleOrderModal;
