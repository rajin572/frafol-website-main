"use client";
import React from "react";
import HelpfulDocumentsCards from "./HelpfulDocumentsCards";

const creativeDocuments = [
  {
    title: "Storyboard Template",
    description: "Printable storyboard template.",
    fileInfo: "2.7 MB PDF",
    downloadUrl: "/documents/Storyboard.pdf",
    fileName: "Storyboard.pdf",
  },
  {
    title: "Shot List",
    description: "Shot list template for planning each scene and take.",
    fileInfo: "2.8 MB PDF",
    downloadUrl: "/documents/Shot List.pdf",
    fileName: "Shot List.pdf",
  },
  {
    title: "Script Breakdown Sheet",
    description: "Script breakdown worksheet for production planning.",
    fileInfo: "2.7 MB PDF",
    downloadUrl: "/documents/Script Breakdown Sheet.pdf",
    fileName: "Script Breakdown Sheet.pdf",
  },
];

const legalDocuments = [
  {
    title: "Legal document 1 — Client appearing in photos and videos",
    description:
      "Consent for creating and using photographs and audiovisual recordings (client).",
    fileInfo: "18 KB DOCX",
    downloadUrl:
      "/documents/Legal document _ Súhlas so zhotovovaním audiovizuálneho a fotografického záznamu.docx",
    fileName:
      "Legal document _ Súhlas so zhotovovaním audiovizuálneho a fotografického záznamu.docx",
  },
  {
    title: "Legal document 2 — Child appearing in photos and videos",
    description:
      "Consent for creating and using photographs and audiovisual recordings (child, signed by legal guardian).",
    fileInfo: "18 KB DOCX",
    downloadUrl:
      "/documents/Legal document_ child _ Súhlas so zhotovovaním audiovizuálneho a fotografického záznamu_ zákonný zástupca.docx",
    fileName:
      "Legal document_ child _ Súhlas so zhotovovaním audiovizuálneho a fotografického záznamu_ zákonný zástupca.docx",
  },
];

const HelpfulDocumentsTabs = () => {
  const [activeTab, setActiveTab] = React.useState<
    "creativeDocuments" | "legalDocument"
  >("creativeDocuments");
  return (
    <div>
      <div className="bg-background-color p-1.5 rounded-lg w-fit max-w-full mx-auto overflow-x-auto scrollbar-thin scrollbar-thumb-[#a13200] scrollbar-track-gray-200 hover:scrollbar-thumb-[#d14200]">
        <div className="flex items-center gap-2 w-max font-semibold text-sm sm:text-sm lg:text-base xl:text-lg">
          <button
            className={`${activeTab === "creativeDocuments"
                ? "bg-secondary-color text-white"
                : "bg-transparent text-secondary-color"
              } px-3 py-1 cursor-pointer rounded-lg transition-all duration-500 relative group min-w-[200px] shrink-0`}
            onClick={() => setActiveTab("creativeDocuments")}
          >
            Creative Documents
          </button>
          <button
            className={`${activeTab === "legalDocument"
                ? "bg-secondary-color text-white"
                : "bg-transparent text-secondary-color"
              } px-3 py-1 cursor-pointer rounded-lg transition-all duration-500 relative group min-w-[200px] shrink-0`}
            onClick={() => setActiveTab("legalDocument")}
          >
            Legal Document
          </button>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-5 items-center">
        {activeTab === "creativeDocuments" && (
          <div className="flex flex-col gap-5 items-center">
            {creativeDocuments.map((doc, index) => (
              <HelpfulDocumentsCards key={index} {...doc} />
            ))}
          </div>
        )}
        {activeTab === "legalDocument" && (
          <div className="flex flex-col gap-5 items-center">
            {legalDocuments.map((doc, index) => (
              <HelpfulDocumentsCards key={index} {...doc} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpfulDocumentsTabs;
