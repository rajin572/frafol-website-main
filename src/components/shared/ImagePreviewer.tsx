/* eslint-disable @typescript-eslint/no-explicit-any */
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { FaDownload } from "react-icons/fa";
import { saveAs } from "file-saver";
import Image from "next/image";
import { toast } from "sonner";
import { Tooltip } from "antd";

const ImagePreviewer = ({
  imageUrl,
  image,
  msg,
  userData,
  imgHeight,
}: {
  imageUrl: string;
  image: string;
  msg: any;
  userData: any;
  imgHeight?: number;
}) => {
  if (!image) return null;

  const filePath = image.replace(/\\/g, "/");
  const fileUrl = `${imageUrl}${filePath}`;
  const isImage = /\.(jpeg|jpg|png|gif|webp|bmp|svg)$/i.test(filePath);
  const getFileName = (path: string) => path.split("/").pop() || "download";

  const handleDownload = async (url: string, filename: string) => {
    const toastId = toast.loading("Downloading...", {
      duration: 2000,
    });
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      saveAs(blob, filename);
      toast.success("Downloaded successfully!", { id: toastId });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Download failed", { id: toastId });
    }
  };
  return isImage ? (
    <PhotoProvider>
      <div className={`w-32 ${imgHeight ? `h-[${imgHeight}px]` : "h-auto"}`}>
        <PhotoView src={fileUrl}>
          <Image
            src={fileUrl}
            alt="Image"
            height={500}
            width={500}
            className={`cursor-pointer h-32 object-cover object-top rounded-md border border-[#F9DD40] ${
              msg?.sender?._id === userData?.userId ||
              msg?.sender?.toString() === userData?.userId
                ? "order-last"
                : "order-first"
            }`}
            priority={true}
            fetchPriority="high"
          />
        </PhotoView>
      </div>
    </PhotoProvider>
  ) : (
    <div className="flex items-center gap-2 px-3 py-2 rounded text-[#F9DD40] bg-secondary-color shadow max-w-xs text-sm">
      <Tooltip title={fileUrl?.split("/").pop()}>
        <span className="truncate max-w-[150px]">{getFileName(filePath)}</span>
      </Tooltip>
      <button
        onClick={() => handleDownload(fileUrl, getFileName(filePath))}
        className="focus:outline-none"
      >
        <FaDownload className="text-[#F9DD4099] hover:text-[#F9DD40] cursor-pointer text-base" />
      </button>
    </div>
  );
};

export default ImagePreviewer;
