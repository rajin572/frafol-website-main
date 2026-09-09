import React from "react";
import Container from "../ui/Container";
import Image from "next/image";
import { AllImages } from "../../../public/assets/AllImages";
// import ComingSoonModal from "../ui/ComingSoonModal";
import * as motion from "motion/react-client";
import Revel from "../ui/Animation/Revel";
import DownloadAppModal from "../ui/DownloadAppSection/DownloadAppModal";

const mobile = {
  initial: { y: 400, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.5,
    },
  },
};

const DownloadAppSection = () => {
  return (
    <section
      id="download-app"
      className="overflow-hidden pt-14 sm:pt-16 lg:pt-20   bg-[#F9FAFB]"
    >
      <Container className="max-w-[1450px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 items-center">
          <div className="text-start lg:justify-self-start mt-10 lg:mt-0 ">
            <Revel className="pt-2">
              <h2 className="text-secondary-color text-3xl md:text-4xl xl:text-5xl font-semibold mb-5">
                Smart Property Investments Analysis
              </h2>
            </Revel>
            <Revel className="pt-2">
              <p className="text-[#3D3D3D] md:text-lg lg:text-xl mb-10">
                Join HAVN today and unlock the power of property analytics. Your
                trusted partner for discovering, analyzing, and investing in the
                perfect home
              </p>
            </Revel>
            <DownloadAppModal />
          </div>
          <motion.div
            variants={mobile}
            initial="initial"
            // animate=""
            whileInView="animate"
            className="justify-self-center lg:justify-self-end order-first lg:order-last"
          >
            <Image
              src={AllImages.smartPhone}
              alt="play_store"
              width={0}
              height={0}
              sizes="100vw"
              className=""
            />
          </motion.div>
        </div>
      </Container>
      {/* <ComingSoonModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        message={"Our Apps Will Be Available Soon."}
      /> */}
    </section>
  );
};

export default DownloadAppSection;
