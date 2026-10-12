/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReuseButton from "../Button/ReuseButton";
import ReusableForm from "../Form/ReuseForm";
import ReuseInput from "../Form/ReuseInput";

interface DeclineOrderRequestModalProps<T> {
  isDeclineOrderRequestModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: T | null;
  handleDeclineOrder: any;
  description?: string;
}

const DeclineOrderRequestModal: React.FC<
  DeclineOrderRequestModalProps<any>
> = ({
  isDeclineOrderRequestModalVisible,
  handleCancel,
  currentRecord,
  handleDeclineOrder,
  description = "Naozaj chcete odmietnuť túto objednávku?",
}) => {
    const [form] = Form.useForm();
    //   const [blockUser] = useBlockUserMutation();

    const submit = async (values: any) => {
      handleDeclineOrder(values, currentRecord);
      form.resetFields();
    };

    return (
      <Modal
        // title="Confirm Delete"
        open={isDeclineOrderRequestModalVisible}
        onOk={handleDeclineOrder}
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
            label="Dôvod odmietnutia"
            placeholder="Uveďte dôvod odmietnutia"
            rules={[{ required: true, message: "Uveďte dôvod odmietnutia" }]}
          />

          <ReuseButton
            htmlType="submit"
            variant="error"
            className="!px-6 !py-5 w-fit flex items-center justify-center gap-2"
          >
            Odmietnuť žiadosť
          </ReuseButton>
        </ReusableForm>
      </Modal>
    );
  };

export default DeclineOrderRequestModal;
