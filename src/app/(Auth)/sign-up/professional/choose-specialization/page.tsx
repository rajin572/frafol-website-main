import AuthSectionTemplate from "@/components/ui/AuthSectionTemplet";
import React from "react";
import { AllImages } from "../../../../../../public/assets/AllImages";
import ChooseSpecialization from "@/components/Auth/ChooseSpecialization";
import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";
import { ICategory } from "@/types";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const tab = params?.tab || "photoGraphy";
  const activeTab = (tab === "videography" ? "videoGraphy" : "photoGraphy") as
    | "photoGraphy"
    | "videoGraphy";

  const res = await fetchWithAuth(`/category/type/${activeTab}`, {
    next: {
      tags: [TagTypes.category],
    },
  });
  const data = await res.json();
  const categories: ICategory[] = data?.data || [];

  return (
    <div>
      <AuthSectionTemplate
        imageScr={AllImages.signUpSpecialization}
        showLogo={false}
      >
        <ChooseSpecialization categories={categories} />
      </AuthSectionTemplate>
    </div>
  );
};

export default page;
