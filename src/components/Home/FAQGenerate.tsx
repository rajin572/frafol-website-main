"use client";
import React, { useState } from "react";
import Accordion from "../ui/Accordion";

interface FAQGenerateProps {
  accordionsData: { title: string; content: string }[];
}

const FAQGenerate = ({ accordionsData }: FAQGenerateProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);


  return (
    <div>
      {accordionsData.map((item: { title: string; content: string }, index: number) => (
        <Accordion
          key={index}
          index={index}
          title={item.title}
          content={item.content}
          isOpen={activeIndex === index}
          onToggle={() =>
            setActiveIndex((prevIndex) => (prevIndex === index ? null : index))
          }
        />
      ))}
    </div>
  );
};

export default FAQGenerate;
