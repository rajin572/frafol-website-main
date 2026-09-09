/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, Form, Modal } from "antd";
import ReuseButton from "../../Button/ReuseButton";
import Link from "next/link";
import ReusableForm from "../../Form/ReuseForm";
import { toast } from "sonner";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { createWorkshopOrder } from "@/services/WorkshopOrderService/WorkshopOrderServiceApi";
import { useRouter } from "next/navigation";
import { getServerUrl } from "@/helpers/config/envConfig";
import Image from "next/image";
import { IoCalendarOutline } from "react-icons/io5";
import { LuClock, LuUsers } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import { AllImages } from "../../../../../public/assets/AllImages";
import { formatDate, formetTime } from "@/utils/dateFormet";
import ApplyCouponOption from "@/components/shared/ApplyCouponOption";
import { useEffect, useState } from "react";
import { useGetUserData } from "@/context/useGetUserData";
import ReuseInput from "../../Form/ReuseInput";
import { companyInputStructure, userInputStructure } from "../Professional/ProfessionalBookingModal";
import { IProfile } from "@/types";

interface RegisterWrokshopModalProps<T> {
    isModalVisible: boolean;
    handleCancel: () => void;
    currentRecord: T | null;
    description?: string;
    myData?: IProfile;
}

const RegisterWrokshopModal: React.FC<RegisterWrokshopModalProps<any>> = ({
    isModalVisible,
    handleCancel,
    currentRecord,
    myData,
}) => {
    const [form] = Form.useForm();
    const [couponStatus, setCouponStatus] = useState<any>(null);
    const [type, setType] = useState<"user" | "company">("user");

    const acceptTerms = Form.useWatch("acceptTerms", form);
    const výslovneSúhlasím = Form.useWatch("výslovneSúhlasím", form);
    const bolSom = Form.useWatch("bolSom", form);

    const router = useRouter();
    const serverUrl = getServerUrl();
    const userData = useGetUserData();


    useEffect(() => {
        form.setFieldsValue({
            name: myData?.name,
            email: myData?.email,
            sureName: myData?.sureName,
            companyName: myData?.companyName,
            streetAddress: myData?.address,
            town: myData?.town,
            country: myData?.country,
            zipCode: myData?.zipCode,
            ico: myData?.ico,
            dic: myData?.dic,
            ic_dph: myData?.ic_dph,
        });
    }, [form, myData, isModalVisible]);

    const handleRegister = async (values: any) => {
        if (userData?.userId) {
            const data = {
                paymentType: "workshop",
                workshopId: currentRecord?._id,
                ...(couponStatus && { couponCode: couponStatus?.data?.code }),

                isRegisterAsCompany: type === "company" ? true : false,

                name: values.name,
                streetAddress: values.streetAddress,
                town: values.town,
                zipCode: values.zipCode,
                country: values.country,
                companyName: values.companyName,
                ICO: values.ICO,
                DIC: values.DIC,
                IC_DPH: values.IC_DPH || "",
            };

            if (!acceptTerms || !výslovneSúhlasím || !bolSom) {
                toast.error("Please accept all terms and conditions");
                return;
            }

            const res = await tryCatchWrapper(
                createWorkshopOrder,
                { body: data },
                {
                    toastLoadingMessage: "Registering for workshop...",
                    toastSuccessMessage: "Redirecting to Stripe to Complete Payment From Stripe",
                    toastErrorMessage: "Something went wrong! Please try again.",
                }
            );
            console.log(res)
            if (res?.success) {
                window.location.replace(res?.data?.checkoutUrl);
            }
        } else {
            router.push("/sign-in");
        }
    };

    return (
        <Modal
            // title="Confirm Delete"
            open={isModalVisible}
            onCancel={() => {
                handleCancel();
                form.resetFields();
            }}
            okText="Unblock"
            cancelText="Cancel"
            centered
            footer={
                null
            }
            className="max-w-[1000px] lg:min-w-[800px]"
        // styles.body={{ textAlign: "center" }}
        >
            <div className="p-1.5 rounded-xl border border-background-color flex flex-col justify-between mt-5">
                <div>
                    <Image
                        width={1000}
                        height={1000}
                        src={currentRecord?.image ? serverUrl + currentRecord?.image : AllImages?.dummyCover}
                        alt="workspace"
                        className="w-full h-80 sm:h-60 lg:h-72 xl:h-80 object-cover rounded-lg "
                    />
                    <div className="px-1 flex flex-col justify-between">
                        <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold mt-3">
                            {currentRecord?.title}
                        </p>
                        <p className="text-sm sm:text-sm lg:text-base mt-1">
                            {currentRecord?.description}
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                            <Image
                                width={1000}
                                height={1000}
                                src={
                                    currentRecord?.authorId?.profileImage
                                        ? serverUrl + currentRecord?.authorId?.profileImage
                                        : AllImages?.dummyProfile
                                }
                                alt={currentRecord?.authorId?.name || "Profile Image"}
                                className="w-8 h-8 object-cover rounded-full "
                            />
                            {
                                currentRecord?.authorId?.role === "photographer" || currentRecord?.authorId?.role === "both" || currentRecord?.authorId?.role === "videographer" ? (
                                    <Link href={`/professionals/${currentRecord?.authorId?._id}`} className="!text-secondary-color text-sm sm:text-sm lg:text-base font-bold cursor-pointer">

                                        <p className="text-sm sm:text-sm lg:text-base font-bold">
                                            {currentRecord?.authorId?.name}
                                        </p>
                                    </Link>
                                ) : <p className="text-sm sm:text-sm lg:text-base font-bold">
                                    {currentRecord?.authorId?.name}
                                </p>
                            }
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <IoCalendarOutline className="text-secondary-color text-sm sm:text-base lg:text-lg" />
                            <p className="text-sm sm:text-sm lg:text-base font-semibold">
                                {formatDate(currentRecord?.date)}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <LuClock className="text-secondary-color text-sm sm:text-base lg:text-lg" />
                            <p className="text-sm sm:text-sm lg:text-base font-semibold">
                                {formetTime(currentRecord?.time)}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <FaLocationDot className="text-secondary-color text-sm sm:text-base lg:text-lg" />
                            <p className="text-sm sm:text-sm lg:text-base font-semibold capitalize">
                                {currentRecord?.locationType}
                            </p>
                        </div>
                        {currentRecord?.locationType !== "online" && (
                            <div className="flex items-center gap-2 mt-1">
                                <FaLocationDot className="text-secondary-color text-sm sm:text-base lg:text-lg" />
                                <p className="text-sm sm:text-sm lg:text-base font-semibold">
                                    {currentRecord?.location}
                                </p>
                            </div>
                        )}

                        <div className="flex items-center gap-2 mt-1">
                            <LuUsers className="text-secondary-color text-sm sm:text-base lg:text-lg" />
                            <p className="text-sm sm:text-sm lg:text-base font-semibold">
                                {currentRecord?.maxParticipant} participants
                            </p>
                        </div>
                    </div>
                </div>
                <ReusableForm
                    form={form}
                    handleFinish={handleRegister}
                    className="!mt-5"
                >
                    <div className="my-5">
                        <Checkbox
                            className="!text-lg !font-semibold"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setType("company");
                                } else {
                                    setType("user");
                                }
                            }}
                        >
                            Register as a company
                        </Checkbox>
                    </div>
                    {type !== "company"
                        ? userInputStructure?.map((input) => (
                            <ReuseInput
                                // Key includes `type` so toggling user/company remounts
                                // fresh inputs; reused nodes keep stale labels when the
                                // page is machine-translated (Google Translate).
                                key={`${type}-${input.name}`}
                                name={input.name}
                                Typolevel={5}
                                inputType={input.inputType}
                                type={input.type}
                                label={input.label}
                                placeholder={input.placeholder}
                                labelClassName={input.labelClassName}
                                inputClassName="!py-2.5"
                                rules={input.rules}
                                disabled={input.disabled}
                            />
                        ))
                        : companyInputStructure?.map((input) => (
                            <ReuseInput
                                key={`${type}-${input.name}`}
                                name={input.name}
                                Typolevel={5}
                                inputType={input.inputType}
                                type={input.type}
                                label={input.label}
                                placeholder={input.placeholder}
                                labelClassName={input.labelClassName}
                                inputClassName="!py-2.5"
                                rules={input.rules}
                                disabled={input.disabled}
                            />
                        ))}
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
                                    Agree to <Link href="/terms-of-service" target="_blank" className="text-secondary-color! underline">
                                        Terms of Service Conceptural
                                    </Link>{" "}
                                    and{" "}
                                    <Link href="/terms-of-service-marketplace" target="_blank" className="text-secondary-color! underline">
                                        Všeobecné obchodné podmienky Online trh.
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
                    <ApplyCouponOption successStatus={couponStatus} setSuccessStatus={setCouponStatus} />
                    <div className="flex items-end gap-2 pt-5 justify-between">
                        <div className={`${couponStatus && "w-40 text-end"}`}>
                            <p className="text-base sm:text-lg lg:text-xl font-semibold">
                                {currentRecord?.mainPrice?.toFixed(2)}€
                            </p>
                            {
                                couponStatus &&
                                <>
                                    <p className="text-base sm:text-lg lg:text-xl font-semibold text-red-500">
                                        -{couponStatus?.data?.amount?.toFixed(2)}€
                                    </p>
                                    <hr className="" />
                                    <p className="text-base sm:text-lg lg:text-xl font-semibold">
                                        {(currentRecord?.mainPrice - couponStatus?.data?.amount)?.toFixed(2)}€
                                    </p>
                                </>
                            }

                        </div>
                        {userData?.userId !== currentRecord?.authorId?._id && (
                            <ReuseButton
                                variant="secondary"
                                className="!text-sm sm:!text-sm lg:!text-base w-fit !px-2 !py-1"
                                htmlType="submit"
                            >
                                Register Now
                            </ReuseButton>
                        )}
                    </div>
                </ReusableForm>
            </div>
        </Modal >
    );
};

export default RegisterWrokshopModal;
