/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Upload } from "antd";
import { useEffect, useState } from "react";
import { IoCamera, IoCameraOutline } from "react-icons/io5";
import { AllImages } from "../../../public/assets/AllImages";
import ReusableForm from "../ui/Form/ReuseForm";
import Image from "next/image";
import ReuseInput from "../ui/Form/ReuseInput";
import ReuseButton from "../ui/Button/ReuseButton";
import { ICategory, IProfile } from "@/types";
import { getServerUrl } from "@/helpers/config/envConfig";
import { FaAddressCard, FaUser } from "react-icons/fa6";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdMail } from "react-icons/io";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { updateProfile } from "@/services/ProfileService/ProfileServiceApi";
import ReuseDatePicker from "../ui/Form/ReuseDatePicker";
import dayjs from "dayjs";
import ReuseSelect from "../ui/Form/ReuseSelect";
import { LuUser } from "react-icons/lu";
import { ITown } from "@/app/(Auth)/sign-up/professional/legal-invoice/page";

const userInputStructure = [
  {
    name: "name",
    type: "text",
    inputType: "text",
    /* label: "Full name", */
    label: "Celé meno",
    /* placeholder: "Enter your full name", */
    placeholder: "Zadajte svoje celé meno",
    labelClassName: "!font-medium  !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    /* rules: [{ required: true, message: "Full name is required" }], */
    rules: [{ required: true, message: "Celé meno je povinné." }],
    disable: false,
  },
  {
    name: "email",
    type: "email",
    inputType: "email",
    /* label: "Email", */
    label: "E-mail",
    placeholder: "Enter your email",
    labelClassName: "!font-medium  !text-secondary-color",
    inputClassName:
      "!py-2 !w-full disabled:!text-base-color disabled:!border-input-color/60 disabled:!bg-input-color/10",
    rules: [{ required: true, message: "Email is required" }],
    disable: true,
  },

  {
    name: "phone",
    type: "text",
    inputType: "tel",
    /* label: "Phone number", */
    label: "Telefónne číslo",
    placeholder: "Enter your phone number",
    labelClassName: "!font-medium  !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    rules: [{ required: true, message: "Phone number is required" }],
    disable: false,
  },
  {
    name: "address",
    type: "text",
    inputType: "tel",
    label: "Street Address",
    placeholder: "Enter your Street Address",
    labelClassName: "!font-medium  !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    rules: [{ required: true, message: "Street Address is required" }],
    disable: false,
  },
  {
    name: "town",
    type: "text",
    inputType: "tel",
    /* label: "Town", */
    label: "Mesto",
    placeholder: "Enter your Town",
    labelClassName: "!font-medium  !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    rules: [{ required: true, message: "Town is required" }],
    disable: false,
  },
  {
    name: "country",
    type: "text",
    inputType: "text",
    label: "Country",
    placeholder: "Enter your Country",
    labelClassName: "!font-medium  !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    rules: [{ required: true, message: "Country is required" }],
    disable: false,
  },
  {
    name: "zipCode",
    type: "text",
    inputType: "normal",
    label: "Zip Code",
    placeholder: "Enter Zip Code Name",
    labelClassName: "!font-semibold !text-secondary-color",
    rules: [{ required: true, message: "Zip Code is required" }],
  },
];
const companyInputStructure = [
  {
    name: "name",
    type: "text",
    inputType: "text",
    /* label: "Full name", */
    label: "Celé meno",
    /* placeholder: "Enter your full name", */
    placeholder: "Zadajte svoje celé meno",
    labelClassName: "!font-medium  !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    /* rules: [{ required: true, message: "Full name is required" }], */
    rules: [{ required: true, message: "Celé meno je povinné." }],
    disable: false,
  },
  {
    name: "companyName",
    type: "text",
    inputType: "normal",
    label: " Company Name",
    placeholder: "Enter Full Company Name",
    labelClassName: "!font-semibold !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    disable: false,
    prefix: <FaUser className="mr-1 !text-secondary-color" />,
    rules: [{ required: true, message: "Company Name is required" }],
  },
  {
    name: "email",
    type: "email",
    inputType: "normal",
    /* label: "Email", */
    label: "E-mail",
    placeholder: "Enter Email Name",
    labelClassName: "!font-semibold !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    disable: false,
    prefix: <IoMdMail className="mr-1 !text-secondary-color" />,
    rules: [{ required: true, message: "Email is required" }],
  },
  {
    name: "phone",
    type: "text",
    inputType: "tel",
    /* label: "Phone number", */
    label: "Telefónne číslo",
    placeholder: "Enter your phone number",
    labelClassName: "!font-medium  !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    rules: [{ required: true, message: "Phone number is required" }],
    disable: false,
  },
  {
    name: "address",
    type: "text",
    inputType: "normal",
    label: "Street Address",
    placeholder: "Enter Street Address",
    labelClassName: "!font-semibold !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    disable: false,
    prefix: <HiLocationMarker className="mr-1 !text-secondary-color" />,
    rules: [{ required: true, message: "Street Address is required" }],
  },
  {
    name: "town",
    type: "text",
    inputType: "normal",
    /* label: "Town", */
    label: "Mesto",
    placeholder: "Enter Town Name",
    labelClassName: "!font-semibold !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    disable: false,
    prefix: <HiLocationMarker className="mr-1 !text-secondary-color" />,
    rules: [{ required: true, message: "Town is required" }],
  },
  {
    name: "country",
    type: "text",
    inputType: "normal",
    label: "Country",
    placeholder: "Enter Country Name",
    labelClassName: "!font-semibold !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    disable: false,
    prefix: <HiLocationMarker className="mr-1 !text-secondary-color" />,
    rules: [{ required: true, message: "Country is required" }],
  },
  {
    name: "ico",
    type: "text",
    inputType: "normal",
    label: "IČO",
    placeholder: "Enter IČO",
    labelClassName: "!font-semibold !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    disable: false,
    prefix: <FaAddressCard className="mr-1 !text-secondary-color" />,
  },
  {
    name: "dic",
    type: "text",
    inputType: "normal",
    label: "DIČ",
    placeholder: "Enter DIČ",
    labelClassName: "!font-semibold !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    disable: false,
    prefix: <FaAddressCard className="mr-1 !text-secondary-color" />,
    rules: [{ required: true, message: "DIČ is required" }],
  },
  {
    name: "ic_dph",
    type: "text",
    inputType: "normal",
    label: "IČ DPH (Optional)",
    placeholder: "Enter IČ DPH",
    labelClassName: "!font-semibold !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    disable: false,
    prefix: <FaAddressCard className="mr-1 !text-secondary-color" />,
    rules: [{ required: false, message: "IČ DPH is required" }],
  },
];

const professionalInputStructure = [
  {
    name: "name",
    type: "text",
    inputType: "text",
    /* label: "Full name", */
    label: "Celé meno",
    /* placeholder: "Enter your full name", */
    placeholder: "Zadajte svoje celé meno",
    labelClassName: "!font-medium  !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    /* rules: [{ required: true, message: "Full name is required" }], */
    rules: [{ required: true, message: "Celé meno je povinné." }],
    disable: false,
  },
  {
    name: "companyName",
    type: "text",
    inputType: "normal",
    label: " Company Name",
    placeholder: "Enter Full Company Name",
    labelClassName: "!font-semibold !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    disable: false,
    prefix: <FaUser className="mr-1 !text-secondary-color" />,
    rules: [{ required: true, message: "Company Name is required" }],
  },
  {
    name: "phone",
    type: "text",
    inputType: "tel",
    /* label: "Phone number", */
    label: "Telefónne číslo",
    placeholder: "Enter your phone number",
    labelClassName: "!font-medium  !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    rules: [{ required: true, message: "Phone number is required" }],
    disable: false,
  },
  {
    name: "email",
    type: "email",
    inputType: "normal",
    /* label: "Email", */
    label: "E-mail",
    placeholder: "Enter Email Name",
    labelClassName: "!font-semibold !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    disable: false,
    prefix: <IoMdMail className="mr-1 !text-secondary-color" />,
    rules: [{ required: true, message: "Email is required" }],
  },
  {
    name: "about",
    type: "text",
    inputType: "textarea",
    /* label: "About Me", */
    label: "O mne",
    placeholder: "Enter About Yourself",
    labelClassName: "!font-semibold !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    disable: false,
    prefix: <FaUser className="mr-1 !text-secondary-color" />,
    rules: [{ required: true, message: "Company Name is required" }],
  },

  {
    name: "minHourlyRate",
    type: "number",
    inputType: "number",
    label: "Min  Rate",
    placeholder: "Enter Min  Rate",
    labelClassName: "!font-semibold !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    disable: false,
    prefix: <HiLocationMarker className="mr-1 !text-secondary-color" />,
    rules: [{ required: true, message: "Street Address is required" }],
  },
  {
    name: "maxHourlyRate",
    type: "number",
    inputType: "number",
    label: "Max  Rate",
    placeholder: "Enter Max  Rate",
    labelClassName: "!font-semibold !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    disable: false,
    prefix: <HiLocationMarker className="mr-1 !text-secondary-color" />,
    rules: [{ required: true, message: "Street Address is required" }],
  },

  {
    name: "ico",
    type: "text",
    inputType: "normal",
    label: "IČO",
    placeholder: "Enter IČO",
    labelClassName: "!font-semibold !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    disable: false,
    prefix: <FaAddressCard className="mr-1 !text-secondary-color" />,
    rules: [{ required: true, message: "IČO is required" }],
  },
  {
    name: "dic",
    type: "text",
    inputType: "normal",
    label: "DIČ",
    placeholder: "Enter DIČ",
    labelClassName: "!font-semibold !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    disable: false,
    prefix: <FaAddressCard className="mr-1 !text-secondary-color" />,
    rules: [{ required: true, message: "DIČ is required" }],
  },
  {
    name: "ic_dph",
    type: "text",
    inputType: "normal",
    label: "IČ DPH",
    placeholder: "Enter IČ DPH",
    labelClassName: "!font-semibold !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    disable: false,
    prefix: <FaAddressCard className="mr-1 !text-secondary-color" />,
    rules: [{ required: false, message: "IČ DPH is required" }],
  },

  {
    name: "address",
    type: "text",
    inputType: "normal",
    label: "Street Address",
    placeholder: "Enter Street Address",
    labelClassName: "!font-semibold !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    disable: false,
    prefix: <HiLocationMarker className="mr-1 !text-secondary-color" />,
    rules: [{ required: true, message: "Street Address is required" }],
  },
  {
    name: "zipCode",
    type: "text",
    inputType: "normal",
    label: "Zip Code",
    placeholder: "Enter Zip Code Name",
    labelClassName: "!font-semibold !text-secondary-color",
    rules: [{ required: true, message: "Zip Code is required" }],
  },
  {
    name: "country",
    type: "text",
    inputType: "normal",
    label: "Country",
    placeholder: "Enter Country Name",
    labelClassName: "!font-semibold !text-secondary-color",
    inputClassName: "!py-2 !w-full",
    disable: false,
    prefix: <HiLocationMarker className="mr-1 !text-secondary-color" />,
    rules: [{ required: true, message: "Country is required" }],
  },
];

const EditProfile = ({ myData, categories, towns }: { myData: IProfile, categories?: ICategory[], towns: ITown[] }) => {

  console.log(myData)

  const serverUrl = getServerUrl() || "";
  const [form] = Form.useForm();
  const [selectedPhotographySpecializations, setSelectedPhotographySpecializations] = useState<string[]>([]);
  const [selectedVideographySpecializations, setSelectedVideographySpecializations] = useState<string[]>([]);
  const [selectedTravelTowns, setSelectedTravelTowns] = useState<string[]>(myData?.travelTowns ?? []);

  const allTownValues = towns?.map((t) => t.name) ?? [];

  const handleTravelTownsChange = (values: string[]) => {
    if (values.includes("__all__")) {
      setSelectedTravelTowns(allTownValues);
      form.setFieldValue("travelTowns", allTownValues);
    } else {
      setSelectedTravelTowns(values);
    }
  };

  const selectedRole = Form.useWatch("role", form);

  // Filter categories by type
  const photographyCategories = categories?.filter(cat => cat.type === "photoGraphy") || [];
  const videographyCategories = categories?.filter(cat => cat.type === "videoGraphy") || [];

  const inputStructure =
    myData?.role === "user"
      ? userInputStructure
      : myData?.role === "company"
        ? companyInputStructure
        : myData?.role === "photographer" || myData?.role === "videographer" || myData?.role === "both"
          ? professionalInputStructure
          : [];

  const [imageUrl, setImageUrl] = useState<string>(AllImages.dummyProfile?.src);

  const handleImageUpload = (info: any) => {
    if (info.file.status === "removed") {
      setImageUrl(AllImages.dummyProfile?.src);
    } else {
      const file = info.file.originFileObj || info.file;
      if (file) {
        setImageUrl(URL.createObjectURL(file));
      }
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      email: myData?.email,
      name: myData?.name,
      companyName: myData?.companyName,
      phone: myData?.phone,
      about: myData?.profileId?.about,
      minHourlyRate: myData?.minHourlyRate,
      maxHourlyRate: myData?.maxHourlyRate,
      address: myData?.address,
      zipCode: myData?.zipCode,
      town: myData?.town,
      country: myData?.country,
      ico: myData?.ico,
      dic: myData?.dic,
      ic_dph: myData?.ic_dph,
      dateOfBirth: dayjs(myData?.dateOfBirth) || null,
      role: myData?.role, // This sets the default role
      travelTowns: myData?.travelTowns ?? [],
    });

    // Initialize specializations from myData
    if (myData?.photographerSpecializations) {
      setSelectedPhotographySpecializations(myData.photographerSpecializations);
    }
    if (myData?.videographerSpecializations) {
      setSelectedVideographySpecializations(myData.videographerSpecializations);
    }

    if (myData?.profileImage?.length > 0) {
      setImageUrl(myData?.profileImage);
    } else {
      setImageUrl(AllImages.dummyProfile.src);
    }
  }, [form, myData]);

  const handleSpecializationClick = (
    specialization: string,
    type: "photography" | "videography"
  ) => {
    if (type === "photography") {
      setSelectedPhotographySpecializations((prev) =>
        prev.includes(specialization)
          ? prev.filter((item) => item !== specialization)
          : [...prev, specialization]
      );
    } else if (type === "videography") {
      setSelectedVideographySpecializations((prev) =>
        prev.includes(specialization)
          ? prev.filter((item) => item !== specialization)
          : [...prev, specialization]
      );
    }
  };

  const onFinish = async (values: any) => {

    const submissionData = {
      ...values,
      photographerSpecializations:
        values.role === "photographer" || values.role === "both"
          ? selectedPhotographySpecializations
          : [],
      videographerSpecializations:
        values.role === "videographer" || values.role === "both"
          ? selectedVideographySpecializations
          : [],
      travelTowns: selectedTravelTowns,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(submissionData));

    if (values?.image?.file?.originFileObj) {
      formData.append("image", values?.image?.file?.originFileObj);
    }

    const res = await tryCatchWrapper(
      updateProfile,
      { body: formData },
      {
        /* toastLoadingMessage: "Updating profile...", */
        toastLoadingMessage: "Čakajte, prosím...",
        /* toastSuccessMessage: "Profile updated successfully!", */
        toastSuccessMessage: "Profil bol úspešne aktualizovaný!",
        toastErrorMessage: "Something went wrong! Please try again.",
      }
    );

    if (res?.success) {
      // Don't reset fields after successful update
      // The page should refresh or refetch data instead
    }
  };

  // Determine which specializations to show based on selected role OR default role
  const currentRole = selectedRole || myData?.role;
  const showPhotography = currentRole === "photographer" || currentRole === "both";
  const showVideography = currentRole === "videographer" || currentRole === "both";

  return (
    <div className="mt-10 rounded-xl">
      <div className="flex justify-start items-center">
        <ReusableForm
          form={form}
          handleFinish={onFinish}
          className="p-10 w-full lg:w-[80%]"
        >
          {/* Image Upload Section */}
          <div className="mt-5 flex flex-col justify-center items-start gap-x-4">
            <div className="relative">
              <Image
                width={1000}
                height={1000}
                className="h-40 w-40 relative rounded-full border border-secondary-color object-contain"
                src={
                  imageUrl.startsWith("/uploads")
                    ? serverUrl + imageUrl
                    : imageUrl
                }
                alt=""
              />
              <Form.Item name="image">
                <Upload
                  customRequest={(options) => {
                    setTimeout(() => {
                      if (options.onSuccess) {
                        options.onSuccess("ok");
                      }
                    }, 1000);
                  }}
                  onChange={handleImageUpload}
                  maxCount={1}
                  accept="image/*"
                  className="text-start"
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                  listType="picture"
                >
                  <button
                    type="button"
                    style={{ zIndex: 1 }}
                    className="bg-base-color/70 p-2 w-fit h-fit !border-none absolute -top-12 left-[115px] rounded-full cursor-pointer shadow-lg"
                  >
                    <IoCameraOutline className="w-6 h-6 text-secondary-color" />
                  </button>
                </Upload>
              </Form.Item>
            </div>
          </div>

          {/* Basic Info Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 w-full">
            {inputStructure?.map((input, index) => (
              <ReuseInput
                key={index}
                name={input.name}
                Typolevel={5}
                inputType={input.inputType}
                type={input.type}
                label={input.label}
                placeholder={input.placeholder}
                labelClassName={input.labelClassName}
                inputClassName={input.inputClassName}
                rules={input.rules}
                disabled={input.disable}
              />
            ))}
            <ReuseSelect
              showSearch={true}
              name="town"
              /* label="Town" */
              label="Mesto"
              /* placeholder="Select your town" */
              placeholder="Vyberte svoje mesto"
              labelClassName="!text-secondary-color !font-semibold"
              rules={[{ required: true, message: "Please select your town" }]}
              options={
                towns?.map((town) => ({
                  value: town.name,
                  label: town.name,
                }))
              }
            />
            <ReuseDatePicker
              name="dateOfBirth"
              label="Date of Birth"
              rules={[{ required: true, message: "Date of Birth is required" }]}
              labelClassName="!font-semibold !text-secondary-color"
              shouldDisableDate={false}
            />
          </div>

          {(myData?.role === "photographer" || myData?.role === "videographer" || myData?.role === "both") && (
            <>
              {/* Travel Towns */}
              <ReuseSelect
                showSearch={true}
                mode="multiple"
                name="travelTowns"
                label="Towns I Can Travel To"
                placeholder="Select towns you can travel to"
                labelClassName="!text-secondary-color !font-semibold"
                rules={[{ required: true, message: "Please select at least one travel town" }]}
                allowClear={true}
                onChange={handleTravelTownsChange}
                selectClassName="!h-auto !min-h-10"
                options={[
                  { value: "__all__", label: "Select All Towns" },
                  ...towns?.map((town) => ({
                    value: town.name,
                    label: town.name,
                  })),
                ]}
              />
              {/* Role Select */}
              <ReuseSelect
                name="role"
                label="Professional Role"
                placeholder="Select your role"
                labelClassName="!text-secondary-color !font-semibold"
                rules={[{ required: true, message: "Please select your role" }]}
                options={[
                  {
                    value: "photographer",
                    label: "Photographer",
                    icon: <LuUser />,
                  },
                  {
                    value: "videographer",
                    label: "Videographer",
                    icon: <IoCamera />,
                  },
                  {
                    value: "both",
                    label: "Both",
                    icon: <IoCamera />,
                  },
                ]}
              />



              {/* Specializations Section */}
              <div className="my-6 space-y-6">
                {showPhotography && (
                  <div>
                    <h3 className="text-2xl font-semibold text-secondary-color mt-12 mb-6">
                      Photography Specializations
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {photographyCategories.map((category, index) => (
                        <div
                          key={category._id || index}
                          className={`text-xl sm:text-sm lg:text-base w-full font-medium py-1.5 px-3 rounded cursor-pointer ${selectedPhotographySpecializations.includes(category.title)
                            ? "bg-background-color border border-secondary-color text-secondary-color"
                            : "bg-background-color border border-transparent text-base-color"
                            }`}
                          onClick={() =>
                            handleSpecializationClick(category.title, "photography")
                          }
                        >
                          {category.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {showVideography && (
                  <div>
                    <h3 className="text-2xl font-semibold text-secondary-color mt-12 mb-6">
                      Videography Specializations
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {videographyCategories.map((category, index) => (
                        <div
                          key={category._id || index}
                          className={`text-xl sm:text-sm lg:text-base w-full font-medium py-1.5 px-3 rounded cursor-pointer ${selectedVideographySpecializations.includes(category.title)
                            ? "bg-background-color border border-secondary-color text-secondary-color"
                            : "bg-background-color border border-transparent text-base-color"
                            }`}
                          onClick={() =>
                            handleSpecializationClick(category.title, "videography")
                          }
                        >
                          {category.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}



          <ReuseButton
            htmlType="submit"
            variant="secondary"
            className="w-full mt-4"
          >
            {/* Submit */}
            Uložiť zmeny
          </ReuseButton>
        </ReusableForm>
      </div>
    </div>
  );
};
export default EditProfile;
