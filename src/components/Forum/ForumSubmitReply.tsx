"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import ReusableForm from "../ui/Form/ReuseForm";
import ReuseInput from "../ui/Form/ReuseInput";
import ReuseButton from "../ui/Button/ReuseButton";
import { Form } from "antd";
import { usePathname, useSearchParams } from "next/navigation";
import { TiDelete } from "react-icons/ti";

const ForumSubmitReply = ({
  onSubmitComment,
}: {
  // Sends the comment (replyTo = the comment it answers) and resolves to whether it was saved.
  onSubmitComment: (text: string, replyTo: string | null) => Promise<boolean>;
}) => {
  const [form] = Form.useForm();

  const searchParams = useSearchParams();
  const pathName = usePathname();

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
    // No server round trip needed to drop the reply target (see ForumReplyCard.handleReply).
    const query = params.toString();
    window.history.replaceState(null, "", query ? `${pathName}?${query}` : pathName);
  };

  // Optimistic: the comment (or reply) is shown in the list at once by the parent, the box is cleared
  // straight away, and the text and reply target come back only if sending fails.
  const onSubmit = async (values: any) => {
    const text: string = values?.text ?? "";
    const replyTo = replyid || null;
    const replyToName = replyName || null;

    form.resetFields();
    handleRemoveReply();

    const ok = await onSubmitComment(text, replyTo);

    if (!ok) {
      form.setFieldsValue({ text });
      if (replyTo && replyToName) {
        const params = new URLSearchParams(window.location.search);
        params.set("reply", replyTo);
        params.set("to", replyToName);
        window.history.replaceState(null, "", `${pathName}?${params.toString()}`);
      }
    }
  };
  return (
    <div ref={formWrapperRef} className="w-full">
    <ReusableForm form={form} handleFinish={onSubmit} className="!mt-5 w-full rounded-2xl bg-background-color/50 !p-4 sm:!p-5">
      {
        replyName && (
          <div className="flex items-center gap-2 mb-3">
            <p className="text-sm font-semibold">{/* Replying to: */} Odpovedáte:</p>
            <div className="bg-secondary-color text-primary-color py-1 pl-3 pr-1.5 rounded-full flex items-center gap-1">
              <p className="text-sm font-semibold">{replyName}</p>
              <TiDelete onClick={handleRemoveReply} className="size-5 font-semibold cursor-pointer" />
            </div>
          </div>
        )
      }
      <ReuseInput
        name="text"
        inputType="textarea"
        rows={3}
        /* placeholder="Write your reply here..." */
        placeholder="Napíšte svoju odpoveď tu..."
        formItemClassName="!mb-3"
        inputClassName="!bg-white !border !border-base-color/15 hover:!border-base-color/30 focus:!border-secondary-color !rounded-xl !p-4 !text-base"
        rules={[{ required: true, whitespace: true, message: "Napíšte komentár" }]}
      />

      <div className="flex justify-end">
        <ReuseButton htmlType="submit" variant="secondary" className="!w-fit !text-sm sm:!text-base !py-5 !px-6 !rounded-lg !font-semibold">
          {/* Post Comment */}
          Odoslať komentár
        </ReuseButton>
      </div>
    </ReusableForm>
    </div>
  );
};

export default ForumSubmitReply;
