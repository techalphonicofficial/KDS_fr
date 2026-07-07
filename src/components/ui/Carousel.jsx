"use client";

import { useState, useEffect } from "react";
import { API_URL } from '@/config/api';
import { IMAGE_URL } from '@/config/api';
export default function Carousel({ data }) {

  const slides = data?.carousel_json || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play interval
  useEffect(() => {

    if (!slides.length) return;

    const timer = setInterval(() => {

      setCurrentIndex(
        prev => prev === slides.length - 1 ? 0 : prev + 1
      );

    }, 6000);


    return () => clearInterval(timer);


  }, [slides.length]);



  const handlePrev = () => {

    setCurrentIndex(
      prev => prev === 0 ? slides.length - 1 : prev - 1
    );

  }



  const handleNext = () => {

    setCurrentIndex(
      prev => prev === slides.length - 1 ? 0 : prev + 1
    );

  }

  return (
    <div className="relative w-full h-[70vh] md:h-screen overflow-hidden bg-[#06111e] group">
      {/* Carousel wrapper */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
              }`}
          >
            {/* Background Image - Local high-resolution image */}
            <img
              src={`${IMAGE_URL}/${slide.image}`}
              className="block w-full h-full object-cover"
              alt={slide.alt_text || "banner"}
            />
            {/* Gradient overlay to ensure text is fully readable and images blend nicely */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30 z-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06111e] via-transparent to-transparent z-20" />

            {/* Text Overlay */}
            <div className="absolute inset-0 z-30 flex items-center">
              <div className="container mx-auto !px-8 md:px-12 lg:px-24 max-w-7xl">
                <div className="max-w-4xl space-y-6 text-left">
                  <h2 className="!text-2xl !pt-8 !md:pt-0 pb-0 md:!pb-6 md:!text-4xl text-increase font-black text-white leading-[1.1] tracking-tight drop-shadow-md font-sans">
                    {slide.title}
                  </h2>
                  <p className="text-gray-200 text-base md:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl drop-shadow">
                    {slide.description}
                  </p>
                  <div className="pt-4 flex flex-wrap gap-4">
                    <a
                      href="/contact"
                      className="inline-block px-3 py-3 bg-green-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition"
                    >
                      Book a Free Consultation
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-8 left-1/2 ">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-blue-500 scale-125" : "bg-white/40 hover:bg-white/70"
              }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Previous button (White circle, black arrow matching the screenshot) */}
      <button
        type="button"
        className="absolute top-1/2 left-6 z-40 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-black hover:bg-gray-100 active:scale-95 flex items-center justify-center shadow-lg transition-all hidden md:block"
        onClick={handlePrev}
        aria-label="Previous Slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Next button (White circle, black arrow matching the screenshot) */}
      <button
        type="button"
        className="absolute top-1/2 right-6 z-40 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-black hover:bg-gray-100 active:scale-95 flex items-center justify-center shadow-lg transition-all hidden md:block"
        onClick={handleNext}
        aria-label="Next Slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
