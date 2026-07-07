"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Quote, Star } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Testimonial.css";

import { IMAGE_URL } from "@/config/api";

const Testimonial = ({ data }) => {
    const [swiperInitialized, setSwiperInitialized] = useState(false);
    const swiperRef = useRef(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current?.swiper) {
            setTimeout(() => {
                swiperRef.current.swiper.update();
            }, 100);
        }
    }, [data]);

    useEffect(() => {
        const handleResize = () => {
            if (swiperRef.current?.swiper) {
                swiperRef.current.swiper.update();
            }
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);


    if (!data?.testimonials?.length) {
        return null;
    }


    return (
        <section className="bg-white dark:bg-[#06111e] py-5 md:py-4 transition-colors duration-500 overflow-hidden">

            <div className="container mx-auto px-0 max-w-8xl">

                {/* HEADER */}
                <div className="text-center mb-14">


                    <span
                        className="inline-block text-[11px] font-black text-[#1565c0] dark:text-[#90caf9] uppercase tracking-[0.3em] border border-[#1565c0]/30 bg-[#1565c0]/5 px-4 py-2 rounded-full mb-4"
                        dangerouslySetInnerHTML={{
                            __html:
                                data?.testimonial_content?.heading ||
                                "Client Reviews",
                        }}
                    />


                    <h2
                        className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-4 transition-colors duration-500"
                        style={{ fontFamily: "Outfit, sans-serif" }}
                        dangerouslySetInnerHTML={{
                            __html:
                                data?.testimonial_content?.sub_heading ||
                                "What Our Clients Say",
                        }}
                    />


                    {data?.testimonial_content?.content && (
                        <p
                            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html:
                                    data.testimonial_content.content,
                            }}
                        />
                    )}

                </div>


                <div className="relative pt-4">


                    {/* PREV */}
                    <div
                        className="absolute right-0 top-0 -translate-y-1/2 -translate-x-1/2 z-10 hidden md:block"
                        style={{ right: "32px" }}
                    >
                        <button
                            ref={prevRef}
                            className="swiper-nav-btn swiper-nav-prev w-10 h-10 rounded-full bg-white dark:bg-[#0a1628] border border-gray-200 dark:border-[#1565c0]/30 hover:bg-[#1565c0] hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                    </div>


                    {/* NEXT */}
                    <div className="absolute right-0 top-0 -translate-y-1/2 z-10 hidden md:block">

                        <button
                            ref={nextRef}
                            className="swiper-nav-btn swiper-nav-next w-10 h-10 rounded-full bg-white dark:bg-[#0a1628] border border-gray-200 dark:border-[#1565c0]/30 hover:bg-[#1565c0] hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>

                        </button>
                    </div>




                    <Swiper

                        ref={swiperRef}

                        modules={[
                            Navigation,
                            Pagination,
                            Autoplay
                        ]}

                        spaceBetween={24}

                        slidesPerView={1}

                        breakpoints={{
                            300:{
                                slidesPerView:1,
                                spaceBetween:6
                            },

                            640:{
                                slidesPerView:2,
                                spaceBetween:20
                            },

                            1024:{
                                slidesPerView:3,
                                spaceBetween:24
                            }
                        }}


                        pagination={{
                            clickable:true,
                            dynamicBullets:true,
                            el:".swiper-pagination"
                        }}


                        navigation={{
                            prevEl:prevRef.current,
                            nextEl:nextRef.current
                        }}


                        autoplay={{
                            delay:3000,
                            disableOnInteraction:false,
                            pauseOnMouseEnter:true
                        }}


                        loop={data.testimonials.length >= 3}

                        speed={800}

                        grabCursor={true}

                        observer={true}
                        observeParents={true}


                        onInit={()=>{
                            setSwiperInitialized(true);
                        }}


                        onBeforeInit={(swiper)=>{

                            swiper.params.navigation.prevEl =
                                prevRef.current;

                            swiper.params.navigation.nextEl =
                                nextRef.current;

                        }}


                        className="testimonials-slider pb-4"

                    >



                    {data.testimonials.map((t,i)=>(


                        <SwiperSlide key={t.id || i}>


                            <div className="bg-gray-50 dark:bg-[#0a1628] rounded-2xl p-3 border border-gray-200 dark:border-[#1565c0]/10 hover:border-[#1565c0]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#1565c0]/5 relative group h-full flex-col min-h-[280px]">


                                {/* QUOTE */}
                                <div className="absolute top-6 right-6 text-[#1565c0]/10 dark:text-[#1565c0]/20">
                                    <Quote size={40}/>
                                </div>



                                {/* STAR */}

                                <div className="flex gap-0.5 mb-4">

                                    {Array.from({
                                        length:Math.round(t.rating || 5)
                                    }).map((_,si)=>(

                                        <Star
                                            key={si}
                                            size={16}
                                            className="text-yellow-400 fill-yellow-400"
                                        />

                                    ))}

                                </div>




                                {/* MESSAGE */}

                                <div
                                    className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6 italic transition-colors duration-300 flex-grow"
                                    dangerouslySetInnerHTML={{
                                        __html:t.message
                                    }}
                                />




                                {/* USER */}

                                <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-white/5">


                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-[#0d47a1] to-[#1565c0] flex items-center justify-center text-white font-black text-base shrink-0">


                                        {t.image ? (

                                            <img
                                                src={`${IMAGE_URL}/${t.image}`}
                                                alt={
                                                    t.Image_all_text ||
                                                    t.name
                                                }
                                                className="w-full h-full object-cover"
                                            />

                                        ):(

                                            t.name?.charAt(0) || "?"

                                        )}

                                    </div>




                                    <div>

                                        <p className="font-black text-gray-900 dark:text-white text-base transition-colors duration-300 mb-1">

                                            {t.name}

                                        </p>


                                        <p className="text-gray-500 dark:text-gray-400 text-xs transition-colors duration-300 mb-1">

                                            {t.designation}

                                        </p>


                                    </div>


                                </div>



                            </div>



                        </SwiperSlide>

                    ))}



                    </Swiper>



                    <div className="swiper-pagination mt-8"></div>


                </div>

            </div>


        </section>
    );
};


export default Testimonial;