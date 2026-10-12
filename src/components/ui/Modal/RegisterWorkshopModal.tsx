/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../Form/ReuseForm";
import ReuseInput from "../Form/ReuseInput";
import ReuseButton from "../Button/ReuseButton";

interface RegisterWorkshopModalProps {
  isModalVisible: boolean;
  handleCancel: () => void;
}

const RegisterWorkshopModal: React.FC<RegisterWorkshopModalProps> = ({
  isModalVisible,
  handleCancel,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <Modal
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[500px]"
    >
      <div className="p-5 text-base-color">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-5">
          Registrácia na kurz
        </h1>
        <ReusableForm form={form} handleFinish={onSubmit}>
          <ReuseInput
            name="fullNamee"
            label="Meno a priezvisko"
            placeholder="Zadajte meno a priezvisko"
            rules={[{ required: true, message: "Meno a priezvisko je povinné" }]}
            labelClassName="!font-semibold"
          />
          <ReuseInput
            name="email"
            label="E-mail"
            placeholder="Zadajte e-mail"
            rules={[{ required: true, message: "E-mail je povinný" }]}
            labelClassName="!font-semibold"
          />

          <ReuseButton htmlType="submit" variant="secondary" className="mt-2">
            Registrovať
          </ReuseButton>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default RegisterWorkshopModal;
