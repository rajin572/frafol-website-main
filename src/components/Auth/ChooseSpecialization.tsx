"use client";
import { useRouter, useSearchParams } from "next/navigation";
import ReusableTabs from "../ui/ReusableTabs";
import { useEffect, useState } from "react";
import ReuseButton from "../ui/Button/ReuseButton";
import Cookies from "js-cookie";
import { ICategory } from "@/types";

const ChooseSpecialization = ({ categories }: { categories: ICategory[] }) => {
  const specializationOptions = {
    photography:
      categories?.[0]?.type === "photoGraphy"
        ? categories.map((cat) => cat.title)
        : [],
    videography:
      categories?.[0]?.type === "videoGraphy"
        ? categories.map((cat) => cat.title)
        : [],
  };

  const storedInformation = Cookies.get("information");
  const parseData = JSON.parse(storedInformation || "{}");

  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") as "photography" | "videography";

  const [
    selectedPhotographySpecializations,
    setSelectedPhotographySpecializations,
  ] = useState<string[]>(
    parseData?.photographerSpecializations || [] // Initialize with existing photographer specialization
  );
  const [
    selectedVideographySpecializations,
    setSelectedVideographySpecializations,
  ] = useState<string[]>(
    parseData?.videographerSpecializations || [] // Initialize with existing videographer specialization
  );

  useEffect(() => {
    // Ensure state is updated with stored data when component mounts
    setSelectedPhotographySpecializations(
      parseData?.photographerSpecializations || []
    );
    setSelectedVideographySpecializations(
      parseData?.videographerSpecializations || []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSpecializationClick = (
    specialization: string,
    type: "photography" | "videography"
  ) => {
    if (type === "photography") {
      setSelectedPhotographySpecializations(
        (prev) =>
          prev.includes(specialization)
            ? prev.filter((item) => item !== specialization) // Remove if already selected
            : [...prev, specialization] // Add if not selected
      );
    } else if (type === "videography") {
      setSelectedVideographySpecializations(
        (prev) =>
          prev.includes(specialization)
            ? prev.filter((item) => item !== specialization) // Remove if already selected
            : [...prev, specialization] // Add if not selected
      );
    }
  };

  const handleSubmit = () => {
    const updatedInformation =
      parseData.role === "photographer"
        ? {
          photographerSpecializations: selectedPhotographySpecializations,
          videographerSpecializations: [],
        }
        : parseData.role === "videographer"
          ? {
            photographerSpecializations: [],
            videographerSpecializations: selectedVideographySpecializations,
          }
          : {
            photographerSpecializations: selectedPhotographySpecializations,
            videographerSpecializations: selectedVideographySpecializations,
          };

    Cookies.set(
      "information",
      JSON.stringify({ ...parseData, ...updatedInformation }),
      {
        expires: 1,
      }
    );
    router.push("/sign-up/professional/additional-information");
  };

  const isPhotographyDisabled = parseData.role === "videographer";
  const isVideographyDisabled = parseData.role === "photographer";

  return (
    <div className="flex flex-col justify-center gap-3 h-full w-full sm:w-3/4 mx-auto">
      <div className="mb-3">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-secondary-color mb-5">
          {/* Your Specializations */}
          Kategórie služieb
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-base-color">
          {/* Select the services you specialize in */}
          Vyberte kategórie, v ktorých chcete prezentovať svoju prácu
        </p>
      </div>
      <div>
        <ReusableTabs<"photography" | "videography">
          align="left"
          activeTab={activeTab}
          tabs={[
            {
              // label: "Photography"
              label: "Fotografia",
              value: "photography",
              disabled: isPhotographyDisabled,
              content: (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {specializationOptions?.photography.map((item, index) => (
                    <div
                      key={index}
                      className={`text-sm sm:text-base lg:text-lg font-bold w-full py-2 px-3 rounded cursor-pointer ${selectedPhotographySpecializations.includes(item)
                        ? "bg-secondary-color text-primary-color"
                        : "bg-background-color text-base-color"
                        }`}
                      onClick={() =>
                        handleSpecializationClick(item, "photography")
                      }
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ),
            },
            {
              // label: "Videography"
              label: "Videografia",
              value: "videography",
              disabled: isVideographyDisabled,
              content: (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {specializationOptions?.videography.map((item, index) => (
                    <div
                      key={index}
                      className={`text-sm sm:text-base lg:text-lg font-bold w-full py-2 px-3 rounded cursor-pointer ${selectedVideographySpecializations.includes(item)
                        ? "bg-secondary-color text-primary-color"
                        : "bg-background-color text-base-color"
                        }`}
                      onClick={() =>
                        handleSpecializationClick(item, "videography")
                      }
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ),
            },
          ]}
          tabContentStyle="mt-5"
        />
      </div>
      <div className="flex justify-end items-end w-full mt-5">
        <ReuseButton
          variant="secondary"
          className="!w-fit  sm:!text-sm lg:!text-sm !px-5 !py-2.5"
          disabled={
            selectedPhotographySpecializations.length === 0 &&
            selectedVideographySpecializations.length === 0
          }
          onClick={handleSubmit}
        >
          {/* Continue */}
          Pokračovať
        </ReuseButton>
      </div>
    </div>
  );
};

export default ChooseSpecialization;
