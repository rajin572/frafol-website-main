"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import ReusableForm from "../ui/Form/ReuseForm";
import { Checkbox, Form } from "antd";
import ReuseButton from "../ui/Button/ReuseButton";
import ReuseInput from "../ui/Form/ReuseInput";
import type { Rule } from "antd/es/form";
import { IGear, IProfile } from "@/types";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { useAppDispatch } from "@/redux/hooks";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { gearOrder } from "@/services/GearOrder/GearOrderApi";
import Link from "next/link";

const inputFields: {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  rules?: Rule[];
  inputType?: "normal" | "password" | "textarea";
  disabled?: boolean;
}[] = [
    {
      name: "name",
      label: "Name",
      placeholder: "Placeholder",
      required: true,
      rules: [{ required: true, message: "Name is required" }] as Rule[],
    },
    {
      name: "shippingAddress",
      label: "Shipping Address",
      placeholder: "Placeholder",
      required: true,
      rules: [
        { required: true, message: "Shipping Address is required" },
      ] as Rule[],
    },
    {
      name: "postCode",
      label: "Zip Code",
      placeholder: "Placeholder",
      required: true,
      rules: [{ required: true, message: "Zip Code is required" }] as Rule[],
    },
    {
      name: "town",
      label: "Town",
      placeholder: "Placeholder",
      required: true,
      rules: [{ required: true, message: "Town is required" }] as Rule[],
    },
    {
      name: "mobileNumber",
      label: "Phone Number",
      placeholder: "Placeholder",
      required: true,
      rules: [{ required: true, message: "Phone Number is required" }] as Rule[],
    },
    {
      name: "email",
      label: "Email address",
      placeholder: "Placeholder",
      required: true,
      rules: [
        { required: true, message: "Email is required" },
        { type: "email", message: "Enter a valid email" },
      ] as Rule[],
      disabled: true,
    },
  ];
const otherFields: {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  rules?: Rule[];
  inputType?: "normal" | "password" | "textarea";
}[] = [
    {
      name: "companyName",
      label: "Company Name",
      placeholder: "Enter Company Name",
      required: true,
      rules: [{ required: true, message: "Company Name is required" }] as Rule[],
    },
    {
      name: "ico",
      label: "IČO",
      placeholder: "Placeholder",
      rules: [{ required: true, message: "IČO is required" }],
    },
    {
      name: "dic",
      label: "DIČ",
      placeholder: "Placeholder",
      rules: [{ required: true, message: "DIČ is required" }],
    },
    {
      name: "ic_dph",
      label: "IČ DHP (Optional)",
      placeholder: "Placeholder",
    },
    {
      name: "companyAddress",
      label: "Company Address",
      placeholder: "Placeholder",
      rules: [{ required: true, message: "Company Address is required" }],
    },
  ];

const CartDeliveryOption = ({
  cartProducts,
  myData,
}: {
  cartProducts: any;
  myData: IProfile;
}) => {
  console.log(myData)
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const loginAsCompany = Form.useWatch("loginAsCompany", form) || false;

  useEffect(() => {
    form.setFieldsValue({
      name: myData?.name || "",
      email: myData?.email || "",
      mobileNumber: myData?.phone || "",
      shippingAddress: myData?.address || "",
      postCode: myData?.zipCode || "",
      town: myData?.town || "",
      ico: myData?.ico || "",
      dic: myData?.dic || "",
      ic_dph: myData?.ic_dph || "",
      companyAddress: myData?.address || "",
      companyName: myData?.companyName || "",
      deliveryNote: "",
    });
  }, [myData, form]);

  const handleSubmit = async (value: any) => {
    const data = {
      gearMarketPlaceIds: cartProducts.map((product: IGear) => product._id),
      ...value,
      loginAsCompany,
    };
    const res = await tryCatchWrapper(
      gearOrder,
      { body: data },
      {
        toastLoadingMessage: "Please wait...",
        toastSuccessMessage: "Redirecting to Stripe to Complete Payment From Stripe",
        toastErrorMessage: "Something went wrong! Please try again.",
      }
    );
    if (res?.success) {
      window.location.replace(res?.data?.checkoutUrl); // Opens in a new tab
      form.resetFields();
      dispatch(clearCart());
    }
  };

  return (
    <ReusableForm handleFinish={handleSubmit} form={form}>
      <div className="">
        {inputFields.map((field) => (
          <ReuseInput
            key={field.name}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            rules={field.rules}
            inputType={field.inputType}
            disabled={field.disabled || false}
          />
        ))}
        <div className="mb-2">
          <Form.Item name="loginAsCompany" valuePropName="checked">
            <Checkbox className="text-base-color font-semibold">
              I am login as company
            </Checkbox>
          </Form.Item>
        </div>
        {loginAsCompany &&
          otherFields.map((field) => (
            <ReuseInput
              key={field.name}
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              rules={field.rules}
              inputType={field.inputType}
            />
          ))}
        <ReuseInput
          name={"deliveryNote"}
          label={"Delivery Note (Optional)"}
          placeholder={"Placeholder"}
          rules={[]}
          inputType={"textarea"}
        />
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
        {/* <Form.Item
          name="výslovneSúhlasím"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                    new Error("Should accept with this conditions")
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
                    new Error("Should accept with this conditions")
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
        </Form.Item> */}
        <div className="flex justify-end">
          <ReuseButton
            htmlType="submit"
            variant="secondary"
            className="w-full md:w-auto !text-base !py-5 !px-5"
          >
            Continue to Payment
          </ReuseButton>
        </div>
      </div>
    </ReusableForm>
  );
};

export default CartDeliveryOption;
