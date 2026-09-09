/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Checkbox, Form } from "antd";
// import ReusableForm from "../ui/Form/ReuseForm";
// import ReuseInput from "../ui/Form/ReuseInput";
// import ReuseButton from "../ui/Button/ReuseButton";
// import React from "react";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";
// import { applyCoupon } from "@/services/Others/OthersApi";

// const inputStructure = [
//     {
//         name: "code",
//         inputType: "normal",
//         placeholder: "Enter cupon code",
//         labelClassName: "!font-medium",
//         inputClassName: "!py-2",
//         rules: [{ required: true, message: "Cupon code is required" }],
//         showPasswordToggle: true,
//     },

// ];

// const ApplyCouponOption = ({ successStatus, setSuccessStatus }: { successStatus: any, setSuccessStatus: React.Dispatch<React.SetStateAction<any>> }) => {
//     const [form] = Form.useForm();
//     const isCoupon = Form.useWatch("isCoupon", form);

//     const [isLoading, setIsLoading] = React.useState(false);
//     const [error, setError] = React.useState<string | null>(null);

//     React.useEffect(() => {
//         if (!isCoupon) {
//             setError(null);
//             form.resetFields();
//         }
//     }, [form, isCoupon]);

//     const onFinish = async (values: any) => {
//         console.log(values)
//         const data = {
//             code: values.code,
//         };

//         const res = await tryCatchWrapper(
//             applyCoupon,
//             {
//                 body: data,
//             },
//             {
//                 showToast: false,
//                 setLoading: setIsLoading,
//                 setError: setError,
//             }
//         );

//         console.log(res)
//         if (res?.success) {
//             setSuccessStatus(res);
//         } else {
//             setSuccessStatus(null);
//         }
//     };
//     return (
//         <div className="">
//             <ReusableForm form={form} handleFinish={onFinish} >
//                 <Form.Item
//                     name="isCoupon"
//                     valuePropName="checked"
//                 >
//                     <Checkbox
//                     // onChange={(e) => handleCheckboxChange(e, "acceptTerms")}
//                     >
//                         <div>
//                             <p className="text-base font-semibold">
//                                 Have you any cupon code? Apply it.
//                             </p>

//                         </div>
//                     </Checkbox>
//                 </Form.Item>
//                 {
//                     isCoupon &&
//                     <div>
//                         <div className={`flex gap-2 items-start -mt-4`}>

//                             {inputStructure?.map((input, index) => (
//                                 <ReuseInput
//                                     key={index}
//                                     name={input.name}
//                                     Typolevel={5}
//                                     inputType={input.inputType}
//                                     placeholder={input.placeholder}
//                                     labelClassName={input.labelClassName}
//                                     inputClassName={input.inputClassName}
//                                     rules={input.rules}
//                                     wrapperClassName="max-w-[250px]"
//                                 />
//                             ))}
//                             <ReuseButton
//                                 htmlType="button"
//                                 variant="secondary"
//                                 className="w-fit text-base! !py-5 px-4! bg-red-900! text-white!"
//                                 onClick={() => {
//                                     form.validateFields().then(onFinish).catch(() => {});
//                                 }}
//                             >
//                                 {isLoading ? "Applying..." : "Apply"}
//                             </ReuseButton>
//                         </div>
//                         {
//                             error && (<p className="text-red-500 -mt-4">{error}</p>)
//                         }
//                         {
//                             successStatus && (<p className="text-green-500 -mt-4">Coupon applied successfully!</p>)
//                         }
//                     </div>
//                 }


//             </ReusableForm>
//         </div>
//     );
// };

// export default ApplyCouponOption;


const ApplyCouponOption = ({ successStatus, setSuccessStatus }: { successStatus: any, setSuccessStatus: React.Dispatch<React.SetStateAction<any>> }) => {
    return (
        <div>

        </div>
    );
};

export default ApplyCouponOption;