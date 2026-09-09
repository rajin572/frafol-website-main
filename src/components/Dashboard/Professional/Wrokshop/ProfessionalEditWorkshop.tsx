/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import ReuseButton from "@/components/ui/Button/ReuseButton";
import ReuseDatePicker from "@/components/ui/Form/ReuseDatePicker";
import ReusableForm from "@/components/ui/Form/ReuseForm";
import ReuseInput from "@/components/ui/Form/ReuseInput";
import ReuseTimePicker from "@/components/ui/Form/ReuseTimePicker";
import { Form, Modal } from "antd";
import React, { useEffect, useState } from "react";
import ReuseSelect from "@/components/ui/Form/ReuseSelect";
import ReuseUpload from "@/components/ui/Form/ReuseUpload";
import { IWorkshop } from "@/types";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { updateWrokshop } from "@/services/WorkshopService/WorkshopServiceApi";
import Image from "next/image";
import { AllImages } from "../../../../../public/assets/AllImages";
import { getServerUrl } from "@/helpers/config/envConfig";

const ProfessionalEditWorkshop = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
  serviceCharge,
  minServiceCharge
}: {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IWorkshop | null;
  serviceCharge: number;
  minServiceCharge: number
}) => {
  const serverUrl = getServerUrl();
  const [form] = Form.useForm();
  const priceValue = Form.useWatch("price", form) || 0;
  const vatAmountValue = Form.useWatch("vatAmount", form) || 0;

  const [selectedDate, setSelectedDate] = useState<IWorkshop | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  useEffect(() => {
    if (currentRecord) {
      console.log(currentRecord)
      // Ensure both date and time are properly converted to Dayjs
      const date = currentRecord?.date ? dayjs(currentRecord?.date) : null;
      const time = currentRecord?.time ? dayjs(currentRecord?.time) : null;

      form.setFieldsValue({
        title: currentRecord?.title,
        // Ensure date and time are valid before setting them
        date: date,
        time: time,
        locationType: currentRecord?.locationType,
        location: currentRecord?.location,
        workshopLink: currentRecord?.workshopLink,
        maxParticipant: currentRecord?.maxParticipant,
        price: currentRecord?.price,
        mainPrice: currentRecord?.mainPrice,
        description: currentRecord?.description,
        vatAmount: currentRecord?.vatPercent,
      });

      setSelectedLocation(currentRecord?.locationType);
    }
  }, [currentRecord, form]);

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
      date: values.date,
      time: values.time,
      locationType: values.locationType,
      maxParticipant: Number(values.maxParticipant),
      location: values.location,
      workshopLink: values.workshopLink,
      price: Number(values.price),
      mainPrice: Number(values.mainPrice),
      description: values.description,
      vatAmount: Number(values.vatAmount) || 0,
    };

    formData.append("data", JSON.stringify(data));

    if (values?.image?.[0]?.originFileObj) {
      formData.append("image", values?.image?.[0]?.originFileObj);
    }

    const res = await tryCatchWrapper(
      updateWrokshop,
      { body: formData, params: currentRecord?._id },
      {
        toastLoadingMessage: "Updating workshop...",
        toastSuccessMessage: "Workshop updated successfully!",
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
      open={isEditModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[1000px]"
    >
      <div className="p-5 text-base-color">
        {/* <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-5">
          Edit Workshop
        </h1> */}
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-5">
          Upraviť kurz
        </h1>

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
          <ReuseInput
            name="title"
            label="Názov kurzu"
            placeholder="Zadajte názov kurzu"
            rules={[{ required: true, message: "Názov kurzu je povinný" }]}
            labelClassName="!font-semibold"
          />
          <ReuseDatePicker
            name="date"
            label="Dátum kurzu"
            labelClassName="!font-semibold"
            rules={[{ required: true, message: "Dátum je povinný" }]}
            placeholder="Vyberte dátum"
            format="MM-DD-YYYY"
          />

          <ReuseTimePicker
            name="time"
            date={selectedDate as any}
            label="Čas kurzu"
            labelClassName="!font-semibold"
            rules={[{ required: true, message: "Čas je povinný" }]}
            placeholder="Vyberte čas"
            disabled={!selectedDate}
          />

          <ReuseInput
            name="maxParticipant"
            label="Maximálny počet účastníkov"
            placeholder="Zadajte maximálny počet účastníkov"
            type="number"
            rules={[{ required: true, message: "Maximálny počet účastníkov je povinný" }]}
            labelClassName="!font-semibold"
          />

          <ReuseSelect
            name="locationType"
            label="Vyberte miesto"
            placeholder="Vyberte miesto"
            rules={[{ required: true, message: "Miesto je povinné" }]}
            value={selectedLocation}
            labelClassName="!font-semibold"
            options={[
              { label: "Online", value: "online" },
              { label: "Offline", value: "offline" },
            ]}
            onChange={(value) => {
              setSelectedLocation(value);
            }}
          />
          {selectedLocation === "offline" ? (
            <ReuseInput
              name="location"
              label="Miesto konania"
              placeholder="Zadajte miesto konania"
              rules={[
                { required: true, message: "Miesto konania je povinné" },
              ]}
              labelClassName="!font-semibold"
            />
          ) : (
            <ReuseInput
              name="workshopLink"
              label="Odkaz na stretnutie"
              placeholder="Zadajte odkaz na stretnutie"
              type="url"
              rules={[
                { required: true, message: "Odkaz na stretnutie je povinný" },
              ]}
              labelClassName="!font-semibold"
            />
          )}

          <ReuseInput
            name="price"
            label="Cena"
            placeholder="Zadajte cenu"
            rules={[{ required: true, message: "Cena je povinná" }]}
            labelClassName="!font-semibold"
            type="number"
          />

          <ReuseInput
            name="vatAmount"
            label="DPH % (voliteľné)"
            placeholder="Zadajte DPH"
            labelClassName="!font-semibold"
            type="number"
          />

          <ReuseInput
            name="mainPrice"
            label="Konečná cena po pridaní servisného poplatku a DPH"
            placeholder="Zadajte konečnú cenu"
            disabled
            type="number"
            rules={[{ required: true, message: "Package Price is required" }]}
            labelClassName="!font-semibold"
          />

          <ReuseInput
            inputType="textarea"
            rows={4}
            name="description"
            label="Popis kurzu"
            placeholder="Zadajte popis kurzu"
            rules={[{ required: true, message: "Popis kurzu je povinný" }]}
            labelClassName="!font-semibold mt-4"
          />
          <ReuseUpload
            label="Nahrať náhľad"
            name="image"
            buttonText="Nahrať obrázok"
            accept="image/png, image/jpeg"
            maxCount={1}
            labelClassName="!font-semibold"
          />

          <div>
            {/* <p>Current Image:</p> */}
            <p>Aktuálny obrázok:</p>
            <Image
              src={
                (currentRecord?.image && serverUrl + currentRecord?.image) ||
                AllImages.dummyCover.src
              }
              width={100}
              height={100}
              alt="image"
            />
          </div>

          {/* <ReuseButton htmlType="submit" variant="secondary" className="mt-2">
            Update Workshop
          </ReuseButton> */}
          <ReuseButton htmlType="submit" variant="secondary" className="mt-2">
            Aktualizovať kurz
          </ReuseButton>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default ProfessionalEditWorkshop;
