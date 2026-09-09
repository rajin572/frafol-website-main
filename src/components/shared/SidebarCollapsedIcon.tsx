"use client";
import React from "react";
import { BarsOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/redux/hooks";
import { toggleCollapse } from "@/redux/features/sidebar/sidebarSlice";

const SidebarCollapsedIcon = () => {
  const dispatch = useAppDispatch();
  const handleToggleCollapse = () => {
    dispatch(toggleCollapse());
  };

  return (
    <BarsOutlined
      onClick={handleToggleCollapse}
      className="text-3xl !text-secondary-color"
    />
  );
};

export default SidebarCollapsedIcon;
