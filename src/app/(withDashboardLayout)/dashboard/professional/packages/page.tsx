import PackagesPage from "@/components/Dashboard/Professional/Packages/PackagesPage";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { getCurrentUser } from "@/services/AuthService";
import { IPackage } from "@/types";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const userData = await getCurrentUser();

  const params = await searchParams;
  const tab = params?.tab || "approved";
  const activeTab = (tab === "approved" ? "approved" : "pending") as
    | "approved"
    | "pending";

  const page = Number(params?.page) || 1;
  const searchText = params?.search || "";
  const limit = 12;

  const res = await fetchWithAuth(
    `/package/my?approvalStatus=${activeTab}&page=${page}&limit=${limit}&searchTerm=${searchText}`,
    {
      next: {
        tags: [TagTypes.package],
      },
    }
  );

  const data = await res.json();

  const totalData = data?.data?.meta?.total;

  const packages: IPackage[] = data?.data?.result || [];

  console.log(packages)

  const serviceChargeRes = await fetchWithAuth(`/commissionSetup`, {
    next: {
      tags: [TagTypes.package],
    },
  });

  const serviceChargeData = await serviceChargeRes.json();
  const serviceCharge: number = serviceChargeData?.data?.photoVideoGrapy;
  const minServiceCharge: number = serviceChargeData?.data?.minimumCharge;

  return (
    <PackagesPage
      tab={activeTab}
      page={page}
      limit={limit}
      packages={packages}
      totalData={totalData}
      userData={userData}
      serviceCharge={serviceCharge}
      minServiceCharge={minServiceCharge}
    />
  );
};

export default page;
