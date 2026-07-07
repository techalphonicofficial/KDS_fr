
"use client";

import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Quote, Star } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Certification.css';
import SectionTitle from '@/components/ui/SectionTitle';

const Certification = ({ data }) => {
    console.log(data);
    const [swiperInitialized, setSwiperInitialized] = useState(false);
    const swiperRef = useRef(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const paginationRef = useRef(null);

    // Ensure Swiper updates when data changes
    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            setTimeout(() => {
                swiperRef.current.swiper.update();
            }, 100);
        }
    }, [data]);
    console.log(data);

    // Handle resize events
    useEffect(() => {
        const handleResize = () => {
            if (swiperRef.current && swiperRef.current.swiper) {
                swiperRef.current.swiper.update();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // If no testimonials, don't render
    if (!data) {
        return null;
    }

    return (
        <section className="bg-white dark:bg-[#06111e] py-5 md:py-4 transition-colors duration-500 overflow-hidden">
            <div className="container mx-auto px-0 max-w-8xl">
                <SectionTitle
                    data={data}
                    label=""
                    title="Certifications"
                    subtitle="A global team of experts committed to delivering industrial excellence."
                    align="center"
                />

                <div className="relative pt-0">
                    {/* Custom Navigation Buttons */}
                    {/* <div className="absolute right-0 top-0 -translate-y-1/2 -translate-x-1/2 z-10 hidden md:block" style={{right:'32px'}}>
                        <button 
                            ref={prevRef}
                            className="swiper-nav-btn swiper-nav-prev w-10 h-10 rounded-full bg-white dark:bg-[#0a1628] border border-gray-200 dark:border-[#1565c0]/30 hover:bg-[#1565c0] hover:text-white dark:hover:bg-[#1565c0] transition-all duration-300 flex items-center justify-center shadow-lg"
                            aria-label="Previous slide"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="absolute right-0 top-0 -translate-y-1/2 z-10 hidden md:block">
                        <button 
                            ref={nextRef}
                            className="swiper-nav-btn swiper-nav-next w-10 h-10 rounded-full bg-white dark:bg-[#0a1628] border border-gray-200 dark:border-[#1565c0]/30 hover:bg-[#1565c0] hover:text-white dark:hover:bg-[#1565c0] transition-all duration-300 flex items-center justify-center shadow-lg"
                            aria-label="Next slide"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div> */}

                    <Swiper
                        ref={swiperRef}
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                            el: '.swiper-pagination',
                        }}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        loop={data.length >= 3}
                        speed={800}
                        grabCursor={true}
                        observer={true}
                        observeParents={true}
                        onInit={(swiper) => {
                            setSwiperInitialized(true);
                        }}
                        onBeforeInit={(swiper) => {
                            if (swiper.params.navigation) {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                            }
                        }}
                        className="testimonials-slider pb-4">
                        {data.carousel_json?.map((cert, i) => (
                            <SwiperSlide key={cert.key || i}>
                                <div key={cert.id} className="group relative">
                                    <div className="bg-white dark:bg-transparent premium-glass text-center h-full flex flex-col items-center">
                                        <div>
                                            <img
                                                src={`https://darkturquoise-koala-648403.hostingersite.com/${cert.image}`}
                                                alt=""
                                            />                                    </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Pagination */}
                    <div className="swiper-pagination mt-8"></div>
                </div>
            </div>
        </section>
    );
};

export default Certification;
