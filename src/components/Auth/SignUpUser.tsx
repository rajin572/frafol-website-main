/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useRouter } from "next/navigation";
import Container from "../ui/Container";
import Image from "next/image";
import { Button, Checkbox, Form, FormInstance, Input, Typography } from "antd";
import Link from "next/link";
import { allIcons, AllImages } from "../../../public/assets/AllImages";
import ReuseButton from "../ui/Button/ReuseButton";
import { RiLockPasswordFill } from "react-icons/ri";
import ReusableForm from "../ui/Form/ReuseForm";
import ReuseInput from "../ui/Form/ReuseInput";
import { FaAddressCard, FaUser } from "react-icons/fa6";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdMail } from "react-icons/io";
import { useState } from "react";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { registerUser } from "@/services/AuthService";
import ReuseDatePicker from "../ui/Form/ReuseDatePicker";
import ReuseSelect from "../ui/Form/ReuseSelect";
import { ITown } from "@/app/(Auth)/sign-up/professional/legal-invoice/page";

const userInputStructure = [
  {
    name: "name",
    type: "text",
    inputType: "normal",
    // label: "Full Name"
    label: "Celé meno",
    // placeholder: "Enter your full name"
    placeholder: "Zadajte svoje celé meno",
    labelClassName: "!font-semibold !text-secondary-color",
    prefix: <FaUser className="mr-1 !text-secondary-color" />,
    // rules: [{ required: true, message: "Name is required" }]
    rules: [{ required: true, message: "Celé meno je povinné" }],
  },
  {
    name: "email",
    type: "email",
    inputType: "normal",
    // label: "Email"
    label: "E-mail",
    // placeholder: "Enter Email Name"
    placeholder: "Zadajte svoj e-mail",
    labelClassName: "!font-bold !text-secondary-color",
    prefix: <IoMdMail className="mr-1 !text-secondary-color" />,
    // rules: [{ required: true, message: "Email is required" }]
    rules: [{ required: true, message: "E-mail je povinný" }],
  },
  {
    name: "phone",
    type: "number",
    inputType: "normal",
    // label: "Phone Number"
    label: "Telefónne číslo",
    // placeholder: "Enter your phone number"
    placeholder: "Zadajte svoje telefónne číslo",
    labelClassName: "!font-semibold !text-secondary-color",
  },
  {
    name: "address",
    type: "text",
    inputType: "normal",
    // label: "Street Address"
    label: "Ulica a číslo",
    // placeholder: "Enter Street Address"
    placeholder: "Zadajte ulicu a číslo",
    labelClassName: "!font-semibold !text-secondary-color",
    prefix: <HiLocationMarker className="mr-1 !text-secondary-color" />,
    // rules: [{ required: true, message: "Street Address is required" }]
    rules: [{ required: true, message: "Ulica a číslo sú povinné" }],
  },
  {
    name: "country",
    type: "text",
    inputType: "normal",
    // label: "Country"
    label: "Krajina",
    // placeholder: "Enter Country Name"
    placeholder: "Zadajte krajinu",
    labelClassName: "!font-bold !text-secondary-color",
    prefix: <HiLocationMarker className="mr-1 !text-secondary-color" />,
    // rules: [{ required: true, message: "Country is required" }]
    rules: [{ required: true, message: "Krajina je povinná" }],
  },
  {
    name: "zipCode",
    type: "text",
    inputType: "normal",
    // label: "Zip Code"
    label: "PSČ",
    // placeholder: "Enter Zip Code"
    placeholder: "Zadajte PSČ",
    labelClassName: "!font-semibold !text-secondary-color",
    // rules: [{ required: true, message: "Zip Code is required" }]
    rules: [{ required: true, message: "PSČ je povinné" }],
  },
];
const companyInputStructure = [
  {
    name: "name",
    type: "text",
    inputType: "normal",
    // label: "Full Name"
    label: "Celé meno",
    // placeholder: "Enter your full name"
    placeholder: "Zadajte svoje celé meno",
    labelClassName: "!font-semibold !text-secondary-color",
    prefix: <FaUser className="mr-1 !text-secondary-color" />,
    // rules: [{ required: true, message: "Name is required" }]
    rules: [{ required: true, message: "Celé meno je povinné" }],
  },
  {
    name: "companyName",
    type: "text",
    inputType: "normal",
    // label: "Company Name"
    label: "Obchodné meno",
    // placeholder: "Enter Company Name"
    placeholder: "Zadajte obchodné meno",
    labelClassName: "!font-semibold !text-secondary-color",
    prefix: <FaUser className="mr-1 !text-secondary-color" />,
    // rules: [{ required: true, message: "Company Name is required" }]
    rules: [{ required: true, message: "Obchodné meno je povinné" }],
  },
  {
    name: "email",
    type: "email",
    inputType: "normal",
    // label: "Email"
    label: "E-mail",
    // placeholder: "Enter Email Name"
    placeholder: "Zadajte svoj e-mail",
    labelClassName: "!font-semibold !text-secondary-color",
    prefix: <IoMdMail className="mr-1 !text-secondary-color" />,
    // rules: [{ required: true, message: "Email is required" }]
    rules: [{ required: true, message: "E-mail je povinný" }],
  },
  {
    name: "phone",
    type: "number",
    inputType: "normal",
    // label: "Phone Number"
    label: "Telefónne číslo",
    // placeholder: "Enter your phone number"
    placeholder: "Zadajte svoje telefónne číslo",
    labelClassName: "!font-semibold !text-secondary-color",
    // rules: [{ required: true, message: "Phone number is required" }]
    rules: [{ required: true, message: "Telefónne číslo je povinné" }],
  },
  {
    name: "ico",
    type: "text",
    inputType: "normal",
    label: "IČO",
    // placeholder: "Enter IČO"
    placeholder: "Zadajte IČO",
    labelClassName: "!font-semibold !text-secondary-color",
    prefix: <FaAddressCard className="mr-1 !text-secondary-color" />,
    // rules: [{ required: true, message: "IČO is required" }]
    rules: [{ required: true, message: "IČO je povinné" }],
  },
  {
    name: "dic",
    type: "text",
    inputType: "normal",
    label: "DIČ",
    // placeholder: "Enter DIČ"
    placeholder: "Zadajte DIČ",
    labelClassName: "!font-semibold !text-secondary-color",
    prefix: <FaAddressCard className="mr-1 !text-secondary-color" />,
    // rules: [{ required: true, message: "DIČ is required" }]
    rules: [{ required: true, message: "DIČ je povinné" }],
  },
  {
    name: "ic_dph",
    type: "text",
    inputType: "normal",
    // label: "IČ DPH (Optional)"
    label: "IČ DPH (Nepovinné)",
    // placeholder: "Enter IČ DPH"
    placeholder: "Zadajte IČ DPH",
    labelClassName: "!font-semibold !text-secondary-color",
    prefix: <FaAddressCard className="mr-1 !text-secondary-color" />,
    rules: [{ required: false, message: "IČ DPH je povinné" }],
  },
  {
    name: "address",
    type: "text",
    inputType: "normal",
    // label: "Street Address"
    label: "Ulica a číslo",
    // placeholder: "Enter Street Address"
    placeholder: "Zadajte ulicu a číslo",
    labelClassName: "!font-semibold !text-secondary-color",
    prefix: <HiLocationMarker className="mr-1 !text-secondary-color" />,
    // rules: [{ required: true, message: "Street Address is required" }]
    rules: [{ required: true, message: "Ulica a číslo sú povinné" }],
  },
  {
    name: "country",
    type: "text",
    inputType: "normal",
    // label: "Country"
    label: "Krajina",
    // placeholder: "Enter Country Name"
    placeholder: "Zadajte krajinu",
    labelClassName: "!font-semibold !text-secondary-color",
    prefix: <HiLocationMarker className="mr-1 !text-secondary-color" />,
    // rules: [{ required: true, message: "Country is required" }]
    rules: [{ required: true, message: "Krajina je povinná" }],
  },
  {
    name: "zipCode",
    type: "text",
    inputType: "normal",
    // label: "Zip Code"
    label: "PSČ",
    // placeholder: "Enter Zip Code"
    placeholder: "Zadajte PSČ",
    labelClassName: "!font-semibold !text-secondary-color",
    // rules: [{ required: true, message: "Zip Code is required" }]
    rules: [{ required: true, message: "PSČ je povinné" }],
  },
];
const passwordInputStructure = [
  {
    name: "password",
    type: "password",
    inputType: "password",
    // label: "Password"
    label: "Heslo",
    // placeholder: "Enter your password"
    placeholder: "Zadajte svoje heslo",
    prefix: <RiLockPasswordFill className="mr-1 !text-secondary-color" />,
    labelClassName: "!font-semibold !text-secondary-color",
    // rules: [{ required: true, message: "Password is required" }, { min: 8, message: "Password must be at least 8 characters" },
    rules: [{ required: true, message: "Heslo je povinné" }, { min: 8, message: "Heslo musí mať aspoň 8 znakov" },
    {
      pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/,
      // message: "Password must include at least one uppercase letter and one special character"
      message: "Heslo musí obsahovať aspoň jedno veľké písmeno a jeden špeciálny znak",
    },],
  },
  {
    name: "confirmPassword",
    type: "password",
    inputType: "password",
    // label: "Confirm Password"
    label: "Potvrdenie hesla",
    // placeholder: "Confirm your password"
    placeholder: "Potvrďte svoje heslo",
    prefix: <RiLockPasswordFill className="mr-1 !text-secondary-color" />,
    labelClassName: "!font-semibold !text-secondary-color",
    rules: [
      // { required: true, message: "Confirm Password is required" }
      { required: true, message: "Potvrdenie hesla je povinné" },
      ({
        getFieldValue,
      }: {
        getFieldValue: FormInstance["getFieldValue"];
      }) => ({
        validator(_: unknown, value: string) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          // return Promise.reject(new Error("Password does not match!"));
          return Promise.reject(new Error("Heslá sa nezhodujú!"));
        },
      }),
    ],
  },
];

const SignUpUser = ({ townData }: { townData: ITown[] }) => {
  const router = useRouter();
  const [form] = Form.useForm();

  const [type, setType] = useState<"user" | "company">("user");


  const onFinish = async (values: any) => {
    const data = {
      ...values,
      role: type,
      newsLetterSub: values?.newsLetterSub ? true : false,
    };

    const res = await tryCatchWrapper(
      registerUser,
      { body: data },
      {
        // toastLoadingMessage: "Creating account..."
        toastLoadingMessage: "Čakajte, prosím...",
        // toastSuccessMessage: "OTP sent To your email!"
        toastSuccessMessage: "Účet bol úspešne vytvorený!",
      }
    );
    if (res?.success) {
      form.resetFields();
      router.push("/sign-up/user/otp-verify");
    }

    // form.resetFields();
    // router.push("/sign-up/user/otp-verify");
  };
  return (
    <div className=" flex flex-col gap-3 h-full w-full sm:w-3/4 mx-auto">
      <div className="mb-3">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-secondary-color mb-5">
          {/* Sign Up */}
          Vytvoriť účet
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-base-color">
          {/* Tell us about yourself */}
          Zaregistrujte sa ako používateľ a nájdite fotografov a kameramanov
        </p>
      </div>
      <ReusableForm handleFinish={onFinish} form={form}  >
        <div className="mb-5">
          <Checkbox
            className="!text-lg !font-semibold"
            onChange={(e) => {
              if (e.target.checked) {
                setType("company");
                form.resetFields();
              } else {
                setType("user");
                form.resetFields();
              }
            }}
          >
            {/* Register as a company */}
            Registrovať ako spoločnosť
          </Checkbox>
        </div>
        {type !== "company"
          ? userInputStructure.map((input) => (
            <ReuseInput
              // Key includes `type` so switching user/company remounts fresh inputs
              // instead of reusing DOM nodes. Google Translate rewrites label text
              // nodes in place, and React can't update those reused nodes — which
              // left stale labels (duplicated Street/Country/Postal code) on toggle.
              key={`${type}-${input.name}`}
              name={input.name}
              Typolevel={5}
              inputType={input.inputType}
              type={input.type}
              prefix={input.prefix}
              label={input.label}
              placeholder={input.placeholder}
              labelClassName={input.labelClassName}
              inputClassName="!py-2.5"
              rules={input.rules}
            />
          ))
          : companyInputStructure.map((input) => (
            <ReuseInput
              key={`${type}-${input.name}`}
              name={input.name}
              Typolevel={5}
              inputType={input.inputType}
              type={input.type}
              prefix={input.prefix}
              label={input.label}
              placeholder={input.placeholder}
              labelClassName={input.labelClassName}
              inputClassName="!py-2.5"
              rules={input.rules}
            />
          ))}
        <ReuseSelect
          showSearch={true}
          name="town"
          // label: "Town/City"
          label="Mesto"
          // placeholder: "Select your town"
          placeholder="Vyberte svoje mesto"
          labelClassName="!text-secondary-color !font-semibold"
          // rules: [{ required: true, message: "Please select your town" }]
          rules={[{ required: true, message: "Vyberte, prosím, mesto" }]}
          options={
            townData?.map((town) => ({
              value: town.name,
              label: town.name,
            }))
          }
        />

        <ReuseDatePicker
          name="dateOfBirth"
          // label: "Date of Birth"
          label="Dátum narodenia"
          // rules: [{ required: true, message: "Date of Birth is required" }]
          rules={[{ required: true, message: "Dátum narodenia je povinný" }]}
          labelClassName="!font-semibold !text-secondary-color"
          shouldDisableDate={false}
        />

        {passwordInputStructure.map((input, index) => (
          <ReuseInput
            key={index}
            name={input.name}
            Typolevel={5}
            inputType={input.inputType}
            type={input.type}
            prefix={input.prefix}
            label={input.label}
            placeholder={input.placeholder}
            labelClassName={input.labelClassName}
            inputClassName="!py-2.5"
            rules={input.rules}
          />
        ))}

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

        {/* Agree to GDPR contract Checkbox */}
        <Form.Item
          name="contractAgreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                    new Error(/* "Should accept with GDPR contract" */ "Zaškrtnite pole a potvrďte, že ste sa oboznámili s GDPR.")
                  ),
            },
          ]}
        >
          <Checkbox
          // onChange={(e) => handleCheckboxChange(e, "contractAgreement")}
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
        <Form.Item name="newsLetterSub" valuePropName="checked">
          <Checkbox>
            <div>
              <p className="text-sm sm:text-base lg:text-lg font-semibold">
                {/* Subscribe to newsletter (optional) */}
                Prihlásiť sa na odber noviniek (voliteľné)
              </p>
            </div>
          </Checkbox>
        </Form.Item>
        <div className="flex justify-end items-end w-full mt-5">
          <ReuseButton
            htmlType="submit"
            variant="secondary"
            className="!w-fit  sm:!text-sm lg:!text-sm !px-5 !py-2.5"
          >
            {/* Create account */}
            Zaregistrovať sa
          </ReuseButton>
        </div>
      </ReusableForm>

      <div className="flex justify-center items-center gap-2.5 !py-10">
        <p>{/* Already have an account? */}Už máte účet?</p>
        <Link href="/sign-in" className="text-secondary-color font-bold">
          {/* Sign In */}
          Prihlásiť sa
        </Link>
      </div>
    </div>
  );
};
export default SignUpUser;