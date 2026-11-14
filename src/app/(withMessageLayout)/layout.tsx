import React from "react";
import "@ant-design/v5-patch-for-react-19";
import { NOINDEX_METADATA } from "@/lib/seo/site";

// Login, registration, dashboards and messages are private: never indexed.
export const metadata = NOINDEX_METADATA;
// import NavbarWraper from "@/components/shared/NavbarWraper";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <div className="">
        {/* <div className="sticky top-0 z-50 w-full">
          <NavbarWraper />
        </div> */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
