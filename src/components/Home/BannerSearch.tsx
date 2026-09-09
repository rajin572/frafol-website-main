/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form, Input } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { FiSearch } from "react-icons/fi";

const BannerSearch = () => {
  const router = useRouter();
  const handleSearch = (values: any) => {
    router.push(`/professionals?search=${values.search}`);
  };
  return (
    <div>
      <Form
        onFinish={handleSearch}
        className="flex items-center  shadow !bg-background-color !rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 "
      >
        {/* Google Autocomplete SearchBox */}
        <Form.Item name="search" className="!m-0 !p-0 w-full">
          <Input
            placeholder="Hľadať..."
            className="!bg-background-color !rounded-full !text-base-color !ring-0 !outline-none !border-none !shadow-none !text-lg !font-semibold w-full sm:!w-96 lg:!w-[500px] !py-2"
          />
        </Form.Item>

        <button
          type="submit"
          className="bg-secondary-color p-1.5 rounded-md -ml-10 cursor-pointer z-20"
        >
          <FiSearch className="text-primary-color size-4.5" />
        </button>
      </Form>
    </div>
  );
};

export default BannerSearch;
