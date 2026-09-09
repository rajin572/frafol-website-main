/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { IoCamera } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import ReuseButton from "../ui/Button/ReuseButton";
import ReusableForm from "../ui/Form/ReuseForm";
import { Form } from "antd";
import ReuseSelect from "../ui/Form/ReuseSelect";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const ChooseRole = () => {
  const router = useRouter();
  const [form] = Form.useForm(); // Corrected initialization of the form

  const storedInformation = Cookies.get("information");

  const parseData = JSON.parse(storedInformation || "{}");

  if (storedInformation) {
    form.setFieldsValue({
      role: parseData.role,
    });
  }

  const onFinish = (values: any) => {
    Cookies.set("information", JSON.stringify({ ...parseData, ...values }), {
      expires: 1,
    });
    form.resetFields();
    router.push("/sign-up/professional/personal-information");
  };

  return (
    <div className="flex flex-col justify-center gap-5 h-full w-full md:w-[60%] mx-auto">
      <div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-secondary-color mb-3">
          {/* Choose Your Role */}
          Vyberte si svoju rolu
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-base-color">
          {/* Select your professional role to continue */}
          Pokračujte výberom svoj typ služby
        </p>
      </div>

      <ReusableForm handleFinish={onFinish} form={form}>
        <ReuseSelect
          name="role"
          // label: "Professional Role"
          label="Typ služby"
          // placeholder: "Select your role"
          placeholder="Vyberte svoju rolu"
          labelClassName="!text-secondary-color !font-semibold"
          // rules: [{ required: true, message: "Please select your role" }]
          rules={[{ required: true, message: "Vyberte svoju rolu" }]}
          options={[
            {
              value: "photographer",
              // label: "Photographer"
              label: "Fotograf",
              icon: <LuUser />,
            },
            {
              value: "videographer",
              // label: "Videographer"
              label: "Videograf",
              icon: <IoCamera />,
            },
            {
              value: "both",
              // label: "Both"
              label: "Fotograf aj Kameraman",
              icon: <IoCamera />,
            },
          ]}
        />
        <div className="flex justify-end items-end w-full mt-8">
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

export default ChooseRole;
