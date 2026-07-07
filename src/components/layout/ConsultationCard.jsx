import React from 'react'
import {
  User,
  Mail,
  Phone,
  Globe,
  MessageSquare
} from "lucide-react";

const ConsultationCard = () => {
  return (
 <div
  className="relative w-full py-20"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2000')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Light Overlay */}
  <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px]" />

  <div className="relative z-10 max-w-6xl mx-auto px-6">

    {/* Heading */}
    <div className="mb-16">
      <h2
        className="text-4xl md:text-5xl font-bold text-gray-800 mb-2"
        style={{ fontFamily: "Oswald, sans-serif" }}
      >
        Manpower Request Form
      </h2>

      <p
        className="text-gray-600 text-lg"
        style={{ fontFamily: "Oswald, sans-serif" }}
      >
        Get professional workforce solutions tailored to your business needs.
      </p>

      <div className="w-full h-px bg-gray-300 mt-6" />
    </div>

    <form className="space-y-10">

      {/* Full Name */}
      <div className="grid md:grid-cols-[140px_1fr] gap-10 items-start">
        <label
          className="text-gray-700 text-2xl font-light"
          style={{ fontFamily: "Oswald, sans-serif" }}
        >
          Full Name
        </label>

        <div>
          <input
            type="text"
            placeholder="Your Full Name"
            className="
              w-full
              h-14
              bg-white/90
              border
              border-gray-200
              px-5
              text-gray-700
              outline-none
              focus:border-[#1565c0]
            "
          />
        </div>
      </div>

      {/* Email */}
      <div className="grid md:grid-cols-[140px_1fr] gap-10 items-start">
        <label
          className="text-gray-700 text-2xl font-light"
          style={{ fontFamily: "Oswald, sans-serif" }}
        >
          E-mail
        </label>

        <div>
          <input
            type="email"
            placeholder="example@company.com"
            className="
              w-full
              h-14
              bg-white/90
              border
              border-gray-200
              px-5
              text-gray-700
              outline-none
              focus:border-[#1565c0]
            "
          />
        </div>
      </div>

      {/* Phone */}
      <div className="grid md:grid-cols-[140px_1fr] gap-10 items-start">
        <label
          className="text-gray-700 text-2xl font-light"
          style={{ fontFamily: "Oswald, sans-serif" }}
        >
          Phone
        </label>

        <div>
          <input
            type="text"
            placeholder="+91 9876543210"
            className="
              w-full
              h-14
              bg-white/90
              border
              border-gray-200
              px-5
              text-gray-700
              outline-none
              focus:border-[#1565c0]
            "
          />
        </div>
      </div>

      {/* Website */}
      <div className="grid md:grid-cols-[140px_1fr] gap-10 items-start">
        <label
          className="text-gray-700 text-2xl font-light"
          style={{ fontFamily: "Oswald, sans-serif" }}
        >
          Website
        </label>

        <div>
          <input
            type="text"
            placeholder="www.company.com"
            className="
              w-full
              h-14
              bg-white/90
              border
              border-gray-200
              px-5
              text-gray-700
              outline-none
              focus:border-[#1565c0]
            "
          />
        </div>
      </div>

      {/* Message */}
      <div className="grid md:grid-cols-[140px_1fr] gap-10 items-start">
        <label
          className="text-gray-700 text-2xl font-light"
          style={{ fontFamily: "Oswald, sans-serif" }}
        >
          Message
        </label>

        <div>
          <textarea
            rows={6}
            placeholder="Tell us your manpower requirements..."
            className="
              w-full
              bg-white/90
              border
              border-gray-200
              px-5
              py-4
              text-gray-700
              resize-none
              outline-none
              focus:border-[#1565c0]
            "
          />
        </div>
      </div>

      {/* Button */}
      <div className="md:pl-[180px]">
        <button
          type="submit"
          className="
            px-10
            py-4
            bg-[#1565c0]
            text-white
            uppercase
            tracking-[0.15em]
            text-sm
            font-semibold
            hover:bg-[#0d47a1]
            transition
          "
        >
          Send Enquiry
        </button>
      </div>

    </form>
  </div>
</div>
  )
}

export default ConsultationCard
