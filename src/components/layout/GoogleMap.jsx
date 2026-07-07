import React from "react";

export default function GoogleMap() {
  return (
    <section className="w-full bg-white dark:bg-[#0d1117]  pb-0 border-t border-gray-100 dark:border-white/5">
      {/* <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8 animate-fade-in-up">
          <span className="text-[#1565c0] dark:text-[#90caf9] text-[10px] font-black uppercase tracking-[0.25em] mb-2 block">
            Visit Our Office
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-950 dark:text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
            Our Location
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
            D-105, First Floor, 1/56, Lalita Park, Laxmi Nagar, Delhi, 110092
          </p>
        </div>
      </div> */}
      <div className="w-full h-[350px] md:h-[450px] border-t border-gray-200 dark:border-white/10 relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7003.831336283715!2d77.26257247770992!3d28.632289500000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfcb3b1aaaaab%3A0xd14fd5dd57e71176!2sKDS%20INTERNATIONAL%20PVT.%20LTD%20%7C%20Manpower%20Services%20In%20Delhi!5e0!3m2!1sen!2sin!4v1782815325122!5m2!1sen!2sin"
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </section>
  );
}
