/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { TimePicker } from "antd";
import { Typography, Form } from "antd";
import { Rule } from "antd/es/form";
import { cn } from "@/lib/utils";
import dayjs from "dayjs"; // Import dayjs for date comparison

interface ReuseTimePickerProps {
  label?: React.ReactNode;
  name: string;
  rules?: Rule[];
  value?: any;
  onChange?: (time: any, timeString: string | string[]) => void; // Ensure proper type for onChange
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  format?: string;
  placeholder?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  date: string | null; // Optional date prop to pass the selected date
}

// rc-picker eases the selected time into view by 1/3 of the remaining distance per frame
// (~15 frames) when the popup opens and after every pick, which feels sluggish. Jumping
// straight to the selected cell makes it instant: rc then sees it is already at the target
// and stops its own animation. Runs a frame later so the "selected" class is up to date.
const jumpToSelectedTime = () => {
  requestAnimationFrame(() => {
    document
      .querySelectorAll<HTMLElement>(".frafol-time-popup .ant-picker-time-panel-column")
      .forEach((column) => {
        const selected = column.querySelector<HTMLElement>(".ant-picker-time-panel-cell-selected");
        const first = column.querySelector<HTMLElement>("li");
        if (selected && first) column.scrollTop = selected.offsetTop - first.offsetTop;
      });
  });
};

const ReuseTimePicker = ({
  label,
  name,
  rules,
  value,
  onChange,
  disabled = false,
  className,
  style,
  format = "HH:mm",
  placeholder = "Select time",
  labelClassName,
  wrapperClassName,
  date, // If no date is provided, we treat it as null
}: ReuseTimePickerProps) => {
  // After picking an hour/minute (or "Now"), skip rc-picker's slow scroll animation.
  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          ".frafol-time-popup .ant-picker-time-panel-cell, .frafol-time-popup .ant-picker-now-btn"
        )
      ) {
        jumpToSelectedTime();
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Function to disable times before current time if date is today
  const disabledTime = () => {
    if (!date) return {}; // If no date is selected, allow all times

    const selectedDate = dayjs(date);
    const today = dayjs();

    // If the selected date is today, disable times before the current time
    if (selectedDate.isSame(today, "day")) {
      return {
        disabledHours: () => {
          const hours = [];
          for (let i = 0; i < today.hour(); i++) {
            hours.push(i);
          }
          return hours;
        },
        disabledMinutes: (selectedHour: number) => {
          const minutes = [];
          if (selectedHour === today.hour()) {
            for (let i = 0; i < today.minute(); i++) {
              minutes.push(i);
            }
          }
          return minutes;
        },
        disabledSeconds: (selectedHour: number, selectedMinute: number) => {
          const seconds = [];
          if (
            selectedHour === today.hour() &&
            selectedMinute === today.minute()
          ) {
            for (let i = 0; i < today.second(); i++) {
              seconds.push(i);
            }
          }
          return seconds;
        },
      };
    }

    // If the selected date is in the future, allow any time
    return {};
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
        <TimePicker
          value={value}
          onChange={(time, timeString) => {
            if (onChange) {
              onChange(time, timeString); // Correctly pass the time and timeString
            }
          }}
          disabled={disabled}
          className={cn(
            "!py-1.5 !px-3 !text-lg !bg-[#EFEFEF] border !border-[#EFEFEF]  !text-base-color rounded-lg w-full",
            className
          )}
          style={style}
          format={format}
          placeholder={placeholder}
          // Prevent the mobile keyboard from opening (it covers the panel on tablets/phones)
          inputReadOnly
          // Opening: put the columns on the selected time right away instead of easing in.
          onOpenChange={(open) => {
            if (open) {
              jumpToSelectedTime();
              setTimeout(jumpToSelectedTime, 60); // popup may mount a tick later
            }
          }}
          // Scoped popup class: bigger touch targets + stops scroll from leaking to the page (see globals.css)
          popupClassName="frafol-time-popup"
          disabledTime={date ? disabledTime : undefined} // Disable time selection logic based on the date
        />
      </Form.Item>
    </div>
  );
};

export default ReuseTimePicker;
