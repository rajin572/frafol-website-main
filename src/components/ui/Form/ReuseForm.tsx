"use client";
import { cn } from "@/lib/utils";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { ReactNode } from "react";

type ReusableFormProps = {
  form?: any;
  children: ReactNode;
  defaultValues?: any;
  className?: string;
  handleFinish: (values: any) => void;
  onValuesChange?: (changedValues: any, allValues: any) => void; // ✅ new

};

const ReusableForm = ({
  form,
  children,
  defaultValues,
  className,
  handleFinish,
  onValuesChange, // ✅ new
}: ReusableFormProps) => {
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={defaultValues}
      onFinish={handleFinish}
      onValuesChange={onValuesChange} // ✅ allow value tracking
      className={cn("space-y-1", className)}
      validateTrigger="onSubmit"
    >
      {children}
    </Form>
  );
};

export default ReusableForm;
