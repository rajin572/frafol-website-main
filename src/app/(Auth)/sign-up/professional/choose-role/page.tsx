import AuthSectionTemplate from "@/components/ui/AuthSectionTemplet";
import React from "react";
import { AllImages } from "../../../../../../public/assets/AllImages";
import ChooseRole from "@/components/Auth/ChooseRole";

const page = () => {
  return (
    <div>
      <AuthSectionTemplate imageScr={AllImages.chooseRole} showLogo={false}>
        <ChooseRole />
      </AuthSectionTemplate>
    </div>
  );
};

export default page;
