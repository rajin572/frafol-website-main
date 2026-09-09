/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import ReuseUpload from "../../Form/ReuseUpload";
import { useState } from "react";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { addNewCommunityPost } from "@/services/CommunityForumService/CommunityForumServiceApi";
import RichTextEditor from "@/components/shared/RichTextEditor";

interface AddNewForumMoidalProps {
  isAddModalVisible: boolean;
  handleCancel: () => void;
}

const AddNewForumMoidal: React.FC<AddNewForumMoidalProps> = ({
  isAddModalVisible,
  handleCancel,
}) => {
  const [form] = Form.useForm();
  const [content, setContent] = useState("");

  // The editor's value lives in local state, so form.resetFields() alone can't clear it.
  // Reset both before closing, otherwise the old text is still there on reopen.
  const resetAndClose = () => {
    form.resetFields();
    setContent("");
    handleCancel();
  };

  const onSubmit = async (values: any) => {
    const formData = new FormData();

    const data = {
      title: values.title,
      text: content,
      // shortText: shortText,
    };

    formData.append("data", JSON.stringify(data));

    if (values.image) {
      values?.image?.forEach((file: any) => {
        formData.append("images", file?.originFileObj);
      });
    }

    const res = await tryCatchWrapper(
      addNewCommunityPost,
      { body: formData },
      {
        toastLoadingMessage: "Uploading Your Post...",
        toastSuccessMessage: "Your post uploaded successfully!",
        toastErrorMessage: "Something went wrong! Please try again.",
      }
    );

    if (res?.success) {
      resetAndClose();
    }
  };
  return (
    <Modal
      open={isAddModalVisible}
      onCancel={resetAndClose}
      footer={null}
      centered
      className="lg:!w-[800px]"
    >
      <div className="p-5 text-base-color">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-5">
          Create New Topic
        </h1>
        <ReusableForm form={form} handleFinish={onSubmit}>
          <ReuseInput
            name="title"
            label="Titles"
            placeholder="Enter Titles"
            rules={[{ required: true, message: "Titles is required" }]}
            labelClassName="!font-semibold"
          />
          {/* <ReuseInput
            type="textarea"
            inputType="textarea"
            rows={5}
            name="content"
            label="Content"
            placeholder="Enter Content"
            rules={[{ required: true, message: "Content is required" }]}
            labelClassName="!font-semibold"
          /> */}

          <div className="my-10">
            <RichTextEditor
              content={content}
              setContent={setContent}
              placeholder="Type something amazing..."
              minHeight="500px"
            />

          </div>
          <ReuseUpload
            label="Upload Image (Optional)"
            name="image"
            buttonText="Upload Image"
            accept="image/png, image/jpeg"
            maxCount={1}
            labelClassName="!font-semibold"
            rules={[{ required: false, message: "Image is required" }]}
          />

          <ReuseButton htmlType="submit" variant="secondary" className="mt-2">
            Add
          </ReuseButton>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default AddNewForumMoidal;
