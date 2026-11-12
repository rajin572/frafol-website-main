"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import ReusableForm from "../ui/Form/ReuseForm";
import ReuseInput from "../ui/Form/ReuseInput";
import ReuseButton from "../ui/Button/ReuseButton";
import { Form } from "antd";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { addNewComment } from "@/services/ComentsService/ComentsServiceApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TiDelete } from "react-icons/ti";

const ForumSubmitReply = ({ id }: { id: string }) => {
  const [form] = Form.useForm();

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const { replace } = router;

  const replyid = searchParams?.get("reply")
  const replyName = searchParams?.get("to")

  // "Odpovedať" sits on a comment that can be far above the form: when a reply target is chosen,
  // bring the form into view and put the cursor in it, so the visitor sees where to write.
  const formWrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!replyid) return;
    const wrapper = formWrapperRef.current;
    if (!wrapper) return;
    wrapper.scrollIntoView({ behavior: "smooth", block: "center" });
    // preventScroll: the smooth scroll above must not be cut short by the focus jump.
    wrapper.querySelector("textarea")?.focus({ preventScroll: true });
  }, [replyid]);


  const handleRemoveReply = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("reply");
    params.delete("to");
    replace(`${pathName}?${params.toString()}`, { scroll: false });
  };

  const onSubmit = async (values: any) => {
    const data = {
      ...values,
      ...(
        replyid && { commentId: replyid }
      ),
      isAnonymous: false,
    };

    const res = await tryCatchWrapper(
      addNewComment,
      { body: data, params: { id } },
      {
        showToast: false,
        toastLoadingMessage: "Ukladajú sa zmeny...",
        toastSuccessMessage: "Zmeny boli úspešne uložené!",
        toastErrorMessage: "Zmeny sa nepodarilo uložiť",
      }
    );

    if (res?.success) {
      form.resetFields();
      handleRemoveReply();
    }
  };
  return (
    <div ref={formWrapperRef} className="w-full">
    <ReusableForm form={form} handleFinish={onSubmit} className="!mt-5 w-full">
      {
        replyName && (
          <div className="flex items-center gap-2 mb-3">
            <p className="text-sm font-semibold">{/* Replying to: */} Odpovedáte:</p>
            <div className="bg-secondary-color text-primary-color py-1 px-2 rounded-2xl flex items-center gap-1">
              <p className="text-sm font-semibold">{replyName}</p>
              <TiDelete onClick={handleRemoveReply} className="size-5 font-semibold cursor-pointer" />
            </div>
          </div>
        )
      }
      <ReuseInput
        name="text"
        inputType="textarea"
        rows={4}
        /* placeholder="Write your reply here..." */
        placeholder="Napíšte svoju odpoveď tu..."
        rules={[{ required: true, whitespace: true, message: "Napíšte komentár" }]}
      />

      <div className="flex justify-end">
        <ReuseButton htmlType="submit" variant="secondary" className="w-fit">
          {/* Post Comment */}
          Odoslať komentár
        </ReuseButton>
      </div>
    </ReusableForm>
    </div>
  );
};

export default ForumSubmitReply;
