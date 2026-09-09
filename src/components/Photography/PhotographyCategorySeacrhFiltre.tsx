/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { ChangeEvent, useEffect, useRef } from "react";
import ReuseInput from "../ui/Form/ReuseInput";
import { FiSearch } from "react-icons/fi";
import { IoFilter } from "react-icons/io5";
import { Form, Typography } from "antd";
// import ReuseDatePicker from "../ui/Form/ReuseDatePicker";
import ReuseButton from "../ui/Button/ReuseButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ReusableForm from "../ui/Form/ReuseForm";
import ReuseDatePicker from "../ui/Form/ReuseDatePicker";
import dayjs from "dayjs";
import ReuseSelect from "../ui/Form/ReuseSelect";
import { ITown } from "@/app/(Auth)/sign-up/professional/legal-invoice/page";

const PhotographyCategorySeacrhFiltre = ({ townData }: { townData: ITown[] }) => {
  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const { replace } = router;

  const inputRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = React.useState(0);
  const [filter, setFilter] = React.useState(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounceSearch(e.target.value);
  };

  useEffect(() => {
    const townsParam = searchParams.get("towns");
    form.setFieldsValue({
      min: searchParams.get("min"),
      max: searchParams.get("max"),
      search: searchParams.get("search"),
      date: searchParams.get("availity") ? dayjs(searchParams.get("availity"), "YYYY-MM-DD") : null,
      towns: townsParam ? townsParam.split(",") : [],
    });
  }, [searchParams, form]);



  const debounceSearch = debounce((value: string) => {
    const text = value;
    const params = new URLSearchParams(searchParams);
    if (text) {
      params.set("search", text);
    } else {
      params.delete("search");
    }

    replace(`${pathName}?${params.toString()}`, { scroll: false });
  }, 200);

  function debounce<T extends (...args: any[]) => void>(
    this: void, // Explicitly type `this` as `void`
    func: T,
    wait: number
  ) {
    let timeout: NodeJS.Timeout;
    return function (...args: Parameters<T>) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait); // Use spread operator for arguments
    };
  }

  useEffect(() => {
    if (filter && inputRef.current) {
      setHeight(inputRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [filter]);

  const handleFinish = (values: any) => {
    const params = new URLSearchParams(searchParams);
    if (values.min) {
      params.set("min", values.min);
    } else {
      params.delete("min");
    }
    if (values.max) {
      params.set("max", values.max);
    } else {
      params.delete("max");
    }
    if (values?.date) {
      params.set("availity", values?.date?.format("YYYY-MM-DD"));
    } else {
      params.delete("availity");
    }
    if (values?.towns?.length > 0) {
      params.set("towns", values.towns.join(","));
    } else {
      params.delete("towns");
    }
    replace(`${pathName}?${params.toString()}`, { scroll: false });

    setFilter(false);
  };
  const HandleReset = () => {
    const params = new URLSearchParams(searchParams);

    form.resetFields();

    params.delete("search");
    params.delete("min");
    params.delete("max");
    params.delete("availity");
    params.delete("towns");
    // params.delete("condition");

    replace(`${pathName}?${params.toString()}`, { scroll: false });

    setFilter(false);
  };

  return (
    <div className="">
      <ReuseInput
        prefix={<FiSearch className="text-base-color size-5" />}
        suffix={
          <IoFilter
            onClick={() => setFilter((prev) => !prev)}
            className="text-secondary-color size-5 cursor-pointer"
          />
        }
        onChange={handleSearch}
        name="search"
        inputClassName="!bg-background-color !rounded-lg !text-base-color !border-none !shadow-none text-lg font-semibold !w-full lg:!w-96 !py-2.5"
        /* placeholder="Search" */
        placeholder="Hľadať"
        type="text"
      />
      <div className="relative z-20! -mt-5">
        <div
          ref={inputRef}
          style={{
            height: `${height}px`,
            overflow: "hidden",
            transition: "height 0.5s ease",
          }}
          className="absolute top-0 w-full bg-primary-color rounded-md shadow"
        >
          <ReusableForm form={form} handleFinish={handleFinish}>
            <div className="w-full p-4">
              {/* <ReuseInput
                name="town"
                label="Town"
                placeholder="Town"
                type="text"
              /> */}
              <Typography.Title
                level={5}
                className="!text-base-color !font-normal"
              >
                {/* Price Range */}
                Cenové rozpätie
              </Typography.Title>
              <div className="flex items-center gap-3">
                <ReuseInput name="min" placeholder="Min" type="text" />
                <ReuseInput name="max" placeholder="Max" type="text" />
              </div>
              {/* <ReuseDatePicker name="date" label="Available Date" /> */}
              <ReuseDatePicker name="date" label="Dátum" />

              {townData && townData.length > 0 && (
                <ReuseSelect
                  mode="multiple"
                  name="towns"
                  /* label="Towns" */
                  label="Mestá"
                  /* placeholder="Select towns" */
                  placeholder="Vyberte mestá"
                  labelClassName="!text-base-color !font-normal"
                  allowClear={true}
                  selectClassName="!h-auto !min-h-10"
                  options={townData.map((town) => ({
                    value: town.name,
                    label: town.name,
                  }))}
                />
              )}

              <p
                className="cursor-pointer text-secondary-color text-end mb-5 font-semibold !text-sm sm:!text-sm lg:!text-base"
                onClick={HandleReset}
              >
                {/* Reset */}
                Obnoviť
              </p>
              <ReuseButton
                htmlType="submit"
                variant="secondary"
                className="w-full !text-sm sm:!text-sm lg:!text-base"
              >
                {/* Apply Filters */}
                Použiť filtre
              </ReuseButton>
            </div>
          </ReusableForm>
        </div>
      </div>
    </div>
  );
};

export default PhotographyCategorySeacrhFiltre;
