import AuthSectionTemplate from "@/components/ui/AuthSectionTemplet";
import React from "react";
import { AllImages } from "../../../../public/assets/AllImages";
import JoinFrafol from "@/components/Auth/JoinFrafol";

const page = () => {
  return (
    <div>
      <AuthSectionTemplate imageScr={AllImages.joinFrafol} showLogo={true}>
        <JoinFrafol />
      </AuthSectionTemplate>
    </div>
  );
};

export default page;
