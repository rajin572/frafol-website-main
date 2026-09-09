/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "@/components/ui/Form/ReuseForm";
import ReuseInput from "@/components/ui/Form/ReuseInput";
import ReuseDatePicker from "@/components/ui/Form/ReuseDatePicker";
import ReuseButton from "@/components/ui/Button/ReuseButton";
import { useEffect, useState } from "react";
import { IEventOrder } from "@/types";
import { acceptCustomOrder } from "@/services/EventOrderService/EventOrderServiceApi";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import dayjs from "dayjs";
const EventCreateOrderModal = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  serviceCharge,
  minServiceCharge
}: {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IEventOrder | null;
  serviceCharge: number;
  minServiceCharge: number
}) => {
  const [form] = Form.useForm();
  const priceValue = Form.useWatch("price", form) || 0;
  const vatAmountValue = Form.useWatch("vatAmount", form) || 0;
  const [priceWithServiceCharge, setPriceWithServiceCharge] =
    useState<number>(0);

  useEffect(() => {
    const serviceChagePercentage = serviceCharge / 100;
    const vatAmountPercentage = vatAmountValue / 100;

    const serviceChargeAmmount = Number(priceValue) * serviceChagePercentage;

    const totalServiceCharge = serviceChargeAmmount > minServiceCharge ? serviceChargeAmmount : minServiceCharge;
    const totalVatAmount = Number(priceValue) * vatAmountPercentage;

    setPriceWithServiceCharge(Number(priceValue) + Number(totalServiceCharge));

    const mainPriceValue =
      Number(priceValue) + totalServiceCharge + totalVatAmount;

    console.log({
      serviceChagePercentage,
      vatAmountPercentage,
      totalServiceCharge,
      totalVatAmount,
      mainPriceValue
    })

    form.setFieldValue("totalPrice", Number(mainPriceValue?.toFixed(2)));
  }, [form, minServiceCharge, priceValue, serviceCharge, vatAmountValue]);

  const onSubmit = async (values: any) => {
    // Ensure date is correctly formatted before sending to API
    const formattedDate = values?.["date "]
      ? dayjs(values["date "]).format("YYYY-MM-DD")
      : null; // Format the Day.js object

    // Prepare the data object
    const data = {
      price: Number(values.price),
      vatAmount: Number(values.vatAmount),
      priceWithServiceFee: Number(priceWithServiceCharge),
      totalPrice: Number(values.totalPrice),
      deliveryDate: formattedDate,
      description: values.description,
    };

    // Try catching API call and handling errors
    const res = await tryCatchWrapper(
      acceptCustomOrder,
      {
        params: currentRecord?._id,
        body: data,
      },
      {
        toastLoadingMessage: "Adding new package...",
        toastSuccessMessage: "Package added successfully!",
        toastErrorMessage: "Something went wrong! Please try again.",
      }
    );

    console.log(res)

    if (res?.success) {
      form.resetFields();
      setPriceWithServiceCharge(0);
      handleCancel(); // Handle cancel if the request is successful
    }
  };

  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-2">
        Create Order for Lívia Nováková
      </h3>
      <h3 className="text-sm sm:text-sm lg:text-base xl:text-lg font-medium mb-5">
        Fill in the pricing and delivery details for this booking.
      </h3>

      <ReusableForm form={form} handleFinish={onSubmit}>
        <div className="grid grid-cols-1  gap-1">
          <ReuseInput
            name="price"
            /* label="Total Price (€)" */
            label="Celková cena (€)"
            placeholder="Enter Total Price"
            rules={[{ required: true, message: "Total Price is required" }]}
            labelClassName="!font-semibold"
          />
          <ReuseInput
            name="vatAmount"
            label="VAT Amount (%) (Optional)"
            placeholder="Enter VAT Amount"
            // rules={[{ required: true, message: "VAT Amount is required" }]}
            labelClassName="!font-semibold"
          />
          <ReuseInput
            name="totalPrice"
            label="Package Price After Adding Service Fee and VAT"
            placeholder="Enter Package Price"
            disabled
            type="number"
            rules={[{ required: true, message: "Package Price is required" }]}
            labelClassName="!font-semibold"
          />{" "}
          <ReuseDatePicker
            name="date "
            label="Delivery Date"
            rules={[{ required: true, message: "Delivery Date is required" }]}
            labelClassName="!font-semibold"
          />
        </div>
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
        <ReuseButton htmlType="submit" variant="secondary" className="mt-2">
          Create Order
        </ReuseButton>
      </ReusableForm>
    </Modal>
  );
};

export default EventCreateOrderModal;
