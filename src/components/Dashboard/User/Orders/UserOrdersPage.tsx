"use client";
import React from "react";
import UserOrdersOverview from "./UserOrdersOverview";
import ReusableTabs from "@/components/ui/ReusableTabs";
import UserCurrentOrder from "./UserCurrentOrder";
import UserConfirmOrder from "./UserConfirmOrder";
import UserDeliveriedOrder from "./UserDeliveriedOrder";
import UserPendingOrder from "./UserPendingOrder";
import UserOrderOffer from "./UserOrderOffer";
import UserCancleOrder from "./UserCancleOrder";
import PendingPayment from "../Payment/PendingPayment";
import { IEventOrder } from "@/types";
import { IUserEventOrderStats } from "@/app/(withDashboardLayout)/dashboard/my-account/orders/page";

const UserOrdersPage = ({
  activeTab,
  page,
  states,
  totalData,
  myEventData,
  limit = 12,
}: {
  activeTab:
  | "currentOrder"
  | "toConfirm"
  | "delivered"
  | "pending"
  | "orderOffer"
  | "accepted"
  | "cancelRequest"
  | "cancelled";
  page: number;
  totalData: number;
  states: IUserEventOrderStats;
  myEventData: IEventOrder[];
  limit: number;
}) => {
  return (
    <div>
      <div className="flex lg:flex-row flex-col justify-between items-center ">
        {/* <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl  font-bold mb-10">
          Orders
        </h1> */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl  font-bold mb-10">
          Objednávky
        </h1>
      </div>
      <UserOrdersOverview states={states} />
      <div className="mt-10">
        <ReusableTabs
          activeTab={activeTab}
          // onTabChange={setActiveTab}
          align="left"
          tabs={[
            {
              /* label: "Current Order", */
              label: "Aktuálna objednávka",
              value: "currentOrder",
              content: (
                <UserCurrentOrder
                  activeTab={activeTab}
                  page={page}
                  totalData={totalData}
                  myEventData={myEventData}
                  limit={limit}
                />
              ),
            },
            {
              /* label: "Confirm Delivery", */
              label: "Potvrdiť doručenie",
              value: "toConfirm",
              content: (
                <UserConfirmOrder
                  activeTab={activeTab}
                  page={page}
                  totalData={totalData}
                  myEventData={myEventData}
                  limit={limit}
                />
              ),
            },
            {
              /* label: "Delivered", */
              label: "Doručené",
              value: "delivered",
              content: (
                <UserDeliveriedOrder
                  activeTab={activeTab}
                  page={page}
                  totalData={totalData}
                  myEventData={myEventData}
                  limit={limit}
                />
              ),
            },
            {
              /* label: "My Request", */
              label: "Odoslaný formulár",
              value: "pending",
              content: (
                <UserPendingOrder
                  activeTab={activeTab}
                  page={page}
                  totalData={totalData}
                  myEventData={myEventData}
                  limit={limit}
                />
              ),
            },
            {
              /* label: "Order Offer", */
              label: "Návrh objednávky",
              value: "orderOffer",
              content: (
                <UserOrderOffer
                  activeTab={activeTab}
                  page={page}
                  totalData={totalData}
                  myEventData={myEventData}
                  limit={limit}
                />
              ),
            },
            {
              /* label: "Pending Payment", */
              label: "Čaká sa na platbu",
              value: "accepted",
              content: (
                <PendingPayment
                  activeTab={activeTab}
                  page={page}
                  totalData={totalData}
                  myEventData={myEventData}
                  limit={limit}
                />
              ),
            },
            {
              /* label: "Cancel Confirmation", */
              label: "Potvrdenie zrušenia",
              value: "cancelRequest",
              content: (
                <UserCancleOrder
                  activeTab={activeTab}
                  page={page}
                  totalData={totalData}
                  myEventData={myEventData}
                  limit={limit}
                />
              ),
            },
            {
              /* label: "Cancelled", */
              label: "Zrušené",
              value: "cancelled",
              content: (
                <UserCancleOrder
                  activeTab={activeTab}
                  page={page}
                  totalData={totalData}
                  myEventData={myEventData}
                  limit={limit}
                />
              ),
            },
          ]}
          resetPage={true}
        />
      </div>
    </div>
  );
};

export default UserOrdersPage;
