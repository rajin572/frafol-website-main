import UserWorkshopPage from "@/components/Dashboard/User/Workshop/UserWorkshopPage";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { IMyRegisteredWorkshop } from "@/types";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = 12;
  const res = await fetchWithAuth(
    `/workshop/my-registerd?page=${page}&limit=${limit}`,
    {
      next: {
        tags: [TagTypes.workshopOrders],
      },
    }
  );

  const data = await res.json();

  const totalData = data?.data?.meta?.total;

  const workshops: IMyRegisteredWorkshop[] = data?.data?.result || [];
  return (
    <div>
      <UserWorkshopPage
        workshops={workshops}
        totalData={totalData}
        page={page}
        limit={limit}
      />
    </div>
  );
};

export default page;
