"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import ReusableForm from "../ui/Form/ReuseForm";
import ReuseInput from "../ui/Form/ReuseInput";
import ReuseButton from "../ui/Button/ReuseButton";
import { Form, Typography } from "antd";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import ReuseDatePicker from "../ui/Form/ReuseDatePicker";
import dayjs from "dayjs";
import { ITown } from "@/app/(Auth)/sign-up/professional/legal-invoice/page";
import ReuseSelect from "../ui/Form/ReuseSelect";

const BusinessInputStructure = [
  {
    name: "companyName",
    type: "text",
    inputType: "normal",
    // label: "Company Name"
    label: "Obchodné meno",
    // placeholder: "Enter Company Name"
    placeholder: "Zadajte obchodné meno",
    labelClassName: "!font-semibold !text-secondary-color",
    // rules: [{ required: true, message: "Company Name is required" }]
    rules: [{ required: true, message: "Obchodné meno je povinné" }],
  },
  {
    name: "phone",
    type: "number",
    inputType: "normal",
    // label: "Phone Number"
    label: "Telefónne číslo",
    // placeholder: "Enter your phone number"
    placeholder: "Zadajte svoje telefónne číslo",
    labelClassName: "!font-semibold !text-secondary-color",
    // rules: [{ required: true, message: "Phone Number is required" }]
    rules: [{ required: true, message: "Telefónne číslo je povinné" }],
  },
  {
    name: "ico",
    type: "text",
    inputType: "normal",
    label: "IČO",
    // placeholder: "Enter IČO"
    placeholder: "Zadajte IČO",
    labelClassName: "!font-semibold !text-secondary-color",
    // rules: [{ required: true, message: "IČO is required" }]
    rules: [{ required: true, message: "IČO je povinné" }],
  },
  {
    name: "dic",
    type: "text",
    inputType: "normal",
    label: "DIČ",
    // placeholder: "Enter DIČ"
    placeholder: "Zadajte DIČ",
    labelClassName: "!font-semibold !text-secondary-color",
    // rules: [{ required: true, message: "DIČ is required" }]
    rules: [{ required: true, message: "DIČ je povinné" }],
  },
  {
    name: "ic_dph",
    type: "text",
    inputType: "normal",
    // label: "IČ DPH (Optional)"
    label: "IČ DPH (Nepovinné)",
    // placeholder: "Enter IČ DPH"
    placeholder: "Zadajte IČ DPH",
    labelClassName: "!font-semibold !text-secondary-color",
    rules: [{ required: false, message: "IČ DPH je povinné" }],
  },
];
const AddressInputStructure = [
  {
    name: "address",
    type: "text",
    inputType: "normal",
    // label: "Street Address"
    label: "Ulica a číslo",
    // placeholder: "Enter street address"
    placeholder: "Zadajte ulicu a číslo",
    labelClassName: "!font-semibold !text-secondary-color",
    // rules: [{ required: true, message: "Street Address is required" }]
    rules: [{ required: true, message: "Ulica a číslo sú povinné" }],
  },
  {
    name: "zipCode",
    type: "text",
    inputType: "normal",
    // label: "Zip Code"
    label: "PSČ",
    // placeholder: "Enter zip code"
    placeholder: "Zadajte PSČ",
    labelClassName: "!font-semibold !text-secondary-color",
    // rules: [{ required: true, message: "Zip Code is required" }]
    rules: [{ required: true, message: "PSČ je povinné" }],
  },
  {
    name: "country",
    type: "text",
    inputType: "normal",
    // label: "Country"
    label: "Krajina",
    // placeholder: "Enter Country"
    placeholder: "Zadajte krajinu",
    labelClassName: "!font-semibold !text-secondary-color",
    // rules: [{ required: true, message: "Country is required" }]
    rules: [{ required: true, message: "Krajina je povinná" }],
  },
];

const LegalInvoiceDetails = ({ townData }: { townData: ITown[] }) => {
  const router = useRouter();
  const [form] = Form.useForm();

  const storedInformation = Cookies.get("information");
  const parseData = JSON.parse(storedInformation || "{}");

  const allTownValues = townData?.map((t) => t.name) ?? [];
  const [selectedTravelTowns, setSelectedTravelTowns] = useState<string[]>(
    parseData.travelTowns ?? []
  );

  useEffect(() => {
    form.setFieldsValue({
      companyName: parseData.companyName,
      phone: parseData.phone,
      ico: parseData.ico || "",
      dic: parseData.dic,
      ic_dph: parseData.ic_dph,
      address: parseData.address,
      zipCode: parseData.zipCode,
      town: parseData.town,
      country: parseData.country,
      dateOfBirth: dayjs(parseData.dateOfBirth),
      travelTowns: parseData.travelTowns ?? [],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTravelTownsChange = (values: string[]) => {
    if (values.includes("__all__")) {
      setSelectedTravelTowns(allTownValues);
      form.setFieldValue("travelTowns", allTownValues);
    } else {
      setSelectedTravelTowns(values);
    }
  };

  const onFinish = (values: any) => {
    Cookies.set(
      "information",
      JSON.stringify({ ...parseData, ...values, travelTowns: selectedTravelTowns }),
      { expires: 1 }
    );
    form.resetFields();
    router.push("/sign-up/professional/review-details");
  };
  return (
    <div className=" flex flex-col justify-center gap-3 h-full w-full sm:w-3/4 mx-auto">
      <div className="mb-3">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-secondary-color mb-5">
          {/* Legal / Invoice Details */}
          Fakturačné údaje
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-base-color">
          {/* Enter your legal information for invoicing */}
          Zadajte svoje údaje potrebné na fakturáciu
        </p>
      </div>
      <ReusableForm handleFinish={onFinish} form={form}>
        <Typography.Title
          level={3}
          className="!text-secondary-color !font-semibold"
        >
          {/* Business Information */}
          Obchodné údaje
        </Typography.Title>
        {BusinessInputStructure.map((input, index) => (
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
        <ReuseDatePicker
          name="dateOfBirth"
          // label: "Date of Birth"
          label="Dátum narodenia"
          // rules: [{ required: true, message: "Date of Birth is required" }]
          rules={[{ required: true, message: "Dátum narodenia je povinný" }]}
          labelClassName="!font-semibold !text-secondary-color"
          shouldDisableDate={false}
        />
        <Typography.Title
          level={3}
          className="!text-secondary-color !font-semibold !mt-5"
        >
          {/* Address Information */}
          Adresa
        </Typography.Title>
        {AddressInputStructure.map((input, index) => (
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
        <ReuseSelect
          showSearch={true}
          name="town"
          // label: "Town/City"
          label="Mesto"
          // placeholder: "Select your town"
          placeholder="Vyberte svoje mesto"
          labelClassName="!text-secondary-color !font-semibold"
          // rules: [{ required: true, message: "Please select a town" }]
          rules={[{ required: true, message: "Vyberte mesto" }]}
          options={
            townData?.map((town) => ({
              value: town.name,
              label: town.name,
            }))
          }
        />
        <ReuseSelect
          showSearch={true}
          mode="multiple"
          name="travelTowns"
          // label: "Towns I Can Travel To"
          label="Mestá, do ktorých môžem cestovať"
          // placeholder: "Select towns you can travel to"
          placeholder="Vyberte mestá, do ktorých môžete cestovať"
          labelClassName="!text-secondary-color !font-semibold"
          // rules: [{ required: true, message: "Please select at least one travel town" }]
          rules={[{ required: true, message: "Vyberte aspoň jedno mesto" }]}
          allowClear={true}
          onChange={handleTravelTownsChange}
          selectClassName="!h-auto !min-h-10"
          options={[
            {
              value: "__all__", // label: "Select All Towns"
              label: "Vybrať všetky mestá"
            },
            ...townData?.map((town) => ({
              value: town.name,
              label: town.name,
            })),
          ]}
        />
        <div className="flex justify-end items-end w-full mt-5 mb-10">
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

export default LegalInvoiceDetails;