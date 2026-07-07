"use client";

import { useState } from "react";
import { Send, CheckCircle2, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { API_ENDPOINTS } from "@/config/api";

export default function ContactForm({ services }) {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    how_can_we_help: "",
    requirements: ""
  });

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
          how_can_we_help: "",
          requirements: ""
        });
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      console.error("Contact submit error:", err);
      setStatus("error");
      setErrorMsg("A network error occurred. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div className=" md:p-4  rounded-[2.5rem] border border-[#2563eb]/20 text-center animate-fade-in-up shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/5 via-transparent to-[#7c3aed]/5 opacity-50" />
        <div className="relative z-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2563eb]/10 to-[#7c3aed]/10 flex items-center justify-center mx-auto mb-2 border border-[#2563eb]/20 group-hover:scale-110 transition-transform duration-500">
            <CheckCircle2 size={48} className="text-[#2563eb]" />
          </div>
          <h3
            className="text-4xl font-black text-gray-900 mb-6 tracking-tighter"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Transmission Received.
          </h3>
          <p className="text-gray-600 text-lg mb-10 leading-relaxed italic">
            &ldquo;Your inquiry has been logged into our precision network. A
            specialist will reach out within 24 business hours.&rdquo;
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="text-[#2563eb] font-black underline uppercase tracking-widest text-xs hover:text-[#7c3aed] transition-colors"
          >
            Initiate New Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4  sm:mt-0 mt-36 md:mt-0  md:p-3 rounded-[2rem] border border-gray-200 shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#2563eb]/10 via-transparent to-[#7c3aed]/10 blur-[100px] pointer-events-none" />
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#2563eb]/5 to-transparent rounded-full blur-3xl" />
      
      <h3
        className="text-3xl font-black text-gray-900 mb-10 tracking-tight"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        Secure Message <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#7c3aed]">Portal</span>
      </h3>

      <form className="space-y-3 relative z-10" onSubmit={handleSubmit}>
        {status === "error" && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-gray-700 uppercase tracking-[0.2em] ml-2">
              First Name
            </label>
            <input
              required
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="e.g. Alexander"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-3 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 focus:outline-none transition-all shadow-sm hover:border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-gray-700 uppercase tracking-[0.2em] ml-2">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="e.g. Pierce"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-3 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 focus:outline-none transition-all shadow-sm hover:border-gray-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-gray-700 uppercase tracking-[0.2em] ml-2">
              E-Mail
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="pierce@global-industry.com"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-3 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 focus:outline-none transition-all shadow-sm hover:border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-gray-700 uppercase tracking-[0.2em] ml-2">
              How Can We Help?
            </label>
            <div className="relative">
              <select
                name="how_can_we_help"
                value={formData.how_can_we_help}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-3 py-3 text-gray-900 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 focus:outline-none transition-all appearance-none cursor-pointer hover:border-gray-300"
              >
                <option value="">Select Core Capability</option>
                {services?.map((s) => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
                <option value="Strategic Partnership">Strategic Partnership</option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <ArrowRight size={16} className="rotate-90" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-black text-gray-700 uppercase tracking-[0.2em] ml-2">
            Requirements / Project Brief
          </label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows={4}
            placeholder="Describe your precision requirements..."
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-3 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 focus:outline-none transition-all resize-none shadow-sm hover:border-gray-300"
          ></textarea>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full py-3 text-lg bg-gradient-to-r from-[#2563eb] to-[#7c3aed] text-white border-0 rounded-2xl shadow-lg shadow-[#2563eb]/25 group/btn hover:shadow-xl hover:shadow-[#2563eb]/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            <span className="flex items-center gap-3">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Transmitting...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Dispatch Inquiry{" "}
              <Send
                size={20}
                className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
              />
            </span>
          )}
        </Button>

        {/* Decorative footer */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          <p className="text-center text-gray-400 text-[10px] uppercase font-bold tracking-widest">
            Encrypted Connection
          </p>
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>
      </form>
    </div>
  );
}