import "@ant-design/v5-patch-for-react-19";
import { NOINDEX_METADATA } from "@/lib/seo/site";

// Login, registration, dashboards and messages are private: never indexed.
export const metadata = NOINDEX_METADATA;

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
