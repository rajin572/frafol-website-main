/* eslint-disable @typescript-eslint/no-explicit-any */
import ReuseButton from "@/components/ui/Button/ReuseButton";
import ReusableForm from "@/components/ui/Form/ReuseForm";
import ReuseInput from "@/components/ui/Form/ReuseInput";
import ReuseSelect from "@/components/ui/Form/ReuseSelect";
import ReuseUpload from "@/components/ui/Form/ReuseUpload";
import { addNewGear } from "@/services/GearService/GearServiceApi";
import { ICategory } from "@/types";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { Form, Modal } from "antd";
import React, { useEffect, useState } from "react";

const GearMarketPlaceAddNewGear = ({
  isAddModalVisible,
  handleCancel,
  categories,
  serviceCharge,
  minServiceCharge
}: {
  isAddModalVisible: boolean;
  handleCancel: () => void;
  categories: ICategory[];
  serviceCharge: number;
  minServiceCharge: number
}) => {
  const [form] = Form.useForm();
  const [totalServiceCharge, setTotalServiceCharge] = useState(0);
  const priceValue = Form.useWatch("price", form) || 0;
  const vatAmountValue = Form.useWatch("VATAmount", form) || 0;

  useEffect(() => {
    const serviceChagePercentage = serviceCharge / 100;
    const vatAmountPercentage = vatAmountValue / 100;

    const serviceChargeAmmount = Number(priceValue) * serviceChagePercentage;

    const totalServiceCharge = serviceChargeAmmount > minServiceCharge ? serviceChargeAmmount : minServiceCharge;
    setTotalServiceCharge(totalServiceCharge);
    const totalVatAmount = Number(priceValue) * vatAmountPercentage;

    const mainPriceValue =
      Number(priceValue) + totalServiceCharge + totalVatAmount;

    form.setFieldValue("mainPrice", Number(mainPriceValue?.toFixed(2)));
  }, [form, minServiceCharge, priceValue, serviceCharge, vatAmountValue]);

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    const data = {
      name: values.name,
      categoryId: values.categoryId,
      price: Number(values.price),
      description: values.description,
      condition: values.condition,
      mainPrice: Number(values.mainPrice),
      shippingCompany: {
        name: values.shippingCompany,
        price: Number(values.shippingPrice),
      },
      vatAmount: values.VATAmount || 0,
      extraInformation: values.extraInformation || "",
      totalVatAmount: Number(values.price) * (values.VATAmount / 100),
      platformCommission: totalServiceCharge,
    };


    formData.append("data", JSON.stringify(data));

    if (values.image) {
      values?.image?.forEach((file: any) => {
        formData.append("gallery", file?.originFileObj);
      });
    }

    const res = await tryCatchWrapper(
      addNewGear,
      { body: formData },
      {
        toastLoadingMessage: "Adding new gear...",
        /* toastSuccessMessage: "New gear added successfully!", */
        toastSuccessMessage: "Inzerát na príslušenstvo bol vytvorený a čaká na schválenie.",
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
      onCancel={() => {
        form.resetFields();
        handleCancel();
      }}
      footer={null}
      centered
      className="lg:!w-[1000px]"
    >
      <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-2">
        {/* Add New Gear */}
        Pridať nové príslušenstvo
      </h3>

      <ReusableForm form={form} handleFinish={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-2 rounded border border-[#E1E1E1]">
            <h3 className="text-sm sm:text-sm lg:text-base xl:text-lg font-medium mb-5">
              Informácie o príslušenstve
            </h3>
            <ReuseInput
              name="name"
              /* label="Product Name" */
              label="Názov príslušenstva"
              placeholder="Zadajte názov príslušenstva"
              /* rules={[{ required: true, message: "Product Name is required" }]} */
              rules={[{ required: true, message: "Názov príslušenstva je povinný" }]}
              labelClassName="!font-semibold"
            />
            <ReuseSelect
              name="categoryId"
              /* label="Product Category" */
              label="Kategória"
              placeholder="Vyberte kategóriu"
              /* rules={[{ required: true, message: "Category is required" }]} */
              rules={[{ required: true, message: "Kategória je povinná" }]}
              labelClassName="!font-semibold"
              options={categories?.map((category) => ({
                label: category?.title,
                value: category?._id,
              }))}
            />
            <ReuseInput
              name="price"
              /* label="Item Price" */
              label="Cena (€)"
              placeholder="Zadajte cenu príslušenstva"
              type="number"
              /* rules={[{ required: true, message: "Item Price is required" }]} */
              rules={[{ required: true, message: "Cena je povinná" }]}
              labelClassName="!font-semibold"
            />
            <ReuseInput
              name="VATAmount"
              label="DPH (%) – nepovinné"
              placeholder="Zadajte sadzbu DPH"
              type="number"
              labelClassName="!font-semibold"
            />
            <ReuseInput
              name="mainPrice"
              label="Celková cena vrátane servisného poplatku a DPH"
              placeholder="Enter Package Price"
              disabled
              type="number"
              rules={[{ required: true, message: "Package Price is required" }]}
              labelClassName="!font-semibold"
            />
            <ReuseInput
              inputType="textarea"
              rows={4}
              name="description"
              /* label="Product Description" */
              label="Popis"
              placeholder="Zadajte popis príslušenstva"
              /* rules={[{ required: true, message: "Description is required" }]} */
              rules={[{ required: true, message: "Popis je povinný" }]}
              labelClassName="!font-semibold mt-4"
            />
            <ReuseSelect
              name="condition"
              /* label="Condition" */
              label="Stav"
              placeholder="Vyberte stav príslušenstva"
              /* rules={[{ required: true, message: "Condition is required" }]} */
              rules={[{ required: true, message: "Vyberte stav" }]}
              labelClassName="!font-semibold"
              options={[
                { /* label: "New", */ label: "Nové", value: "new" },
                { /* label: "Used", */ label: "Použité", value: "used" },
              ]}
            />
            <ReuseInput
              name="shippingCompany"
              label="Dopravca"
              placeholder="Zadajte názov dopravcu"
              rules={[
                { required: true, message: "Zadajte názov dopravcu" },
              ]}
              labelClassName="!font-semibold"
            />
            <ReuseInput
              name="shippingPrice"
              label="Cena dopravy (€)"
              type="number"
              placeholder="Zadajte cenu dopravy"
              rules={[
                { required: true, message: "Zadajte cenu dopravy" },
              ]}
              labelClassName="!font-semibold"
            />
          </div>
          <div className="p-2 rounded border border-[#E1E1E1]">
            <ReuseUpload
              /* label="Upload Image" */
              label="Obrázok"
              name="image"
              buttonText="Nahrať fotografiu"
              accept="image/png, image/jpeg"
              maxCount={5}
              multiple={true}
              labelClassName="!font-semibold"
              /* rules={[{ required: true, message: "Product Image is required" }]} */
              rules={[{ required: true, message: "Obrázok je povinný" }]}
            />
            {/* <ReuseInput
              inputType="textarea"
              rows={4}
              name="extraInformation"
              label="Extra Information (Optional)"
              placeholder="Enter Extra Information"
              labelClassName="!font-semibold mt-4"
            /> */}
          </div>
        </div>

        <ReuseButton htmlType="submit" variant="secondary" className="mt-2">
          {/* Add Gear */}
          Odoslať
        </ReuseButton>
      </ReusableForm>
    </Modal>
  );
};

export default GearMarketPlaceAddNewGear;
