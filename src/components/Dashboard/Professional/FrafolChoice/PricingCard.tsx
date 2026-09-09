// components/PricingCard.tsx
"use client";
import { cn } from "@/lib/utils";
import { StaticImageData } from "next/image";
import PricingCardPaymentButton from "./PricingCardPaymentButton";
import { ISubscription, ISubscriptionData } from "@/app/(withDashboardLayout)/dashboard/professional/frafol-choice/page";
import ReuseButton from "@/components/ui/Button/ReuseButton";
import { formatDate } from "@/utils/dateFormet";
import { IProfile } from "@/types";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import InvoiceFrafolChoiceFromClientSide from "@/utils/InvoiceFrafolChoiceFromClientSide";

export interface IPricingPlan {
    id: number;
    name: string;
    price: number;
    period: number;
    popular?: boolean;
    badge?: string;
    icon: StaticImageData | string;
    description: string
}

interface PricingCardProps {
    plan: IPricingPlan;
    subscriptionData: ISubscriptionData;
    pack: ISubscription;
    myData: IProfile;
}
export default function PricingCard({
    plan, subscriptionData, pack, myData
}: PricingCardProps) {
    const {
        period,
        badge,
    } = plan;

    const isSubscribed = subscriptionData?.hasActiveSubscription && subscriptionData?.subscriptionDays === plan?.id;

    const handleDownloadInvoice = () => {
        const toastId = toast.loading("Generating invoice...", { duration: 5000 });
        pdf(
            <InvoiceFrafolChoiceFromClientSide
                myData={myData}
                subscriptionData={subscriptionData}
                pack={pack}
            />
        )
            .toBlob()
            .then((blob: Blob) => {
                saveAs(blob, `frafol-choice-invoice-${pack._id.slice(-8)}.pdf`);
                toast.success("Invoice downloaded!", { id: toastId });
            })
            .catch(() => {
                toast.error("Download failed. Please try again.", { id: toastId });
            });
    };

    return (
        <div
            className={cn(
                "max-w-[400px]  relative flex flex-col rounded-2xl border border-[#0000001A]  bg-white transition-all duration-300 p-5 shadow hover:shadow-lg hover:-translate-y-1 hover:scale-101 hover:border-[#0000001A]",
            )}
        >

            {/* Icon + Plan Name */}
            <div className="">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl text-base-color font-bold">
                        {period} month
                    </h3>
                    {badge && (
                        <ReuseButton variant="secondary" className="cursor-pointer bg-warning! border-warning! py-2! !w-fit px-4! text-base! text-secondary-color! font-bold! rounded-full! shadow" disabled>{badge}</ReuseButton>
                    )}
                </div>
                <div className="mt-2 h-1 w-full border-b border-dashed border-[#D4DBEA]"></div>


                <div className="mt-2 flex items-baseline">
                    <p className="text-3xl sm:text-4xl lg:text-5xl text-[#2C2C2C] font-black ">
                        {pack?.price?.toFixed(2)}€
                    </p>
                </div>

            </div>


            {/* Features List */}
            {/* <ReuseButton variant="secondary" className="cursor-pointer bg-warning! border-warning! py-2! !w-fit px-4! text-base! text-secondary-color! font-bold! shadow" disabled>Included</ReuseButton> */}
            {/* <ul className="mt-8 flex-1 space-y-4 p-2 border border-[#E1E1E1] shadow-inner mb-3 rounded-lg">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">

                        <FaRegCircleCheck className="size-4 mt-1.5 shrink-0 text-secondary-color" />

                        <span
                            className={cn(
                                "text-base leading-relaxed",
                                feature.included ? "text-[#364153]" : "text-[#99A1AF]"
                            )}
                        >
                            {feature.text}
                        </span>
                    </li>
                ))}
            </ul> */}


            <p className="text-lg text-[#99A1AF] my-5">{plan?.description}</p>
            {/* Subscription Status */}
            {isSubscribed && (
                <div className="px-4 py-2.5 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-center text-sm">
                        <span className="font-semibold text-green-700">Active until: </span>
                        <span className="text-green-600">{formatDate(subscriptionData?.subscriptionExpiryDate)}</span>
                    </p>
                </div>
            )}
            <div className="mt-3 flex flex-col gap-2">
                {!isSubscribed && <PricingCardPaymentButton plan={plan} pack={pack} />}
                {isSubscribed && (
                    <ReuseButton variant="outline" onClick={handleDownloadInvoice}>
                        {/* Download Invoice */}
                        Stiahnuť faktúru
                    </ReuseButton>
                )}
            </div>
        </div>
    );
}
