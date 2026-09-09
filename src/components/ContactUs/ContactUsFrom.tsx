"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Form, Input, Typography } from "antd";
import ReuseButton from "../ui/Button/ReuseButton";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { contactUs } from "@/services/Others/OthersApi";

const ContactUsForm = () => {
  const [form] = Form.useForm();
  const TextArea = Input.TextArea;

  const onFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      contactUs,
      { body: values },
      {
        toastLoadingMessage: "Počkajte chvíľu...",
        toastSuccessMessage: "Správa bola úspešne odoslaná!",
        toastErrorMessage: "Niečo sa pokazilo! Skúste to, prosím, znova.",
      }
    );

    if (res?.success) {
      form.resetFields();
    }
  };
  return (
    <Form form={form} layout="vertical" className="" onFinish={onFinish}>
      {/* Full Name Input */}
      <div>
        <Typography.Title level={5} style={{ color: "#222222" }}>
          {/* Name */}
          Meno
        </Typography.Title>
        <Form.Item
          name="name"
          className="text-base-color"
          rules={[
            {
              required: true,
              message: "Celé meno je povinné.",
            },
          ]}
        >
          <Input
            placeholder="Zadajte svoje celé meno"
            className="!py-2 !px-3 !text-base !bg-[#EFEFEF] border !border-[#EFEFEF] outline-none !ring-0 !text-base-color rounded-lg "
          />
        </Form.Item>
      </div>
      {/* Email Input */}
      <div>
        <Typography.Title level={5} style={{ color: "#222222" }}>
          {/* Email */}
          E-mail
        </Typography.Title>
        <Form.Item
          name="email"
          className="text-base-color"
          rules={[
            {
              required: true,
              message: "E-mail je povinný.",
            },
          ]}
        >
          <Input
            placeholder="Zadajte svoj e-mail"
            className="!py-2 !px-3 !text-base !bg-[#EFEFEF] border !border-[#EFEFEF] outline-none !ring-0 !text-base-color rounded-lg "
          />
        </Form.Item>
      </div>
      {/* Message Input */}
      <div>
        <Typography.Title level={5} style={{ color: "#222222" }}>
          {/* Message */}
          Správa
        </Typography.Title>
        <Form.Item
          name="message"
          className="text-base-color"
          rules={[
            {
              required: true,
              message: "Správa je povinná.",
            },
          ]}
        >
          <TextArea
            placeholder="Zadajte svoju správu"
            rows={4}
            className="!py-2 !px-3 !text-base !bg-[#EFEFEF] border !border-[#EFEFEF] outline-none !ring-0 !text-base-color rounded-lg "
          />
        </Form.Item>
      </div>

      <Form.Item className="lg:col-span-2">
        <ReuseButton htmlType="submit" variant="secondary">
          <span className="text-white">{/* Send Message */}Odoslať správu</span>
        </ReuseButton>
      </Form.Item>
    </Form>
  );
};

export default ContactUsForm;