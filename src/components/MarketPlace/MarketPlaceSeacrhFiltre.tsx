/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { ChangeEvent, useEffect, useRef } from "react";
import ReuseInput from "../ui/Form/ReuseInput";
import { FiSearch } from "react-icons/fi";
import { IoFilter } from "react-icons/io5";
import { Form, Typography } from "antd";
import ReuseButton from "../ui/Button/ReuseButton";
import ReuseSelect from "../ui/Form/ReuseSelect";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ReusableForm from "../ui/Form/ReuseForm";

const MarketPlaceSeacrhFiltre = () => {
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
    form.setFieldsValue({
      min: searchParams.get("min"),
      max: searchParams.get("max"),
      category: searchParams.get("category"),
      search: searchParams.get("search"),
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
    if (values.condition) {
      params.set("condition", values.condition);
    } else {
      params.delete("condition");
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
    params.delete("condition");

    replace(`${pathName}?${params.toString()}`, { scroll: false });

    setFilter(false);
  };
  return (
    <div>
      <ReusableForm
        form={form}
        handleFinish={handleFinish}
        className="w-full !p-0"
      >
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
          placeholder="Hľadať..."
          type="text"
        />
        <div className="relative z-10! -mt-5 ">
          <div
            ref={inputRef}
            style={{
              height: `${height}px`,
              overflow: "hidden",
              transition: "height 0.5s ease",
            }}
            className="absolute top-0 w-full bg-primary-color rounded-md shadow"
          >
            <div className=" !p-4">
              <Typography.Title
                level={5}
                className="!text-base-color !font-normal"
              >
                {/* Price Range */} Cenové rozpätie
              </Typography.Title>
              <div className="flex items-center gap-3">
                <ReuseInput name="min" placeholder="Min" type="text" />
                <ReuseInput name="max" placeholder="Max" type="text" />
              </div>
              <ReuseSelect
                name="condition"
                // label="Condition"
                label="Stav"
                // placeholder="Condition"
                placeholder="Stav"
                options={[
                  {
                    value: "new",
                    label: "Nové",
                  },
                  {
                    value: "used",
                    label: "Použité",
                  },
                ]}
              />
              <p
                className="cursor-pointer text-secondary-color text-end mb-5 font-semibold !text-sm sm:!text-sm lg:!text-base"
                onClick={HandleReset}
              >
                Obnoviť
              </p>
              <ReuseButton
                htmlType="submit"
                variant="secondary"
                className="w-full !text-sm sm:!text-sm lg:!text-base"
              >
                Použiť filtre
              </ReuseButton>
            </div>
          </div>
        </div>
      </ReusableForm>
    </div>
  );
};

export default MarketPlaceSeacrhFiltre;
