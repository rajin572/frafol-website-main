"use client";
import React, { useState } from "react";
import { Button } from "antd";
import Image from "next/image";
import { allIcons } from "../../../../public/assets/AllImages";
import ComingSoonModal from "@/components/ui/ComingSoonModal";

const DownloadAppModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="flex justify-start items-center gap-2">
        <Button
          onClick={() => {
            showModal();
          }}
          className=" text-start gap-1 py-8  md:w-[200px] bg-base-color border-none rounded-xl"
        >
          <Image
            src={allIcons.appleStore}
            alt="apple_store"
            width={0}
            height={0}
            sizes="100vw"
            className="h-[20px] w-[20px] sm:h-[30px] sm:w-[30px] md:h-[40px] md:w-[40px]"
          />
          <div>
            <p className="text-sm text-primary-color mb-1">Download on the</p>
            <h4 className="text-primary-color text-sm sm:text-lg md:text-xl">
              Apple Store
            </h4>
          </div>
        </Button>
        <Button
          onClick={() => {
            showModal();
          }}
          className=" text-start gap-1 py-8  md:w-[200px] bg-base-color border-none rounded-xl"
        >
          <Image
            src={allIcons.playstore}
            alt="play_store"
            width={0}
            height={0}
            sizes="100vw"
            className="h-[20px] w-[20px] sm:h-[30px] sm:w-[30px] md:h-[40px] md:w-[40px]"
          />
          <div>
            <p className="text-sm text-primary-color mb-1">Download on the</p>
            <h4 className="text-primary-color text-sm sm:text-lg md:text-xl">
              Google Play
            </h4>
          </div>
        </Button>
      </div>
      <ComingSoonModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        message={"Our Apps Will Be Available Soon."}
      />
    </div>
  );
};

export default DownloadAppModal;
