import Link from "next/link";
import { IActionRequired } from "./Overview";

const ActionRequired = ({ actionData }: { actionData: IActionRequired }) => {
  // convert object to array so UI can map easily
  const list = [
    {
      /* title: "Payment Pending", */
      title: "Čaká sa na platbu",
      /* message: `${actionData?.totalPaymentPending} order(s) need payment.`, */
      message: `${actionData?.totalPaymentPending} objednávka(y) čaká na platbu.`,
      count: actionData?.totalPaymentPending,
      link: "/dashboard/my-account/orders?tab=accepted",
    },
    {
      /* title: "Delivery Confirmation", */
      title: "Potvrdenie doručenia",
      /* message: `${actionData?.totalDeliveryConfirmation} order(s) waiting for delivery confirmation.`, */
      message: `${actionData?.totalDeliveryConfirmation} objednávka(y) čaká na potvrdenie doručenia.`,
      count: actionData?.totalDeliveryConfirmation,
      link: "/dashboard/my-account/orders?tab=toConfirm",
    },
    {
      /* title: "Cancel Request", */
      title: "Žiadosť o zrušenie",
      /* message: `${actionData?.totalCancelRequestConfirmation} order(s) need cancel approval.`, */
      message: `${actionData?.totalCancelRequestConfirmation} objednávka(y) čaká na schválenie zrušenia.`,
      count: actionData?.totalCancelRequestConfirmation,
      link: "/dashboard/my-account/orders?tab=cancelRequest",
    },
  ]; // only show items that need action

  return (
    <div
      className="w-full max-h-[300px] xl:max-h-[600px] overflow-y-auto rounded-xl relative border border-[#E1E1E1] bg-primary-color"
      style={{ boxShadow: "0px 0px 5px 1px #0000000D" }}
    >
      <div className="flex justify-between items-center sticky top-0 px-5 pt-5 bg-white z-10">
        {/* <h1 className="text-xl font-semibold">Action Required</h1> */}
        <h1 className="text-xl font-semibold">Vyžaduje sa akcia</h1>
      </div>

      <div className="flex flex-col gap-5 p-5 bg-primary-color !h-full">
        {list?.length === 0 && (
          <p className="text-center text-gray-500 py-5">
            {/* No actions required right now 🎉 */}
            Momentálne nie sú potrebné žiadne akcie 🎉
          </p>
        )}

        {list?.map((activity, i) => (
          <Link
            key={i}
            href={activity?.link}
          >
            <div
              className="p-3 flex items-center gap-2 bg-warning/10 border-l-6 border-warning"
            >
              <div>
                <p className="text-[#242424] text-base font-medium">
                  {activity.title}
                </p>
                <p className="text-sm text-[#8A8D8E] mt-1">{activity.message}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ActionRequired;
