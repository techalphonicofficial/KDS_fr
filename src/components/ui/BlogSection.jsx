"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BlogCard from './BlogCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function BlogSection({ data }) {
  const [swiperInitialized, setSwiperInitialized] = useState(false);
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const posts = data?.posts || data?.extra_data?.map((item, idx) => ({
    id: idx,
    slug: item.slug || "",
    title: item.value || item.key || "",
    date: new Date().toISOString(),
    author: "KDS Team",
    image: item.image || "",
    category: item.key || "General",
    excerpt: item.points?.[0]?.point || item.value || ""
  })) || [];

  useEffect(() => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.update();
    }
  }, [data, posts]);

  if (!posts.length) return null;

  return (
    <section className="w-full !py-16 md:py-24 overflow-hidden bg-white dark:bg-[#0d1117] transition-colors duration-500">
      <div className="mx-auto w-full max-w-[1550px] p-4 sm:px-6 lg:px-10">
        {/* Top Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-10">
          {/* Left */}
          <div className="max-w-2xl">
            <span className="inline-block text-[#2563eb] font-bold text-sm md:text-base uppercase tracking-[0.15em] mb-4">
              {data?.title || "Latest Insights & Articles"}
            </span>

            <h2 className="text-[38px] sm:text-[52px] lg:text-[64px] leading-[1.05] font-black text-[#111827] dark:text-white tracking-[-0.03em]">
              {data?.subtitle || "Explore Our Latest Blogs"}
            </h2>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4 lg:justify-end">
            {/* Custom Navigation */}
            <div className="flex items-center gap-3">
              <button
                ref={prevRef}
                className="swiper-nav-btn swiper-nav-prev w-12 h-12 rounded-full bg-white dark:bg-[#161b22] border border-gray-200 dark:border-white/10 hover:bg-[#2563eb] hover:text-white dark:hover:bg-[#2563eb] transition-all duration-300 flex items-center justify-center shadow-lg cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                ref={nextRef}
                className="swiper-nav-btn swiper-nav-next w-12 h-12 rounded-full bg-white dark:bg-[#161b22] border border-gray-200 dark:border-white/10 hover:bg-[#2563eb] hover:text-white dark:hover:bg-[#2563eb] transition-all duration-300 flex items-center justify-center shadow-lg cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <Link
              href="/blog"
              className="group flex items-center gap-4 rounded-2xl border border-blue-200 !px-7 !py-2 font-bold text-sm text-blue-700 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-[#1d4ed8] hover:!text-white md:px-8 md:text-base"
            >
              <span className="group-hover:!text-white">
                View All Blogs
              </span>

              <span className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-[#2563eb] transition-all duration-300 group-hover:translate-x-1 group-hover:!text-white">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              300: {
                slidesPerView: 1,
                spaceBetween: 16
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24
              }
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              el: ".blog-swiper-pagination"
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            loop={posts.length >= 3}
            speed={800}
            grabCursor={true}
            observer={true}
            observeParents={true}
            onInit={() => {
              setSwiperInitialized(true);
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            className="pb-12"
          >
            {posts.map((post) => (
              <SwiperSlide key={post.id} className="h-auto">
                <div className="h-full py-4">
                  <BlogCard post={post} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination Bullet Indicators */}
          <div className="blog-swiper-pagination flex justify-center mt-6"></div>
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
