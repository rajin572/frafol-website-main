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
        className="!w-full !py-5 !px-5 !text-sm sm:!text-base !font-semibold !rounded-lg !bg-white !text-secondary-color !border-secondary-color hover:!bg-secondary-color/5 flex items-center justify-center gap-2"
        onClick={myData?._id ? openBookModal : () => router.push("/sign-in")}
      >
        <IoCameraOutline className="text-lg" /> Požiadať o cenovú ponuku
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
