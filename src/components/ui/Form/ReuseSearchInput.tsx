"use client";
import React from "react";
import ReuseInput from "./ReuseInput";
import { SearchOutlined } from "@ant-design/icons";
import { Form } from "antd";
import { cn } from "@/lib/utils";
import PendingBar from "@/components/shared/PendingBar";
import useUrlSearch from "@/hook/useUrlSearch";

interface SearchInputProps {
  placeholder: string;
  className?: string;
  inputClassName?: string;
  formClassName?: string;
  isPage?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  className = "",
  inputClassName = "",
  formClassName = "",
  isPage = true,
}) => {
  const [form] = Form.useForm();
  const { onSearchChange, isPending } = useUrlSearch(form, { resetPage: isPage });

  return (
    <div className={cn("flex gap-4 items-center", className)}>
      <PendingBar pending={isPending} label="Vyhľadáva sa…" />
      <Form form={form} className={cn(formClassName)}>
        <ReuseInput
          name="search"
          type="text"
          placeholder={placeholder}
          onChange={onSearchChange}
          inputClassName={cn(
            "!bg-primary-color !text-base-color !border-[#E1E1E1]",
            inputClassName
          )}
          prefix={<SearchOutlined className="text-[#667185] text-xl mr-2" />}
        />
      </Form>
    </div>
  );
};

export default SearchInput;
