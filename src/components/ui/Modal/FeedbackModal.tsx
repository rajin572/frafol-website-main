/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReuseButton from "../Button/ReuseButton";
import ReusableForm from "../Form/ReuseForm";
import ReuseInput from "../Form/ReuseInput";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { addFeedback } from "@/services/Others/OthersApi";

interface FeedbackModalProps {
  isFeedbackModalVisible: boolean;
  handleCancel: () => void;
  description?: string;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isFeedbackModalVisible,
  handleCancel,
}) => {
  const [form] = Form.useForm();
  //   const [blockUser] = useBlockUserMutation();

  const submit = async (values: any) => {
    const res = await tryCatchWrapper(
      addFeedback,
      { body: values },
      {
        toastLoadingMessage: "Chvíľu počkajte...",
        toastSuccessMessage: "Spätná väzba bola úspešne odoslaná!",
        toastErrorMessage: "Niečo sa pokazilo! Skúste to prosím znova.",
      }
    );

    if (res?.success) {
      handleCancel();
      form.resetFields();
    }
  };

  return (
    <Modal
      // title="Confirm Delete"
      open={isFeedbackModalVisible}
      onCancel={() => {
        handleCancel();
        form.resetFields();
      }}
      okText="Odoslať"
      centered
      // styles.body={{ textAlign: "center" }}
      footer={null}
    >
      <p className="text-3xl font-semibold py-5 text-base-color">
        Poskytnúť spätnú väzbu
      </p>
      <ReusableForm handleFinish={submit} form={form}>
        <ReuseInput
          inputType="textarea"
          name="text"
          label="Spätná väzba"
          rows={5}
          placeholder="Zadajte spätnú väzbu"
          rules={[{ required: true, message: "Spätná väzba je povinná" }]}
        />

        <ReuseButton
          htmlType="submit"
          variant="secondary"
          className="!px-6 !py-5 w-full flex items-center justify-center gap-2"
        >
          Odoslať
        </ReuseButton>
      </ReusableForm>
    </Modal>
  );
};

export default FeedbackModal;
