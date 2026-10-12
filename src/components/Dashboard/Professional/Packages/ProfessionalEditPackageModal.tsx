/* eslint-disable @typescript-eslint/no-explicit-any */
import ReuseButton from "@/components/ui/Button/ReuseButton";
import ReusableForm from "@/components/ui/Form/ReuseForm";
import ReuseInput from "@/components/ui/Form/ReuseInput";
import ReuseSelect from "@/components/ui/Form/ReuseSelect";
import ReuseUpload from "@/components/ui/Form/ReuseUpload";
import { getMediaUrl } from "@/utils/mediaUrl";
import { IPackage, ISignInUser } from "@/types";
import { Form, Modal, Typography } from "antd";
import Image from "next/image";
import React from "react";
import { AllImages } from "../../../../../public/assets/AllImages";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { updatePackage } from "@/services/PackageService/PackageServiceApi";

const ProfessionalEditPackageModal = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
  userData,
  serviceCharge,
  minServiceCharge
}: {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IPackage | null;
  userData: ISignInUser;
  serviceCharge: number;
  minServiceCharge: number
}) => {

  const [form] = Form.useForm();
  const priceValue = Form.useWatch("price", form) || 0;
  const vatAmountValue = Form.useWatch("vatAmount", form) || 0;

  const categoryOptions =
    userData?.role === "both"
      ? [
        {
          label: "Fotenie",
          value: "photography",
        },
        {
          label: "Natáčanie",
          value: "videography",
        },
      ]
      : userData?.role === "photographer"
        ? [
          {
            label: "Fotenie",
            value: "photography",
          },
        ]
        : userData?.role === "videographer"
          ? [
            {
              label: "Natáčanie",
              value: "videography",
            },
          ]
          : [];

  React.useEffect(() => {
    if (currentRecord) {
      const durationUnit = currentRecord?.duration.split(" ")[0];
      const durationType = currentRecord?.duration.split(" ")[1];
      form.setFieldsValue({
        title: currentRecord?.title,
        description: currentRecord?.description,
        price: currentRecord?.price,
        mainPrice: currentRecord?.mainPrice,
        category: currentRecord?.category,
        deliveryTime: currentRecord?.deliveryTime,
        vatAmount: currentRecord?.vatAmount,
        durationUnit: durationUnit,
        durationType: durationType,
      });
    }
  }, [currentRecord, form]);

  React.useEffect(() => {
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

    formData.append("data", JSON.stringify(data));

    if (values?.image?.[0]?.originFileObj) {
      formData.append("image", values?.image?.[0]?.originFileObj);
    }

    const res = await tryCatchWrapper(
      updatePackage,
      { body: formData, params: currentRecord?._id },
      {
        toastLoadingMessage: "Pridáva sa nový balík...",
        toastSuccessMessage: "Balík bol úspešne pridaný!",
        toastErrorMessage: "Niečo sa pokazilo! Skúste to prosím znova.",
      }
    );

    if (res?.success) {
      form.resetFields();
      handleCancel();
    }
  };
  return (
    <Modal
      open={isEditModalVisible}
      onCancel={() => {
        handleCancel();
        form.resetFields();
      }}
      footer={null}
      centered
      className="lg:!w-[1000px]"
    >
      <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-2">
        Upraviť balík
      </h3>

      <ReusableForm form={form} handleFinish={onSubmit}>
        <h3 className="text-sm sm:text-sm lg:text-base xl:text-lg font-medium mb-5">
          Informácie o balíku
        </h3>
        <ReuseInput
          name="title"
          /* label="Title" */
          label="Názov balíka"
          placeholder="Zadajte názov balíka"
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
          placeholder="Zadajte popis balíka"
          /* rules={[{ required: true, message: "Description is required" }]} */
          rules={[{ required: true, message: "Popis je povinný" }]}
          labelClassName="!font-semibold mt-4"
        />

        <ReuseSelect
          name="category"
          label="Vyberte kategóriu"
          placeholder="Vyberte kategóriu"
          rules={[{ required: true, message: "Vyberte kategóriu" }]}
          labelClassName="!font-semibold"
          options={categoryOptions}
        />
        <ReuseInput
          name="price"
          /* label="Package Price" */
          label="Cena (€)"
          placeholder="Zadajte cenu balíka"
          type="number"
          /* rules={[{ required: true, message: "Package Price is required" }]} */
          rules={[{ required: true, message: "Cena je povinná" }]}
          labelClassName="!font-semibold"
        />
        <ReuseInput
          name="vatAmount"
          label="DPH (%) – nepovinné"
          placeholder="Zadajte sadzbu DPH"
          type="number"
          labelClassName="!font-semibold"
        />
        <ReuseInput
          name="mainPrice"
          label="Celková cena balíka vrátane servisného poplatku a DPH"
          placeholder="Zadajte cenu balíka"
          disabled
          type="number"
          rules={[{ required: true, message: "Celková cena je povinná" }]}
          labelClassName="!font-semibold"
        />
        <ReuseSelect
          name="deliveryTime"
          label="Dodacia lehota (v týždňoch)"
          placeholder="Vyberte dodaciu lehotu"
          rules={[{ required: true, message: "Vyberte dodaciu lehotu" }]}
          labelClassName="!font-semibold"
          options={[
            { label: "1 týždeň", value: 7 },
            { label: "2 týždne", value: 14 },
            { label: "3 týždne", value: 21 },
            { label: "4 týždne", value: 28 },
            { label: "5 týždňov", value: 35 },
            { label: "6 týždňov", value: 42 },
            { label: "7 týždňov", value: 49 },
          ]}
        />

        <Typography.Title
          level={5}
          className="!font-semibold !text-base-color !mt-4"
        >
          Dĺžka fotenia/natáčania
        </Typography.Title>

        <div className="grid grid-cols-2 gap-4">
          <ReuseInput
            name="durationUnit"
            placeholder="Zadajte dĺžku"
            type="number"
            rules={[{ required: true, message: "Zadajte dĺžku fotenia/natáčania" }]}
          />
          <ReuseSelect
            name="durationType"
            placeholder="Vyberte jednotku času"
            rules={[{ required: true, message: "Vyberte jednotku času" }]}
            options={[
              { label: "Týždne", value: "Weeks" },
              { label: "Dni", value: "Days" },
              { label: "Hodiny", value: "Hours" },
              { label: "Mesiace", value: "Months" },
            ]}
          />
        </div>

        <ReuseUpload
          label="Nahrať fotografiu"
          name="image"
          buttonText="Nahrať fotografiu"
          accept="image/png, image/jpeg"
          maxCount={1}
          labelClassName="!font-semibold"
        />

        <div>
          <p>Aktuálna fotografia:</p>
          <Image
            src={
              (currentRecord?.thumbnailImage &&
                getMediaUrl(currentRecord?.thumbnailImage)) ||
              AllImages.dummyCover.src
            }
            width={100}
            height={100}
            alt="image"
          />
        </div>

        <ReuseButton htmlType="submit" variant="secondary" className="mt-2">
          {/* Update Package */}
          Odoslať
        </ReuseButton>
      </ReusableForm>
    </Modal>
  );
};

export default ProfessionalEditPackageModal;
