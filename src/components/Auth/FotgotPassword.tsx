"use client";
import { Form } from "antd";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { TbLockFilled } from "react-icons/tb";
import Container from "../ui/Container";
import { useRouter } from "next/navigation";
import { IoMdMail } from "react-icons/io";
import ReuseInput from "../ui/Form/ReuseInput";
import ReuseButton from "../ui/Button/ReuseButton";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { forgetPassword } from "@/services/AuthService";

interface ForgotPasswordValues {
  email: string;
}

const inputStructure = [
  {
    name: "email",
    type: "email",
    inputType: "normal",
    // label: "Email"
    label: "E-mail",
    // placeholder: "Enter Email Name"
    placeholder: "Zadajte e-mail",
    labelClassName: "!font-semibold !text-secondary-color",
    prefix: <IoMdMail className="mr-1 !text-secondary-color" />,
    // rules: [{ required: true, message: "Email is required" }]
    rules: [{ required: true, message: "E-mail je povinný" }],
  },
];

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish = async (values: ForgotPasswordValues) => {
    const res = await tryCatchWrapper(
      forgetPassword,
      { body: values },
      {
        // toastLoadingMessage: "wait a moment..."
        toastLoadingMessage: "Chvíľu počkajte...",
        // toastSuccessMessage: "OTP sent To your email!"
        toastSuccessMessage: "Overovací kód bol odoslaný na váš e-mail!",
      }
    );
    if (res?.success) {
      form.resetFields();
      router.push("/forgot-password/otp-verify");
    }
  };
  return (
    <div className="text-base-color">
      <Container>
        <div className="min-h-screen flex justify-center items-center ">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto">
            <div className="mb-8">
              <TbLockFilled className="size-10 mb-4 text-secondary-color mx-auto" />
              <h1 className="text-3xl sm:text-4xl font-semibold text-secondary-color mb-5 text-center">
                {/* Forgot Password */}
                Zabudnuté heslo
              </h1>
              <p className=" sm:text-lg mb-2 text-[#667085] text-center">
                {/* Provide your account's email for which you want to reset your password */}
                Zadajte e-mail účtu, pre ktorý chcete obnoviť heslo
              </p>
            </div>

            <Form
              layout="vertical"
              className="bg-transparent w-full"
              form={form}
              onFinish={onFinish}
            >
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

              <Form.Item>
                <ReuseButton
                  htmlType="submit"
                  variant="secondary"
                  className="mt-5"
                >
                  {/* Send OTP */}
                  Odoslať overovací kód
                </ReuseButton>
              </Form.Item>
            </Form>

            <div className="text-base-color w-fit mx-auto mt-10">
              <Link
                href="/sign-in"
                className="flex justify-center items-center  gap-2 "
              >
                <FaArrowLeftLong className="size-4 " />
                <span>{/* Back to log in */}Späť na prihlásenie</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ForgotPassword;
