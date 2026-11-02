"use client";
import React from "react";
import { ConfigProvider, ThemeConfig } from "antd";
import { calendarLocale, pickerLocale, timePickerLocale } from "@/utils/pickerLocale";

// Slovak date pickers and calendars (month names, weekday names, Monday first, "Dnes" / "Teraz").
// Only the date related parts of antd are translated here, the rest of antd keeps its defaults.
const AntdLocaleProvider = ({
  theme,
  children,
}: {
  theme: ThemeConfig;
  children: React.ReactNode;
}) => (
  <ConfigProvider
    theme={theme}
    locale={{
      locale: "sk",
      Image: { preview: "Náhľad" },
      DatePicker: pickerLocale,
      TimePicker: timePickerLocale,
      Calendar: calendarLocale,
    }}
  >
    {children}
  </ConfigProvider>
);

export default AntdLocaleProvider;
