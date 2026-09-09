"use client";
import { Form, FormInstance } from "antd";
import Container from "../ui/Container";
import { useRouter } from "next/navigation";
import { IoMdUnlock } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import ReuseInput from "../ui/Form/ReuseInput";
import ReuseButton from "../ui/Button/ReuseButton";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { changePassword } from "@/services/AuthService";

interface UpdatePasswordValues {
  password: string;
  confirmPassword: string;
}

const inputStructure = [
  {
    name: "newPassword",
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
          if (!value || getFieldValue("newPassword") === value) {
            return Promise.resolve();
          }
          // return Promise.reject(new Error("Password does not match!"));
          return Promise.reject(new Error("Heslá sa nezhodujú!"));
        },
      }),
    ],
  },
];

const UpdatePassword = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish = async (values: UpdatePasswordValues) => {
    const res = await tryCatchWrapper(
      changePassword,
      { body: values },
      {
        // toastLoadingMessage: "wait a moment..."
        toastLoadingMessage: "Chvíľu počkajte...",
        // toastSuccessMessage: "Password changed successfully!"
        toastSuccessMessage: "Heslo bolo úspešne zmenené!",
      }
    );
    if (res?.success) {
      form.resetFields();
      router.push("/sign-in");
    }
  };

  return (
    <div>
      <Container>
        <div className="min-h-screen flex justify-center items-center">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto">
            {/* -------- update Password Page Header ------------ */}
            <div className="flex flex-col justify-center items-center">
              <div className="text-center mt-5 mb-5">
                <IoMdUnlock className="size-10 mb-4 text-secondary-color mx-auto" />
                <h1 className="text-3xl sm:text-4xl font-semibold text-secondary-color mb-5">
                  {/* Reset Your Password */}
                  Obnovte si heslo
                </h1>
              </div>
            </div>
            {/* -------- Form Start ------------ */}
            <Form
              form={form}
              layout="vertical"
              className="bg-transparent w-full"
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
                  {/* Reset Password */}
                  Obnoviť heslo
                </ReuseButton>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default UpdatePassword;
