"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqsList = faqs.faq || []; // Ensure we have an array to map over

  return (
    <section className="bg-gray-50 !py-24    ">
      <div className=" w-full max-w-[1550px]   mx-auto p-4 ">

        <h2 className="text-center text-[32px] font-light uppercase !text-[#0d47a1] !mb-10">
          frequently asked questions
        </h2>

        <div className="border-t border-[#d8d8d2]">
          {faqsList.map((faq, index) => (
            <div
              key={faq.id}
              className="border-b border-[#d8d8d2]"
            >
              <button
                type="button"
                onClick={() => handleToggle(index)}
                className="w-full flex items-center justify-between py-5 text-left uppercase !text-[18px] font-medium text-[#444]"
              >
                <span>{faq.question}</span>

                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-[300px] pb-5"
                    : "max-h-0"
                }`}
              >
              <p className="text-[16px] leading-7 text-[#666] pr-8">
  {faq.answer?.replace(/<[^>]+>/g, '')}
</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}