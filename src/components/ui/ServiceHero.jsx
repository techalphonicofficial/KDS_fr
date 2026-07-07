"use client";

import { useState, useEffect } from "react";

import {
    CheckCircle,
    ArrowRight,
    User,
    Mail,
    Phone,
    Globe,
    MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { IMAGE_URL, API_ENDPOINTS } from '@/config/api';

export default function ServiceHero({ service, hero }) {

    console.log("sakshijaiswal", service)


    const title = hero?.title || service?.title || service?.category || "";
    const subtitle =
        hero?.subtitle ||
        service?.shortDesc ||
        service?.categoryDescription ||
        "";
    const points =
        hero?.points?.length > 0
            ? hero.points
            : service?.features || [];
    const slides = [
        {
            src: "/industry.png",
            title: "Industrial Staffing Solutions",
            description:
                "Professional manpower solutions for industries and factories.",
        },
        {
            src: "/construction.png",
            title: "Construction Workforce",
            description:
                "Experienced and trained workers for construction projects.",
        },
        {
            src: "/security.png",
            title: "Security Services",
            description:
                "PSARA certified guards and security manpower solutions.",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) =>
                prev === slides.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const [status, setStatus] = useState("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        how_can_we_help: title || "",
        requirements: "",
    });

    useEffect(() => {
        if (title) {
            setFormData((prev) => ({
                ...prev,
                how_can_we_help: title,
            }));
        }
    }, [title]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
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
                    "Accept": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok && (data.status || data.success || res.status === 200 || res.status === 201)) {
                setStatus("success");
                setFormData({
                    first_name: "",
                    last_name: "",
                    email: "",
                    how_can_we_help: title || "",
                    requirements: "",
                });
            } else {
                setStatus("error");
                setErrorMsg(data.message || "Failed to submit enquiry. Please try again.");
            }
        } catch (err) {
            console.error("Enquiry submit error:", err);
            setStatus("error");
            setErrorMsg("A network error occurred. Please check your connection and try again.");
        }
    };

    const enquiryFields = [
        {
            name: "first_name",
            label: "First Name",
            type: "text",
            placeholder: "e.g. John",
            Icon: User,
            required: true,
        },
        {
            name: "last_name",
            label: "Last Name",
            type: "text",
            placeholder: "e.g. Doe",
            Icon: User,
            required: false,
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "example@company.com",
            Icon: Mail,
            required: false,
        },
        {
            name: "how_can_we_help",
            label: "Capability",
            type: "text",
            placeholder: "e.g. Partnership",
            Icon: Globe,
            required: false,
        },
    ];

    return (
        <section className="relative w-full lg:min-h-screen overflow-hidden">
            {/* Slides */}

            <div

                className={`absolute inset-0 transition-opacity duration-1000`}
            >
                <img
                    src={`${IMAGE_URL}/${service.image}`}
                    alt={service.alt_text}
                    className="w-full h-full object-cover"
                />

                {/* Bluish Overlay */}
                <div className="absolute inset-0  bg-gradient-to-r from-black/85 via-black/60 to-black/30" />

                {/* <div className="absolute inset-0 bg-gradient-to-t from-[#04111f]/90 via-[#04111f]/30 to-transparent" /> */}
            </div>


            {/* Content */}
            <div className="relative z-20 container mx-auto px-6 !py-40 max-w-7xl lg:min-h-screen flex items-center ">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10  w-full ">

                    {/* Left */}
                    <div className="lg:col-span-7 text-white" data-aos="fade-right" data-aos-duration="800">
                        <div className="inline-flex items-center gap-2 ">
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/30 bg-white/5 backdrop-blur-sm mb-5 hover:bg-white/10 transition"
                            >
                                <ArrowRight
                                    size={14}
                                    className="rotate-180"
                                />

                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold mr-2">
                                    Back to Services
                                </span>
                            </Link>

                            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 rounded-full px-4 py-2 mb-5">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
                                    Trusted Manpower Agency
                                </span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl xl:text-7xl font-black leading-tight mb-5">
                            {service.title}
                        </h1>

                        <p className="text-gray-200 text-base md:text-2xl leading-relaxed max-w-2xl">
                            {service.subtitle}
                        </p>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 max-w-2xl">
                            {service.points?.slice(0, 4).map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle
                                        size={16}
                                        className="text-blue-400"
                                    />

                                    <span className="text-sm text-gray-200">
                                        {item.point}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className="lg:col-span-5 flex justify-center" data-aos="fade-left" data-aos-duration="800" data-aos-delay="200">

                        <div className="relative  w-full max-w-[560px]">
                            <div className="group relative w-full overflow-hidden rounded-[28px] border border-white/25 bg-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_38px_110px_rgba(21,101,192,0.28)]">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/10 to-[#1565c0]/15 opacity-90" />
                                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#90caf9]/25 blur-3xl transition duration-700 group-hover:scale-125 group-hover:bg-[#90caf9]/35" />
                                <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-white/20 blur-3xl transition duration-700 group-hover:scale-110" />

                                {/* Form */}
                                <div className="relative !p-3.5 sm:p-5 md:!p-6 ">
                                    {status === "success" ? (
                                        <div className="relative p-6 md:p-8 text-center text-white min-h-[300px] flex flex-col justify-center items-center">
                                            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4 border border-white/20">
                                                <CheckCircle size={40} className="text-green-400 animate-pulse" />
                                            </div>
                                            <h3 className="text-2xl font-black mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
                                                Enquiry Received!
                                            </h3>
                                            <p className="text-gray-200 text-sm mb-6 max-w-sm">
                                                Thank you for reaching out. We have logged your request and a specialist will contact you within 24 hours.
                                            </p>
                                            <button
                                                onClick={() => setStatus("idle")}
                                                className="text-white font-black underline uppercase tracking-widest text-xs hover:text-blue-300 transition-colors"
                                            >
                                                Send Another Enquiry
                                            </button>
                                        </div>
                                    ) : (
                                        <form className="space-y-2 sm:space-y-3" onSubmit={handleSubmit}>
                                            {status === "error" && (
                                                <div className="p-3 bg-red-500/20 border border-red-500/30 text-red-200 rounded-xl text-xs font-semibold">
                                                    {errorMsg}
                                                </div>
                                            )}

                                            {enquiryFields.map(({ name, label, type, placeholder, Icon, required }, index) => (
                                                <div
                                                    key={name}
                                                    className="group/field grid gap-1 sm:gap-2 rounded-2xl border border-white/20 bg-white/80 !p-1.5 sm:p-2 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#1565c0]/35 hover:bg-white hover:shadow-[0_14px_35px_rgba(13,71,161,0.16)] focus-within:-translate-y-1 focus-within:border-[#1565c0]/45 focus-within:bg-white focus-within:shadow-[0_16px_40px_rgba(13,71,161,0.18)] sm:grid-cols-[118px_1fr] sm:items-center"
                                                    style={{ animationDelay: `${index * 90}ms` }}
                                                    data-aos="fade-up"
                                                    data-aos-delay={250 + index * 90}
                                                >
                                                    <label className="text-[11px] font-black uppercase tracking-[0.12em] text-[#0d47a1] transition-colors duration-300 group-hover/field:text-[#1565c0]">
                                                        {label} {required && <span className="text-red-500">*</span>}
                                                    </label>

                                                    <div className="relative">
                                                        <Icon
                                                            size={16}
                                                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1565c0] transition-all duration-300 group-hover/field:scale-110 group-hover/field:text-[#0d47a1]"
                                                        />

                                                        <input
                                                            type={type}
                                                            name={name}
                                                            required={required}
                                                            value={formData[name]}
                                                            onChange={handleChange}
                                                            placeholder={placeholder}
                                                            className="h-9 sm:h-[42px] w-full rounded-xl border border-transparent bg-[#f5f9ff] !pl-4 pr-11 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#1565c0]/40 focus:bg-white focus:ring-4 focus:ring-[#1565c0]/10"
                                                        />
                                                    </div>
                                                </div>
                                            ))}

                                            <div
                                                className="group/field grid gap-1 sm:gap-2 rounded-2xl border border-white/20 bg-white/80 p-2 sm:p-3 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#1565c0]/35 hover:bg-white hover:shadow-[0_14px_35px_rgba(13,71,161,0.16)] focus-within:-translate-y-1 focus-within:border-[#1565c0]/45 focus-within:bg-white focus-within:shadow-[0_16px_40px_rgba(13,71,161,0.18)] sm:grid-cols-[118px_1fr]"
                                                data-aos="fade-up"
                                                data-aos-delay="620"
                                            >
                                                <label className="pt-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#0d47a1] transition-colors duration-300 group-hover/field:text-[#1565c0]">
                                                    Requirements
                                                </label>

                                                <div className="relative">
                                                    <MessageSquare
                                                        size={16}
                                                        className="pointer-events-none absolute right-4 top-4 text-[#1565c0] transition-all duration-300 group-hover/field:scale-110 group-hover/field:text-[#0d47a1]"
                                                    />

                                                    <textarea
                                                        name="requirements"
                                                        value={formData.requirements}
                                                        onChange={handleChange}
                                                        rows={3}
                                                        placeholder="Tell us your requirements..."
                                                        className="min-h-[70px] sm:min-h-[92px] w-full resize-none rounded-xl border border-transparent bg-[#f5f9ff] !pl-4 pr-11 pt-2 sm:pt-3 text-sm text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#1565c0]/40 focus:bg-white focus:ring-4 focus:ring-[#1565c0]/10"
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={status === "sending"}
                                                className="group/submit relative mt-1 sm:mt-2 h-11 sm:h-[50px] w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d47a1] via-[#1565c0] to-[#1976d2] text-sm font-black uppercase tracking-[0.14em] text-white shadow-[0_16px_35px_rgba(21,101,192,0.35)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(21,101,192,0.48)] active:scale-[0.98] disabled:opacity-50"
                                                data-aos-delay="720"
                                            >
                                                <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/25 transition-all duration-700 ease-out group-hover/submit:left-full" />
                                                <span className="relative inline-flex items-center justify-center gap-2">
                                                    {status === "sending" ? "Sending..." : "Send Enquiry"}
                                                    <ArrowRight size={16} />
                                                </span>
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
