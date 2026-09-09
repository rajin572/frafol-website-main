"use client";
import ReuseButton from '@/components/ui/Button/ReuseButton';
import { completePayment } from '@/services/PaymentService/PaymentServiceApi';
import tryCatchWrapper from '@/utils/tryCatchWrapper';
import React from 'react';
import { IPricingPlan } from './PricingCard';
import { ISubscription } from '@/app/(withDashboardLayout)/dashboard/professional/frafol-choice/page';
import { Checkbox, Form } from 'antd';
import Link from 'next/link';
import ReusableForm from '@/components/ui/Form/ReuseForm';

const PricingCardPaymentButton = ({ plan, pack }: { plan: IPricingPlan, pack: ISubscription }) => {

    const [form] = Form.useForm();

    const handlePayment = async (data: { period: number, price: number }) => {
        const value = {
            paymentType: "subscription",
            "amount": data.price,
            "days": data.period === 12 ? 365 : data.period * 30
        };

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


    const onSubmit = async () => {
        handlePayment({ period: plan.period, price: pack.price })
    }
    return (
        <div>
            <ReusableForm form={form} handleFinish={onSubmit}>
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
                <ReuseButton htmlType="submit" variant="secondary" className="cursor-pointer" > €{pack.price?.toFixed(2)}</ReuseButton>
            </ReusableForm>
        </div>
    );
};

export default PricingCardPaymentButton;