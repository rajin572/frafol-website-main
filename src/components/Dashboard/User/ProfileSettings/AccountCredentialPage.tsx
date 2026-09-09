/* eslint-disable @typescript-eslint/no-explicit-any */
import ReuseButton from "@/components/ui/Button/ReuseButton";
import ReusableForm from "@/components/ui/Form/ReuseForm";
import ReuseInput from "@/components/ui/Form/ReuseInput";
import { updateProfile } from "@/services/ProfileService/ProfileServiceApi";
import { IProfile } from "@/types";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { Form } from "antd";
import React from "react";

const AccountCredentialPage = ({ myData }: { myData: IProfile }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue({
      bankName: myData?.profileId?.bankName,
      accountNumber: myData?.profileId?.accountNumber,
    });
  }, [form, myData]);

  const onSubmit = async (values: { [key: string]: any }) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(values));

    const res = await tryCatchWrapper(
      updateProfile,
      { body: formData },
      {
        toastLoadingMessage: "Updating Account Information...",
        toastSuccessMessage: "Account Information updated successfully!",
        toastErrorMessage: "Something went wrong! Please try again.",
      }
    );

    if (res?.success) {
      form.resetFields();
    }
  };
  return (
    <div className="p-5 text-base-color">
      <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-5">
        Account Credentials
      </h1>

      <ReusableForm form={form} handleFinish={onSubmit}>
        <ReuseInput
          name="bankName"
          label="Bank Name"
          placeholder="Enter Bank Name"
          rules={[{ required: true, message: "Bank Name is required" }]}
          labelClassName="!font-semibold"
        />
        <ReuseInput
          name="accountNumber"
          label="Account Number"
          placeholder="Enter Account Number"
          rules={[{ required: true, message: "Account Number is required" }]}
          labelClassName="!font-semibold"
        />

        <ReuseButton htmlType="submit" variant="secondary" className="mt-2">
          Update
        </ReuseButton>
      </ReusableForm>
    </div>
  );
};

export default AccountCredentialPage;
