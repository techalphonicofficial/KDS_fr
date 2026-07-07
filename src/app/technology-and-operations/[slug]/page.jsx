import { notFound } from "next/navigation";
import { generateMockData, formatSlugToTitle } from "@/lib/mockDataGenerator";
import ServiceHero from "@/components/ui/ServiceHero";
import { getServerData } from "@/lib/data";
import Image from 'next/image'
import { API_ENDPOINTS } from "@/config/api";
import { getBySlug, getData } from "@/lib/data";
import { IMAGE_URL } from "@/config/api";
import FAQSection from '@/components/common/FAQ'
import ConsultationCard from "@/components/layout/ConsultationCard";
import SidebarEnquiryForm from "@/components/layout/SidebarEnquiryForm";
import { getPageSEO } from "@/lib/metadata";
import { CheckCircle, ArrowRight, Info, Phone, Monitor, Mail, MapPin, User, Globe, MessageSquare, } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import BlogCard from "@/components/ui/BlogCard";
import BlogSection from "@/components/ui/BlogSection";
import Keyfeature from "@/components/common/keyfeature/Keyfeature";

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;

    const response = await getBySlug(API_ENDPOINTS.TECHNOLOGY_SLUG, slug);
    if (response?.success && response?.data) {
      const data = response.data;
      return {
        title: data.meta_title || `${formatSlugToTitle(slug)} Technology | KDS International`,
        description: data.meta_description || `Discover how our comprehensive ${formatSlugToTitle(slug)} solutions can transform your operational efficiency.`,
        keywords: data.meta_keywords || "",
        alternates: {
          canonical: data?.canonical_tag,
        },

        robots: data?.meta_robots_tag,
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  const resolvedParams = await params;
  const title = formatSlugToTitle(resolvedParams.slug);

  return {
    title: `${title} Technology | KDS International`,
    description: `Discover how our comprehensive ${title} solutions can transform your operational efficiency.`,
  };
}

export default async function TechnologyDetailPage({ params }) {

  try {
    const { slug } = await params;
    const response = await getBySlug(API_ENDPOINTS.TECHNOLOGY_SLUG, slug);
    console.log("solutionSLUG", response);
    const FAQData = await getData(API_ENDPOINTS.FAQ);
    const sections = response.data.sections.reduce(
      (acc, section) => {
        acc[section.section_key] = section;
        return acc;
      },
      {}
    );

    const hero_section = sections.hero_section;
    const overview = sections.overview;
    const para = sections.para;
    const benefits = sections.benefits;
    const whyChoose = sections.why_choose;
    const custom = sections.custom;
    const expertise_part = sections.expertise_part;
    // Fetch live blogs from new API
    let blogsRes;
    try {
      blogsRes = await getData(API_ENDPOINTS.BLOGS_LIST);
    } catch (error) {
      console.error("Error fetching live blogs for technology slug page:", error);
      blogsRes = { status: false, data: { data: [] } };
    }

    const rawBlogs = blogsRes?.data?.data || [];
    const mappedPosts = rawBlogs.map(post => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      date: post.created_at,
      author: post.author?.name || "KDS Team",
      image: post.featured_image,
      category: post.category?.name || "General",
      categorySlug: post.category?.slug || "general",
      excerpt: post.excerpt || post.details?.[0]?.content?.replace(/<[^>]*>/g, "").substring(0, 150) + "..."
    }));

    const Latest_insight = {
      title: sections.Latest_insight?.title || "Latest Insights & Articles",
      subtitle: sections.Latest_insight?.subtitle || "Explore Our Latest Blogs",
      posts: mappedPosts
    };

    const title = response?.data?.title ? formatSlugToTitle(response.data.title) : formatSlugToTitle(slug);

    const stat = [
      { id: 1, label: "Workers Placed", value: "500+" },
      { id: 2, label: "Satisfied Clients", value: "200+" },
      { id: 3, label: "Manpower Response", value: "24-48hr" },
    ];

    // Generate some mock "other services" for the sidebar
    const otherServices = [
      { id: "1", title: "Workforce Planning", slug: "workforce-planning" },
      { id: "2", title: "Facility Operations", slug: "building-maintenance" },
      { id: "3", title: "Surveillance & Monitoring", slug: "cctv-monitoring" },
    ].filter(s => s.slug !== slug).slice(0, 3);

    const tableContents = [
      { id: "overview", label: "Overview" },
      { id: "features", label: "Key Features" },
      { id: "benefits", label: "Benefits" },
      { id: "content", label: "Detailed Info" },
    ];



    return (
      <main className="scroll-smooth overflow-x-clip bg-white dark:bg-[#0d1117] transition-colors duration-500">

        <ServiceHero service={{ ...hero_section, image: hero_section?.image || response?.data?.image || "", alt_text: hero_section?.alt_text || response?.data?.alt_text || "" }} />

        {/* ─── CONTENT SECTION ─────────────────────────────────────────── */}
        <section className="relative flex flex-row mt-16 lg:mt-16">

          {/* table of contents */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-28">
              <div className="p-4">
                <div className="space-y-3">
                  {tableContents.map((item, index) => (
                    <a
                      key={index}
                      href={`#${item.id}`}
                      className="group relative flex items-center gap-4 rounded-xl border border-blue-100 bg-gradient-to-r from-[#1565c0] to-[#1976d2] px-1 py-2 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100"
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300" />
                      <div className="relative z-10 flex items-center justify-center w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm font-black shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="relative z-10 flex-1">
                        <p className="text-gray-300 font-bold text-[15px] leading-none">
                          {item.label}
                        </p>
                      </div>
                      <div className="relative z-10 text-white/70 group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick CTA Block */}
              <div className="mx-4 mt-6  p-2 rounded-2xl bg-gradient-to-br from-[#0d47a1] to-[#1565c0] text-white shadow-xl relative overflow-hidden group bottom-5">
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <h4 className="font-black text-lg mb-2">Need Manpower?</h4>
                  <p className="text-white/80 text-xs leading-relaxed mb-4">
                    Get quick, compliant, and experienced workforce deployment within 72 hours.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 w-full py-2 bg-white text-[#1565c0] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-blue-50 transition-colors duration-300 active:scale-95 shadow-lg shadow-[#0d47a1]/20"
                  >
                    <Phone size={12} />
                    <span>Talk to Expert</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* right side content */}
          <div className="container mx-auto my-2.5 px-6 max-w-7xl ">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-auto lg:h-[380px] overflow-hidden rounded-[1.5rem] border border-gray-200 dark:border-white/5 dark:bg-[#0d1117] mb-3 ">

              {/* LEFT IMAGE */}
              <div className="relative w-full h-56 lg:h-full overflow-hidden">
                <img
                  src={`${IMAGE_URL}/${overview.image || response.data.image}`}
                  alt={overview?.alt_text || title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0" />

                {/* Decorative Shape */}
                <div className="hidden lg:block absolute -right-20 top-0 w-40 h-full bg-white dark:bg-teal-600/10 rotate-12" />
              </div>

              {/* RIGHT CONTENT */}
              <div className="flex flex-col justify-center !px-6 !lg:px-14 !py-8 !lg:py-10 relative">

                {/* Small Label */}
                <span className="inline-flex items-center w-fit px-4 py-1.5 rounded-full bg-teal-600/10 text-blue-400 text-xs font-black uppercase tracking-[0.25em] mb-3">
                  {overview.title}
                </span>

                {/* Heading */}
                <h2 className="text-xl lg:text-2xl font-black text-gray-900 dark:text-white leading-tight tracking-tight mb-4 lg:mb-6">
                  {overview?.subtitle || "Transforming Operations with"}
                  <span
                    className="block text-blue-700 mt-1 mb-1 text-xl lg:text-2xl"
                    dangerouslySetInnerHTML={{ __html: overview.description ? overview.description.replace(/<\/?p>/g, '') : title }}
                  />
                </h2>

                {/* Description */}
                <p className="text-gray-600 dark:text-[#8b949e] text-sm lg:text-base leading-relaxed mb-6 lg:mb-8 max-w-xl">
                  {overview?.points?.[0]?.point || ""}
                </p>

                {/* CTA */}
                <div className="flex gap-4">
                  {overview.extra_data?.map((btn, index) => {
                    const isExplore = btn.key?.toLowerCase().includes("explore");
                    return (
                      <Button
                        key={index}
                        href={btn.url_path || "/contact"}
                        variant={isExplore ? "outline" : "default"}
                        className={isExplore
                          ? "border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl font-bold"
                          : "bg-blue-600 hover:bg-teal-700 text-white border-none font-bold"}
                      >
                        {btn.key}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* Main Content */}
              <div
                className="lg:col-span-2 space-y-12 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                {/* Description */}
                {para && (
                  <div id="overview" className="scroll-mt-28 bg-white dark:bg-transparent premium-glass p-6 md:p-8 rounded-[2rem] border border-gray-200 dark:border-white/5 relative overflow-hidden transition-colors duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-4">
                      <div className={para.image ? "md:col-span-8" : "md:col-span-12"}>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                          {para.title}
                        </h2>
                        <div
                          className="text-gray-600 dark:text-[#8b949e] text-lg leading-relaxed transition-colors duration-500"
                          dangerouslySetInnerHTML={{ __html: para.description }}
                        />
                      </div>
                      {para.image && (
                        <div className="md:col-span-4 h-48 md:h-64 rounded-2xl overflow-hidden shadow-lg relative">
                          <img
                            src={`${IMAGE_URL}/${para.image}`}
                            alt={para.alt_text || "Overview Image"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Features */}
                <Keyfeature data={para} />
                {/* Benefits */}
                {benefits && (
                  <div id="benefits" className="scroll-mt-28 my-4">
                    <h3
                      className="text-2xl mb-4 font-black text-gray-900 dark:text-white tracking-tight transition-colors duration-500"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {benefits.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {benefits.points?.map((benefit, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-[#161b22] rounded-xl"
                        >
                          <span className="text-gray-600 dark:text-gray-400 text-sm">
                            <p>{benefit.point}</p>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {benefits?.extra_data && benefits.extra_data.length > 0 && (
                  <div className="flex flex-col gap-2 my-8">
                    <div className="flex gap-2 h-48 md:h-64">
                      <div className="flex-1 rounded-lg overflow-hidden">
                        <img
                          src={`${IMAGE_URL}/${benefits.extra_data[0]?.image}`}
                          alt={benefits.extra_data[0]?.alt_text || "Feature showcase 1"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 rounded-lg overflow-hidden">
                        <img
                          src={`${IMAGE_URL}/${benefits.extra_data[1]?.image}`}
                          alt={benefits.extra_data[1]?.alt_text || "Feature showcase 2"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 h-48 md:h-64">
                      <div className="flex-1 rounded-lg overflow-hidden">
                        <img
                          src={`${IMAGE_URL}/${benefits.extra_data[2]?.image}`}
                          alt={benefits.extra_data[2]?.alt_text || "Feature showcase 3"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 rounded-lg overflow-hidden">
                        <img
                          src={`${IMAGE_URL}/${benefits.extra_data[3]?.image}`}
                          alt={benefits.extra_data[3]?.alt_text || "Feature showcase 4"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Detailed Info */}
                {whyChoose && (
                  <div id="content" className="scroll-mt-28 my-8">
                    <h3
                      className="text-2xl mb-4 font-black text-gray-900 dark:text-white tracking-tight transition-colors duration-500"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {whyChoose.title}
                    </h3>
                    {whyChoose.subtitle && (
                      <p className="text-gray-600 dark:text-[#8b949e] text-sm mb-4 leading-relaxed">
                        {whyChoose.subtitle}
                      </p>
                    )}
                    {whyChoose.extra_data?.[0]?.points && (
                      <div className="bg-[#1565c0]/5 !p-6 rounded-2xl border border-[#1565c0]/10 mt-6">
                        <h4 className="font-black text-gray-900 dark:text-white mb-4">
                          {whyChoose.extra_data[0].key || "Core Advantages"}
                        </h4>
                        <ul className="space-y-3 ps-1">
                          {whyChoose.extra_data[0].points.map((p, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle size={18} className="text-[#1565c0] shrink-0 mt-0.5" />
                              <span className="text-gray-700 dark:text-gray-300 text-sm">
                                {p.point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {whyChoose.description && (
                      <div
                        className="prose dark:prose-invert text-gray-600 dark:text-[#8b949e] mt-6"
                        dangerouslySetInnerHTML={{ __html: whyChoose.description }}
                      />
                    )}
                  </div>
                )}

                {custom && (
                  <div className="relative w-full h-[300px] rounded-xl overflow-hidden border border-gray-200 dark:border-white/5 shadow-lg mb-8 animate-fade-in-up">
                    {/* Background Image */}
                    <img
                      src={`${IMAGE_URL}/${custom.image}`}
                      alt={custom.alt_text || "Showcase banner"}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                      <h2 className="text-white text-4xl md:text-6xl font-black leading-tight mb-8">
                        {custom.subtitle || "Elevate Your"}
                        <span className="block text-blue-300">
                          {custom.title || "Operations"}
                        </span>
                      </h2>

                      <Link
                        href={custom.url_path || "/contact"}
                        className="group flex items-center gap-3 bg-white text-[#1565c0] px-6 py-2 rounded-2xl font-bold shadow-xl hover:scale-105 transition-all duration-300"
                      >
                        <span dangerouslySetInnerHTML={{ __html: custom.description || "Get Started" }} />
                        <span className="w-6 h-6 rounded-full bg-[#1565c0] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="space-y-8">
                {/* Image */}
                <div className="bg-gray-200 dark:bg-[#161b22] border border-gray-300 dark:border-white/5 rounded-3xl overflow-hidden shadow-lg h-64">
                  <img
                    src={response?.data?.image ? `${IMAGE_URL}/${response.data.image}` : "/industry-logistics.png"}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {/* Related Solutions */}
                {otherServices.length > 0 && (
                  <div className="bg-white dark:bg-transparent premium-glass p-4 rounded-[2rem] border border-gray-200 dark:border-white/5 shadow-sm">
                    <h3 className="text-gray-900 dark:text-white font-black text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                      <Info size={16} className="text-[#1565c0]" />
                      Explore Solutions
                    </h3>
                    <div className="my-3">
                      {otherServices.map((s) => (
                        <Link
                          key={s.id}
                          href={`/solutions/${s.slug}`}
                          className="flex items-center justify-between group p-3 mb-3 rounded-xl border border-transparent hover:border-[#1565c0]/20 hover:bg-[#1565c0]/5 transition-all"
                        >
                          <span className="text-gray-700 dark:text-gray-300 font-medium text-sm group-hover:text-gray-900 dark:group-hover:text-white">
                            {s.title}
                          </span>
                          <ArrowRight
                            size={16}
                            className="text-[#1565c0] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="bg-gray-900 dark:bg-[#0d1117] rounded-[2rem] p-6 text-center border border-gray-200 dark:border-white/5 mt-4 shadow-xl">
                  <h3 className="text-xl font-black text-white mb-3">
                    Optimize Your Operations
                  </h3>
                  <p className="text-gray-200 text-sm mb-5">
                    Connect with our solution architects to design a framework tailored for you.
                  </p>
                  <Button
                    href="/contact"
                    className="w-full bg-[#1565c0] text-white hover:bg-[#0d47a1] border-none"
                  >
                    Request Consultation
                  </Button>
                </div>
                {/* enquiry form */}
                <div className="lg:col-span-5 mb-4  flex flex-col items-center  ">
                  <div className="bg-white/5 border border-white/10  rounded-3xl overflow-hidden shadow-2xl shadow-[#1565c0]/10" style={{ backdropFilter: 'blur(2px) ' }}>

                    <div className="h-1 w-full bg-gradient-to-r from-[#0d47a1] via-[#1565c0] to-[#1976d2]" />

                    <div className="p-3 ">
                      <h3 className="text-blue-900 font-black text-xl mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
                        Get a Free Consultation
                      </h3>
                      <p className="text-gray-600 text-sm mb-6">Tell us your manpower requirements and we'll respond within 2 hours.</p>

                      <div className="space-y-3 ">
                        {[
                          { icon: Phone, label: "Call Us Directly", value: "+91 9899184918", href: "tel:+919899184918" },
                          { icon: Mail, label: "Email Us", value: "info@kdsinternational.org", href: "mailto:info@kdsinternational.org" },
                          { icon: MapPin, label: "Our Office", value: "Laxmi Nagar, Delhi - 110092", href: "#" },
                        ].map((item, i) => (
                          <a key={i} href={item.href}
                            className="flex items-center gap-4 p-lg-2 p-3 rounded-2xl mb-3 bg-[#1565c0] border border-white/5 hover:border-[#1565c0]/30 transition-all cursor-pointer group">
                            <div className="w-10 h-10 rounded-xl bg-[#1565c0]/20 flex items-center justify-center shrink-0 group-hover:bg-[#1565c0] transition-all">
                              <item.icon size={17} className="text-white group-hover:text-white transition-colors" />
                            </div>
                            <div>
                              <p className="text-[10px] text-white uppercase tracking-widest font-bold mb-1">{item.label}</p>
                              <p className="text-white text-sm font-semibold mb-0">{item.value}</p>
                            </div>
                          </a>
                        ))}
                      </div>

                      <Link href="/contact"
                        className="block mt-2 w-full py-3 text-center bg-gradient-to-r from-[#0d47a1] to-[#1565c0] hover:from-[#1565c0] hover:to-[#1976d2] text-white text-sm font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-[#1565c0]/20">
                        Request Manpower Today →
                      </Link>
                    </div>
                  </div>

                </div>
                {/* blog */}
                <div className="relative w-full rounded-3xl overflow-hidden border border-gray-200 dark:border-white/5 shadow-lg mb-8 animate-fade-in-up">

                  {/* Image */}
                  <img
                    src="https://bairesdev.mo.cloudinary.net/blog/2023/10/Process-Automation-and-Software-Development.jpg?tx=w_1920,q_auto"
                    alt="Feature showcase"
                    className="w-full h-full object-cover"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/50"></div>

                  {/* Text Content */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                    <h2 className="text-white text-3xl md:text-5xl font-bold mb-4">
                      Transform Your Business
                    </h2>

                    <p className="text-white/90 text-sm md:text-lg max-w-2xl">
                      Automate workflows, improve efficiency, and scale your digital solutions
                      with modern technology.
                    </p>
                  </div>

                </div>
                {/* states */}
                <div className="bg-gradient-to-br from-[#1565c0] to-[#0d47a1] rounded-[2rem] p-4 text-white mt-4">
                  <h3 className="text-xl font-black mb-4">Why Choose Us</h3>
                  <div className="space-y-4">
                    {stat.slice(0, 3).map((stat) => (
                      <div key={stat.id} className="flex justify-between items-center border-b border-white/20 py-3 last:border-0">
                        <span className="text-white/80 text-sm">{stat.label}</span>
                        <span className="font-black text-lg">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* form */}
                <div className="relative lg:sticky lg:top-28 w-full max-w-[500px] mx-auto mb-8">
                  <SidebarEnquiryForm serviceTitle={title} />
                </div>
                {/* <ConsultationCard/> */}
              </aside>
            </div>
          </div>
        </section>

        {/* PREMIUM FEATURES SHOWCASE */}
        {expertise_part && (
          <div
            id="features"
            className="relative overflow-hidden"
          >

            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={expertise_part.image ? `${IMAGE_URL}/${expertise_part.image}` : 'https://www.manpowergrc.hk/images/workforce_banner.jpg'}
                alt={expertise_part.alt_text || title}
                className="w-full h-full object-cover"
              />

              {/* Light Overlay */}
              <div className="absolute inset-0 bg-black/35" />
            </div>

            {/* Content */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 px-5 md:px-10 py-10 md:py-14 min-h-[520px]">

              {/* LEFT CONTENT */}
              <div className="flex flex-col justify-center max-w-xl">

                {/* Small Tag */}
                <span className="inline-flex items-center w-fit px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                  {expertise_part.title || "Enterprise Solutions"}
                </span>

                {/* Heading */}
                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight mb-4">
                  {expertise_part.subtitle ? (
                    <>
                      {expertise_part.subtitle.split(' ').slice(0, -1).join(' ')}{' '}
                      <span className="block text-blue-400 mt-1">
                        {expertise_part.subtitle.split(' ').slice(-1)[0]}
                      </span>
                    </>
                  ) : (
                    <>
                      Advanced{' '}
                      <span className="block text-blue-400 mt-1">
                        {title}
                      </span>
                    </>
                  )}
                </h2>

                {/* Description */}
                <div
                  className="text-white text-sm md:text-base leading-relaxed max-w-lg"
                  dangerouslySetInnerHTML={{ __html: expertise_part.description || "" }}
                />
              </div>

              {/* RIGHT FEATURE BOXES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 self-center">

                {(expertise_part.extra_data && expertise_part.extra_data.length > 0 ? expertise_part.extra_data : [
                  { value: "Improved workforce agility" },
                  { value: "Enhanced innovation capabilities" },
                  { value: "Better employee experiences" },
                  { value: "Faster adaptation to market changes" }
                ]).slice(0, 4).map((feature, idx) => (

                  <div
                    key={idx}
                    className="bg-white rounded-[1.5rem] px-5 py-6 shadow-2xl border border-white/30 min-h-[150px] flex flex-col justify-center transition-all duration-300 hover:-translate-y-1"
                  >

                    <div className="text-4xl md:text-5xl font-black text-blue-700 mb-3 leading-none">
                      0{idx + 1}
                    </div>

                    <h4 className="text-sm md:text-base font-bold !text-gray-700  leading-relaxed">
                      {feature.value}
                    </h4>

                  </div>
                ))}

              </div>
            </div>
          </div>
        )}
        {/* blog section */}
        <BlogSection data={Latest_insight} />

        <FAQSection faqs={FAQData} />

      </main>
    );
  } catch (error) {
    console.error("Error loading solution:", error);
    notFound();
  }
}
