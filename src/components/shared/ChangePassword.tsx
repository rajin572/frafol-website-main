/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormInstance } from "antd";
import ReusableForm from "../ui/Form/ReuseForm";
import ReuseInput from "../ui/Form/ReuseInput";
import ReuseButton from "../ui/Button/ReuseButton";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { changeUserPassword } from "@/services/AuthService";
import { useRouter } from "next/navigation";

const inputStructure = [
  {
    name: "currentPassword",
    type: "password",
    inputType: "password",
    label: "Current password",
    placeholder: "Enter your current password",
    labelClassName: "!font-medium",
    inputClassName: "!py-2",
    rules: [{ required: true, message: "Current password is required" }],
    showPasswordToggle: true,
  },
  {
    name: "newPassword",
    type: "password",
    inputType: "password",
    label: "New password",
    placeholder: "Enter your new password",
    labelClassName: "!font-medium",
    inputClassName: "!py-2",
    rules: [{ required: true, message: "Password is required" }, { min: 8, message: "Password must be at least 8 characters" },
    {
      pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/,
      message: "Password must include at least one uppercase letter and one special character",
    },],
    showPasswordToggle: true,
  },
  {
    name: "confirmNewPassword",
    type: "password",
    inputType: "password",
    label: "Confirm New password",
    placeholder: "Enter your new password again",
    labelClassName: "!font-medium",
    inputClassName: "!py-2",
    rules: [
      { required: true, message: "Confirm Password is required" },
      ({
        getFieldValue,
      }: {
        getFieldValue: FormInstance["getFieldValue"];
      }) => ({
        validator(_: unknown, value: string) {
          if (!value || getFieldValue("newPassword") === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("Password does not match!"));
        },
      }),
    ],
    showPasswordToggle: true,
  },
];

const ChangePassword = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const data = {
      oldPassword: values.currentPassword,
      newPassword: values.confirmNewPassword,
    };

    const res = await tryCatchWrapper(
      changeUserPassword,
      {
        body: data,
      },
      {
        toastLoadingMessage: "wait a moment...",
        toastSuccessMessage: "Password changed successfully!",
      }
    );

    if (res?.success) {
      router?.push("/sign-in");
    }
  };
  return (
    <div className="lg:w-[70%] mt-20">
      <ReusableForm form={form} handleFinish={onFinish}>
        {inputStructure?.map((input, index) => (
          <ReuseInput
            key={index}
            name={input.name}
            Typolevel={5}
            inputType={input.inputType}
            type={input.type}
            label={input.label}
            placeholder={input.placeholder}
            labelClassName={input.labelClassName}
            inputClassName={input.inputClassName}
            rules={input.rules}
          />
        ))}
        <ReuseButton
          htmlType="submit"
          variant="secondary"
          className="w-full mt-4"
        >
          Change Password
        </ReuseButton>
      </ReusableForm>
    </div>
  );
};

export default ChangePassword;
