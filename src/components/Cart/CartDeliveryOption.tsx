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
      label: "Meno a priezvisko",
      placeholder: "Zadajte meno a priezvisko",
      required: true,
      rules: [{ required: true, message: "Meno a priezvisko je povinné" }] as Rule[],
    },
    {
      name: "shippingAddress",
      label: "Doručovacia adresa",
      placeholder: "Zadajte doručovaciu adresu",
      required: true,
      rules: [
        { required: true, message: "Doručovacia adresa je povinná" },
      ] as Rule[],
    },
    {
      name: "postCode",
      label: "PSČ",
      placeholder: "Zadajte PSČ",
      required: true,
      rules: [{ required: true, message: "PSČ je povinné" }] as Rule[],
    },
    {
      name: "town",
      label: "Mesto",
      placeholder: "Zadajte mesto",
      required: true,
      rules: [{ required: true, message: "Mesto je povinné" }] as Rule[],
    },
    {
      name: "mobileNumber",
      label: "Telefónne číslo",
      placeholder: "Zadajte telefónne číslo",
      required: true,
      rules: [{ required: true, message: "Telefónne číslo je povinné" }] as Rule[],
    },
    {
      name: "email",
      label: "E-mailová adresa",
      placeholder: "Zadajte e-mail",
      required: true,
      rules: [
        { required: true, message: "E-mail je povinný" },
        { type: "email", message: "Zadajte platný e-mail" },
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
      label: "Názov firmy",
      placeholder: "Zadajte názov firmy",
      required: true,
      rules: [{ required: true, message: "Názov firmy je povinný" }] as Rule[],
    },
    {
      name: "ico",
      label: "IČO",
      placeholder: "Zadajte IČO",
      rules: [{ required: true, message: "IČO je povinné" }],
    },
    {
      name: "dic",
      label: "DIČ",
      placeholder: "Zadajte DIČ",
      rules: [{ required: true, message: "DIČ je povinné" }],
    },
    {
      name: "ic_dph",
      label: "IČ DPH (Nepovinné)",
      placeholder: "Zadajte IČ DPH",
    },
    {
      name: "companyAddress",
      label: "Adresa firmy",
      placeholder: "Zadajte adresu firmy",
      rules: [{ required: true, message: "Adresa firmy je povinná" }],
    },
    {
      name: "companyPostCode",
      label: "PSČ firmy",
      placeholder: "Zadajte PSČ firmy",
      rules: [{ required: true, message: "PSČ firmy je povinné" }],
    },
    {
      name: "companyTown",
      label: "Mesto firmy",
      placeholder: "Zadajte mesto firmy",
      rules: [{ required: true, message: "Mesto firmy je povinné" }],
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
      companyPostCode: myData?.zipCode || "",
      companyTown: myData?.town || "",
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
        toastLoadingMessage: "Prosím, počkajte...",
        toastSuccessMessage: "Presmerovávame Vás na platobnú bránu Stripe na dokončenie platby...",
        toastErrorMessage: "Niečo sa pokazilo! Skúste to prosím znova.",
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
              Nakupujem ako firma
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
          label={"Poznámka k doručeniu (nepovinné)"}
          placeholder={"Zadajte poznámku k doručeniu"}
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
                Súhlasím s našimi <Link href="/terms-of-service" target="_blank" className="text-secondary-color! underline">
                  Všeobecné obchodné podmienky Zmluvné vzťahy
                </Link>{" "}
                a{" "}
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
            Objednať s povinnosťou platby
          </ReuseButton>
        </div>
      </div>
    </ReusableForm>
  );
};

export default CartDeliveryOption;
