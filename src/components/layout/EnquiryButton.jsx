"use client";

import { useState } from "react";
import { X, MessageSquareMore } from "lucide-react";
import ContactForm from "./ContactForm";

const EnquireButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Sticky Enquire Button */}
      <div className="fixed right-0 top-1/2 z-50 -translate-y-1/2 hidden md:block">

        <button
          onClick={() => setOpen(true)}
          className="group flex items-center gap-2 rounded-r-xl bg-gradient-to-b from-blue-600 to-indigo-700 px-3 py-4 shadow-xl transition-all duration-500 hover:px-3"
        >



          <span className="[writing-mode:vertical-rl] rotate-180 text-[9px] md:text-[14px] font-semibold tracking-[0.2em] text-white">
            ENQUIRY NOW
          </span>

        </button>

      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-all duration-500 ${open
          ? "visible opacity-100"
          : "invisible opacity-0"
          }`}
        onClick={() => setOpen(false)}
      />

      {/* Form Drawer */}
      <div
        className={`fixed right-0 top-1/2 z-[70] h-auto w-full max-w-md transform bg-white rounded-l-2xl shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${open
            ? "translate-x-0 -translate-y-1/2"
            : "translate-x-full -translate-y-1/2"
          }`}
      >

        {/* Header */}
        <div className="absolute right-4 top-4 z-20">

          <button
            onClick={() => setOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full  transition-all duration-300 hover:bg-red-100"
          >

            <X size={20} />

          </button>

        </div>

        {/* Form */}
        <div>
          <ContactForm />
        </div>


      </div>
    </>
  );
};

export default EnquireButton;