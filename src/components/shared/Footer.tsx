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
    <div
      className="relative"
    // style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="h-auto w-full">
        <footer className="bg-[#A82B0F] text-white px-6 md:px-16 py-10 text-sm">
          <Container>
            <div className="flex flex-col  gap-10 pb-8">
              {/* Logo + Subscription */}
              <div className="flex flex-col md:flex-row justify-between gap-5 items-center">
                <div className="flex items-center gap-2">
                  <Image
                    src={AllImages?.logo}
                    alt="FRAFOL Logo"
                    className="h-16 w-auto"
                  />
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-lg sm:text-xl lg:text-2xl xl:text-2xl">
                    Prihláste sa na odber noviniek
                  </h4>
                  <ReusableForm form={form} handleFinish={submit} className="">
                    <div className="flex gap-2 items-center">
                      <ReuseInput
                        formItemClassName="!m-0 !p-0 !min-w-[200px] lg:!min-w-[350px]"
                        inputClassName=""
                        type="email"
                        name="email"
                        placeholder="Zadajte svoj e-mail"
                      />
                      <ReuseButton
                        disabled={!isChecked}
                        htmlType="submit"
                        className="!text-sm sm:!text-base lg:!text-lg !bg-third-color !text-secondary-color !w-fit !border-none !px-3 !py-5 !-mt-1 !font-bold"
                      >
                        Prihlásiť sa na odber
                      </ReuseButton>
                    </div>
                    <Form.Item
                      className="!mb-0"
                      name="newsletter"
                      valuePropName="checked"
                    >
                      <Checkbox className="!text-primary-color">
                        Týmto súhlasím so zasielaním bezplatného odberu noviniek na poskytnutú e-mailovú adresu
                      </Checkbox>
                    </Form.Item>
                  </ReusableForm>
                </div>
              </div>
              <div className="my-2  border-b border-primary-color"></div>
              {/* Links */}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 text-white">
                {/* Privacy & Terms */}
                <div>
                  <h4 className="font-bold mb-2 text-lg sm:text-xl lg:text-2xl">
                    Ochrana súkromia a podmienky
                  </h4>
                  <ul className="space-y-3 lg:space-y-2">
                    <li className="focus:underline underline-offset-2">
                      <Link href="/terms-of-service-marketplace">
                        Všeobecné obchodné podmienky Online trh
                      </Link>
                    </li>
                    <li className="focus:underline underline-offset-2">
                      <Link href="/data-protection">GDPR</Link>
                    </li>
                    <li className="focus:underline underline-offset-2">
                      <Link href="/terms-of-service">
                        Všeobecné obchodné podmienky Zmluvné vzťahy
                      </Link>
                    </li>
                    <li className="focus:underline underline-offset-2">
                      <Link href="/website-functionality-compatibility">
                        Funkčnosť a kompatibilita webu{" "}
                      </Link>
                    </li>
                    <li className="focus:underline underline-offset-2">
                      <Link href="/search-algorithm">
                        Algoritmus vyhľadávania
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* For Clients */}
                <div>
                  <h4 className="font-bold mb-2 text-lg sm:text-xl lg:text-2xl">
                    Pre klientov
                  </h4>
                  <ul className="space-y-3 lg:space-y-2">
                    <li className="focus:underline underline-offset-2">
                      <Link href="/how-ordering-works">
                        Ako funguje objednávanie
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h4 className="font-bold mb-2 text-lg sm:text-xl lg:text-2xl">
                    Spoločnosť
                  </h4>
                  <ul className="space-y-3 lg:space-y-2">
                    <li className="focus:underline underline-offset-2">
                      <Link href="/about-us">
                        O nás
                      </Link>
                    </li>
                    <li className="focus:underline underline-offset-2">
                      <Link href="/photography">
                        Preskúmať fotografiu
                      </Link>
                    </li>
                    <li className="focus:underline underline-offset-2">
                      <Link href="/videography">
                        Preskúmať video
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* For Creators */}
                <div>
                  <h4 className="font-bold mb-2 text-lg sm:text-xl lg:text-2xl">
                    Pre tvorcov
                  </h4>
                  <ul className="space-y-3 lg:space-y-2">
                    <li className="focus:underline underline-offset-2">
                      <Link href="/how-it-works">
                        Ako to funguje
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Support & Info */}
                <div>
                  <h4 className="font-bold mb-2 text-lg sm:text-xl lg:text-2xl">
                    Podpora a informácie
                  </h4>
                  <ul className="space-y-3 lg:space-y-2">
                    <li className="focus:underline underline-offset-2">
                      <Link href="/contact-us">
                        Kontaktujte nás
                      </Link>
                    </li>
                    <li className="focus:underline underline-offset-2">
                      <p
                        className="cursor-pointer"
                        onClick={() => showReportModal()}
                      >
                        Nahlásiť nezákonný obsah
                      </p>
                    </li>
                    {
                      user?.userId && (
                        <li className="focus:underline underline-offset-2">
                          <p
                            className="cursor-pointer"
                            onClick={() =>
                              showFeedbackModal()
                            }
                          >
                            Poslať spätnú väzbu
                          </p>
                        </li>
                      )
                    }
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm gap-4">
              <p className="text-sm sm:text-sm lg:text-base  text-primary-color ">
                © {currentYear} FRAFOL. Všetky práva vyhradené.
              </p>
              <div className="flex gap-4 text-lg">
                <Link
                  href="https://www.facebook.com/people/Frafol/61582695734917"
                  target="_blank"
                >
                  <FaFacebookF />
                </Link>{" "}
                <Link
                  href="https://www.instagram.com/frafol.sk"
                  target="_blank"
                >
                  <FaInstagram />{" "}
                </Link>{" "}
                <Link
                  href="https://www.tiktok.com/@frafol.sk?is_from_webapp=1&sender_device=pc"
                  target="_blank"
                >
                  <FaTiktok />
                </Link>
                <Link href="https://www.youtube.com/@frafolsk" target="_blank">
                  <FaYoutube />
                </Link>
              </div>
            </div>
          </Container>
        </footer>
      </div>
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