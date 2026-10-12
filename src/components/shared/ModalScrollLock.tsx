"use client";
import { useEffect } from "react";

// While an antd modal is open the page behind it must not scroll; the modal itself still can.
//
// antd locks the page by putting `overflow: hidden` on <body> and adding the
// `ant-scrolling-effect` class. That alone does nothing here, because <html> is the element
// that actually scrolls, and on iPhones `overflow: hidden` does not stop touch scrolling at
// all. So we (1) mirror the lock onto <html> for wheel / keyboard scrolling and (2) cancel
// touch moves that do not start inside something scrollable (the modal's own content).
const LOCK_CLASS = "ant-scrolling-effect";

const canScrollVertically = (el: HTMLElement) => {
  const { overflowY } = getComputedStyle(el);
  return /(auto|scroll)/.test(overflowY) && el.scrollHeight > el.clientHeight;
};

const ModalScrollLock = () => {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const isLocked = () => body.classList.contains(LOCK_CLASS);

    const sync = () => {
      html.style.overflowY = isLocked() ? "hidden" : "";
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isLocked()) return;
      let el = e.target as HTMLElement | null;
      while (el && el !== body && el !== html) {
        if (canScrollVertically(el)) return; // the modal's own scroll area: let it scroll
        el = el.parentElement;
      }
      if (e.cancelable) e.preventDefault(); // anything else would scroll the page behind
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(body, { attributes: true, attributeFilter: ["class"] });
    document.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      observer.disconnect();
      document.removeEventListener("touchmove", onTouchMove);
      html.style.overflowY = "";
    };
  }, []);

  return null;
};

export default ModalScrollLock;
