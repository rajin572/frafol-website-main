import GearMarketplacePage from "@/components/Dashboard/Professional/GearMarketplace/GearMarketplacePage";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { ICategory, IGear } from "@/types";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = 10;
  const search = params?.search || "";
  const filter = (params?.filter as string) || "";
  const statusQuery = filter ? `&status=${encodeURIComponent(filter)}` : "";
  const res = await fetchWithAuth(
    `/marketPlace/my?page=${page}&limit=${limit}&searchTerm=${search}${statusQuery}`,
    {
      next: {
        tags: [TagTypes.gear],
      },
    }
  );

  const categoryRes = await fetchWithAuth(`/category/type/gear`, {
    next: {
      tags: [TagTypes.category],
    },
  });
  const data = await res.json();
  const gearData = await categoryRes.json();

  const totalData = data?.data?.meta?.total;

  const categories: ICategory[] = gearData?.data || [];
  const myGears: IGear[] = data?.data?.result || [];

  const serviceChargeRes = await fetchWithAuth(`/commissionSetup`, {
    next: {
      tags: [TagTypes.package],
    },
  });

  const serviceChargeData = await serviceChargeRes.json();
  const serviceCharge: number = serviceChargeData?.data?.gearOrders;
  const minServiceCharge: number = serviceChargeData?.data?.minimumCharge;

  return (
    <GearMarketplacePage
      page={page}
      limit={limit}
      categories={categories}
      myGears={myGears}
      totalData={totalData}
      serviceCharge={serviceCharge}
      minServiceCharge={minServiceCharge}
    />
  );
};

export default page;
