import { ConfigProvider, Modal } from "antd";
import React from "react";

interface ComingSoonModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  message: string;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  isModalOpen,
  handleCancel,
  message,
}) => {
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "#F3F3F3",
              colorIcon: "#010515",
              borderRadiusLG: 8,
            },
          },
        }}
      >
        <Modal
          centered
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <div className="text-center p-4">
            <h2 className="text-site-color text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
              Coming Soon...
            </h2>
            <p className="mb-4 md:text-lg lg:text-xl text-site-color">
              {message}
            </p>
            {/* <Link href="/register">
              <Button
                onClick={handleCancel}
                type="primary"
                className=" lg:text-lg py-4 lg:py-5 bg-button-color border-none text-site-color font-bold duration-200 delay-75"
              >
                Register
              </Button>
            </Link> */}
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default ComingSoonModal;
