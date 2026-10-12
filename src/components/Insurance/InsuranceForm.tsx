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
        toastLoadingMessage: "Odosiela sa žiadosť...",
        toastSuccessMessage: "Poistenie bolo úspešne zaregistrované!",
        toastErrorMessage: "Niečo sa pokazilo! Skúste to prosím znova.",
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
          placeholder="Zadajte svoje meno a priezvisko"
          label="Meno a priezvisko"
          labelClassName="!font-semibold"
          rules={[{ required: true, message: "Meno a priezvisko je povinné" }]}
        />
        <ReuseInput
          name="companyName"
          inputType="text"
          placeholder="Zadajte názov firmy"
          label="Názov firmy"
          labelClassName="!font-semibold"
          rules={[{ required: true, message: "Názov firmy je povinný" }]}
        />
        <ReuseSelect
          name="businessType"
          label="Typ podnikania"
          labelClassName="!font-semibold"
          placeholder="Vyberte typ podnikania"
          rules={[{ required: true, message: "Typ podnikania je povinný" }]}
          options={[
            { value: "živnosť", label: "živnosť" },
            { value: "s.r.o.", label: "s.r.o." },
          ]}
        />
        <ReuseInput
          name="ico"
          inputType="text"
          placeholder="Zadajte IČO"
          label="IČO"
          labelClassName="!font-semibold"
        />
        <ReuseInput
          type="email"
          name="email"
          inputType="text"
          placeholder="Zadajte svoj e-mail"
          label="E-mail"
          labelClassName="!font-semibold"
          rules={[{ required: true, message: "E-mail je povinný" }]}
        />
        <ReuseInput
          name="phoneNumber"
          inputType="text"
          placeholder="Zadajte svoje telefónne číslo"
          label="Telefónne číslo"
          labelClassName="!font-semibold"
          rules={[{ required: true, message: "Telefónne číslo je povinné" }]}
        />
        <ReuseInput
          name="address"
          inputType="text"
          placeholder="Zadajte svoju adresu"
          label="Adresa"
          labelClassName="!font-semibold"
          rules={[{ required: true, message: "Adresa je povinná" }]}
        />
        <ReuseInput
          name="estimatedValue"
          inputType="number"
          type="number"
          placeholder="Zadajte odhadovanú hodnotu"
          label="Odhadovaná hodnota"
          labelClassName="!font-semibold"
          rules={[{ required: true, message: "Odhadovaná hodnota je povinná" }]}
        />
        <ReuseSelect
          name="anyPreviousEquipment"
          label="Predchádzajúce vybavenie"
          labelClassName="!font-semibold"
          placeholder="Vyberte možnosť"
          rules={[
            { required: true, message: "Predchádzajúce vybavenie je povinné" },
          ]}
          options={[
            { value: "yes", label: "Áno" },
            { value: "no", label: "Nie" },
          ]}
        />
        <ReuseInput
          name="additionalNotes"
          inputType="number"
          type="number"
          placeholder="Zadajte ďalšie poznámky"
          label="Ďalšie poznámky"
          labelClassName="!font-semibold"
          rules={[{ required: true, message: "Ďalšie poznámky sú povinné" }]}
        />
        <ReuseButton
          variant="secondary"
          htmlType="submit"
          className="w-full lg:!col-span-2"
        >
          Odoslať
        </ReuseButton>
      </ReusableForm>
    </div>
  );
};

export default InsuranceForm;
