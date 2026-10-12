"use client";
import { useEffect } from "react";

// antd locks the page behind an open modal by putting `overflow: hidden` on <body> and adding
// the `ant-scrolling-effect` class. <html> is the element that actually scrolls here, so that
// lock alone does nothing and the page kept scrolling behind the modal. Mirror the lock onto
// <html> while the class is present; the modal itself still scrolls on its own.
const ModalScrollLock = () => {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const sync = () => {
      html.style.overflowY = body.classList.contains("ant-scrolling-effect")
        ? "hidden"
        : "";
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      html.style.overflowY = "";
    };
  }, []);

  return null;
};

export default ModalScrollLock;
