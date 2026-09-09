/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, Form, Modal, Typography } from "antd";
import ReuseButton from "../Button/ReuseButton";
import ReusableForm from "../Form/ReuseForm";
import ReuseInput from "../Form/ReuseInput";
import dayjs from "dayjs";

interface ExtenstionRequestModalProps<T> {
  isExtenstionRequestModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: T | null;
  handleExtenstion: any;
  description?: string;
}

const ExtenstionRequestModal: React.FC<ExtenstionRequestModalProps<any>> = ({
  isExtenstionRequestModalVisible,
  handleCancel,
  currentRecord,
  handleExtenstion,
  description = "Send Extension Request",
}) => {
  const [form] = Form.useForm();
  //   const [blockUser] = useBlockUserMutation();

  const submit = async (values: any) => {
    const formattedDate = values?.["newDeliveryDate"]
      ? dayjs(values["newDeliveryDate"]).format("YYYY-MM-DD")
      : null;

    const data = {
      newDeliveryDate: formattedDate,
      reason: values?.reason,
    };
    handleExtenstion(data, currentRecord, form);
  };

  const disabledDate = (current: any) => {
    // Ensure both dates are dayjs objects before comparing
    const deliveryDate = dayjs(currentRecord?.deliveryDate);
    return current && current.isBefore(deliveryDate, "day"); // Disable dates before deliveryDate
  };

  return (
    <Modal
      // title="Confirm Delete"
      open={isExtenstionRequestModalVisible}
      onOk={handleExtenstion}
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
        <Typography.Title
          level={5}
          className=" pb-2 pt-6 text-lg font-semibold text-secondary-color"
        >
          Date
        </Typography.Title>

        <Form.Item
          name="newDeliveryDate"
          rules={[
            {
              required: true,
              message: "Please select a date",
            },
          ]}
        >
          <DatePicker
            className="!py-1.5 !px-3 !text-lg !bg-[#EFEFEF] border !border-[#EFEFEF]  !text-base-color rounded-lg w-full"
            /* Day-Month-Year, matching ReuseDatePicker across the app (default was YYYY-MM-DD) */
            format="DD-MM-YYYY"
            placeholder="Select date"
            disabledDate={disabledDate}
          />
        </Form.Item>

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
          Send Request
        </ReuseButton>
      </ReusableForm>
    </Modal>
  );
};

export default ExtenstionRequestModal;
