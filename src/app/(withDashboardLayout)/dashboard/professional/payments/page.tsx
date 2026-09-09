import UserPaymentPage from "@/components/Dashboard/User/Payment/UserPaymentPage";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { IPayment } from "@/types";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;

  const page = Number(params?.page) || 1;
  const limit = 12;

  const paymnetRes = await fetchWithAuth(
    `/payment/my?page=${page}&limit=${limit}`
  );

  const paymnetData = await paymnetRes.json();

  const myPaymnetData: IPayment[] = paymnetData?.data?.payments || [];
  const totalData = paymnetData?.data?.meta?.total;

  console.log("my pay", myPaymnetData?.[1])

  const paymentStatesRes = await fetchWithAuth(`/payment/my-stats`);
  const paymentStatesData = await paymentStatesRes.json();

  const myPaymnetStatesData: IPayment[] = paymentStatesData?.data || {
    totalSpent: 0,
    totalOrders: 0,
  };

  return (
    <UserPaymentPage
      myPaymnetData={myPaymnetData}
      totalData={totalData}
      page={page}
      limit={limit}
      myPaymnetStatesData={myPaymnetStatesData}
    />
  );
};

export default page;
