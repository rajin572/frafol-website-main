import AuthSectionTemplate from "@/components/ui/AuthSectionTemplet";
import React from "react";
import { AllImages } from "../../../../../../public/assets/AllImages";
import ReviewDetailsAndSubmit from "@/components/Auth/ReviewDetailsAndSubmit";

const page = () => {
  return (
    <AuthSectionTemplate imageScr={AllImages.reviewDetails} showLogo={false}>
      <ReviewDetailsAndSubmit />
    </AuthSectionTemplate>
  );
};

export default page;
