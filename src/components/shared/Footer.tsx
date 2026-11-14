/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { AllImages } from "../../../public/assets/AllImages";
import Container from "../ui/Container";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import ReusableForm from "../ui/Form/ReuseForm";
import ReuseInput from "../ui/Form/ReuseInput";
import ReuseButton from "../ui/Button/ReuseButton";
import Link from "next/link";
import { useState } from "react";
import ReportModal from "../ui/Modal/ReportModal";
import { FaYoutube } from "react-icons/fa6";
import { Checkbox, Form } from "antd";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { subscribe } from "@/services/Others/OthersApi";
import FeedbackModal from "../ui/Modal/FeedbackModal";
import { useGetUserData } from "@/context/useGetUserData";

const socials = [
  { href: "https://www.facebook.com/people/Frafol/61582695734917", label: "Facebook", icon: FaFacebookF },
  { href: "https://www.instagram.com/frafol.sk", label: "Instagram", icon: FaInstagram },
  { href: "https://www.tiktok.com/@frafol.sk?is_from_webapp=1&sender_device=pc", label: "TikTok", icon: FaTiktok },
  { href: "https://www.youtube.com/@frafolsk", label: "YouTube", icon: FaYoutube },
];

const linkClass = "text-white/60 transition-colors hover:text-white";
const headingClass = "mb-4 text-[15px] font-semibold text-white";

export default function Footer() {
  const [form] = Form.useForm();
  const isChecked = Form.useWatch("newsletter", form);

  const currentYear = new Date().getFullYear();
  const user = useGetUserData();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const showReportModal = () => {
    setIsReportModalOpen(true);
  };

  const showFeedbackModal = () => {
    setIsFeedbackModalOpen(true);
  };

  const hancleCancel = () => {
    setIsReportModalOpen(false);
    setIsFeedbackModalOpen(false);
  };
  const submit = async (values: any) => {
    const res = await tryCatchWrapper(
      subscribe,
      { body: { email: values.email } },
      {
        toastLoadingMessage: "Chvíľu počkajte...",
        toastSuccessMessage: "Úspešne ste sa prihlásili na odber!",
        toastErrorMessage: "Niečo sa pokazilo! Skúste to znova.",
      }
    );

    if (res?.success) {
      form.resetFields();
    }
  };
  return (
    <div className="relative">
      <footer className="bg-[#1f1d1c] text-sm text-white">

        <Container>
          {/* Brand + newsletter */}
          <div className="grid grid-cols-1 gap-10 py-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <Image src={AllImages?.logo} alt="FRAFOL Logo" className="h-12 w-auto" sizes="200px" />
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/60">
                Nájdite skúsených fotografov a kameramanov, pozrite si ich portfóliá a jednoducho si
                objednajte svoje ďalšie fotenie alebo natáčanie.
              </p>
              <div className="mt-6 flex gap-2.5">
                {socials.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-md border border-white/15 text-sm text-white/80 transition-colors hover:border-white/40 hover:text-white"
                  >
                    <Icon />
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter, pushed to the right edge on desktop */}
            <div className="lg:col-span-7 lg:flex lg:justify-end">
              <div className="w-full lg:max-w-xl">
                <h4 className="text-lg sm:text-xl font-semibold">
                  Prihláste sa na odber noviniek
                </h4>
                <ReusableForm form={form} handleFinish={submit} className="mt-5">
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-start">
                    <ReuseInput
                      formItemClassName="!m-0 !p-0 w-full sm:!min-w-[240px] grow"
                      inputClassName="!rounded-lg !px-4"
                      type="email"
                      name="email"
                      placeholder="Zadajte svoj e-mail"
                    />
                    <ReuseButton
                      disabled={!isChecked}
                      htmlType="submit"
                      className="!text-sm sm:!text-base !bg-secondary-color !text-white sm:!w-fit !border-none !px-6 !py-5 !font-semibold !rounded-lg disabled:!opacity-50"
                    >
                      Prihlásiť sa na odber
                    </ReuseButton>
                  </div>
                  <Form.Item className="!mb-0 !mt-3" name="newsletter" valuePropName="checked">
                    <Checkbox className="!text-white/60 !text-[13px]">
                      Týmto súhlasím so zasielaním bezplatného odberu noviniek na poskytnutú e-mailovú adresu
                    </Checkbox>
                  </Form.Item>
                </ReusableForm>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 gap-8 border-t border-white/10 py-12 sm:grid-cols-2 lg:grid-cols-5">
            {/* Privacy & Terms */}
            <div>
              <h4 className={headingClass}>Ochrana súkromia a podmienky</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/terms-of-service-marketplace" className={linkClass}>
                    Všeobecné obchodné podmienky Online trh
                  </Link>
                </li>
                <li>
                  <Link href="/data-protection" className={linkClass}>GDPR</Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className={linkClass}>
                    Všeobecné obchodné podmienky Zmluvné vzťahy
                  </Link>
                </li>
                <li>
                  <Link href="/website-functionality-compatibility" className={linkClass}>
                    Funkčnosť a kompatibilita webu
                  </Link>
                </li>
                <li>
                  <Link href="/search-algorithm" className={linkClass}>
                    Algoritmus vyhľadávania
                  </Link>
                </li>
              </ul>
            </div>

            {/* For Clients */}
            <div>
              <h4 className={headingClass}>Pre klientov</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/how-ordering-works" className={linkClass}>
                    Ako funguje objednávanie
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className={headingClass}>Spoločnosť</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/about-us" className={linkClass}>O nás</Link>
                </li>
                <li>
                  <Link href="/photography" className={linkClass}>Preskúmať fotografiu</Link>
                </li>
                <li>
                  <Link href="/videography" className={linkClass}>Preskúmať video</Link>
                </li>
              </ul>
            </div>

            {/* For Creators */}
            <div>
              <h4 className={headingClass}>Pre tvorcov</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/how-it-works" className={linkClass}>Ako to funguje</Link>
                </li>
              </ul>
            </div>

            {/* Support & Info */}
            <div>
              <h4 className={headingClass}>Podpora a informácie</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/contact-us" className={linkClass}>Kontaktujte nás</Link>
                </li>
                <li>
                  <button type="button" className={`${linkClass} cursor-pointer text-left`} onClick={() => showReportModal()}>
                    Nahlásiť nezákonný obsah
                  </button>
                </li>
                {user?.userId && (
                  <li>
                    <button type="button" className={`${linkClass} cursor-pointer text-left`} onClick={() => showFeedbackModal()}>
                      Poslať spätnú väzbu
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 md:flex-row">
            <p className="text-sm text-white/45">
              © {currentYear} FRAFOL. Všetky práva vyhradené.
            </p>
            <a href="mailto:cvak@frafol.sk" className="text-sm text-white/45 transition-colors hover:text-white">
              cvak@frafol.sk
            </a>
          </div>
        </Container>
      </footer>
      <ReportModal
        isReportModalVisible={isReportModalOpen}
        handleCancel={hancleCancel}
        /* description="Something went wrong? Please let us know." */
        description="FORMULÁRA PRE NAHLÁSENIE NEZÁKONNÉHO OBSAHU"
      />
      <FeedbackModal
        isFeedbackModalVisible={isFeedbackModalOpen}
        handleCancel={hancleCancel}
      />
    </div>
  );
}
