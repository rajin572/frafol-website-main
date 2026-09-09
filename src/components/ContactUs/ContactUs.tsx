import React from "react";
import { TfiEmail } from "react-icons/tfi";
import { FiPhone } from "react-icons/fi";
import { TfiLocationPin } from "react-icons/tfi";
import ContactUsForm from "./ContactUsFrom";
import { PiIdentificationBadge, PiBuildingsFill } from "react-icons/pi";

const ContactUs = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[86vh]">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        <div className="w-full h-full mb-10 lg:mb-0">
          <div className="mb-5">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[45px] font-bold text-secondary-color mb-2">
              {/* Contact us */}
              Kontaktujte nás
            </h1>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl text-base-color mb-5">
            {/* Our expert will reach out to discuss your needs. */}
            Náš tím sa vám ozve a dohodne s vami ďalší postup.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <PiBuildingsFill className="text-secondary-color text-base sm:text-lg lg:text-xl" />
              <p className="text-base-color sm:text-lg lg:text-xl">
                FRAFOL s.r.o.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <TfiLocationPin className="text-secondary-color text-lg  sm:text-xl lg:text-2xl" />
              <p className="text-base-color sm:text-lg lg:text-xl">
                Vysokoškolákov 8556/33B 010 08 Žilina
              </p>
            </div>
            <div className="flex items-center gap-3">
              <PiIdentificationBadge className="text-secondary-color text-lg  sm:text-xl lg:text-2xl" />
              <p className="text-base-color sm:text-lg lg:text-xl">
                IČO: 57113904
              </p>
            </div>
            <div className="flex items-center gap-3">
              <PiIdentificationBadge className="text-secondary-color text-lg  sm:text-xl lg:text-2xl" />
              <p className="text-base-color sm:text-lg lg:text-xl">
                DIČ: 2122571286
              </p>
            </div>
            <div className="flex items-center gap-3">
              <TfiEmail className="text-secondary-color text-base sm:text-lg lg:text-xl" />
              <p className="text-base-color sm:text-lg lg:text-xl">
                cvak@frafol.sk
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FiPhone className="text-secondary-color text-base sm:text-lg lg:text-xl" />
              <p className="text-base-color sm:text-lg lg:text-xl">
                0917 174 707
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <ContactUsForm />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;