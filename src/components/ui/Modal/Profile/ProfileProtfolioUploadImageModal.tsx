/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form, Modal, Select, Typography } from "antd";
import { useState } from "react";
import ReusableForm from "../../Form/ReuseForm";
import ReuseButton from "../../Button/ReuseButton";
import ReuseUpload from "../../Form/ReuseUpload";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { updateBannerImage, updateGallery, updateIntroVIdeo } from "@/services/ProfileService/ProfileServiceApi";

interface ProfileProtfolioUploadImageModalProps {
  isModalVisible: boolean;
  handleCancel: () => void;
  type?: string;
}

const ProfileProtfolioUploadImageModal: React.FC<
  ProfileProtfolioUploadImageModalProps
> = ({ isModalVisible, handleCancel, type }) => {
  const [form] = Form.useForm();
  // For the gallery ("both") uploader: pick whether to upload photos or a video.
  const [mediaType, setMediaType] = useState<"image" | "video">("image");

  // Whether the current upload should behave as a (single) video upload.
  const isVideoUpload = type === "both" ? mediaType === "video" : type === "video";

  const onSubmit = async (values: any) => {
    const formData = new FormData();

    console.log(values)

    if (type === "both") {
      values?.image?.forEach((file: any) => {
        formData.append("gallery", file?.originFileObj);
      });

      const res = await tryCatchWrapper(
        updateGallery,
        { body: formData },
        {
          toastLoadingMessage: isVideoUpload ? "Nahráva sa video..." : "Nahráva sa fotografia...",
          toastSuccessMessage: "Portfólio bolo úspešne aktualizované!",
          toastErrorMessage: "Something went wrong! Please try again.",
        }
      );

      if (res?.success) {
        handleModalCancel();
      }
    } else if (type === "video") {

      if (values?.image) {
        formData.append("video", values?.image?.[0]?.originFileObj);
      }

      const res = await tryCatchWrapper(
        updateIntroVIdeo,
        { body: formData },
        {
          toastLoadingMessage: "Nahráva sa úvodné video...",
          toastSuccessMessage: "Úvodné video bolo úspešne aktualizované!",
          toastErrorMessage: "Something went wrong! Please try again.",
        }
      );

      if (res?.success) {
        handleModalCancel();
      }
    } else {
      values?.image?.forEach((file: any) => {
        formData.append("gallery", file?.originFileObj);
      });

      const res = await tryCatchWrapper(
        updateBannerImage,
        { body: formData },
        {
          toastLoadingMessage: "Nahráva sa fotografia...",
          toastSuccessMessage: "Titulné fotografie boli úspešne aktualizované!",
          toastErrorMessage: "Something went wrong! Please try again.",
        }
      );

      if (res?.success) {
        handleModalCancel();
      }
    }
  };

  const handleModalCancel = () => {
    form.resetFields();
    setMediaType("image");
    handleCancel();
  };



  return (
    <Modal
      open={isModalVisible}
      onCancel={handleModalCancel}
      footer={null}
      centered
      className="lg:!w-[700px]"
    >
      <div className="p-5 text-base-color">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-5">
          {type === "both" ? "Portfólio" : type === "video" ? "Úvodné video" : "Titulné fotografie"}
        </h1>

        <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold mb-5">
          {type === "both" ? "Nahrajte fotografie a videá do portfólia" : type === "video" ? "Nahrajte svoje úvodné video" : "Nahrajte titulné fotografie"}
        </p>

        <ReusableForm form={form} handleFinish={onSubmit}>
          {/* Gallery uploader: choose whether to add photos (multiple) or a video (one at a time) */}
          {type === "both" && (
            <div className="mb-4">
              <Typography.Title level={5} className="!font-semibold">
                Typ súboru
              </Typography.Title>
              <Select
                value={mediaType}
                onChange={(value) => {
                  setMediaType(value);
                  // Clear any files picked under the previous type.
                  form.resetFields(["image"]);
                }}
                className="!w-40 !h-10"
                options={[
                  { value: "image", label: "Fotografia" },
                  { value: "video", label: "Video" },
                ]}
              />
            </div>
          )}

          <ReuseUpload
            // Remount when switching photo/video so the upload UI resets cleanly.
            key={isVideoUpload ? "video" : "image"}
            name="image"
            buttonText={isVideoUpload ? "Nahrať video (max. 100 MB)" : type === "both" ? "Nahrať maximálne 10 fotografií naraz" : "Nahrať maximálne 10 fotografií"}
            label={isVideoUpload ? "Video" : "Fotografia"}
            labelClassName="!font-semibold"
            maxCount={isVideoUpload ? 1 : 10}
            accept={isVideoUpload ? "video/*" : "image/*"}
            multiple={isVideoUpload ? false : true}
            rules={[{ required: true, message: isVideoUpload ? "Vyberte video" : "Vyberte fotografiu" }]}
          />
          <ReuseButton htmlType="submit" variant="secondary" className="mt-2">
            Nahrať
          </ReuseButton>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default ProfileProtfolioUploadImageModal;
