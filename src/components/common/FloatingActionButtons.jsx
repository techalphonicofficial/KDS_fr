import React from "react";
import { Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

/**
 * Floating bottom sticky action bar for mobile devices.
 * Contains Call, Email, and WhatsApp actions with brand-aligned styling.
 */
export default function FloatingActionButtons({ siteInfo }) {
  const phone = siteInfo?.phone || "+919899184918";
  const email = siteInfo?.email || "info@kdsinternational.org";
  const cleanPhone = phone.replace(/[^\d]/g, "");

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full z-[9999] bg-white dark:bg-[#0d1117] border-t border-gray-200 dark:border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 flex gap-3 lg:hidden items-center justify-between">
      {/* Call Us */}
      <a
        href={`tel:${phone}`}
        className="flex-1 !py-2.5 rounded-full bg-[#1565c0] text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#0d47a1] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#1565c0]/15"
        aria-label="Call KDS International"
      >
        <Phone size={14} />
        <span>Call Us</span>
      </a>

      {/* Email */}
      <a
        href={`mailto:${email}`}
        className="flex-1 !py-2.5 rounded-full bg-slate-900 dark:bg-slate-800 text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-slate-800 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2 shadow-md"
        aria-label="Email KDS International"
      >
        <Mail size={14} />
        <span>Email</span>
      </a>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${cleanPhone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 !py-2.5  rounded-full bg-[#25D366] text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/15"
        aria-label="Chat via WhatsApp"
      >
        <FaWhatsapp size={16} />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
