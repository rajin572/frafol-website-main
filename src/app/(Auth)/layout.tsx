import "@ant-design/v5-patch-for-react-19";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
