import React from "react";
import { AllImages } from "../../../../../../public/assets/AllImages";
import AuthSectionTemplate from "@/components/ui/AuthSectionTemplet";
import LegalInvoiceDetails from "@/components/Auth/LegalInvoiceDetails";
import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";

export interface ITown {
  _id: string,
  name: string,
  isDeleted: boolean,
  createdAt: string,
  updatedAt: string,
}

const page = async () => {
  const res = await fetchWithAuth(
    `/town`,
    {
      next: {
        tags: [TagTypes.town],
      },
    }
  );

  const data = await res.json();
  const townData: ITown[] = data?.data || [];

  return (
    <div>
      <AuthSectionTemplate imageScr={AllImages.chooseRole} showLogo={false}>
        <LegalInvoiceDetails townData={townData} />
      </AuthSectionTemplate>
    </div>
  );
};

export default page;
