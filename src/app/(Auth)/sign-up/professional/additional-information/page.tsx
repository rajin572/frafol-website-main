import AuthSectionTemplate from "@/components/ui/AuthSectionTemplet";
import React from "react";
import { AllImages } from "../../../../../../public/assets/AllImages";
import AdditionalInformation from "@/components/Auth/AdditionalInformation";

const page = () => {
  return (
    <div>
      <AuthSectionTemplate imageScr={AllImages.chooseRole} showLogo={false}>
        <AdditionalInformation />
      </AuthSectionTemplate>
    </div>
  );
};

export default page;
