"use client";
import React from "react";
import Container from "../ui/Container";
import * as motion from "motion/react-client";
import FAQGenerate from "./FAQGenerate";
import SectionHeader from "../ui/SectionHeader";
import { Mail } from "lucide-react";
import { clientsAccordions, professionalsAccordions } from "./faqData";

const FAQ = () => {
  const [activeButton, setActiveButton] = React.useState<
    "Clients" | "Photographer/Videographer"
  >("Clients");


  const accordionsData = activeButton === "Clients" ? clientsAccordions : professionalsAccordions;

  return (
    <motion.section
      // id="faq"
      // initial={{ opacity: 0 }}
      // whileInView={{ opacity: 1 }}
      // transition={{ duration: 0.1 }}
      className="bg-white py-20 sm:py-24"
    >
      <Container>
        <SectionHeader
          /* title="Frequently asked questions" */
          eyebrow="Otázky a odpovede"
          title="Často kladené otázky"
          /* description="Everything you need to know about the product and billing." */
          description="Všetko, čo potrebujete vedieť o službe a platbách"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-12">
          <div className="flex flex-col gap-6">
            {/* Audience switch */}
            <div role="tablist" className="grid grid-cols-2 gap-1 rounded-lg border border-base-color/10 bg-white p-1">
              {(
                [
                  /* Clients */
                  ["Clients", "Klienti"],
                  /* Photographer/Videographer */
                  ["Photographer/Videographer", "Fotografi/Kameramani"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={activeButton === value}
                  onClick={() => setActiveButton(value)}
                  className={`cursor-pointer rounded-md px-3 py-2.5 text-sm sm:text-base font-semibold transition-colors duration-200 ${
                    activeButton === value
                      ? "bg-secondary-color text-white"
                      : "text-base-color/60 hover:text-base-color"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Support card */}
            <div className="rounded-xl border border-base-color/10 bg-background-color/50 p-6">
              <p className="text-base font-semibold text-base-color">Nenašli ste odpoveď?</p>
              <p className="mt-1 text-sm text-base-color/60">Napíšte nám, radi pomôžeme.</p>
              <a
                href="mailto:cvak@frafol.sk"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary-color underline-offset-4 hover:underline"
              >
                <Mail className="size-4" /> cvak@frafol.sk
              </a>
            </div>
          </div>
          <div className="col-span-2">
            <FAQGenerate accordionsData={accordionsData} />
          </div>
        </div>
      </Container>
    </motion.section>
  );
};

export default FAQ;