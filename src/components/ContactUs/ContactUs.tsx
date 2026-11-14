import React from "react";
import { TfiEmail } from "react-icons/tfi";
import { FiPhone } from "react-icons/fi";
import { TfiLocationPin } from "react-icons/tfi";
import ContactUsForm from "./ContactUsFrom";
import { PiIdentificationBadge, PiBuildingsFill } from "react-icons/pi";

// Company details under the heading. `href` makes the e-mail / phone clickable.
const details = [
  { icon: PiBuildingsFill, text: "FRAFOL s.r.o." },
  { icon: TfiLocationPin, text: "Vysokoškolákov 8556/33B 010 08 Žilina" },
  { icon: PiIdentificationBadge, text: "IČO: 57113904" },
  { icon: PiIdentificationBadge, text: "DIČ: 2122571286" },
  { icon: TfiEmail, text: "cvak@frafol.sk", href: "mailto:cvak@frafol.sk" },
  { icon: FiPhone, text: "0917 174 707", href: "tel:+421917174707" },
];

const ContactUs = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[86vh]">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16 w-full">
        <div className="w-full h-full">
          <h1 className="text-3xl sm:text-4xl lg:text-[45px] leading-tight tracking-tight font-bold text-secondary-color mb-4">
            {/* Contact us */}
            Kontaktujte nás
          </h1>
          <p className="text-lg sm:text-xl text-base-color/75 leading-relaxed mb-8">
            {/* Our expert will reach out to discuss your needs. */}
            Náš tím sa vám ozve a dohodne s vami ďalší postup.
          </p>
          <ul className="space-y-4">
            {details.map(({ icon: Icon, text, href }) => (
              <li key={text} className="flex items-center gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary-color/10 text-secondary-color">
                  <Icon className="size-5" />
                </span>
                {href ? (
                  <a
                    href={href}
                    className="text-base-color sm:text-lg transition-colors hover:text-secondary-color"
                  >
                    {text}
                  </a>
                ) : (
                  <p className="text-base-color sm:text-lg">{text}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <ContactUsForm />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
