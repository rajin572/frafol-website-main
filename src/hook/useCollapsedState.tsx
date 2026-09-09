"use client";
import { useState, useEffect } from "react";

const useCollapsedState = () => {
  const getCollapsed = JSON.parse(localStorage.getItem("Collapsed") || "false");
  const [isCollapsed, setIsCollapsed] = useState(getCollapsed);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "Collapsed") {
        setIsCollapsed(JSON.parse(e.newValue || "false"));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem("Collapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  return [isCollapsed, setIsCollapsed];
};

export default useCollapsedState;
