import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import SideBar from "@/components/shared/SideBar";
import SidebarCollapsedIcon from "@/components/shared/SidebarCollapsedIcon";
// import NavbarWraper from "@/components/shared/NavbarWraper";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      <div className="">

        <Layout className="flex !bg-[#F9FAFB] relative z-50!">
          <SideBar />
          <Layout className="!bg-[#F9FAFB]">
            <Header
              className="!m-0 !py-0 !px-4 !w-fit lg:!sticky lg:!top-16 lg:!z-50 !bg-[#F9FAFB]"
              style={{
                background: "#F9FAFB",
                position: "sticky",
                top: 0,
                zIndex: 40,
                marginLeft: 0,
              }}
            >
              <SidebarCollapsedIcon />
            </Header>
            <Content>
              <div className="min-h-[86vh] w-[90%] mx-auto !pb-10">
                {children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    </div>
  );
};

export default DashboardLayout;
