/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Checkbox, Form, Modal, Radio, Typography } from "antd";
import { useEffect, useState } from "react";
import type { Dayjs } from "dayjs";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import ReuseDatePicker from "../../Form/ReuseDatePicker";
import ReuseTimePicker from "../../Form/ReuseTimePicker";
import ReuseSelect from "../../Form/ReuseSelect";
import { IProfessionalUser, IProfile } from "@/types";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { createEventOrder } from "@/services/EventOrderService/EventOrderServiceApi";
// import Link from "next/link";

export const userInputStructure = [
  {
    name: "name",
    type: "text",
    inputType: "normal",
    label: " Name",
    placeholder: "Enter Full Name",
    labelClassName: "!font-semibold",
    rules: [{ required: true, message: "Name is required" }],
  },
  {
    name: "email",
    type: "email",
    inputType: "normal",
    label: "Email",
    placeholder: "",
    labelClassName: "!font-semibold",
    rules: [],
    disabled: true,
  },
  // {
  //   name: "sureName",
  //   type: "text",
  //   inputType: "normal",
  //   label: "Surname",
  //   placeholder: "Enter Full Surname",
  //   labelClassName: "!font-semibold",
  //   rules: [{ required: true, message: "Surname is required" }],
  // },
  {
    name: "streetAddress",
    type: "text",
    inputType: "normal",
    label: "Street Address",
    placeholder: "Enter Street Address",
    labelClassName: "!font-semibold",
    rules: [{ required: true, message: "Street Address is required" }],
  },
  {
    name: "town",
    type: "text",
    inputType: "normal",
    label: "Town",
    placeholder: "Enter Town Name",
    labelClassName: "!font-semibold",
    rules: [{ required: true, message: "Town is required" }],
  },
  {
    name: "zipCode",
    type: "text",
    inputType: "normal",
    label: "ZIP Code",
    placeholder: "Enter ZIP Code",
    labelClassName: "!font-semibold",
    rules: [{ required: true, message: "ZIP Code is required" }],
  },
  {
    name: "country",
    type: "text",
    inputType: "normal",
    label: "Country",
    placeholder: "Enter Country Name",
    labelClassName: "!font-bold",
    rules: [{ required: true, message: "Country is required" }],
  },
];
export const companyInputStructure = [
  {
    name: "companyName",
    type: "text",
    inputType: "normal",
    label: " Company Name",
    placeholder: "Enter Full Company Name",
    labelClassName: "!font-semibold",
    rules: [{ required: true, message: "Company Name is required" }],
  },
  {
    name: "email",
    type: "email",
    inputType: "normal",
    label: "Email",
    placeholder: "",
    labelClassName: "!font-semibold",
    rules: [],
    disabled: true,
  },
  {
    name: "streetAddress",
    type: "text",
    inputType: "normal",
    label: "Street Address",
    placeholder: "Enter Street Address",
    labelClassName: "!font-semibold",
    rules: [{ required: true, message: "Street Address is required" }],
  },
  {
    name: "town",
    type: "text",
    inputType: "normal",
    label: "Town",
    placeholder: "Enter Town Name",
    labelClassName: "!font-semibold",
    rules: [{ required: true, message: "Town is required" }],
  },
  {
    name: "zipCode",
    type: "text",
    inputType: "normal",
    label: "ZIP Code",
    placeholder: "Enter ZIP Code",
    labelClassName: "!font-semibold",
    rules: [{ required: true, message: "ZIP Code is required" }],
  },
  {
    name: "country",
    type: "text",
    inputType: "normal",
    label: "Country",
    placeholder: "Enter Country Name",
    labelClassName: "!font-semibold",
    rules: [{ required: true, message: "Country is required" }],
  },
  {
    name: "ico",
    type: "text",
    inputType: "normal",
    label: "IČO",
    placeholder: "Enter IČO",
    labelClassName: "!font-semibold",
    rules: [{ required: true, message: "IČO is required" }],
  },
  {
    name: "dic",
    type: "text",
    inputType: "normal",
    label: "DIČ",
    placeholder: "Enter DIČ",
    labelClassName: "!font-semibold",
    rules: [{ required: true, message: "DIČ is required" }],
  },
  {
    name: "ic_dph",
    type: "text",
    inputType: "normal",
    label: "IČ DPH (Optional)",
    placeholder: "Enter IČ DPH",
    labelClassName: "!font-semibold",
    rules: [{ required: false, message: "IČ DPH is required" }],
  },
];

interface ProfessionalBookingModalProps {
  isModalVisible: boolean;
  handleCancel: () => void;
  myData: IProfile;
  professionalUser: IProfessionalUser;
}

const ProfessionalBookingModal: React.FC<ProfessionalBookingModalProps> = ({
  isModalVisible,
  handleCancel,
  myData,
  professionalUser,
}) => {
  console.log(professionalUser)
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [type, setType] = useState<"user" | "company">("user");

  console.log(myData)

  useEffect(() => {
    form.setFieldsValue({
      name: myData?.name,
      email: myData?.email,
      sureName: myData?.sureName,
      companyName: myData?.companyName,
      streetAddress: myData?.address,
      town: myData?.town,
      zipCode: myData?.zipCode,
      country: myData?.country,
      ico: myData?.ico,
      dic: myData?.dic,
      ic_dph: myData?.ic_dph,
    });
  }, [form, myData, type]);

  const onSubmit = async (values: any) => {
    const data = {
      title: values.title,
      orderType: "custom",
      serviceProviderId: professionalUser?._id,

      date: values.date,
      time: values.time,
      location: values.location,
      budget_range: values.budget_range,
      duration: values.duration,
      serviceType: values.serviceType,
      description: values.description,

      isRegisterAsCompany: type === "company" ? true : false,
      name: values.name,
      // sureName: values.sureName,
      streetAddress: values.streetAddress,
      town: values.town,
      zipCode: values.zipCode,
      country: values.country,

      companyName: values.companyName,

      ICO: values.ico,
      DIC: values.dic,
      IC_DPH: values.ic_dph || "",
    };

    const res = await tryCatchWrapper(
      createEventOrder,
      { body: data },
      {
        toastLoadingMessage: "Adding new Order...",
        toastSuccessMessage: "Order Placed successfully!",
        toastErrorMessage: "Something went wrong! Please try again.",
      }
    );

    if (res?.success) {
      form.resetFields();
      handleCancel();
    }
  };

  return (
    <Modal
      open={isModalVisible}
      onCancel={() => {
        handleCancel();
      }}
      footer={null}
      centered
      className="lg:!w-[900px]"
    >
      <div className="p-5 text-base-color  max-h-[90vh] overflow-y-auto !p-0">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">
          Contact {professionalUser?.name} for Booking
        </h1>
        <p className="text-sm sm:text-sm lg:text-base xl:text-lg mb-5 font-medium">
          Fill out the form below to request a quote and book your session.
        </p>

        <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold mb-5">
          Event Information
        </p>

        <ReusableForm
          form={form}
          handleFinish={onSubmit}
          onValuesChange={(changedValues) => {
            if (changedValues.date) {
              setSelectedDate(changedValues.date);
              form.setFieldsValue({ time: null }); // Reset time when date changes
            }
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 mt-6">
            <ReuseInput
              name="title"
              label="Event Name"
              placeholder="Enter Event Name"
              rules={[
                { required: true, message: "Event Name is required" },
              ]}
              labelClassName="!font-semibold"
            />
            <ReuseInput
              name="location"
              label="Event Location"
              placeholder="Enter Event Location"
              rules={[
                { required: true, message: "Event Location is required" },
              ]}
              labelClassName="!font-semibold"
            />

            <ReuseDatePicker
              name="date"
              label="Event Date"
              labelClassName="!font-semibold"
              rules={[{ required: true, message: "Date is required" }]}
              placeholder="Select Date"
              unAllowedDate={professionalUser?.unAvailability}
              format="MM-DD-YYYY"
            />

            <ReuseTimePicker
              name="time"
              date={selectedDate ? selectedDate.toISOString() : null}
              label="Event Time"
              labelClassName="!font-semibold"
              rules={[{ required: true, message: "Time is required" }]}
              placeholder="Select Time"
              format="HH:mm"
              disabled={!selectedDate}
            />
            <ReuseSelect
              name="budget_range"
              label="Budget"
              placeholder="Select Budget"
              labelClassName="!font-semibold"
              rules={[{ required: true, message: "Budget is required" }]}
              options={[
                { value: "under50", label: "Under 50€" },
                { value: "50€-100€", label: "50€-100€" },
                { value: "100€-300€", label: "100€-300€" },
                { value: "300€ – 500€", label: "300€ – 500€" },
                { value: "500€ – 700€", label: "500€ – 700€" },
                { value: "700€ – 1000€", label: "700€ – 1000€" },
                { value: "over1000", label: "Over 1000€" },
              ]}
            />
            <ReuseSelect
              name="duration"
              label="Duration"
              placeholder="Select Duration"
              labelClassName="!font-semibold"
              rules={[{ required: true, message: "Duration is required" }]}
              options={[
                { value: "1hour", label: "1 hour" },
                { value: "2hour", label: "2 hours" },
                { value: "halfday", label: "half Day" },
                { value: "fullday", label: "Full Day" },
                { value: "multiday", label: "Multiple Day" },
              ]}
            />
          </div>
          <div>
            <Typography.Title level={5} className="!font-semibold mt-4">
              Media Options
            </Typography.Title>
            <Form.Item name="serviceType" rules={[{ required: true }]}>
              <Radio.Group>
                {professionalUser?.role === "both" ? (
                  <div>
                    <Radio value="photography">Photography</Radio>
                    <Radio value="videography">Videography</Radio>
                    <Radio value="both">Both</Radio>
                  </div>
                ) : professionalUser?.role === "photographer" ? (
                  <Radio value="photography">Photography</Radio>
                ) : (
                  <Radio value="videography">Videography</Radio>
                )}
              </Radio.Group>
            </Form.Item>
          </div>
          <ReuseInput
            name="description"
            inputType="textarea"
            rows={5}
            label="Event Description"
            placeholder="Enter Event Description"
            rules={[
              { required: true, message: "Event Description is required" },
            ]}
            labelClassName="!font-semibold"
          />

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
            ? userInputStructure.map((input) => (
              <ReuseInput
                // Key includes `type` so toggling user/company remounts fresh inputs;
                // reused nodes keep stale labels when the page is machine-translated.
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
            : companyInputStructure.map((input) => (
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
          {/* <Form.Item
            name="acceptTerms"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                      new Error("Zaškrtnite pole a potvrďte, že ste sa oboznámili s obchodnými podmienkami.")
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
          <ReuseButton htmlType="submit" variant="secondary" className="mt-2">
            Send Booking Request
          </ReuseButton>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default ProfessionalBookingModal;
