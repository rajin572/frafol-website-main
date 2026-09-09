"use client";
import { selectIsCollapsed, toggleCollapse } from "@/redux/features/sidebar/sidebarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import getActiveKeys from "@/utils/activeKey";
import {
  useAdminPaths,
  useProfessionalPaths,
} from "@/utils/dashboardMenuItems";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { usePathname } from "next/navigation";
import React, { useRef } from "react";
import SidebarCollapsedIcon from "./SidebarCollapsedIcon";
import { ISignInUser } from "@/types";
import { decodedToken } from "@/utils/jwt";
import Cookies from "js-cookie";
import useOutsideClick from "@/hook/useOutsideClick";

const SideBar = () => {
  const token = Cookies.get("frafolMainAccessToken");
  const userData: ISignInUser | null = decodedToken(token || "");
  const isCollapsed = useAppSelector(selectIsCollapsed);
  const dispatch = useAppDispatch();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const defaultUrl = (userData?.role === "user" || userData?.role === "company") ? "/my-account" : "/professional";

  const normalizedPath = pathname.replace(defaultUrl, "");

  const adminPaths = useAdminPaths();
  const professionalPath = useProfessionalPaths();

  const activeKeys = getActiveKeys(normalizedPath);
  const menuItems = (userData?.role === "user" || userData?.role === "company") ? adminPaths : professionalPath;

  useOutsideClick(sidebarRef as React.RefObject<HTMLElement>, () => {
    if (!isCollapsed) {
      dispatch(toggleCollapse());
    }
  });

  return (
    <Sider ref={sidebarRef}
      theme="light"
      width={300}
      trigger={null}
      breakpoint="lg"
      collapsedWidth="0"
      collapsible
      collapsed={isCollapsed}
      style={{
        position: "sticky",
        top: 0,
        height: "calc(100vh - 3rem)",
        overflowY: "auto",
        backgroundColor: "#ffffff",
      }}
      className={`!border-l border-r !border-[#E1E1E1] !fixed !z-[60] !shadow-2xl !top-12 mb-20! ${isCollapsed ? "!left-[-300px]" : "!left-0"
        }`}
    >
      <div className="flex items-center justify-end my-5 px-4">
        <SidebarCollapsedIcon />
      </div>

      <Menu
        mode="inline"
        defaultSelectedKeys={activeKeys}
        selectedKeys={activeKeys}
        style={{
          backgroundColor: "transparent",
          border: "none",
          paddingLeft: "6px",
          paddingRight: "6px",
        }}
        items={menuItems}
      />
    </Sider>
  );
};

export default SideBar;
