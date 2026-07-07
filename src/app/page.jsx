import { getServerData } from "@/lib/data";
import { generateMockData } from "@/lib/mockDataGenerator"
import Link from "next/link";
import { getData } from "@/lib/data";
import { API_ENDPOINTS } from "@/config/api";
import Carousel from "@/components/ui/Carousel";
import { IMAGE_URL } from "@/config/api";
import {
  ArrowRight, CheckCircle, Phone, Mail, MapPin,
  Clock, Shield, Users, Award, ChevronRight,
  Briefcase, HardHat, Settings, FileText, Factory, Wrench,
  Warehouse,
  Building2,
  Hotel,
  HeartPulse,
  BriefcaseBusiness, Quote, Star
} from "lucide-react";
import Button from "@/components/ui/Button";
import { getPageSEO } from "@/lib/metadata";

import Testimonial from "@/components/common/testimonial/Testimonial";
import Technology from "@/components/common/technology/Technology";
import Solutions from "@/components/common/solutions/Solutions";
import HeroBanner from "@/components/ui/heroBanner";
import EnquireButton from "@/components/layout/EnquiryButton";
import { solutionsData, technologyData } from './../lib/solutionsAndTechData';
import FAQSection from "@/components/common/FAQ";


// export const metadata = {
//   title: "KDS International Pvt. Ltd. | Most Trusted Manpower Services in Delhi",
//   description:
//     "KDS International Pvt. Ltd. — Delhi's most trusted manpower staffing partner providing skilled, semi-skilled, unskilled, contract, industrial & labour manpower services across all industries.",
//   keywords: ["manpower services delhi", "staffing agency delhi", "skilled manpower delhi", "labour supply delhi", "KDS International"],
// };



const serviceIconMap = {
  "skilled-manpower": Wrench,
  "unskilled-manpower": Users,
  "contract-manpower": FileText,
  "semi-skilled-manpower": Settings,
  "industrial-manpower": Factory,
  "labour-manpower": HardHat,
};

const iconMap = {
  Factory,
  Warehouse,
  Building2,
  Hotel,
  HeartPulse,
  BriefcaseBusiness,
};

export async function generateMetadata() {

  const page = await getPageSEO("home");

  return {
    title: page?.meta_title || "KDS International",

    description:
      page?.meta_description || "",

    keywords:
      page?.meta_keywords?.split(",") || [],

    openGraph: {
      title: page?.meta_title,
      description: page?.meta_description,
      images: [
        {
          url: `${IMAGE_URL}/${page.image}`,
        }
      ],
    },

    other: {
      "script:type": JSON.stringify(page?.meta_schema || [])
    }
  };
}

export default async function HomePage() {
  const FAQData = await getData(API_ENDPOINTS.FAQ);
  const homeData = await getData(API_ENDPOINTS.HOME);
  const Testimonials = await getData(API_ENDPOINTS.TESTIMONIALS)
  console.log("testiomonials", Testimonials);
  const page = await getPageSEO("home");

  const sections = homeData.data.sections.reduce(
    (acc, section) => {
      acc[section.section_key] = section;
      return acc;
    },
    {}
  );
  const about = sections.About_kds_International;
  const our_services = sections.our_services;
  const industries = sections.industry_serve;
  const technology = sections.technology_operations;
  const solutions = sections.solutions;
  const why_kds = sections.why_kds;
  const blogs = sections.blogs;
  const our_process = sections.our_process;
  const testimonial = Testimonials.data;



  const data = await getServerData();
  // const soluData = await generateMockData()

  return (
    <main className="overflow-hidden bg-white dark:bg-[#06111e] transition-colors duration-500">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            page?.meta_schema?.[0]?.schema || {}
          )
        }}
      />
      <EnquireButton />
      <Carousel data={sections.hero_section} />
      {/* <HeroBanner /> */}
      {/* ══════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-[#06111e] py-5 md:py-16 transition-colors duration-500">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {data.stats.map((stat, i) => {
              const icons = [Clock, Users, Award, Shield];
              const Icon = icons[i] || Award;
              return (
                <div key={stat.id} data-aos="fade-up" data-aos-delay={i * 200}
                  className="flex flex-col md:flex-row items-center md:items-start gap-4 bg-gray-50 dark:bg-[#0a1628] border border-gray-200 dark:border-[#1565c0]/10 rounded-2xl p-4 md:p-4 transition-colors duration-500 hover:border-[#1565c0]/30 group">
                  <div className="w-12 h-12 rounded-xl bg-[#1565c0]/10 border border-[#1565c0]/20 flex items-center justify-center shrink-0 group-hover:bg-[#1565c0] group-hover:border-[#1565c0] transition-all">
                    <Icon size={20} className="text-[#1565c0] dark:text-[#90caf9] group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-none transition-colors duration-500 mb-0">{stat.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mt-1 mb-0 transition-colors duration-500">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ABOUT SECTION
      ══════════════════════════════════════════════ */}
      <section className="bg-gray-50 dark:bg-[#0a1628] py-5 md:py-5 transition-colors duration-500">
        <div className="container mx-auto  max-w-7xl ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ">

            {/* Left: Text */}
            <div className=" gap-4  w-full h-full ">

              <img
                src={
                  about?.image
                    ? `${IMAGE_URL}/${about.image}`
                    : "/it-services-small1.png"
                }
                alt={about?.alt_text || "About KDS International"}
                className="w-full h-full object-cover"
              />
            </div>


            {/* Right: Why Choose Us cards */}
            <div className="space-y-7">
              <div className="space-y-3">
                <span className="inline-block text-[11px] font-black text-[#1565c0] dark:text-[#90caf9] uppercase tracking-[0.3em] border border-[#1565c0]/30 bg-[#1565c0]/5 px-4 py-2 rounded-full">
                  {about.title}
                </span>
                <h1
                  className="text-xl md:text-2xl lg:!text-3xl font-black text-gray-900 dark:text-white transition-colors duration-500 my-2"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                  data-aos="fade-up"
                >
                  {about.subtitle}
                </h1>
                <div
                  className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed transition-colors duration-500"
                  dangerouslySetInnerHTML={{
                    __html: about.description,
                  }}
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <Button href="/about"
                  className="bg-gradient-to-r from-[#0d47a1] to-[#1565c0] text-white border-none hover:from-[#1565c0] hover:to-[#1976d2] font-bold uppercase tracking-wider shadow-lg shadow-[#1565c0]/20 px-3 py-3">
                  About Our Company
                </Button>
                <a href="tel:+919899184918"
                  className="inline-flex items-center gap-2 px-3 py-3 border-2 border-[#1565c0]/30 text-[#1565c0] dark:text-[#90caf9] text-sm font-bold rounded-xl hover:bg-[#1565c0]/5 transition-all">
                  <Phone size={15} />
                  Call Us Now
                  {about.key}
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          OUR SERVICES
      ══════════════════════════════════════════════ */}
      <section className="relative py-5 md:py-28 overflow-hidden ">

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <img
            src={`${IMAGE_URL}/${our_services.background_image}`}
            alt={our_services.alt_text}
            className="w-full h-full object-cover"
          />

          {/* DARK / BLUE OVERLAY */}
          <div className="absolute inset-0 bg-[#06111e]/75"></div>
        </div>

        {/* CONTENT */}
        <div className="relative z-10">
          <div className="container mx-auto px-2 max-w-7xl">

            {/* Section header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">

              <div className="space-y-3">

                <span className="inline-block text-[11px] font-black text-[#90caf9] uppercase tracking-[0.3em] border border-[#90caf9]/30 bg-[#90caf9]/10 px-4 py-2 rounded-full">
                  {our_services.title}
                </span>

                <h2
                  className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mt-2"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {our_services.subtitle}
                  <br />

                </h2>

                <div
                  className="text-gray-300 max-w-3xl leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: our_services?.description || "",
                  }}
                />

              </div>

              <Link
                href="/services"
                className="shrink-0 inline-flex items-center gap-2 text-[#90caf9] font-bold text-sm hover:gap-3 transition-all group"
              >
                All Services
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

            </div>

            {/* SERVICES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">

              {our_services.extra.map((service, i) => {

                const Icon =
                  serviceIconMap[service.slug] || Briefcase;

                const gradients = [
                  "from-[#0d47a1] to-[#1565c0]",
                  "from-[#1565c0] to-[#1976d2]",
                  "from-[#1976d2] to-[#1e88e5]",
                  "from-[#0d47a1] to-[#1976d2]",
                  "from-[#1565c0] to-[#0d47a1]",
                  "from-[#1e88e5] to-[#1565c0]",
                ];

                return (

                  <Link
                    key={service.key}
                    href={`/services/${service.url_path}`}
                    data-aos="fade-up"
                    data-aos-delay={i * 100}
                    className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:border-[#90caf9]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#1565c0]/10 hover:-translate-y-1 overflow-hidden"
                  >

                    {/* TOP ACCENT */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl`}
                    />

                    <div className="relative">

                      {/* ICON */}
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[i]} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon
                          size={20}
                          className="text-white"
                        />
                      </div>

                      {/* TITLE */}
                      <h3 className="font-black text-white text-lg mb-3 group-hover:text-[#90caf9] transition-colors duration-300">
                        {service.key}
                      </h3>

                      {/* DESC */}
                      <p className="text-gray-300 text-sm leading-relaxed mb-5 line-clamp-3">
                        {service.value}
                      </p>

                      {/* BUTTON */}
                      <div className="flex items-center gap-1.5 text-[#90caf9] text-xs font-black uppercase tracking-widest">
                        Know More

                        <ChevronRight
                          size={14}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </div>

                    </div>

                  </Link>
                );
              })}

            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          INDUSTRIES WE SERVE
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-5 md:py-28 relative overflow-hidden transition-colors duration-500">
        {/* Pattern BG */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(21,101,192,1) 1px, transparent 0)",
          backgroundSize: "44px 44px"
        }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1565c0]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-14">

            <span
              className="inline-block text-[11px] font-black text-[#1565c0] uppercase tracking-[0.3em] border border-[#1565c0]/30 bg-[#1565c0]/10 px-4 py-2 rounded-full mb-4"
              dangerouslySetInnerHTML={{
                __html: industries?.title || "",
              }}
            />

            <h2
              className="text-4xl md:text-5xl font-black !text-[#1565c0] leading-tight mb-4"
              style={{ fontFamily: "Outfit, sans-serif" }}
              dangerouslySetInnerHTML={{
                __html: industries?.subtitle || "",
              }}
            />

            <p
              className="text-gray-600 max-w-2xl mx-auto leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: industries?.description || "",
              }}
            />

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.extra.map((ind, i) => {
              const Icon = iconMap[ind.stat];

              return (
                <div
                  key={ind.key}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  className="group [perspective:1200px] h-[480px]"
                >

                  <div className="relative h-full w-full rounded-2xl transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                    {/* FRONT SIDE */}

                    <div className="absolute inset-0 rounded-2xl overflow-hidden border border-[#1565c0]/20 group-hover:border-[#1565c0]/50 [backface-visibility:hidden]">

                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url('${IMAGE_URL}/${ind.image}')` }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#020c18]/90 via-[#020c18]/50 to-[#1565c0]/10" />

                      {/* ICON */}



                      {/* CONTENT */}

                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-black text-lg mb-2 leading-tight">
                          {ind.key}
                        </h3>

                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                          {ind.value.substring(0, 120)}...
                        </p>

                        <div className="flex items-center gap-1.5 text-[#90caf9] text-[10px] font-black uppercase tracking-widest mt-3">
                          Learn More
                          <ChevronRight size={12} />
                        </div>
                      </div>
                    </div>

                    {/* BACK SIDE */}

                    <div className="absolute inset-0 rounded-2xl overflow-hidden border border-[#1565c0]/30 p-6 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden] bg-gradient-to-r from-white via-[#f4f8ff] to-[#dbeafe]">

                      <div className="p-3">
                        {/* 
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1565c0] to-[#42a5f5] flex items-center justify-center mb-5">
                          <Icon size={28} className="text-white" />
                        </div> */}

                        <h3 className="text-gray font-black text-2xl mb-4">
                          {ind.key}
                        </h3>

                        <p className="text-gray text-sm leading-relaxed">
                          {ind.value}
                        </p>

                      </div>

                      <button className="mt-6 w-full bg-[#1565c0] hover:bg-[#1976d2] transition-all text-white font-bold py-3 rounded-xl">
                        Explore Industry
                      </button>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* technology */}
      <Technology data={technology} />
      {/* solutions */}
      <Solutions data={solutions} />

      {/* ══════════════════════════════════════════════
          WHY CHOOSE KDS
      ══════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-[#0d47a1] via-[#1565c0] to-[#1976d2] dark:bg-[#06111e] py-5 md:py-28 transition-colors duration-500">
        <div className="container mx-auto px-6 max-w-7xl">

          <div className="text-center mb-14">

            <span className="inline-block text-[11px] font-black text-white uppercase tracking-[0.3em] border border-white/30 bg-white/10 px-4 py-2 rounded-full mb-4">
              {why_kds?.title || "Why KDS International"}
            </span>


            <h2
              className="text-4xl md:text-5xl font-black text-white leading-tight mb-4"
              style={{ fontFamily: "Outfit, sans-serif" }}
              dangerouslySetInnerHTML={{
                __html: why_kds?.subtitle || "The KDS Advantage"
              }}
            />


            <div
              className="text-white max-w-2xl mx-auto leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: why_kds?.description || ""
              }}
            />

          </div>



          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">


            {why_kds?.extra?.map((item, i) => {

              const icons = [
                Clock,
                Users,
                Shield,
                Award
              ];

              const Icon = icons[i % icons.length];


              const gradients = [
                "from-[#0d47a1] to-[#1565c0]",
                "from-[#1565c0] to-[#1976d2]",
                "from-[#1976d2] to-[#1e88e5]",
                "from-[#0d47a1] to-[#1976d2]",
              ];


              return (

                <div
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  className="
            bg-white backdrop-blur-md
            rounded-2xl p-3
            border border-white/20
            hover:-translate-y-1
            transition-all duration-300
            "
                >

                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[i]}
              flex items-center justify-center mb-4`}
                  >

                    <Icon
                      size={22}
                      className="text-white"
                    />

                  </div>


                  <h3 className="font-black text-black text-xl mb-3">
                    {item.key}
                  </h3>


                  <p className="text-gray-600 text-sm ">
                    {item.value}
                  </p>


                </div>

              )

            })}


          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PROCESS — HOW WE WORK
      ══════════════════════════════════════════════ */}
      <section className="bg-gray-50 dark:bg-[#0a1628] py-5 md:py-28 transition-colors duration-500">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col justify-center items-center">
          <span className="inline-block text-[11px] font-black text-[#1565c0] dark:text-[#90caf9] uppercase tracking-[0.3em] border border-[#1565c0]/30 bg-[#1565c0]/5 px-4 py-2 rounded-full mb-4">
            {our_process?.title}
          </span>


          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-4 transition-colors duration-500"
            style={{ fontFamily: "Outfit, sans-serif" }}>
            {our_process?.subtitle}
          </h2>


          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-center leading-relaxed transition-colors duration-500">
            {our_process?.description?.replace(/<[^>]+>/g, '')}
          </p>

          <div className="relative">
            {/* Connector */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#1565c0]/40 to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {our_process?.extra?.map((step, i) => (
                <div
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 300}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 rounded-full bg-white dark:bg-[#0d1a2d] border-2 border-[#1565c0] flex items-center justify-center mb-6 shadow-xl shadow-[#1565c0]/10 group-hover:bg-gradient-to-br group-hover:from-[#0d47a1] group-hover:to-[#1565c0] transition-all duration-300">

                    <span className="text-xl font-black text-[#1565c0] dark:text-[#90caf9] group-hover:text-white transition-colors">
                      {step.key}
                    </span>

                  </div>

                  <h4 className="font-black text-gray-900 dark:text-white text-sm mb-2 mt-2 leading-tight transition-colors duration-500">
                    {step.value}
                  </h4>

                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed transition-colors duration-500">
                    {step.subtitle}
                  </p>

                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ══════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════ */}
      {/* <section className="bg-white dark:bg-[#06111e] py-5 md:py-28 transition-colors duration-500">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-14">
            <span className="inline-block text-[11px] font-black text-[#1565c0] dark:text-[#90caf9] uppercase tracking-[0.3em] border border-[#1565c0]/30 bg-[#1565c0]/5 px-4 py-2 rounded-full mb-4">
              Client Reviews
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-4 transition-colors duration-500" style={{ fontFamily: "Outfit, sans-serif" }}>
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.testimonials.map((t, i) => (
              <div key={t.id}
                className="bg-gray-50 dark:bg-[#0a1628] rounded-2xl p-4 border border-gray-200 dark:border-[#1565c0]/10 hover:border-[#1565c0]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#1565c0]/5 relative group">

                <div className="absolute top-6 right-6 text-[#1565c0]/10 dark:text-[#1565c0]/20">
                  <Quote size={40} />
                </div>


                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6 italic transition-colors duration-300">
                  "{t.content}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0d47a1] to-[#1565c0] flex items-center justify-center text-white font-black text-sm shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-gray-900 dark:text-white text-sm transition-colors duration-300">{t.name}</p>
                    <p className="text-gray-500 text-xs transition-colors duration-300">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <Testimonial data={testimonial} />

      {/* ══════════════════════════════════════════════
          BLOG / NEWS
      ══════════════════════════════════════════════ */}


      {/* frequently asked questions */}
      <FAQSection faqs={FAQData} />
      {/* ══════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════ */}
      <section className="relative py-5 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d47a1] via-[#1565c0] to-[#1976d2]" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "36px 36px"
        }} />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#1976d2]/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0d47a1]/40 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-5 max-w-5xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] font-black text-white/90 uppercase tracking-[0.3em]">Delhi NCR • Immediate Availability</span>
          </div>

          <h2 className="text-4xl md:text-6xl xl:text-7xl font-black text-white mb-3 mt-3 leading-[1.05] tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
            Need Manpower?<br />
            <span className="text-[#bde0ff]">We Deliver in 24-48 Hours.</span>
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Contact KDS International today. We'll understand your requirements and place the right workers at your site — fully compliant, ready to work.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" size="lg"
              className="bg-white text-[#1565c0] hover:bg-gray-50 border-none shadow-2xl font-black uppercase tracking-wider">
              Get Hiring Consultation
            </Button>
            <a href="tel:+919899184918" className="inline-flex items-center gap-3 px-3 py-3 border-2 border-white/30 text-white text-sm font-bold rounded-xl hover:bg-white/10 hover:border-white/60 transition-all">
              <Phone size={18} />
              +91 9899184918
            </a>
          </div>

          {/* Bottom contact strip */}
          <div className="flex flex-wrap justify-center gap-4 mt-4 pt-4 border-t border-white/10">
            {[
              { icon: Mail, text: "info@kdsinternational.org" },
              { icon: MapPin, text: "Laxmi Nagar, Delhi - 110092" },
              { icon: Clock, text: "Mon–Sat · 9am to 7pm" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/70 text-sm">
                <item.icon size={14} className="text-white/50" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
