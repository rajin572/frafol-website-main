import React from "react";
import ReuseButton from "../ui/Button/ReuseButton";
import { FaRegFileAlt } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";

interface HelpfulDocumentsCardsProps {
  title: string;
  description: string;
  fileInfo: string;
  downloadUrl: string;
  fileName: string;
}

const HelpfulDocumentsCards = ({
  title,
  description,
  fileInfo,
  downloadUrl,
  fileName,
}: HelpfulDocumentsCardsProps) => {
  return (
    <div className="flex items-start gap-2 p-4  outline  outline-offset-[-1px] outline-neutral-200 w-full sm:w-[600px] lg:w-[800px] rounded-lg">
      <div className="p-2 rounded-lg bg-[#FFF6EC]">
        <FaRegFileAlt className="text-secondary-color text-2xl" />
      </div>
      <div className="w-full">
        <p className="text-base-color text-base sm:text-lg lg:text-xl  font-bold ">
          {title}
        </p>
        <p className="text-[#4B5563] text-sm sm:text-sm lg:text-base font-medium">
          {description}
        </p>
        <p className="text-[#4B5563] text-sm sm:text-sm lg:text-base font-medium">
          {fileInfo}
        </p>
        <a href={downloadUrl} download={fileName}>
          <ReuseButton
            className="mt-2 !text-base !py-4 !w-fit"
            variant="secondary"
          >
            <MdFileDownload className="mr-2" /> Download
          </ReuseButton>
        </a>
      </div>
    </div>
  );
};

export default HelpfulDocumentsCards;
