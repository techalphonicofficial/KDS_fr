'use client'
import React, { useState } from "react";
import { ChevronDown, CheckCircle } from "lucide-react";


const Benefits = ({ data }) => {

    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div>

            <h3
                className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-6"
                style={{ fontFamily: "Outfit, sans-serif" }}
            >
                {data?.title || "Benefits"}
            </h3>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {data?.extra_data?.map((benefit, index) => (

                    <div
                        key={index}
                        className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#161b22] overflow-hidden hover:shadow-lg transition-all"
                    >


                        {/* Header */}

                        <div
                            onClick={() =>
                                setOpenIndex(
                                    openIndex === index ? null : index
                                )
                            }
                            className="flex items-center justify-between gap-3 p-3 cursor-pointer"
                        >

                            <div className="flex items-start gap-3">

                                <CheckCircle
                                    size={20}
                                    className="text-[#1565c0] mt-1 shrink-0"
                                />

                                <p className="text-gray-600 dark:text-gray-200 text-sm leading-6">
                                    {benefit.value}
                                </p>

                            </div>


                            <ChevronDown
                                size={20}
                                className={`text-[#1565c0] transition-transform duration-300 shrink-0 ${
                                    openIndex === index
                                    ? "rotate-180"
                                    : ""
                                }`}
                            />

                        </div>


                        {/* Dropdown */}

                        {openIndex === index && benefit?.subtitle && (

                            <div className="px-3 pb-4">

                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-5 break-words">
                                    {benefit.subtitle}
                                </p>

                            </div>

                        )}


                    </div>

                ))}

            </div>

        </div>
    )
}


export default Benefits;