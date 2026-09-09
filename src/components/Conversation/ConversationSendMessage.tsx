/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Form, Input, Tooltip, Upload } from "antd";
import { BsImage } from "react-icons/bs";
import { FaFileAlt, FaTelegramPlane, FaTimes } from "react-icons/fa";
import { toast } from "sonner";
import { selectSelectedChatUser } from "../../redux/features/conversation/conversationSlice";
import { useAppSelector } from "../../redux/hooks";
import SpinLoader from "../ui/SpinLoader";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { sendFiles } from "@/services/ConversationService/ConversationServiceApi";
import Image from "next/image";
import { getServerUrl } from "@/helpers/config/envConfig";
import { AllImages } from "../../../public/assets/AllImages";

const ConversationSendMessage = ({
  socket,
  room,
}: {
  socket: any;
  room: string;
}) => {
  const serverUrl = getServerUrl();
  const selectedConversation = useAppSelector(selectSelectedChatUser);
  const [form] = Form.useForm();
  const [isUploadLoading, setIsUploadLoading] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]); // Use an array for uploaded image URLs

  // Reset on new conversation
  useEffect(() => {
    setUploadedImages([]);
    form.setFieldValue("message", "");
  }, [selectedConversation?.chat?._id, form]);

  // Handle image selection
  const handleImageChange = ({ fileList: newFileList }: any) => {
    const latestFile = newFileList?.[0];
    if (latestFile) uploadImage(latestFile);
  };

  const uploadImage = async (file: any) => {
    setIsUploadLoading(true);
    const formData = new FormData();
    formData.append("images", file.originFileObj);

    const res = await tryCatchWrapper(
      sendFiles,
      { body: formData },
      {
        toastLoadingMessage: "Uploading...",
        toastSuccessMessage: "Uploaded successfully!",
        toastErrorMessage: "Something went wrong! Please try again.",
      }
    );

    if (res?.success && res?.data?.length > 0) {
      // Add the new image URL to the list of uploaded images
      setUploadedImages((prev) => [...prev, res?.data[0]]);
    }
    setIsUploadLoading(false);
  };

  const handleDeleteImage = (imageUrl: string) => {
    // Remove the image from the uploaded images list
    setUploadedImages((prev) => prev.filter((url) => url !== imageUrl));
    setIsUploadLoading(false);
  };

  const handleMessageSend = async (values: any) => {
    const data: any = {
      chatId: room,
      ...(values?.message?.length > 0 ? { text: values?.message } : {}),
      ...(uploadedImages.length > 0 ? { images: uploadedImages } : {}),
    };

    try {
      socket?.emit("send-message", data, (res: any) => {
        if (res?.success) {
          setUploadedImages([]); // Clear uploaded images after sending
          form.resetFields();
          setTextValue(null);
        }
      });
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Failed to send message",
        { duration: 2000 }
      );
    }
  };

  return (
    <div>
      <div className="w-full">
        {/* Show uploaded images instead of file list */}
        {uploadedImages.length > 0 && (
          <div className="absolute bottom-16 left-4 flex items-center gap-2 shadow">
            {uploadedImages.map((fileUrl, index) => {
              // Function to check if the file is an image based on its URL
              const isImage = /\.(jpg|jpeg|png|gif|svg)$/i.test(fileUrl);
              const fileName = fileUrl?.split("/").pop() || "file";

              return (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white border border-gray-300 rounded relative"
                >
                  {isImage ? (
                    // Render image thumbnail if it's an image
                    <Image
                      width={1000}
                      height={1000}
                      src={
                        serverUrl + fileUrl
                          ? serverUrl + fileUrl
                          : AllImages?.dummyCover?.src
                      }
                      alt={fileName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    // Render icon and text for non-image files (e.g., PDF, ZIP)
                    <Tooltip title={fileName}>
                      <div className="w-16 h-16 flex flex-col gap-1 justify-center items-center bg-white rounded">
                        <FaFileAlt className="text-xl text-red-600" />
                        <span className="text-sm text-gray-600 truncate">
                          {fileName?.slice(0, 5) + "..."}
                        </span>
                      </div>
                    </Tooltip>
                  )}

                  <div className="bg-white p-1 rounded-full absolute top-0 right-0.5">
                    <FaTimes
                      className="cursor-pointer text-red-600"
                      style={{ fontSize: "12px" }}
                      onClick={() => handleDeleteImage(fileUrl)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <Form form={form} onFinish={handleMessageSend}>
          <div className="!bg-white absolute -bottom-0 flex justify-center items-center w-full p-1">
            <div className="w-full rounded-full bg-white border border-secondary-color px-4 py-2 flex items-center space-x-4">
              <Form.Item className="w-full !p-0 !m-0" name="message">
                <Input
                  onChange={(e) => setTextValue(e.target.value)}
                  placeholder="Send your message..."
                  className="!border-none !ring-0 !outline-none !bg-transparent text-black"
                />
              </Form.Item>

              <Form.Item className="!p-0 !m-0" name="image">
                <Upload
                  fileList={[]}
                  onChange={handleImageChange}
                  customRequest={(options) => {
                    setTimeout(() => {
                      if (options.onSuccess) {
                        options.onSuccess("ok");
                      }
                    }, 1000);
                  }}
                  maxCount={5} // Allow multiple files
                  accept="image/*" // Accept specific file types
                  beforeUpload={(file) => {
                    const validTypes = [
                      "image/png",
                      "image/jpg",
                      "image/webp",
                      "image/jpeg",
                    ];

                    // Check if the file is of a valid type
                    if (!validTypes.includes(file.type)) {
                      toast.error(
                        "Invalid file type. Please upload a valid file."
                      );
                      return Upload.LIST_IGNORE; // Ignore invalid file type
                    }

                    // If file type is valid, allow the upload
                    return true;
                  }}
                  showUploadList={false}
                >
                  <BsImage className="cursor-pointer text-xl text-secondary-color mt-1" />
                </Upload>
              </Form.Item>
            </div>

            {isUploadLoading ? (
              <SpinLoader />
            ) : (
              <button
                disabled={!textValue?.length && uploadedImages.length === 0}
                className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                type="submit"
              >
                <FaTelegramPlane className="text-[#F9DD40] bg-secondary-color rounded-full p-2 text-4xl ms-3" />
              </button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ConversationSendMessage;
