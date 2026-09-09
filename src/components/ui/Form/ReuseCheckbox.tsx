"use client";
import React from "react";
import { Checkbox, Form, Typography } from "antd";
import { cn } from "@/lib/utils";

type TCheckboxProps = {
  Typolevel?: 1 | 2 | 3 | 4 | 5;
  label?: React.ReactNode;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: Array<Record<string, any>>;
  disabled?: boolean;
  options?: { label: string; value: string | number | boolean | object }[]; // For multiple checkboxes
  wrapperClassName?: string;
  labelClassName?: string;
  checkboxClassName?: string;
  defaultValue?: (string | number | boolean | object)[]; // Ensure the default value is an array
};

const ReuseCheckbox = ({
  Typolevel = 5,
  label,
  name,
  rules = [],
  disabled,
  options,
  defaultValue = [], // Ensure defaultValue is passed as an array
  wrapperClassName,
  labelClassName,
  checkboxClassName,
}: TCheckboxProps) => {
  return (
    <div className={cn(wrapperClassName)}>
      {label && (
        <Typography.Title
          level={Typolevel}
          className={cn("!text-base-color !font-normal", labelClassName)}
        >
          {label}
        </Typography.Title>
      )}
      <Form.Item name={name} rules={rules} initialValue={defaultValue}>
        {options ? (
          // If there are multiple options, render them as checkboxes
          <Checkbox.Group
            disabled={disabled}
            className={cn("flex flex-col gap-2 ", checkboxClassName)}
          >
            {options.map((option, i) => (
              <Checkbox
                key={i}
                value={option.value}
                className="!text-base-color !text-sm"
              >
                {option.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        ) : (
          // If no options, render a single checkbox
          <Checkbox className={cn(checkboxClassName)} disabled={disabled}>
            {label}
          </Checkbox>
        )}
      </Form.Item>
    </div>
  );
};

export default ReuseCheckbox;
