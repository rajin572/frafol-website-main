"use client";
import { ConfigProvider, Select } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Define types for the props
interface YearOptionProps {
  currentYear: number;
}

interface YearOption {
  value: string;
  label: string;
}

const YearOption: React.FC<YearOptionProps> = ({ currentYear }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const { replace } = router;

  const [yearOptions, setYearOptions] = useState<YearOption[]>([]); // Type state as an array of YearOption objects

  useEffect(() => {
    const startYear = 2020;
    const yearRange: YearOption[] = [];

    // Add the years to the list
    for (let i = startYear; i <= currentYear; i++) {
      yearRange.push({ value: i.toString(), label: i.toString() });
    }

    setYearOptions(yearRange);
  }, [currentYear]);

  const setThisYear = (year: string) => {
    const text = year;

    const params = new URLSearchParams(searchParams);
    if (text) {
      params.set("year", text);
    } else {
      params.delete("year");
    }

    replace(`${pathName}?${params.toString()} `, { scroll: false });
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            colorTextQuaternary: "#AD2B08",
            fontSize: 16,
            borderRadius: 10,
            colorBorder: "#FFFFFF",
            colorText: "#AD2B08",
            colorIcon: "#AD2B08",
            colorBgContainer: "rgba(0,0,0,0)",
            colorBgElevated: "#FFFFFF",
            selectorBg: "#FFFFFF",
            colorTextPlaceholder: "#AD2B08",
            optionSelectedColor: "#ffffff",
            optionSelectedBg: "#AD2B08",
            optionActiveBg: "#AD2B0855",
          },
        },
      }}
    >
      <Select
        defaultValue={currentYear.toString()}
        style={{ width: 100 }}
        options={yearOptions}
        onChange={(value) => setThisYear(value)}
      />
    </ConfigProvider>
  );
};

export default YearOption;
