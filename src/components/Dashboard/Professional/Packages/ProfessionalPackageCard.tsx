/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { AllImages } from "../../../../../public/assets/AllImages";
import { BsCurrencyEuro } from "react-icons/bs";
import { LuClock } from "react-icons/lu";
import ReuseButton from "@/components/ui/Button/ReuseButton";
import { MdDelete } from "react-icons/md";
import { IPackage } from "@/types";
import { getServerUrl } from "@/helpers/config/envConfig";
import { IoCalendarOutline } from "react-icons/io5";

const ProfessionalPackageCard = ({
  item,
  showEditModal,
  showDeleteModal,
}: {
  item: IPackage;
  showEditModal: (record: any) => void;
  showDeleteModal: (record: any) => void;
}) => {
  const serverUrl = getServerUrl();
  console.log(item)

  // vatAmount: 10,
  //   price: 200,
  //     mainPrice: 236,

  const priceWithoutServiceFee = item?.price + (item?.price * (item?.vatAmount / 100));

  const serviceFee = item?.mainPrice - priceWithoutServiceFee;

  console.log(serviceFee)
  return (
    <div className="p-1.5 rounded-xl border border-background-color">
      <div className="relative">
        <Image
          width={1000}
          height={1000}
          src={
            item?.thumbnailImage
              ? serverUrl + item?.thumbnailImage
              : AllImages?.dummyCover?.src
          }
          alt="workspace"
          className="w-full h-60 sm:h-40 lg:h-52 xl:h-60 object-cover rounded-lg "
        />
        <div className="flex items-center justify-between gap-2 absolute top-2  w-full px-2">
          {item?.vatAmount > 0 ? (
            <span className="text-sm sm:text-sm bg-secondary-color text-primary-color py-0.5 px-1.5 rounded-full ">
              VAT Included: {item?.vatAmount}%
            </span>
          ) : (
            <span></span>
          )}
          <div
            onClick={() => showDeleteModal(item)}
            className="flex items-center p-1 bg-secondary-color rounded-full"
          >
            <MdDelete className="text-lg text-primary-color cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="px-1  mt-3">
        <span className="text-sm sm:text-sm bg-secondary-color text-primary-color py-0.5 px-1.5 rounded-full capitalize">
          {item?.category}
        </span>
        <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold mt-1.5 break-all">
          {item?.title}
        </p>

        <p className="text-sm sm:text-sm lg:text-base mt-1.5 break-all">
          {item?.description}
        </p>

        <div className="flex flex-col gap-1 mt-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <BsCurrencyEuro className="text-secondary-color text-sm sm:text-base lg:text-lg" />
              <p className="text-sm sm:text-sm lg:text-base font-semibold">
                Price Without Service Fee:
              </p>
            </div>
            <p className="text-sm sm:text-sm lg:text-base">
              {priceWithoutServiceFee?.toFixed(2)}€
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <BsCurrencyEuro className="text-secondary-color text-sm sm:text-base lg:text-lg" />
              <p className="text-sm sm:text-sm lg:text-base font-semibold">
                Service Fee:
              </p>
            </div>
            <p className="text-sm sm:text-sm lg:text-base">
              {serviceFee?.toFixed(2)}€
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <BsCurrencyEuro className="text-secondary-color text-sm sm:text-base lg:text-lg" />
              <p className="text-sm sm:text-sm lg:text-base font-semibold">
                {/* Total Price: */}
                Celková cena:
              </p>
            </div>
            <p className="text-sm sm:text-sm lg:text-base">
              {item?.mainPrice?.toFixed(2)}€
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <LuClock className="text-secondary-color text-sm sm:text-base lg:text-lg" />
              <p className="text-sm sm:text-sm lg:text-base font-semibold">
                {/* Duration: */}
                Trvanie:
              </p>
            </div>
            <p className="text-sm sm:text-sm lg:text-base">{item?.duration}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <IoCalendarOutline className="text-secondary-color text-sm sm:text-base lg:text-lg" />
              <p className="text-sm sm:text-sm lg:text-base font-semibold">
                Delivery Time:
              </p>
            </div>
            <p className="text-sm sm:text-sm lg:text-base">
              {item?.deliveryTime / 7} Week
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-5 justify-between">
          <ReuseButton
            onClick={() => showEditModal(item)}
            variant="secondary"
            className="!text-base !py-4 !w-fit"
          >
            Edit Package
          </ReuseButton>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalPackageCard;
