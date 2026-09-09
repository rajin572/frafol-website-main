import React from "react";
import MyAvailabilitySection from "./MyAvailabilitySection";
import { IProfile } from "@/types";

const OtherInformationPage = ({ myData }: { myData: IProfile }) => {
  return (
    <div>
      <MyAvailabilitySection myData={myData} />
    </div>
  );
};

export default OtherInformationPage;
