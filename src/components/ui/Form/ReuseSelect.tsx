"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Form, Select, Typography } from "antd";
import React from "react";

const { Option } = Select;

type TSelectProps = {
  Typolevel?: 1 | 2 | 3 | 4 | 5;
  label?: React.ReactNode;
  name: string;
  rules?: Array<Record<string, any>>;
  placeholder?: string;
  disabled?: boolean;
  options: any[];
  value?: any;
  onChange?: (value: any) => void;
  allowClear?: boolean;
  showSearch?: boolean;
  mode?: "multiple" | undefined;
  wrapperClassName?: string;
  labelClassName?: string;
  selectClassName?: string;
};

const ReuseSelect = ({
  Typolevel = 5,
  label,
  name,
  rules = [],
  placeholder,
  disabled,
  options,
  value,
  onChange,
  allowClear = false,
  showSearch = false,
  mode,
  wrapperClassName,
  labelClassName,
  selectClassName,
}: TSelectProps) => {
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
      <Form.Item name={name} rules={rules}>
        <Select
          showSearch={showSearch}
          mode={mode}
          className={cn(
            "!h-10  !text-base-color !placeholder:text-[##B5B5B5] border !border-primary-color !ring-0 rounded-md ",
            selectClassName
          )}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          allowClear={allowClear}
          onChange={onChange}
        >
          {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};

export default ReuseSelect;
