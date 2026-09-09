import ProfessionalWorkshopPage from "@/components/Dashboard/Professional/Wrokshop/ProfessionalWorkshopPage";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { IWorkshop } from "@/types";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const tab = params?.tab || "approved";
  const activeTab = (tab === "approved" ? "approved" : "pending") as
    | "approved"
    | "pending";

  const page = Number(params?.page) || 1;
  const searchText = params?.search || "";
  const workshopId = params?.workshop || undefined;
  const limit = 1;

  const res = await fetchWithAuth(`/workshop/my?approvalStatus=${activeTab}&page=${page}&limit=${limit}&searchTerm=${searchText}`, {
    next: {
      tags: [TagTypes.workshop],
    },
  });

  const data = await res.json();

  const totalData = data?.data?.meta?.total;

  const workshops: IWorkshop[] = data?.data?.result || [];

  const serviceChargeRes = await fetchWithAuth(`/commissionSetup`, {
    next: {
      tags: [TagTypes.package],
    },
  });

  const serviceChargeData = await serviceChargeRes.json();
  const serviceCharge: number = serviceChargeData?.data?.workShop;
  const minServiceCharge: number = serviceChargeData?.data?.minimumCharge;

  let participantsData = undefined;


  if (workshopId) {
    const participantsRes = await fetchWithAuth(
      `/workshop/participants/${workshopId}`,
      {
        next: {
          tags: [TagTypes.workshop],
        },
      }
    );

    const participants = await participantsRes.json();
    participantsData = participants?.data || undefined;
  } else {
    participantsData = undefined;
  }
  console.log("participantsData", participantsData);

  return (
    <ProfessionalWorkshopPage
      tab={tab as "approved" | "pending"}
      searchText={searchText as string}
      page={page}
      limit={limit}
      workshops={workshops}
      totalData={totalData}
      serviceCharge={serviceCharge}
      participantsData={participantsData}
      minServiceCharge={minServiceCharge}
    />
  );
};

export default page;
