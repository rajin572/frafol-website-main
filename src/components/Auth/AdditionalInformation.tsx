"use client";
import React from "react";
import ReusableForm from "../ui/Form/ReuseForm";
import ReuseInput from "../ui/Form/ReuseInput";
import { useRouter } from "next/navigation";
import { Form } from "antd";
import ReuseButton from "../ui/Button/ReuseButton";
import Cookies from "js-cookie";

const inputStructure = [
  {
    name: "about",
    type: "text",
    inputType: "textarea",
    // label: "About Yourself/Bio"
    label: "O sebe",
    // placeholder: "Write a short bio about yourself and your work"
    placeholder: "Napíšte krátke bio o sebe a svojej práci",
    labelClassName: "!font-semibold !text-secondary-color",
    // rules: [{ required: true, type: "string", min: 100, max: 2000 }]
    /* rules: [{ required: true, type: "string", min: 100, max: 2000, message: "Popis je povinný" }], */
    rules: [{ required: true, type: "string", min: 100, max: 2000, message: "Opis musí obsahovať minimálne 100 a maximálne 2000 znakov" }],
  },
  {
    name: "minHourlyRate",
    type: "number",
    inputType: "number",
    // label: "Min Rate"
    label: "Minimálna sadzba",
    // placeholder: "Enter Min Rate"
    placeholder: "Zadajte minimálnu sadzbu",
    labelClassName: "!font-semibold !text-secondary-color",
    // rules: [{ required: true, message: "Min Rate is required" }]
    rules: [{ required: true, message: "Minimálna sadzba je povinná" }],
  },
  {
    name: "maxHourlyRate",
    type: "number",
    inputType: "number",
    // label: "Max Rate"
    label: "Maximálna sadzba",
    // placeholder: "Enter Max Rate"
    placeholder: "Zadajte maximálnu sadzbu",
    labelClassName: "!font-semibold !text-secondary-color",
    // rules: [{ required: true, message: "Max Rate is required" }]
    rules: [{ required: true, message: "Maximálna sadzba je povinná" }],
  },
];

const AdditionalInformation = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const storedInformation = Cookies.get("information");

  const parseData = JSON.parse(storedInformation || "{}");

  if (storedInformation) {
    form.setFieldsValue({
      about: parseData.about,
      minHourlyRate: parseData.minHourlyRate,
      maxHourlyRate: parseData.maxHourlyRate,
    });
  }

  const onFinish = (values: {
    about: string;
    minHourlyRate: number;
    maxHourlyRate: number;
  }) => {
    const data = {
      ...parseData,
      about: values.about,
      minHourlyRate: Number(values.minHourlyRate),
      maxHourlyRate: Number(values.maxHourlyRate),
    };
    Cookies.set("information", JSON.stringify(data), {
      expires: 1,
    });
    form.resetFields();
    router.push("/sign-up/professional/legal-invoice");
  };
  return (
    <div className=" flex flex-col justify-center gap-3 h-full w-full sm:w-3/4 mx-auto">
      <div className="mb-3">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-secondary-color mb-5">
          {/* Additional Information */}
          Ďalšie informácie
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-base-color">
          {/* Provide more details about your services */}
          Uveďte ďalšie informácie o svojich službách
        </p>
      </div>
      <ReusableForm handleFinish={onFinish} form={form}>
        {inputStructure.map((input, index) => (
          <ReuseInput
            key={index}
            name={input.name}
            Typolevel={5}
            inputType={input.inputType}
            type={input.type}
            label={input.label}
            placeholder={input.placeholder}
            labelClassName={input.labelClassName}
            inputClassName="!py-2.5"
            rules={input.rules}
          />
        ))}
        <div className="flex justify-end items-end w-full mt-5">
          <ReuseButton
            htmlType="submit"
            variant="secondary"
            className="!w-fit  sm:!text-sm lg:!text-sm !px-5 !py-2.5"
          >
            {/* Continue */}
            Pokračovať
          </ReuseButton>
        </div>
      </ReusableForm>
    </div>
  );
};

export default AdditionalInformation;
