import AuthSectionTemplate from "@/components/ui/AuthSectionTemplet";
import React from "react";
import { AllImages } from "../../../../../../public/assets/AllImages";
import PersonalInformation from "@/components/Auth/PersonalInformation";

const page = () => {
  return (
    <div>
      <AuthSectionTemplate imageScr={AllImages.personalInfo} showLogo={false}>
        <PersonalInformation />
      </AuthSectionTemplate>
    </div>
  );
};

export default page;
