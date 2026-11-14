/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef } from "react";
import PendingBar from "../shared/PendingBar";
import useUrlSearch from "@/hook/useUrlSearch";
import ReuseInput from "../ui/Form/ReuseInput";
import { FiSearch } from "react-icons/fi";
import { IoFilter } from "react-icons/io5";
import { Form } from "antd";
import { cn } from "@/lib/utils";
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

  // The search text is synced by the hook (never overwritten while typing); only the other
  // filters are copied from the URL below.
  const { onSearchChange, isPending } = useUrlSearch(form);

  useEffect(() => {
    form.setFieldsValue({
      min: searchParams.get("min"),
      max: searchParams.get("max"),
      category: searchParams.get("category"),
    });
  }, [searchParams, form]);

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
    <div className="relative w-full md:w-[28rem]">
      <PendingBar pending={isPending} label="Vyhľadáva sa…" />
      <ReusableForm
        form={form}
        handleFinish={handleFinish}
        className="w-full !p-0"
      >
        {/* Search box and filter button side by side */}
        <div className="flex items-stretch gap-2">
          <ReuseInput
            prefix={<FiSearch className="mr-1.5 size-5 text-base-color/50" />}
            onChange={onSearchChange}
            name="search"
            wrapperClassName="min-w-0 flex-1"
            formItemClassName="!mb-0"
            inputClassName="!w-full !bg-white !border !border-base-color/15 hover:!border-base-color/30 focus-within:!border-secondary-color !rounded-xl !text-base-color !shadow-sm !text-base !py-2.5 !px-4"
            placeholder="Hľadať..."
            type="text"
          />
          <button
            type="button"
            aria-label="Filtre"
            aria-expanded={filter}
            onClick={() => setFilter((prev) => !prev)}
            className={cn(
              "flex w-12 shrink-0 cursor-pointer items-center justify-center rounded-xl border shadow-sm transition-colors",
              filter
                ? "border-secondary-color bg-secondary-color text-white"
                : "border-base-color/15 bg-white text-secondary-color hover:border-secondary-color"
            )}
          >
            <IoFilter className="size-5" />
          </button>
        </div>
          <div
            ref={inputRef}
            style={{
              height: `${height}px`,
              overflow: "hidden",
              transition: "height 0.4s ease",
            }}
            className={cn(
              "absolute left-0 top-full z-30 mt-2 w-full rounded-xl bg-white",
              filter && "border border-base-color/10 shadow-lg"
            )}
          >
            <div className="p-5">
              <p className="mb-2 text-sm font-semibold text-base-color">
                {/* Price Range */} Cenové rozpätie
              </p>
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
              <div className="mt-1 flex items-center justify-between gap-3 border-t border-base-color/10 pt-4">
                <button
                  type="button"
                  className="cursor-pointer text-sm font-semibold text-base-color/60 transition-colors hover:text-secondary-color"
                  onClick={HandleReset}
                >
                  Obnoviť
                </button>
                <ReuseButton
                  htmlType="submit"
                  variant="secondary"
                  className="!w-fit !text-sm !py-4 !px-6 !rounded-lg !font-semibold"
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
