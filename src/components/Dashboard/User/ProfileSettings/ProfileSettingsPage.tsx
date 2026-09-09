"use client";
import ChangePassword from "@/components/shared/ChangePassword";
import EditProfile from "@/components/shared/EditProfile";
import ReusableTabs from "@/components/ui/ReusableTabs";
import React from "react";
import PortfolioPage from "./PortfolioPage";
import AccountCredentialPage from "./AccountCredentialPage";
import OtherInformationPage from "./OtherInformationPage";
import DeleteAccountPage, { TDeleteAccountStatus } from "./DeleteAccountPage";
import { ICategory, IProfile } from "@/types";
import { ITown } from "@/app/(Auth)/sign-up/professional/legal-invoice/page";

const ProfileSettingsPage = ({
  activeTab,
  myData,
  portfolio,
  categories,
  towns,
  deleteStatus,
}: {
  activeTab:
  | "profile"
  | "portfolio"
  | "accountCredentials"
  | "unavailability"
  | "changePassword"
  | "deleteAccount";
  myData: IProfile;
  portfolio: "introVideo" | "bannerImage" | "galleryImage";
  categories: ICategory[];
  towns: ITown[];
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
              /* label: "Edit Profile", */
              label: "Upraviť profil",
              value: "profile",
              content: <EditProfile myData={myData} categories={categories} towns={towns} />,
            },
            {
              /* label: "Portfolio", */
              label: "Portfólio",
              value: "portfolio",
              content: <PortfolioPage activeTab={portfolio} myData={myData} />, // Placeholder for portfolio content
            },
            {
              /* label: "Account Credentials", */
              label: "Prihlasovacie údaje",
              value: "accountCredentials",
              content: <AccountCredentialPage myData={myData} />, // Placeholder for account credentials content
            },
            {
              /* label: "Unavailability", */
              label: "Nedostupnosť",
              value: "unavailability",
              content: <OtherInformationPage myData={myData} />, // Placeholder for other information content
            },
            {
              /* label: "Change Password", */
              label: "Zmeniť heslo",
              value: "changePassword",
              content: <ChangePassword />,
            },
            {
              /* label: "Delete Account", */
              label: "Zmazať účet",
              value: "deleteAccount",
              content: <DeleteAccountPage deleteStatus={deleteStatus} />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
