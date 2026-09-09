/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import ReuseUpload from "../../Form/ReuseUpload";
import { useEffect, useState } from "react";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { updateCommunityPost } from "@/services/CommunityForumService/CommunityForumServiceApi";
import { ICommunityPost } from "@/types";
import Image from "next/image";
import { getServerUrl } from "@/helpers/config/envConfig";
import { AllImages } from "../../../../../public/assets/AllImages";
import RichTextEditor from "@/components/shared/RichTextEditor";

interface EditForumModalProps {
  isAddModalVisible: boolean;
  currentRecord: ICommunityPost | null;
  handleCancel: () => void;
}

const EditForumModal: React.FC<EditForumModalProps> = ({
  isAddModalVisible,
  currentRecord,
  handleCancel,
}) => {
  const serveUrl = getServerUrl();
  const [form] = Form.useForm();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (currentRecord) {
      form.setFieldsValue({
        title: currentRecord?.title,
      });
      setContent(currentRecord?.text);
    }
  }, [currentRecord, form]);

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
      updateCommunityPost,
      { body: formData, params: currentRecord?._id },
      {
        toastLoadingMessage: "Uploading Your Post...",
        toastSuccessMessage: "Your post uploaded successfully!",
        toastErrorMessage: "Something went wrong! Please try again.",
      }
    );

    if (res?.success) {
      form.resetFields();
      handleCancel();
    }
  };
  return (
    <Modal
      open={isAddModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[800px]"
    >
      <div className="p-5 text-base-color">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-5">
          Update Topic
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
          />

          <div>
            <p className="font-semibold">Preview Image</p>
            <Image
              src={
                currentRecord?.images[0]
                  ? serveUrl + currentRecord?.images[0]
                  : AllImages.dummyCover.src
              }
              alt="Image"
              width={100}
              height={100}
              className="w-auto h-16 object-cover"
            />
          </div>

          <ReuseButton htmlType="submit" variant="secondary" className="mt-2">
            Update
          </ReuseButton>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default EditForumModal;
