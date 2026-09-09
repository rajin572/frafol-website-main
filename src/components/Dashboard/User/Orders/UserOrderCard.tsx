/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerUrl } from "@/helpers/config/envConfig";
import { IEventOrder } from "@/types";
import { budgetLabels } from "@/utils/budgetLabels";
import { formatDate, formetTime } from "@/utils/dateFormet";
import Image from "next/image";
import { BsEye } from "react-icons/bs";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import {
  IoCalendarOutline,
  IoCheckmarkSharp,
  IoClose,
  IoTimeOutline,
} from "react-icons/io5";
import { AllImages } from "../../../../../public/assets/AllImages";
import { FaEuroSign } from "react-icons/fa6";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { completePayment } from "@/services/PaymentService/PaymentServiceApi";
import ReusableForm from "@/components/ui/Form/ReuseForm";
import { Checkbox, Form } from "antd";
import Link from "next/link";
import { toast } from "sonner";
import ApplyCouponOption from "@/components/shared/ApplyCouponOption";
import { useState } from "react";
import { useGetUserData } from "@/context/useGetUserData";
import { TbBubbleText } from "react-icons/tb";

const UserOrderCard = ({
  activeTab,
  data,
  openModal,
  showConfirmModal,
  showRejectExtensionModal,
  showAcceptExtensionModal,
  showAcceptModal,
  showDeclineModal,
}: {
  activeTab: string;
  data: IEventOrder;
  openModal?: any;
  showConfirmModal?: any;
  showRejectExtensionModal?: any;
  showAcceptExtensionModal?: any;
  showAcceptModal?: any;
  showDeclineModal?: any;
}) => {
  const [form] = Form.useForm();
  const acceptTerms = Form.useWatch("acceptTerms", form);
  const výslovneSúhlasím = Form.useWatch("výslovneSúhlasím", form);
  const bolSom = Form.useWatch("bolSom", form);
  const user = useGetUserData();
  const serverUrl = getServerUrl();

  const [couponStatus, setCouponStatus] = useState<any>(null);

  const handlePayment = async (data: IEventOrder) => {
    console.log(couponStatus)
    const value = {
      paymentType: "event", //"event" || "gear" || "workshop"
      eventOrderId: data?._id, // "eventOrderId" || "gearOrderId" || "workshopId"
      ...(couponStatus && { couponCode: couponStatus?.data?.code }),
    };

    if (!acceptTerms || !výslovneSúhlasím || !bolSom) {
      toast.error("Please accept all terms and conditions");
      return;
    }

    const res = await tryCatchWrapper(
      completePayment,
      { body: value },
      {
        toastLoadingMessage: "Please wait...",
        toastSuccessMessage: "Redirecting to Stripe to Complete Payment From Stripe",
        toastErrorMessage: "Something went wrong! Please try again.",
      }
    );

    if (res?.success) {
      window.location.replace(res?.data?.checkoutUrl); // Opens in a new tab
    }
  };

  const extensionLength = data?.extensionRequests?.length;
  console.log(data)
  return (
    <div
      className={`p-4 rounded-md border border-[#E1E1E1] shadow-xs hover:shadow-md transition-all duration-200`}
    >
      <div>
        <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm mb-5 md:mb-0">
          <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-secondary-color mb-1">
            {data?.packageId?.title || data?.title}
          </h3>{" "}
          <div className="flex items-center gap-2">
            <p className="px-2 py-0.5 rounded-full bg-secondary-color text-primary-color w-fit capitalize">
              {/* {data?.orderType} */}
              <span className="capitalize">{data?.orderType}</span>
            </p>
            {activeTab !== "extension" && (
              <p className="px-2 py-0.5 rounded-full bg-yellow-500 text-primary-color w-fit capitalize">
                {/* {data?.status === "accepted"
                  ? "Payment Required"
                  : data?.status === "inProgress"
                    ? "In Progress"
                    : data?.status === "deliveryRequestDeclined"
                      ? "In Progress"
                      : data?.status === "cancelRequest"
                        ? "Cancel Requested"
                        : data?.status} */}
                {data?.status === "accepted"
                  ? "Vyžaduje sa platba"
                  : data?.status === "inProgress"
                    ? "Prebieha"
                    : data?.status === "deliveryRequestDeclined"
                      ? "Prebieha"
                      : data?.status === "cancelRequest"
                        ? "Žiadosť o zrušenie odoslaná"
                        : data?.status}
              </p>
            )}
            {
              (data?.status !== "deliveryRequest" && data?.extensionRequests?.[extensionLength - 1]?.status === "pending") && (
                <p className="px-2 py-0.5 rounded-full bg-blue-500 text-primary-color w-fit capitalize">
                  {/* Extension Requested */}
                  Žiadosť o predĺženie odoslaná
                </p>
              )
            }
          </div>
        </div>
        <h4 className="text-sm sm:text-sm lg:text-base xl:text-lg font-bold mb-1 capitalize">
          {/* {data?.serviceType === "both" ? "Photography & Videography" : data?.serviceType} */}
          {data?.serviceType === "both" ? "Fotografia a Video" : data?.serviceType}
        </h4>
        <Link href={`/professionals/${data?.serviceProviderId?._id}`} className="w-fit! inline-block  my-3">
          <div className="text-sm sm:text-base lg:text-lg text-gray-700 flex items-center gap-1">
            <Image
              src={
                data?.serviceProviderId?.profileImage
                  ? serverUrl + data?.serviceProviderId?.profileImage
                  : AllImages.dummyProfile
              }
              width={1000}
              height={1000}
              className="w-6 h-6 rounded-full object-cover border border-secondary-color"
              alt="user"
            />
            <p className="font-medium text-secondary-color">{data?.serviceProviderId?.companyName || data?.serviceProviderId?.name}</p>
          </div>
        </Link>

        <div className="flex items-center gap-5">
          <div className="text-sm sm:text-sm text-[#5D5D5D] flex items-center gap-1 mt-1">
            <IoCalendarOutline />
            <span>{formatDate(data?.date)}</span>
          </div>
          <div className="text-sm sm:text-sm text-[#5D5D5D] flex items-center gap-1 mt-1">
            <IoTimeOutline />
            <span>{formetTime(data?.time)}</span>
          </div>
        </div>
        <div className="text-sm sm:text-sm text-[#5D5D5D] flex items-start gap-2 my-1">
          <div className="flex items-center text-nowrap  gap-1">
            <FaMapMarkerAlt /> {/* <span>Location : </span> */}
            <span>Lokalita: </span>
          </div>
          {data?.location}
        </div>
        {activeTab === "extension" && (
          <div className="my-5">
            {" "}
            <div className="text-sm sm:text-sm lg:text-base font-bold text-secondary-color flex items-start gap-2 my-1">
              <p className="flex items-center text-nowrap gap-1">
                <FaClock /> {/* <span>Delivery Date : </span> */}
                <span>Dátum doručenia: </span>
              </p>
              {formatDate(data?.deliveryDate)}
            </div>
            <div className="text-sm sm:text-sm lg:text-base font-bold text-green-800 flex items-start gap-2 my-1">
              <p className="flex items-center text-nowrap gap-1">
                <FaClock /> {/* <span>Extended Date : </span> */}
                <span>Predĺžený termín: </span>
              </p>
              {formatDate(
                data?.extensionRequests?.[extensionLength - 1]?.newDeliveryDate
              )}
            </div>
            <div className=" mt-5 bg-secondary-color/10 p-2 rounded text-sm sm:text-sm lg:text-base gap-2 my-1">
              <p className="flex items-center text-nowrap gap-1 font-bold">
                <TbBubbleText /> {/* <span>Extension Reason : </span> */}
                <span>Dôvod predĺženia: </span>
              </p>
              <p className="mt-1 px-4 text-base-color/80">

                {data?.extensionRequests?.find((req) => req.status === "pending")?.reason}

              </p>
            </div>
          </div>
        )}
        {activeTab === "cancelRequest" && (
          <div className="my-5">
            {" "}
            <p className="text-sm sm:text-base lg:text-lg font-semibold flex items-start gap-2 my-1">
              {/* <div className="flex items-center text-nowrap gap-1">Reason:</div> */}
              <div className="flex items-center text-nowrap gap-1">Dôvod:</div>
              {data?.cancelReason}
            </p>
            <div className="text-sm sm:text-base lg:text-lg font-semibold flex items-start gap-2 my-1">
              <div className="flex items-center text-nowrap gap-1">
                {/* Cancel By: */}
                Zrušil/a:
              </div>
              {data?.cancelRequestedBy === user?.userId
                ? "You"
                : data?.serviceProviderId?.name}
            </div>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-secondary-color mt-1">
              {data?.totalPrice ? (
                <div className={`${couponStatus && "w-40 text-end"}`}>
                  <p className="text-base sm:text-lg lg:text-xl font-semibold">
                    {data?.couponDiscount ? (data?.totalPrice - data?.couponDiscount)?.toFixed(2) : data?.totalPrice?.toFixed(2)}€
                  </p>
                  {
                    couponStatus &&
                    <>
                      <p className="text-base sm:text-lg lg:text-xl font-semibold text-red-500">
                        -{couponStatus?.data?.amount}€
                      </p>
                      <hr className="" />
                      <p className="text-base sm:text-lg lg:text-xl font-semibold">
                        {(data?.totalPrice as number - couponStatus?.data?.amount)?.toFixed(2)}€
                      </p>
                    </>
                  }

                </div>
              ) : (
                <span>
                  {budgetLabels[data?.budget_range as string] ||
                    data?.budget_range}
                </span>
              )}
            </div>

            {(activeTab === "accepted" || activeTab === "orderOffer") && (
              <ReusableForm
                form={form}
                handleFinish={() => { }}
                className="!mt-5"
              >
                <Form.Item
                  name="acceptTerms"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                            new Error(/* "Should accept with terms and conditions" */ "Zaškrtnite pole a potvrďte, že ste sa oboznámili s obchodnými podmienkami.")
                          ),
                    },
                  ]}
                >
                  <Checkbox
                  // onChange={(e) => handleCheckboxChange(e, "acceptTerms")}
                  >
                    <div>
                      <p className="text-sm">
                        {/* Agree to */}
                        Súhlasím so <Link href="/terms-of-service" target="_blank" className="text-secondary-color underline">
                          všeobecnými obchodnými podmienkami Zmluvné vzťahy
                        </Link>
                        {/* and{" "} */}
                        a <Link href="/terms-of-service-marketplace" target="_blank" className="text-secondary-color underline">
                          všeobecnými obchodnými podmienkami Marketplace.
                        </Link>
                      </p>

                    </div>
                  </Checkbox>
                </Form.Item>
                <Form.Item
                  name="výslovneSúhlasím"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                            new Error(/* "Should accept with terms and conditions" */ "Zaškrtnite pole a potvrďte, že ste sa oboznámili s obchodnými podmienkami.")
                          ),
                    },
                  ]}
                >
                  <Checkbox
                  // onChange={(e) => handleCheckboxChange(e, "acceptTerms")}
                  >
                    <div>
                      <p className="text-sm">
                        Výslovne súhlasím so začatím poskytovania služby alebo so začatím dodávania digitálneho obsahu pred uplynutím lehoty na odstúpenie od zmluvy v súlade s § 17 ods. 10 písm. c zákona č. 108/2024 Z.z. o ochrane spotrebiteľa a o zmene a doplnení niektorých zákonov.
                      </p>

                    </div>
                  </Checkbox>
                </Form.Item>
                <Form.Item
                  name="bolSom"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                            new Error(/* "Should accept with terms and conditions" */ "Zaškrtnite pole a potvrďte, že ste sa oboznámili s obchodnými podmienkami.")
                          ),
                    },
                  ]}
                >
                  <Checkbox
                  // onChange={(e) => handleCheckboxChange(e, "acceptTerms")}
                  >
                    <div>
                      <p className="text-sm">
                        Bol som riadne poučený o tom, že udelením tohto súhlasu so začatím poskytovania služieb pred uplynutím lehoty na odstúpenie od zmluvy strácam po úplnom poskytnutí služby právo na odstúpenie od zmluvy (§ 17 ods. 10 písm. b) zákona č. 108/2024 Z.z. o ochrane spotrebiteľa a o zmene a doplnení niektorých zákonov.
                      </p>

                    </div>
                  </Checkbox>
                </Form.Item>
              </ReusableForm>
            )}
          </div>



        </div>
        {(activeTab === "accepted" || activeTab === "orderOffer") && (
          <ApplyCouponOption successStatus={couponStatus} setSuccessStatus={setCouponStatus} />
        )}
        <div className="w-fit ml-auto">
          <></>
          {activeTab === "toConfirm" ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => showConfirmModal(data)}
                className="flex items-center gap-1 px-3 py-1 border border-[#00C566] text-[#00C566] rounded bg-[#00C56633] text-sm transition cursor-pointer"
              >
                <IoCheckmarkSharp size={16} />
                {/* Complete */}
                Dokončiť
              </button>
              <button
                onClick={() => openModal(data)}
                className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm transition cursor-pointer"
              >
                <BsEye size={16} />
                {/* View Details */}
                Zobraziť detaily
              </button>
            </div>
          ) : activeTab === "orderOffer" ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePayment(data)}
                className="disabled:cursor-not-allowed flex items-center gap-1 px-3 py-1 border border-[#00C566] text-primary-color rounded bg-[#00C566] text-sm transition cursor-pointer"
              >
                <IoCheckmarkSharp size={16} />
                {/* Accept Order */}
                Prijať objednávku
              </button>
              <button
                onClick={() => openModal(data)}
                className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm transition cursor-pointer"
              >
                <BsEye size={16} />
                {/* View Details */}
                Zobraziť detaily
              </button>
            </div>
          ) : activeTab === "accepted" ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePayment(data)}
                className="disabled:cursor-not-allowed flex items-center gap-1 px-3 py-1 border border-[#00C566] text-primary-color rounded bg-[#00C566] text-sm transition cursor-pointer"
              >
                <FaEuroSign size={16} />
                {/* Pay */}
                Zaplatiť
              </button>
              <button
                onClick={() => openModal(data)}
                className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm transition cursor-pointer"
              >
                <BsEye size={16} />
                {/* View Details */}
                Zobraziť detaily
              </button>
            </div>
          ) : activeTab === "extension" ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => showAcceptExtensionModal(data)}
                className="flex items-center gap-1 px-3 py-1 border border-[#00C566] text-primary-color rounded bg-[#00C566] text-sm transition cursor-pointer"
              >
                <IoCheckmarkSharp size={16} />
                {/* Accept */}
                Prijať
              </button>
              <button
                onClick={() => showRejectExtensionModal(data)}
                className="flex items-center gap-1 px-3 py-1 border border-red-700 text-primary-color rounded bg-red-700 text-sm transition cursor-pointer"
              >
                <IoClose size={16} />
                {/* Reject */}
                Odmietnuť
              </button>
              <button
                onClick={() => openModal(data)}
                className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm transition cursor-pointer"
              >
                <BsEye size={16} />
                {/* View Details */}
                Zobraziť detaily
              </button>
            </div>
          ) : activeTab === "cancelRequest" ? (
            <div className="flex items-center gap-2">
              {data?.cancelRequestedBy !== user?.userId && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => showAcceptModal(data)}
                    className="flex items-center gap-1 px-3 py-1 border border-[#00C566] text-primary-color rounded bg-[#00C566] text-sm transition cursor-pointer"
                  >
                    <IoCheckmarkSharp size={16} />
                    {/* Accept */}
                    Prijať
                  </button>
                  <button
                    onClick={() => showDeclineModal(data)}
                    className="flex items-center gap-1 px-3 py-1 border border-red-700 text-primary-color rounded bg-red-700 text-sm transition cursor-pointer"
                  >
                    <IoClose size={16} />
                    {/* Reject */}
                    Odmietnuť
                  </button>
                </div>
              )}{" "}
              <button
                onClick={() => openModal(data)}
                className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm transition cursor-pointer"
              >
                <BsEye size={16} />
                {/* View Details */}
                Zobraziť detaily
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openModal(data)}
                className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm transition cursor-pointer"
              >
                <BsEye size={16} />
                {/* View Details */}
                Zobraziť detaily
              </button>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default UserOrderCard;
