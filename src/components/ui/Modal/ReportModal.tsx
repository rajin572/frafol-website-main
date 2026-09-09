/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, Form, Modal, Typography } from "antd";
import ReuseButton from "../Button/ReuseButton";
import ReusableForm from "../Form/ReuseForm";
import ReuseInput from "../Form/ReuseInput";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { addReport } from "@/services/Others/OthersApi";
import { useGetUserData } from "@/context/useGetUserData";
import { useEffect } from "react";
import ReuseUpload from "../Form/ReuseUpload";

interface ReportModalProps {
  isReportModalVisible: boolean;
  handleCancel: () => void;
  description?: string;
}

const ReportModal: React.FC<ReportModalProps> = ({
  isReportModalVisible,
  handleCancel,
  /* description = "Are You Sure You want to Reject This Order ?", */
  description = "FORMULÁRA PRE NAHLÁSENIE NEZÁKONNÉHO OBSAHU",
}) => {
  const user = useGetUserData();
  const [form] = Form.useForm();
  //   const [blockUser] = useBlockUserMutation();

  useEffect(() => {
    if (isReportModalVisible) {
      form.setFieldsValue({
        name: user?.name,
        email: user?.email,
      });
    }
  }, [form, isReportModalVisible, user?.email, user?.name]);

  const submit = async (values: any) => {

    const formData = new FormData();
    console.log(values)
    const data: Record<string, unknown> = {
      name: values.name,
      url: values.url,
      reason: values.reason,
      message: values.message,
      agreement: values.agreement
    };
    if (user?.email || values.email) {
      data.email = values.email;
    }
    if (values.image) {
      formData.append("image", values.image[0]?.originFileObj);
    }
    formData.append("data", JSON.stringify(data));



    const res = await tryCatchWrapper(
      addReport,
      { body: formData },
      {
        /* toastLoadingMessage: "Wait a moment...", */
        toastLoadingMessage: "Čakajte, prosím...",
        /* toastSuccessMessage: "submitted successfully!", */
        toastSuccessMessage: "Úspešne odoslané!",
        /* toastErrorMessage: "Something went wrong! Please try again.", */
        toastErrorMessage: "Niečo sa pokazilo! Skúste to znova.",
      }
    );

    if (res?.success) {
      handleCancel();
      form.resetFields();
    }
  };

  return (
    <Modal
      // title="Confirm Delete"
      open={isReportModalVisible}
      onCancel={() => {
        handleCancel();
        form.resetFields();
      }}
      className="W-[90%] lg:w-[768px]!"
      centered
      // styles.body={{ textAlign: "center" }}
      footer={null}
    >
      <p className="text-3xl font-semibold pt-10 pb-4 text-base-color">
        {description}
      </p>
      <ReusableForm handleFinish={submit} form={form}>
        <div className={`grid grid-cols-1 gap-5 ${user ? "lg:grid-cols-2" : ""}`}>
          <ReuseInput
            name="name"
            /* label="Full Name" */
            label="Meno oznamovateľa"
            /* placeholder="Enter Full Name" */
            placeholder="Zadajte meno oznamovateľa"
            /* rules={[{ required: true, message: "Full Name is required" }]} */
            rules={[{ required: true, message: "Meno oznamovateľa je povinné" }]}
          />
          <div>
            <ReuseInput
              inputType=""
              name="email"
              type="email"
              /* label="Email" */
              label="E-mailová adresa oznamovateľa"
              disabled={user ? true : false}
              /* placeholder="Enter Email" */
              placeholder="Zadajte e-mailovú adresu"
              /* rules={[{ required: true, message: "Email is required" }]} */
              rules={[{ required: true, message: "E-mailová adresa je povinná" }]}
              formItemClassName="!mb-1"
            />
            {/* Confirmation of receipt and the decision regarding your report will be sent to this email. */}
            <p className="text-xs sm:text-sm text-base-color/70 mb-5">
              Potvrdenie o prijatí a rozhodnutie o nahlásení vám zašleme na tento
              e-mail.
            </p>
          </div>
        </div>
        <ReuseInput
          name="url"
          type="url"
          /* label="Website URL Address" */
          label="Adresa URL"
          /* placeholder="Enter Website URL Address" */
          placeholder="Zadajte adresu URL"
          /* rules={[{ required: true, message: "Website URL Address is required" }]} */
          rules={[{ required: true, message: "Adresa URL je povinná" }]}
          formItemClassName="!mb-1"
        />
        {/* Please provide the exact URL of the content you wish to report. */}
        <p className="text-xs sm:text-sm text-base-color/70 mb-5">
          Uveďte presnú adresu URL, kde sa nachádza obsah, ktorý chcete nahlásiť.
        </p>
        <ReuseInput
          inputType="textarea"
          name="reason"
          /* label="Additional information allowing the identification of the illegal content" */
          label="Dodatočné informácie umožňujúce identifikáciu nezákonného obsahu"
          /* placeholder="Enter Reason" */
          placeholder="Zadajte dôvod"
          /* rules={[{ required: true, message: "Reason is required" }]} */
          rules={[{ required: true, message: "Dôvod je povinný" }]}
        />
        <ReuseUpload
          name="image"
          /* label="Attach a screenshot of the illegal content (optional)" */
          label="Priložte screenshot nezákonného obsahu (nepovinné)"
          multiple={false}
          maxCount={1}
        />
        <Typography.Title level={4}>
          {/* Your message */}
          Vaša správa
        </Typography.Title>
        <ReuseInput
          inputType="textarea"
          name="message"
          Typolevel={5}
          /* label="Please provide all reasons, including a sufficiently substantiated explanation of those reasons, why you consider the information you have provided to constitute illegal content." */
          label="Uveďte prosím všetky dôvody, vrátane dostatočne podloženého vysvetlenia týchto dôvodov, prečo považujete Vami uvedené informácie za nezákonný obsah."
          labelClassName="text-base-color/70!"
          /* placeholder="Enter Your message" */
          placeholder="Zadajte svoju správu"
          /* rules={[{ required: true, message: "message is required" }]} */
          rules={[{ required: true, message: "Správa je povinná" }]}
        />
        <Form.Item
          className="!mb-5"
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) => {
                if (value) {
                  return Promise.resolve();
                }
                /* return Promise.reject(new Error("Please confirm the agreement!")); */
                return Promise.reject(new Error("Potvrďte, prosím, súhlas!"));
              },
            },
          ]}
        >
          <Checkbox className="">
            {/* hereby confirm that I genuinely believe that the information and statements contained in this notice are accurate and complete. */}
            Týmto potvrdzujem, že sa v dobrej viere domnievam, že informácie a
            tvrdenia, ktoré sú v tomto oznámení uvedené, sú presné a úplné.
          </Checkbox>
        </Form.Item>
        <ReuseButton
          htmlType="submit"
          variant="error"
          className="w-full! bg-secondary-color!"
        >
          {/* Submit */}
          Odoslať
        </ReuseButton>
      </ReusableForm>
    </Modal>
  );
};

export default ReportModal;
