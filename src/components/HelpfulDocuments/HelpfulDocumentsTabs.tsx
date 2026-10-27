"use client";
import React from "react";
import HelpfulDocumentsCards from "./HelpfulDocumentsCards";

const creativeDocuments = [
  {
    title: "Šablóna storyboardu",
    description: "Šablóna storyboardu na tlač.",
    fileInfo: "2.7 MB PDF",
    downloadUrl: "/documents/Storyboard.pdf",
    fileName: "Storyboard.pdf",
  },
  {
    title: "Zoznam záberov",
    description: "Šablóna zoznamu záberov na plánovanie každej scény a záberu.",
    fileInfo: "2.8 MB PDF",
    downloadUrl: "/documents/Shot List.pdf",
    fileName: "Shot List.pdf",
  },
  {
    title: "Rozpis scenára",
    description: "Pracovný list s rozpisom scenára na plánovanie produkcie.",
    fileInfo: "2.7 MB PDF",
    downloadUrl: "/documents/Script Breakdown Sheet.pdf",
    fileName: "Script Breakdown Sheet.pdf",
  },
];

const legalDocuments = [
  {
    title: "Právny dokument 1 — Klient na fotografiách a videách",
    description:
      "Súhlas so zhotovením a použitím fotografií a audiovizuálnych záznamov (klient).",
    fileInfo: "18 KB DOCX",
    downloadUrl: "/documents/consent-client.docx",
    fileName:
      "Súhlas so zhotovovaním audiovizuálneho a fotografického záznamu.docx",
  },
  {
    title: "Právny dokument 2 — Dieťa na fotografiách a videách",
    description:
      "Súhlas so zhotovením a použitím fotografií a audiovizuálnych záznamov (dieťa, podpisuje zákonný zástupca).",
    fileInfo: "18 KB DOCX",
    downloadUrl: "/documents/consent-child-guardian.docx",
    fileName:
      "Súhlas so zhotovovaním audiovizuálneho a fotografického záznamu, zákonný zástupca.docx",
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
            Kreatívne dokumenty
          </button>
          <button
            className={`${activeTab === "legalDocument"
                ? "bg-secondary-color text-white"
                : "bg-transparent text-secondary-color"
              } px-3 py-1 cursor-pointer rounded-lg transition-all duration-500 relative group min-w-[200px] shrink-0`}
            onClick={() => setActiveTab("legalDocument")}
          >
            Právne dokumenty
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
