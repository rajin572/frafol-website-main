"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect } from "react";
import ReuseInput from "../ui/Form/ReuseInput";
import { FiSearch } from "react-icons/fi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Form } from "antd";

const PhotographyPageSearch = () => {
  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const { replace } = router;

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounceSearch(e.target.value);
  };

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
    const text = searchParams.get("search");
    if (text) {
      form.setFieldsValue({ search: text });
    } else {
      form.resetFields();
    }
  }, [searchParams, form]);

  return (
    <div className="flex justify-end mb-3">
      <Form form={form}>
        {/* placeholder="Search" */}
        <ReuseInput
          prefix={<FiSearch className="text-base-color size-4.5" />}
          name="search"
          onChange={handleSearch}
          inputClassName="!bg-background-color !rounded-lg !text-base-color !border-none !shadow-none text-lg font-semibold w-80! sm:w-96! !py-2.5"
          placeholder="Hľadať"
          type="text"
        />
      </Form>
    </div>
  );
};

export default PhotographyPageSearch;
