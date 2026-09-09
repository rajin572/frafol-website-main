"use client";
import React from "react";
import ReuseButton from "../ui/Button/ReuseButton";
import { useRouter } from "next/navigation";
import ReusableForm from "../ui/Form/ReuseForm";
import { Checkbox, Form } from "antd";
import Cookies from "js-cookie";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { registerUser } from "@/services/AuthService";
import Link from "next/link";
import { formatDate } from "@/utils/dateFormet";

const ReviewDetailsAndSubmit = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const storedInformation = Cookies.get("information");

  const parseData = JSON.parse(storedInformation || "{}");
  console.log(parseData)

  const details = [
    {
      // label: "Name"
      label: "Celé meno",
      value: parseData.name || "N/A",
    },
    {
      // label: "Email"
      label: "E-mail",
      value: parseData.email || "N/A",
    },
    {
      // label: "Role"
      label: "Rola",
      value: parseData.role ? parseData.role.charAt(0).toUpperCase() + parseData.role.slice(1) : "N/A",
    },
    {
      // label: "Phone Number"
      label: "Telefónne číslo",
      value: parseData.phone || "N/A",
    },
    {
      // label: "Date of Birth"
      label: "Dátum narodenia",
      value: formatDate(parseData.dateOfBirth) || "N/A",
    },
    {
      // label: "Address"
      label: "Adresa",
      value: [parseData.address, parseData.town, parseData.country]
        .filter(Boolean)
        .join(", ") || "N/A",
    },
    {
      // label: "Zip Code"
      label: "PSČ",
      value: parseData.zipCode || "N/A",
    },
    {
      // label: "Town"
      label: "Mesto",
      value: parseData.town || "N/A",
    },
    {
      // label: "Towns I Can Travel To"
      label: "Mestá, do ktorých môžem cestovať",
      value: Array.isArray(parseData.travelTowns) && parseData.travelTowns.length > 0
        ? parseData.travelTowns.join(", ")
        : "N/A",
    },
    {
      // label: "Country"
      label: "Krajina",
      value: parseData.country || "N/A",
    },
    {
      // label: "About"
      label: "O sebe",
      value: parseData.about || "N/A",
    },
    {
      // label: "Hourly Rate"
      label: "Hodinová sadzba",
      value: parseData.minHourlyRate && parseData.maxHourlyRate
        ? `${parseData.minHourlyRate}€ - ${parseData.maxHourlyRate}€`
        : "N/A",
    },
    {
      // label: "Specializations"
      label: "Kategórie služieb",
      value: (() => {
        if (parseData?.role === "photographer") {
          return parseData.photographerSpecializations?.join(", ") || "N/A";
        } else if (parseData?.role === "videographer") {
          return parseData.videographerSpecializations?.join(", ") || "N/A";
        } else if (parseData?.role === "both") {
          return [
            ...(parseData.photographerSpecializations || []),
            ...(parseData.videographerSpecializations || []),
          ].join(", ") || "N/A";
        }
        return "N/A";
      })(),
    },
    // Company-specific fields (conditionally included)
    ...(parseData.companyName ? [{
      // label: "Company Name"
      label: "Obchodné meno",
      value: parseData.companyName,
    }] : []),
    ...(parseData.ico ? [{
      label: "IČO",
      value: parseData.ico,
    }] : []),
    ...(parseData.dic ? [{
      label: "DIČ",
      value: parseData.dic,
    }] : []),
    ...(parseData.ic_dph ? [{
      // label: "IČ DPH"
      label: "IČ DPH",
      value: parseData.ic_dph,
    }] : []),
  ];


  const onFinish = async () => {
    try {
      // Validate all fields
      const values = await form.validateFields();

      const data = { ...parseData, ...values };
      console.log(data)

      const res = await tryCatchWrapper(
        registerUser,
        { body: data },
        {
          // toastLoadingMessage: "Creating account..."
          toastLoadingMessage: "Vytvára sa účet...",
          // toastSuccessMessage: "OTP sent To your email!"
          toastSuccessMessage: "Overovací kód bol odoslaný na váš e-mail!",
        }
      );
      if (res?.success) {
        Cookies.remove("information");
        form.resetFields();
        router.push("/sign-up/professional/otp-verify");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // If validation fails, error will be caught here
    }
  };

  return (
    <div className="flex flex-col justify-center gap-3 h-full w-full sm:w-3/4 mx-auto ">
      <div className="mb-3">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-secondary-color mb-5">
          {/* Review Your Details */}
          Skontrolujte svoje údaje
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-base-color">
          {/* Please review your information before submitting */}
          Pred odoslaním si skontrolujte svoje údaje
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {details.map((detail, index) => (
          <div
            key={index}
            className={`flex flex-col justify-start items-start gap-1 ${index === 8 || index === 10 ? "md:col-span-2" : ""} `}
          >
            <p className="text-sm sm:text-sm lg:text-base font-bold text-secondary-color">
              {detail.label}
            </p>
            <p className="text-base sm:text-lg lg:text-xl font-medium ">
              {detail.value}
            </p>
          </div>
        ))}
      </div>

      <ReusableForm handleFinish={onFinish} form={form}>
        <Form.Item
          name="acceptTerms"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                    new Error(/* "Should accept with terms and conditions" */ "Zaškrtnite pole a potvrďte, že ste sa oboznámili s obchodnými podmienkami.")
                  ),
            },
          ]}
        >
          <Checkbox
          // onChange={(e) => handleCheckboxChange(e, "acceptTerms")}
          >
            <div>
              <p className="text-sm sm:text-base lg:text-lg font-semibold">
                {/* Agree to terms and conditions */}
                Súhlasím s obchodnými podmienkami
              </p>
              <p className="text-sm sm:text-sm lg:text-base">
                {/* By creating an account, you agree to our */}
                Vytvorením účtu súhlasíte s našimi{" "}
                <Link href="/terms-of-service" target="_blank" className="text-secondary-color! underline">
                  {/* Terms of Service Conceptural */}
                  Všeobecné obchodné podmienky Zmluvné vzťahy
                </Link>{" "}
                {/* and */}
                a{" "}
                <Link href="/terms-of-service-marketplace" target="_blank" className="text-secondary-color! underline">
                  {/* Všeobecné obchodné podmienky Online trh. */}
                  Obchodné podmienky Marketplace.
                </Link>
              </p>
            </div>
          </Checkbox>
        </Form.Item>

        {/* Agree to rámcová zmluva contract Checkbox */}
        <Form.Item
          name="ramcuvaAgree"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                    new Error(/* "Should accept with rámcová zmluva contract" */ "Zaškrtnite pole a potvrďte, že ste sa oboznámili s GDPR.")
                  ),
            },
          ]}
        >
          <Checkbox
          // onChange={(e) => handleCheckboxChange(e, "ramcuvaAgree")}
          >
            <div>
              <p className="text-sm sm:text-base lg:text-lg font-semibold">
                {/* Agree to */}
                Súhlasím so{" "}
                <Link href="/data-protection" target="_blank" className="text-secondary-color! underline">
                  {/* GDPR */}
                  GDPR
                </Link>{" "}
                {/* contract */}
                zmluvou
              </p>
            </div>
          </Checkbox>
        </Form.Item>

        {/* Subscribe to newsletter Checkbox */}
        {/* <Form.Item name="newsLetterSub" valuePropName="checked">
          <Checkbox>
            <div>
              <p className="text-sm sm:text-base lg:text-lg font-semibold">
                Subscribe to newsletter (optional)
              </p>
            </div>
          </Checkbox>
        </Form.Item> */}

        <div className="flex justify-end items-end w-full mt-5">
          <ReuseButton
            variant="secondary"
            className="!w-fit  sm:!text-sm lg:!text-sm !px-5 !py-2.5 mb-5!"
            htmlType="submit"
          >
            {/* Submit */}
            Odoslať
          </ReuseButton>
        </div>
      </ReusableForm>
    </div>
  );
};

export default ReviewDetailsAndSubmit;