"use client";
import React, { useState } from "react";
import ReuseButton from "../ui/Button/ReuseButton";
import ProfessionalServiceBookingModal from "../ui/Modal/Professional/ProfessionalServiceBookingModal";
import { IPackage, IProfessionalUser, IProfile } from "@/types";
import { useRouter } from "next/navigation";

const ServiceCardBookNow = ({
  myData,
  packageData,
  professionalUser
}: {
  myData: IProfile;
  packageData: IPackage;
  professionalUser: IProfessionalUser;

}) => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);

  const handleCancel = () => setIsModalVisible(false);
  return (
    <>
      <ReuseButton
        variant="secondary"
        className="!text-sm sm:!text-sm lg:!text-base !px-2 !py-1 w-fit"
        onClick={myData?._id ? openModal : () => router.push("/sign-in")}
      >
        Book Now
      </ReuseButton>
      <ProfessionalServiceBookingModal
        professionalUser={professionalUser}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        packageData={packageData}
        myData={myData}
      />
    </>
  );
};

export default ServiceCardBookNow;
