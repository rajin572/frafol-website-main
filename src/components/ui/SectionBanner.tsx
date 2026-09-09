import * as motion from "motion/react-client";
import Image from "next/image";
import Container from "../ui/Container";
import Revel from "../ui/Animation/Revel";
import React from "react";
// import BackToPreviousPage from "./BackToPreviousPage";

interface SectionBannerProps {
  image: string;
  title: string;
  description?: string;
}

const SectionBanner: React.FC<SectionBannerProps> = ({
  image,
  description = "",
}) => {
  return (
    <section>
      {" "}
      <motion.div className="relative h-[55vh] object-cover  hidden md:flex items-center justify-center select-none">
        <Image
          width={2000}
          height={2000}
          src={image}
          alt="banner-image"
          className="!w-full h-full object-cover object-left"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#0000008A] via-[#0000008A] to-[#0000009A]"></div>
        <div className="absolute w-full h-full z-10 flex items-end">
          <Container>
            {/* <BackToPreviousPage /> */}
            <div className="relative">
              <div className="flex justify-between items-center gap-2 mb-[4%]">
                <div className="">
                  <Revel>
                    {/* <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-extrabold text-start text-primary-color tracking-wider">
                      {title}
                    </h1> */}
                    <p className="text-primary-color mt-2">{description}</p>
                  </Revel>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </motion.div>
    </section>
  );
};

export default SectionBanner;
