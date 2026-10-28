/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Form } from "antd";
import ReusableForm from "@/components/ui/Form/ReuseForm";
import ReuseInput from "@/components/ui/Form/ReuseInput";
import ReuseButton from "@/components/ui/Button/ReuseButton";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { requestDeleteAccount } from "@/services/ProfileService/ProfileServiceApi";

export type TDeleteAccountStatus = {
  deleteRequestStatus: "none" | "pending" | "approve" | "rejected";
  deleteRequestReason?: string | null;
  deleteRequestedAt?: string | null;
};

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

const DeleteAccountPage = ({
  deleteStatus,
}: {
  deleteStatus: TDeleteAccountStatus | null;
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      requestDeleteAccount,
      { body: { reason: values.reason, password: values.password } },
      {
        toastLoadingMessage: "Odosiela sa žiadosť...",
        toastSuccessMessage: "Žiadosť o odstránenie účtu bola odoslaná!",
      }
    );
    if (res?.success) {
      form.resetFields();
    }
  };

  const reqStatus = deleteStatus?.deleteRequestStatus;

  const isRejectedVisible =
    reqStatus === "rejected" &&
    deleteStatus?.deleteRequestedAt &&
    Date.now() - new Date(deleteStatus.deleteRequestedAt).getTime() <
    TWENTY_FOUR_HOURS;

  const showBanner = reqStatus === "pending" || isRejectedVisible;

  return (
    <div className="lg:w-[70%] mt-10">
      {/* Status Banner */}
      {showBanner && (
        <div
          className={`mb-6 p-4 rounded-lg border ${reqStatus === "pending"
            ? "bg-yellow-50 border-yellow-300"
            : "bg-red-50 border-red-300"
            }`}
        >
          <div className="flex items-center gap-3 mb-1">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${reqStatus === "pending"
                ? "bg-yellow-200 text-yellow-900"
                : "bg-red-200 text-red-900"
                }`}
            >
              {reqStatus === "pending" ? "Čakajúce" : "Zamietnuté"}
            </span>
            <span
              className={`text-sm font-medium ${reqStatus === "pending" ? "text-yellow-800" : "text-red-800"
                }`}
            >
              {reqStatus === "pending"
                ? "Vaša žiadosť o vymazanie účtu sa posudzuje."
                : "Vaša žiadosť o vymazanie účtu bola zamietnutá."}
            </span>
          </div>
          {deleteStatus?.deleteRequestReason && (
            <p
              className={`mt-1 text-sm ${reqStatus === "pending" ? "text-yellow-700" : "text-red-700"
                }`}
            >
              <span className="font-medium">Váš dôvod:</span>{" "}
              {deleteStatus.deleteRequestReason}
            </p>
          )}
        </div>
      )}

      {/* Warning box */}
      <div className="mb-8 p-4 rounded-lg bg-red-50 border border-red-200">
        <h3 className="text-red-700 font-semibold text-base mb-2">
          Upozornenie: Túto akciu nie je možné vrátiť späť
        </h3>
        <ul className="text-red-600 text-sm list-disc list-inside space-y-1">
          <li>
            Všetky údaje z vášho profilu, objednávky a história budú natrvalo odstránené.
          </li>
          <li>
            Stratíte prístup ku všetkým službám spojeným s týmto účtom.
          </li>
          <li>
            Pred spracovaním vašu žiadosť skontroluje náš tím.
          </li>
        </ul>
      </div>

      {/* Form */}
      <h2 className="text-lg font-semibold text-base-color mb-4">
        Požiadať o odstránenie účtu
      </h2>
      <ReusableForm form={form} handleFinish={onFinish}>
        <ReuseInput
          name="reason"
          inputType="textarea"
          rows={5}
          label="Dôvod odstránenia účtu"
          placeholder="Uveďte dôvod, prečo chcete odstrániť svoj účet..."
          labelClassName="!font-medium"
          rules={[
            {
              required: true,
              message: "Uveďte dôvod odstránenia účtu",
            },
          ]}
          disabled={reqStatus === "pending"}
        />
        <ReuseInput
          name="password"
          Typolevel={5}
          inputType="password"
          type="password"
          label="Pre pokračovanie potvrďte svoje heslo"
          placeholder="Zadajte svoje aktuálne heslo"
          labelClassName="!font-medium"
          inputClassName="!py-2"
          rules={[{ required: true, message: "Potvrďte svoje heslo" }]}
          disabled={reqStatus === "pending"}
        />
        <ReuseButton
          htmlType="submit"
          variant="error"
          className="mt-2"
          disabled={reqStatus === "pending"}
        >
          {reqStatus === "pending"
            ? "Request Already Pending"
            : "Požiadať o odstránenie účtu"}
        </ReuseButton>
      </ReusableForm>
    </div>
  );
};

export default DeleteAccountPage;
