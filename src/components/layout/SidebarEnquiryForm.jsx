"use client";

import { useState, useEffect } from "react";
import { User, Mail, MessageSquare, Phone, Globe, CheckCircle } from "lucide-react";
import { API_ENDPOINTS } from "@/config/api";

export default function SidebarEnquiryForm({ serviceTitle }) {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    how_can_we_help: serviceTitle || "",
    requirements: ""
  });

  useEffect(() => {
    if (serviceTitle) {
      setFormData((prev) => ({
        ...prev,
        how_can_we_help: serviceTitle
      }));
    }
  }, [serviceTitle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch(API_ENDPOINTS.CONTACT_SUBMIT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && (data.status || data.success || res.status === 200 || res.status === 201)) {
        setStatus("success");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          how_can_we_help: serviceTitle || "",
          requirements: ""
        });
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      console.error("Sidebar Enquiry submit error:", err);
      setStatus("error");
      setErrorMsg("A network error occurred. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="w-full bg-white rounded-[24px] overflow-hidden shadow-2xl border border-blue-100 p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4 border border-green-100">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h3 className="text-lg font-black text-blue-900 mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
          Thank You!
        </h3>
        <p className="text-gray-600 text-xs mb-6 leading-relaxed">
          Your enquiry regarding <strong>{serviceTitle}</strong> has been submitted. A team member will contact you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-[#1565c0] font-black uppercase tracking-widest text-[10px] hover:underline"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-[24px] overflow-hidden shadow-2xl border border-blue-100">
      <div className="p-4 md:p-5">
        <h3 className="text-blue-950 font-black text-xl mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
          Get a Free Consultation
        </h3>
        <p className="text-gray-500 text-xs mb-4">
          Interested in  <strong>{serviceTitle}</strong>? <br /> Tell us your requirements and we will respond within 2 hours.
        </p>

        <form className="space-y-3" onSubmit={handleSubmit}>
          {status === "error" && (
            <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-[11px] font-semibold">
              {errorMsg}
            </div>
          )}

          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1565c0]" />
                <input
                  type="text"
                  name="first_name"
                  required
                  value={formData.first_name}
                  onChange={handleChange}
                  // placeholder="John"
                  className="w-full h-[42px] !pl-3 pr-10 bg-[#f5f9ff] border border-blue-100 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#1565c0]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Last Name
              </label>
              <div className="relative">
                <User size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1565c0]" />
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  // placeholder="Doe"
                  className="w-full h-[42px] !pl-3 pr-10 bg-[#f5f9ff] border border-blue-100 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#1565c0]"
                />
              </div>
            </div>
          </div>

          {/* Email & How Can We Help */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1565c0]" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  // placeholder="name@company.com"
                  className="w-full h-[42px] !pl-3 pr-10 bg-[#f5f9ff] border border-blue-100 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#1565c0]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                Enquiry Service
              </label>
              <div className="relative">
                {/* <Globe size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1565c0]" /> */}
                <input
                  type="text"
                  name="how_can_we_help"
                  value={formData.how_can_we_help}
                  onChange={handleChange}
                  // placeholder="Service description"
                  className="w-full h-[42px] !pl-3 !pr-3 bg-[#f5f9ff] border border-blue-100 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#1565c0]"
                />
              </div>
            </div>
          </div>

          {/* Requirements Message */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
              Requirements
            </label>
            <div className="relative">
              <MessageSquare size={15} className="absolute right-4 top-4 text-[#1565c0]" />
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your workforce requirements..."
                className="w-full !pl-3 pr-10 pt-4 pb-3 bg-[#f5f9ff] border border-blue-100 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#1565c0] resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full h-[45px] rounded-lg bg-gradient-to-r from-[#0d47a1] to-[#1565c0] text-white text-sm font-bold hover:opacity-95 transition disabled:opacity-50"
          >
            {status === "sending" ? "Submitting..." : "Send Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}
