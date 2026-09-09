/* eslint-disable @typescript-eslint/no-explicit-any */
import ReuseButton from "@/components/ui/Button/ReuseButton";
import ReusableForm from "@/components/ui/Form/ReuseForm";
import ReuseInput from "@/components/ui/Form/ReuseInput";
import ReuseSelect from "@/components/ui/Form/ReuseSelect";
import ReuseUpload from "@/components/ui/Form/ReuseUpload";
import { addNewPackage } from "@/services/PackageService/PackageServiceApi";
import { ISignInUser } from "@/types";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { Form, Modal, Typography } from "antd";
import React, { useEffect } from "react";

const ProfessionalAddNewPackageModal = ({
  isAddModalVisible,
  handleCancel,
  userData,
  serviceCharge,
  minServiceCharge
}: {
  isAddModalVisible: boolean;
  handleCancel: () => void;
  userData: ISignInUser;
  serviceCharge: number;
  minServiceCharge: number
}) => {

  console.log(serviceCharge)

  const categoryOptions =
    userData?.role === "both"
      ? [
        {
          label: "Photography",
          value: "photography",
        },
        {
          label: "Videography",
          value: "videography",
        },
      ]
      : userData?.role === "photographer"
        ? [
          {
            label: "Photography",
            value: "photography",
          },
        ]
        : userData?.role === "videographer"
          ? [
            {
              label: "Videography",
              value: "videography",
            },
          ]
          : [];

  const [form] = Form.useForm();
  const priceValue = Form.useWatch("price", form) || 0;
  const vatAmountValue = Form.useWatch("vatAmount", form) || 0;

  useEffect(() => {
    const serviceChagePercentage = serviceCharge / 100;
    const vatAmountPercentage = vatAmountValue / 100;

    const serviceChargeAmmount = Number(priceValue) * serviceChagePercentage;

    const totalServiceCharge = serviceChargeAmmount > minServiceCharge ? serviceChargeAmmount : minServiceCharge;
    const totalVatAmount = Number(priceValue) * vatAmountPercentage;

    const mainPriceValue =
      Number(priceValue) + totalServiceCharge + totalVatAmount;

    form.setFieldValue("mainPrice", Number(mainPriceValue?.toFixed(2)));
  }, [form, minServiceCharge, priceValue, serviceCharge, vatAmountValue]);

  const onSubmit = async (values: any) => {
    const formData = new FormData();

    const data = {
      title: values.title,
      description: values.description,
      price: Number(values.price),
      mainPrice: Number(values?.mainPrice),
      category: values.category,
      vatAmount: Number(values.vatAmount) || 0,
      deliveryTime: Number(values.deliveryTime),
      duration: `${Number(values.durationUnit)} ${values.durationType}`,
    };

    console.log(data)

    formData.append("data", JSON.stringify(data));

    if (values?.image?.[0]?.originFileObj) {
      formData.append("image", values?.image?.[0]?.originFileObj);
    }

    const res = await tryCatchWrapper(
      addNewPackage,
      { body: formData },
      {
        toastLoadingMessage: "Adding new package...",
        toastSuccessMessage: "Package added successfully!",
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
      open={isAddModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[1000px]"
    >
      <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-2">
        {/* Add New Package */}
        Pridať nový balík
      </h3>

      <ReusableForm form={form} handleFinish={onSubmit}>
        <h3 className="text-sm sm:text-sm lg:text-base xl:text-lg font-medium mb-5">
          Package Information
        </h3>
        <ReuseInput
          name="title"
          /* label="Title" */
          label="Názov balíka"
          placeholder="Enter Title"
          /* rules={[{ required: true, message: "Title is required" }]} */
          rules={[{ required: true, message: "Názov balíka je povinný" }]}
          labelClassName="!font-semibold"
        />
        <ReuseInput
          inputType="textarea"
          rows={4}
          name="description"
          /* label="Description" */
          label="Popis"
          placeholder="Enter Description"
          /* rules={[{ required: true, message: "Description is required" }]} */
          rules={[{ required: true, message: "Popis je povinný" }]}
          labelClassName="!font-semibold mt-4"
        />
        <ReuseSelect
          name="category"
          label="Select Category"
          placeholder="Select Category"
          rules={[{ required: true, message: "Category is required" }]}
          labelClassName="!font-semibold"
          options={categoryOptions}
        />
        <ReuseInput
          name="price"
          /* label="Package Price" */
          label="Cena"
          placeholder="Enter Package Price"
          type="number"
          /* rules={[{ required: true, message: "Package Price is required" }]} */
          rules={[{ required: true, message: "Cena je povinná" }]}
          labelClassName="!font-semibold"
        />
        <ReuseInput
          name="vatAmount"
          label="VAT Amount % (optional) "
          placeholder="Enter VAT Amount"
          type="number"
          labelClassName="!font-semibold"
        />
        <ReuseInput
          name="mainPrice"
          label="Package Price After Adding Service Fee and VAT"
          placeholder="Enter Package Price"
          disabled
          type="number"
          rules={[{ required: true, message: "Package Price is required" }]}
          labelClassName="!font-semibold"
        />
        <ReuseSelect
          name="deliveryTime"
          label="Delivery Time (Weekly)"
          placeholder="Select Delivery Time"
          rules={[{ required: true, message: "Delivery Time is required" }]}
          labelClassName="!font-semibold"
          options={[
            { label: "1 Week", value: 7 },
            { label: "2 Weeks", value: 14 },
            { label: "3 Weeks", value: 21 },
            { label: "4 Weeks", value: 28 },
            { label: "5 Weeks", value: 35 },
            { label: "6 Weeks", value: 42 },
            { label: "7 Weeks", value: 49 },
          ]}
        />
        <Typography.Title
          level={5}
          className="!font-semibold !text-base-color !mt-4"
        >
          Duration
        </Typography.Title>
        <div className="grid grid-cols-2 gap-4">
          <ReuseInput
            name="durationUnit"
            placeholder="Enter Duration"
            type="number"
            rules={[{ required: true, message: "Duration is required" }]}
          />
          <ReuseSelect
            name="durationType"
            placeholder="Select Duration Type"
            rules={[{ required: true, message: "Duration Type is required" }]}
            options={[
              { label: "Hours", value: "Hours" },
              { label: "Days", value: "Days" },
            ]}
          />
        </div>
        <ReuseUpload
          label="Upload Image"
          name="image"
          buttonText="Upload Image"
          accept="image/png, image/jpeg"
          maxCount={1}
          labelClassName="!font-semibold"
          rules={[{ required: true, message: "Package Image is required" }]}

        />
        <ReuseButton htmlType="submit" variant="secondary" className="mt-2">
          {/* Add Package */}
          Odoslať
        </ReuseButton>
      </ReusableForm>
    </Modal>
  );
};

export default ProfessionalAddNewPackageModal;
