"use client";
import React from "react";
import ReuseInput from "../ui/Form/ReuseInput";
import { FiSearch } from "react-icons/fi";
import { Form } from "antd";
import PendingBar from "../shared/PendingBar";
import useUrlSearch from "@/hook/useUrlSearch";

const PhotographyPageSearch = () => {
  const [form] = Form.useForm();
  const { onSearchChange, isPending } = useUrlSearch(form);

  return (
    <div className="flex justify-end mb-3">
      <PendingBar pending={isPending} label="Vyhľadáva sa…" />
      <Form form={form}>
        {/* placeholder="Search" */}
        <ReuseInput
          prefix={<FiSearch className="text-base-color size-4.5" />}
          name="search"
          onChange={onSearchChange}
          inputClassName="!bg-background-color !rounded-lg !text-base-color !border-none !shadow-none text-lg font-semibold w-80! sm:w-96! !py-2.5"
          placeholder="Hľadať"
          type="text"
        />
      </Form>
    </div>
  );
};

export default PhotographyPageSearch;
