"use client";
import ChangePassword from "@/components/shared/ChangePassword";
import EditProfile from "@/components/shared/EditProfile";
import ReusableTabs from "@/components/ui/ReusableTabs";
import React from "react";
import DeleteAccountPage, { TDeleteAccountStatus } from "./DeleteAccountPage";
import { IProfile } from "@/types";
import { ITown } from "@/app/(Auth)/sign-up/professional/legal-invoice/page";

const MyAccountProfile = ({
  activeTab,
  myData,
  townData,
  deleteStatus,
}: {
  activeTab: "profile" | "changePassword" | "deleteAccount";
  myData: IProfile;
  townData: ITown[];
  deleteStatus: TDeleteAccountStatus | null;
}) => {
  return (
    <div>
      <div className="mt-10">
        <ReusableTabs
          activeTab={activeTab}
          align="left"
          tabs={[
            {
              label: "Edit Profile",
              value: "profile",
              content: <EditProfile myData={myData} towns={townData} />,
            },
            {
              label: "Change Password",
              value: "changePassword",
              content: <ChangePassword />,
            },
            {
              label: "Delete Account",
              value: "deleteAccount",
              content: <DeleteAccountPage deleteStatus={deleteStatus} />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default MyAccountProfile;
