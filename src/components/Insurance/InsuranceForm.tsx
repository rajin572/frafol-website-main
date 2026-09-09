/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form } from "antd";
import React from "react";
import ReusableForm from "../ui/Form/ReuseForm";
import ReuseInput from "../ui/Form/ReuseInput";
import ReuseSelect from "../ui/Form/ReuseSelect";
import ReuseButton from "../ui/Button/ReuseButton";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { registerInsurance } from "@/services/InsuranceService/InsuranceServiceApi";

const InsuranceForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      registerInsurance,
      { body: values },
      {
        toastLoadingMessage: "Sending request...",
        toastSuccessMessage: "Insurance Registered Successfully!",
        toastErrorMessage: "Something went wrong! Please try again.",
      }
    );

    if (res?.success) {
      form.resetFields();
    }
  };
  return (
    <div className="my-16">
      <ReusableForm
        form={form}
        handleFinish={onFinish}
        className="grid grid-cols-1 lg:grid-cols-2 gap-y-5 gap-x-10"
      >
        <ReuseInput
          name="fullName"
          inputType="text"
          placeholder="Enter your full name"
          label="Full Name"
          labelClassName="!font-semibold"
          rules={[{ required: true, message: "Full name is required" }]}
        />
        <ReuseInput
          name="companyName"
          inputType="text"
          placeholder="Enter your Company name"
          label="Company Name"
          labelClassName="!font-semibold"
          rules={[{ required: true, message: "Company name is required" }]}
        />
        <ReuseSelect
          name="businessType"
          label="Business Type"
          labelClassName="!font-semibold"
          placeholder="Select Business Type"
          rules={[{ required: true, message: "Business Type is required" }]}
          options={[
            { value: "živnosť", label: "živnosť" },
            { value: "s.r.o.", label: "s.r.o." },
          ]}
        />
        <ReuseInput
          name="ico"
          inputType="text"
          placeholder="Enter your IČO"
          label="IČO"
          labelClassName="!font-semibold"
        />
        <ReuseInput
          type="email"
          name="email"
          inputType="text"
          placeholder="Enter your Email"
          label="Email"
          labelClassName="!font-semibold"
          rules={[{ required: true, message: "Email is required" }]}
        />
        <ReuseInput
          name="phoneNumber"
          inputType="text"
          placeholder="Enter your phone number"
          label="Phone Number"
          labelClassName="!font-semibold"
          rules={[{ required: true, message: "Phone number is required" }]}
        />
        <ReuseInput
          name="address"
          inputType="text"
          placeholder="Enter your address"
          label="Address"
          labelClassName="!font-semibold"
          rules={[{ required: true, message: "Address is required" }]}
        />
        <ReuseInput
          name="estimatedValue"
          inputType="number"
          type="number"
          placeholder="Enter your estimated value"
          label="Estimated value"
          labelClassName="!font-semibold"
          rules={[{ required: true, message: "Estimated value is required" }]}
        />
        <ReuseSelect
          name="anyPreviousEquipment"
          label="Any Previous Equipment"
          labelClassName="!font-semibold"
          placeholder="Select Any Previous Equipment"
          rules={[
            { required: true, message: "Any Previous Equipment is required" },
          ]}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
        <ReuseInput
          name="additionalNotes"
          inputType="number"
          type="number"
          placeholder="Enter your Additional Notes"
          label="Additional Notes"
          labelClassName="!font-semibold"
          rules={[{ required: true, message: "Additional Notes is required" }]}
        />
        <ReuseButton
          variant="secondary"
          htmlType="submit"
          className="w-full lg:!col-span-2"
        >
          Submit
        </ReuseButton>
      </ReusableForm>
    </div>
  );
};

export default InsuranceForm;
