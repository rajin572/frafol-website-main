"use client";
import React, { ChangeEvent, useEffect, useRef, useTransition } from "react";
import ReuseInput from "./ReuseInput";
import { SearchOutlined } from "@ant-design/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Form } from "antd";
import { cn } from "@/lib/utils";
import PendingBar from "@/components/shared/PendingBar";

interface SearchInputProps {
  placeholder: string;
  className?: string;
  inputClassName?: string;
  formClassName?: string;
  isPage?: boolean;
}

const SEARCH_DEBOUNCE_MS = 300;

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  className = "",
  inputClassName = "",
  formClassName = "",
  isPage = true,
}) => {
  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const { replace } = router;
  const [isPending, startTransition] = useTransition();
  // One timer for the lifetime of the component. (A debounce function created in the render body
  // gets a new timer on every render, so a quick typist could still fire several requests.)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      // Read the URL at the moment of searching, not at render time, so other params (tab,
      // filters) changed meanwhile are kept.
      const params = new URLSearchParams(window.location.search);
      if (text) {
        params.set("search", text);
        if (isPage) {
          params.set("page", "1");
        }
      } else {
        params.delete("search");
      }

      startTransition(() => {
        replace(`${pathName}?${params.toString()}`, { scroll: false });
      });
    }, SEARCH_DEBOUNCE_MS);
  };

  useEffect(() => () => clearTimeout(debounceTimer.current), []);

  useEffect(() => {
    const text = searchParams.get("search");
    if (text) {
      form.setFieldsValue({ search: text });
    } else {
      form.resetFields();
    }
  }, [searchParams, form]);
  return (
    <div className={cn("flex gap-4 items-center", className)}>
      <PendingBar pending={isPending} label="Vyhľadáva sa…" />
      <Form form={form} className={cn(formClassName)}>
        <ReuseInput
          name="search"
          type="text"
          placeholder={placeholder}
          onChange={handleSearch}
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
