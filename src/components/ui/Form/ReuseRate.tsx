"use client";
import React from "react";
import { Form, Rate } from "antd";
import { cn } from "@/lib/utils";
import { Rule } from "antd/es/form";

interface ReuseRateProps {
  name: string;
  rules?: Rule[];
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  allowHalf?: boolean;
  className?: string;
  style?: React.CSSProperties;
  count?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const ReuseRate = ({
  name,
  rules,
  value = 0,
  onChange,
  disabled = false,
  allowHalf = true,
  className,
  style,
  count = 5,
  ...props
}: ReuseRateProps) => {
  return (
    <Form.Item name={name} rules={rules}>
      <Rate
        {...props}
        value={value}
        onChange={onChange}
        disabled={disabled}
        allowHalf={allowHalf}
        className={cn(className)}
        style={{
          color: "#ffffff",
          ...style,
        }}
        count={count}
      />
    </Form.Item>
  );
};

export default ReuseRate;
