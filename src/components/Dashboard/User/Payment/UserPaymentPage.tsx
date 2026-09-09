/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import UserPaymentCard from "./UserPaymentCard";
import PaymentHistory from "./PaymentHistory";
import { IPayment } from "@/types";

const UserPaymentPage = ({
  myPaymnetData,
  totalData,
  page,
  limit,
  myPaymnetStatesData,
}: {
  myPaymnetData: IPayment[];
  totalData: number;
  page: number;
  limit: number;
  myPaymnetStatesData: any;
}) => {
  return (
    <div>
      {/* <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl  font-bold mb-10">
        Payment
      </h1> */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl  font-bold mb-10">
        Platby
      </h1>
      <UserPaymentCard myPaymnetStatesData={myPaymnetStatesData} />
      <div className="mt-10">
        <PaymentHistory
          myPaymnetData={myPaymnetData}
          totalData={totalData}
          page={page}
          limit={limit}
        />
        {/* <ReusableTabs
          activeTab={activeTab}
          align="left"
          tabs={[
            {
              label: "Payment History",
              value: "paymentHistory",
              content: <PaymentHistory activeTab={activeTab} />,
            },
            {
              label: "Pending Payment",
              value: "pendingPayment",
              content: <PendingPayment activeTab={activeTab} />,
            },
          ]}
        /> */}
      </div>
    </div>
  );
};

export default UserPaymentPage;
