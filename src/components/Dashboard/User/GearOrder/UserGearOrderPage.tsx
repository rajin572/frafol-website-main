"use client";
import ReusableTabs from "@/components/ui/ReusableTabs";
import UserCancleGearOrder from "../Orders/UserCancleGearOrder";
import UserConfirmGearOrder from "../Orders/UserConfirmGearOrder";
import UserCurrentGearOrder from "../Orders/UserCurrentGearOrder";
import UserDeliveriedGearOrder from "../Orders/UserDeliveriedGearOrder";
// import UserOrdersOverview from "../Orders/UserOrdersOverview";
import { IGearOrder } from "@/types";
import { usePathname } from "next/navigation";

const UserGearOrderPage = ({
  activeTab,
  page,
  totalData,
  myGearOrderData,
  limit = 12,
}: {
  activeTab: "currentOrder" | "toConfirm" | "delivered" | "cancelled";
  page: number;
  totalData: number;
  myGearOrderData: IGearOrder[];
  limit: number;
}) => {
  const url = usePathname();

  console.log(myGearOrderData)
  return (
    <div>
      <div className="flex lg:flex-row flex-col justify-between items-center ">
        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl  font-bold mb-10">
          {/* Orders */}
          {url === "/dashboard/professional/gear-purchases" ? "Nákupy z bazáru" : "Objednávky"}
        </h1>
      </div>
      {/* <UserOrdersOverview /> */}

      <div className="mt-10">
        <ReusableTabs
          activeTab={activeTab}
          align="left"
          tabs={[
            {
              /* label: "Current Order", */
              label: "Aktuálna objednávka",
              value: "currentOrder",
              content: (
                <UserCurrentGearOrder
                  myGearOrderData={myGearOrderData}
                  page={page}
                  limit={limit}
                  totalData={totalData}
                  activeTab={activeTab}
                />
              ),
            },
            {
              /* label: "To Confirm", */
              label: "Na potvrdenie",
              value: "toConfirm",
              content: (
                <UserConfirmGearOrder
                  myGearOrderData={myGearOrderData}
                  page={page}
                  limit={limit}
                  totalData={totalData}
                  activeTab={activeTab}
                />
              ),
            },
            {
              /* label: "Delivered", */
              label: "Doručené",
              value: "delivered",
              content: (
                <UserDeliveriedGearOrder
                  myGearOrderData={myGearOrderData}
                  page={page}
                  limit={limit}
                  totalData={totalData}
                  activeTab={activeTab}
                />
              ),
            },
            {
              /* label: "Cancelled", */
              label: "Zrušené",
              value: "cancelled",
              content: (
                <UserCancleGearOrder
                  myGearOrderData={myGearOrderData}
                  page={page}
                  limit={limit}
                  totalData={totalData}
                  activeTab={activeTab}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default UserGearOrderPage;
