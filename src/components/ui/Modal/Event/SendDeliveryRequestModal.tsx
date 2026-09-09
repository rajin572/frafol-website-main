/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Form, Modal } from "antd";
import ReuseButton from "../../Button/ReuseButton";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
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

interface SendDeliveryRequestFormValues {
  deliveryLink: string;
  deliveryMessage: string;
}

const SendDeliveryRequestModal: React.FC<
  SendDeliveryRequestModalProps<any>
> = ({
  isSendDeliveryRequestModalVisible,
  handleCancel,
  currentRecord,
  setIsSendDeliveryRequestModalVisible,
  description = "Send Delivery Request",
}) => {
    const [form] = Form.useForm<SendDeliveryRequestFormValues>();

    useEffect(() => {
      if (isSendDeliveryRequestModalVisible) {
        form.resetFields();
      }
    }, [isSendDeliveryRequestModalVisible, form]);

    const handleClose = () => {
      setIsSendDeliveryRequestModalVisible(false);
      form.resetFields();
    };

    const submit = async (values: SendDeliveryRequestFormValues) => {
      const res = await tryCatchWrapper(
        sendDeliveryRequest,
        {
          params: currentRecord?._id,
          body: {
            deliveryLink: values.deliveryLink,
            deliveryMessage: values.deliveryMessage,
          },
        },
        {
          toastLoadingMessage: "Sending Delivery Request...",
          toastSuccessMessage: "Delivery Request Sent Successfully!",
          toastErrorMessage: "Something went wrong! Please try again.",
        }
      );

      if (res?.success) {
        handleClose();
        handleCancel();
      }
    };

    return (
      <Modal
        open={isSendDeliveryRequestModalVisible}
        onCancel={handleClose}
        centered
        footer={null}
      >
        <p className="text-2xl font-semibold pt-4 pb-4 text-base-color">
          {description}
        </p>
        <ReusableForm
          form={form}
          handleFinish={submit}
          defaultValues={{
            deliveryLink: "",
            deliveryMessage: "",
          }}
        >
          <ReuseInput
            type="link"
            name="deliveryLink"
            label="Delivery Link"
            placeholder="Enter delivery link"
            rules={[
              {
                required: true,
                message: "Delivery link is required",
              },
              {
                type: "url",
                message: "Please enter a valid link",
              },
            ]}
          />

          <ReuseInput
            inputType="textarea"
            name="deliveryMessage"
            label="Delivery Message"
            placeholder="Enter delivery message"
            rows={4}
            rules={[
              {
                required: true,
                message: "Delivery message is required",
              },
            ]}
          />

          <div className="flex justify-end items-center gap-3 pt-4">
            <ReuseButton
              variant="highlight"
              className="!px-6 !py-5 w-fit flex items-center justify-center gap-2"
              onClick={handleClose}
            >
              Cancel
            </ReuseButton>
            <ReuseButton
              htmlType="submit"
              variant="secondary"
              className="!px-6 !py-5 w-fit flex items-center justify-center gap-2"
            >
              Send Request
            </ReuseButton>
          </div>
        </ReusableForm>
      </Modal>
    );
  };

export default SendDeliveryRequestModal;
