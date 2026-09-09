/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { DatePicker } from "antd";
import { Typography, Form } from "antd";
import { Rule } from "antd/es/form";
import { cn } from "@/lib/utils";
import { CiCalendarDate } from "react-icons/ci";
import dayjs from "dayjs";

interface ReuseDatePickerProps {
  label?: React.ReactNode;
  name: string;
  rules?: Rule[];
  value?: any;
  onChange?: (date: any, dateString: string | string[]) => void; // Updated type for onChange
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  format?: string;
  placeholder?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  unAllowedDate?: string[];
  shouldDisableDate?: boolean
}

const ReuseDatePicker = ({
  label,
  name,
  rules,
  value,
  onChange,
  disabled = false,
  className,
  style,
  /* placeholder = "Select date", */
  placeholder = "Vyberte dátum",
  labelClassName,
  wrapperClassName,
  unAllowedDate,
  shouldDisableDate = true

}: ReuseDatePickerProps) => {
  const disabledDate = (current: any) => {
    if (!current) return false;

    // Disable all dates before today
    const isPastDate = current.isBefore(dayjs().startOf('day'));

    // Disable unavailable dates from the array
    const isUnavailable = unAllowedDate?.some((dateStr) => {
      return current.isSame(dayjs(dateStr), 'day');
    });

    return isPastDate || isUnavailable;
  };

  return (
    <div className={cn(wrapperClassName)}>
      {label && (
        <Typography.Title
          level={5}
          className={cn("!text-base-color !font-normal", labelClassName)}
        >
          {label}
        </Typography.Title>
      )}
      <Form.Item name={name} rules={rules}>
        <DatePicker
          format="DD-MM-YYYY"
          suffixIcon={<CiCalendarDate className="!text-secondary-color" />}
          value={value}
          onChange={(date, dateString) => {
            if (onChange) {
              onChange(date, dateString); // Handle both string and string[] for dateString
            }
          }}
          disabled={disabled}
          className={cn(
            "!py-1.5 !px-3 !text-lg !bg-[#EFEFEF] border !border-[#EFEFEF]  !text-base-color rounded-lg w-full",
            className
          )}
          style={style}
          placeholder={placeholder}
          disabledDate={shouldDisableDate ? disabledDate : undefined} // Disable previous dates, months, and years
        />
      </Form.Item>
    </div>
  );
};

export default ReuseDatePicker;
