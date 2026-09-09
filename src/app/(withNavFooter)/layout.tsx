import React from "react";
import "@ant-design/v5-patch-for-react-19";
import Footer from "@/components/shared/Footer";
// import NavbarWraper from "@/components/shared/NavbarWraper";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <div className="">
        {/* <div className="sticky top-0 z-50 w-full">
          <NavbarWraper />
        </div> */}
        <div>{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
