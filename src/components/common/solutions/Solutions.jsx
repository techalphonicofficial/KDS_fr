"use client";
import { useRouter } from 'next/navigation';
import React from "react";
import { solutionsData } from "@/lib/solutionsAndTechData";
import { ArrowUpRight } from "lucide-react";
import { IMAGE_URL } from  "@/config/api";

const Solutions = ({ data }) => {
    
    const router = useRouter();
    return (
        <section className="relative overflow-hidden py-20">
            <div className="container relative z-10 mx-auto px-4">

                {/* Heading */}
                <div
                    className="mx-auto mb-12 max-w-3xl mt-2 text-center"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                >                   
                    <span className="inline-block text-[11px] font-black text-[#1565c0] uppercase tracking-[0.3em] border border-[#1565c0]/30 bg-[#1565c0]/10 px-4 py-2 rounded-full mb-4"
                        dangerouslySetInnerHTML={{
                            __html: data?.title || "OUR SOLUTIONS",
                        }}
                    />

                    <h1 className="mt-6 text-3xl font-bold leading-tight !text-[#1565c0] md:text-5xl"
                        dangerouslySetInnerHTML={{
                            __html: data?.subtitle || "OUR SOLUTIONS",
                        }}
                    />

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 md:text-base"
                        dangerouslySetInnerHTML={{
                            __html: data?.description || "OUR SOLUTIONS",
                        }}
                    />

                </div>

                {/* Timeline */}
                <div className="relative mx-auto max-w-6xl">

                    {/* Center Line */}
                    <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-200/0 via-blue-300 to-blue-200/0 lg:block"></div>

                    <div className="space-y-12 mb-10">

                        {data.extra.map((item, index) => {

                            const isEven = index % 2 === 0;

                            return (
                                <div
                                    key={item.key}
                                    className={`group relative flex flex-col items-center gap-8 lg:flex-row  ${isEven ? "" : "lg:flex-row-reverse"
                                        }`}
                                    data-aos={isEven ? "fade-right" : "fade-left"}
                                    data-aos-duration="1000"
                                    onClick={() => router.push('/solutions')}
                                >

                                    {/* Content */}
                                    <div className="w-full lg:w-1/2 ">

                                        <div className="relative overflow-hidden rounded-[28px] cursor-pointer border bg-white/80 border-slate-200  !p-5 backdrop-blur-xl transition-all duration-700 ease-out hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_60px_rgba(59,130,246,0.08)]">

                                            {/* Glow */}
                                            <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                                                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-100 blur-3xl"></div>
                                            </div>

                                            {/* Top */}
                                            <div className="flex items-center gap-4 ">

                                                <div className="flex h-14 w-14  ml-2 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-blue-100 transition-all duration-700 group-hover:rotate-6">
                                                    0{index + 1}
                                                </div>

                                                <div>

                                                    <p className="text-xs uppercase tracking-[0.25em] text-blue-600">
                                                        Solution
                                                    </p>

                                                    <h2 className="mt-1 text-2xl font-bold text-slate-900 transition duration-500 group-hover:text-blue-700">
                                                        {item.key}
                                                    </h2>

                                                </div>

                                            </div>

                                            {/* Description */}
                                            <p className="mt-5 ml-2 text-sm leading-7 text-slate-500">
                                                {item.value}
                                            </p>

                                            {/* Bottom */}
                                            <div className="mt-6 ml-3 flex items-center justify-between border-t border-slate-100 pt-5">

                                                <button className="group/btn flex items-center gap-2 text-sm font-medium text-slate-800 transition duration-500 hover:text-blue-600">

                                                    Explore

                                                    <ArrowUpRight
                                                        size={18}
                                                        className="transition-transform duration-500 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
                                                    />

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                    {/* Center Dot */}
                                    <div className="relative z-20 hidden lg:flex">

                                        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-blue-200 bg-white shadow-[0_0_30px_rgba(59,130,246,0.08)] transition-all duration-700 group-hover:scale-110">

                                            <div className="h-4 w-4 rounded-full bg-blue-500"></div>

                                        </div>

                                    </div>

                                    {/* Image */}
                                    <div className="w-full lg:w-1/2">

                                        <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-2 shadow-sm transition-all duration-700 group-hover:shadow-xl">

                                            <img
                                                src={`${IMAGE_URL}/${item.image}`}
                                                alt={item.alt_text|| "Solution Image"}  
                                                className="h-[280px] w-full rounded-[24px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            />

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Solutions;