"use client";
import React from "react";
import ReuseInput from "../ui/Form/ReuseInput";
import { FiSearch } from "react-icons/fi";
import { Form } from "antd";
import PendingBar from "../shared/PendingBar";
import useUrlSearch from "@/hook/useUrlSearch";

// Category search on /photography and /videography (filters the list through ?search=).
const PhotographyPageSearch = () => {
  const [form] = Form.useForm();
  const { onSearchChange, isPending } = useUrlSearch(form);

  return (
    <div className="w-full">
      <PendingBar pending={isPending} label="Vyhľadáva sa…" />
      <Form form={form}>
        {/* placeholder="Search" */}
        <ReuseInput
          prefix={<FiSearch className="mr-1.5 size-5 text-base-color/50" />}
          name="search"
          onChange={onSearchChange}
          formItemClassName="!mb-0"
          inputClassName="!w-full !bg-white !border !border-base-color/15 hover:!border-base-color/30 focus-within:!border-secondary-color !rounded-xl !text-base-color !shadow-sm !text-base !py-3.5 !px-4"
          placeholder="Hľadať"
          type="text"
        />
      </Form>
    </div>
  );
};

export default PhotographyPageSearch;
