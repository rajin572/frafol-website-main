"use client";
import React from "react";
import ReuseButton from "../ui/Button/ReuseButton";
import { IoCameraOutline } from "react-icons/io5";
import ProfessionalBookingModal from "../ui/Modal/Professional/ProfessionalBookingModal";
import { IProfessionalUser, IProfile } from "@/types";
import { useRouter } from "next/navigation";

const ProfessionalPageDetailsBookSession = ({
  myData,
  professionalUser,
}: {
  myData: IProfile;
  professionalUser: IProfessionalUser;
}) => {
  const router = useRouter();
  const [isBookModalOpen, setIsBookModalOpen] = React.useState(false);

  const openBookModal = () => setIsBookModalOpen(true);

  const handleCancle = () => setIsBookModalOpen(false);
  return (
    <>
      <ReuseButton
        variant="outline"
        className="!py-4.5 !px-4 !text-sm sm:!text-sm lg:!text-base !text-secondary-color !border-secondary-color flex items-center"
        onClick={myData?._id ? openBookModal : () => router.push("/sign-in")}
      >
        <IoCameraOutline className="" /> Book a Session
      </ReuseButton>
      <ProfessionalBookingModal
        isModalVisible={isBookModalOpen}
        handleCancel={handleCancle}
        myData={myData}
        professionalUser={professionalUser}
      />
    </>
  );
};

export default ProfessionalPageDetailsBookSession;
