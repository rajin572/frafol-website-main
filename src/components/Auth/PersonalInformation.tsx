/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import { Form, FormInstance } from "antd";
import ReuseButton from "../ui/Button/ReuseButton";
import { RiLockPasswordFill } from "react-icons/ri";
import ReusableForm from "../ui/Form/ReuseForm";
import ReuseInput from "../ui/Form/ReuseInput";
import { FaUser } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import Cookies from "js-cookie";

const inputStructure = [
  {
    name: "name",
    type: "text",
    inputType: "normal",
    // label: "Full Name"
    label: "Celé meno",
    // placeholder: "Enter Full Name"
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
    labelClassName: "!font-semibold !text-secondary-color",
    prefix: <IoMdMail className="mr-1 !text-secondary-color" />,
    // rules: [{ required: true, message: "Email is required" }]
    rules: [{ required: true, message: "E-mail je povinný" }],
  },
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
    label: "Potvrďte heslo",
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

const PersonalInformation = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const storedInformation = Cookies.get("information");

  const parseData = JSON.parse(storedInformation || "{}");

  form.setFieldsValue({
    name: parseData.name,
    email: parseData.email,
    password: parseData.password,
    confirmPassword: parseData.password,
  });

  const onFinish = (values: any) => {
    const personalInfo = {
      name: values.name,
      email: values.email,
      password: values.confirmPassword,
    };

    Cookies.set(
      "information",
      JSON.stringify({ ...parseData, ...personalInfo }),
      {
        expires: 1,
      }
    );
    form.resetFields();
    router.push(
      `/sign-up/professional/choose-specialization?tab=${parseData?.role === "videographer" ? "videography" : "photography"
      }`
    );
  };
  return (
    <div className=" flex flex-col justify-center gap-3 h-full w-full sm:w-3/4 mx-auto">
      <div className="mb-3">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-secondary-color mb-5">
          {/* Personal Information */}
          Osobné údaje
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-base-color">
          {/* Tell us about yourself */}
          Pokračujte zadaním svojich osobných údajov
        </p>
      </div>
      <ReusableForm handleFinish={onFinish} form={form}>
        {inputStructure.map((input, index) => (
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
        <div className="flex justify-end items-end w-full mt-5">
          <ReuseButton
            htmlType="submit"
            variant="secondary"
            className="!w-fit  sm:!text-sm lg:!text-sm !px-5 !py-2.5"
          >
            {/* Continue */}
            Pokračovať
          </ReuseButton>
        </div>
      </ReusableForm>
    </div>
  );
};
export default PersonalInformation;
