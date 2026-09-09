"use client";
import React from "react";
import { Button } from "antd";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "highlight"
  | "ghost"
  | "outline"
  | "error";

interface ReuseButtonProps {
  url?: string;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  htmlType?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLElement>;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const variantStyles = {
  primary: "!bg-primary-color !text-base-color border !border-base-color ",
  secondary:
    "!bg-secondary-color !text-primary-color border !border-secondary-color",
  highlight: "!bg-transparent !text-base-color border !border-base-color",
  ghost:
    "!bg-primary-color/0 !text-lighter-color border  !border-primary-color/0 hover:!bg-base-color/40 hover:!text-primary-color hover:!border-base-color/40 transition-all duration-300 ease-in-out",
  outline: "!bg-transparent !text-base-color !border-base-color",
  error: "!bg-error !text-primary-color border !border-error w-auto",
};

const ReuseButton = ({
  url,
  variant = "primary",
  className,
  disabled = false,
  loading = false,
  htmlType = "button",
  onClick,
  children,
  icon,
}: ReuseButtonProps) => {
  return url ? (
    <Link href={url}>
      <Button
        className={cn(
          "!py-5 !px-8 !text-lg w-full text-center  !ring-0 rounded-md",
          variantStyles[variant],
          className
        )}
        disabled={disabled}
        loading={loading}
        htmlType={htmlType}
        onClick={onClick}
        icon={icon}
      >
        {children}
      </Button>
    </Link>
  ) : (
    <Button
      className={cn(
        "!py-5 !px-8 !text-lg w-full text-center  !ring-0 rounded-md",
        variantStyles[variant],
        className
      )}
      disabled={disabled}
      loading={loading}
      htmlType={htmlType}
      onClick={onClick}
      icon={icon}
    >
      {children}
    </Button>
  );
};

export default ReuseButton;
