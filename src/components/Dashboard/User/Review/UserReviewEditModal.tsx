/* eslint-disable @typescript-eslint/no-explicit-any */
import ReuseButton from "@/components/ui/Button/ReuseButton";
import ReusableForm from "@/components/ui/Form/ReuseForm";
import ReuseInput from "@/components/ui/Form/ReuseInput";
import { updateReview } from "@/services/ReviewService/ReviewServiceApi";
import { IPendingReview } from "@/types";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { Checkbox, Form, Modal, Rate, Typography } from "antd";
import { useEffect } from "react";
interface UserReviewEditModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IPendingReview | null;
}
const UserReviewEditModal: React.FC<UserReviewEditModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [form] = Form.useForm();
  const isAnonymous = Form.useWatch("isAnonymous", form);

  console.log(currentRecord)

  useEffect(() => {
    if (currentRecord) {
      form.setFieldsValue({
        review: currentRecord?.rating,
        message: currentRecord?.message,
        isAnonymous: currentRecord?.isAnonymous,
      });
    }
  }, [currentRecord, form]);

  const onSubmit = async (values: any) => {
    const data = {
      rating: values.review,
      message: values.message,
      isAnonymous: isAnonymous,
    };

    console.log(data)

    const res = await tryCatchWrapper(
      updateReview,
      { body: data, params: currentRecord?._id },
      {
        toastLoadingMessage: "Updating Review...",
        toastSuccessMessage: "Review Updated Successfully!",
        toastErrorMessage: "Something went wrong! Please try again.",
      }
    );

    if (res?.success) {
      handleCancel();
    }
  };

  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="p-5">
        <div className="text-base-color">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-secondary-color">
            Update Review
          </h3>
        </div>
        <ReusableForm
          form={form}
          handleFinish={onSubmit}
          defaultValues={currentRecord}
        >
          <div className="mt-5">
            <Typography.Title
              className="!text-base-color !font-normal"
              level={5}
            >
              {/* Rating */}
              Hodnotenie
            </Typography.Title>
            <Form.Item name={"review"} rules={[{ required: true }]}>
              <Rate className="!text-3xl" allowHalf onChange={(value) => {
                const clamped = Math.min(5, Math.max(1, value)); // 1–5, can be 0.5 steps
                form.setFieldsValue({ review: clamped });
              }} />
            </Form.Item>
          </div>
          <ReuseInput
            rows={4}
            inputType="textarea"
            /* label="Review" */
            label="Recenzia"
            name="message"
            type="text"
            placeholder="Enter Review"
          />
          <Form.Item name="isAnonymous" valuePropName="checked">
            <Checkbox>Review Annonimously</Checkbox>
          </Form.Item>
          <ReuseButton variant="secondary" htmlType="submit">
            {/* Submit */}
            Odoslať
          </ReuseButton>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default UserReviewEditModal;
