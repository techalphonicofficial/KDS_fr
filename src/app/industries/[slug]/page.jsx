
import { getServerData } from "@/lib/data";
import { notFound } from "next/navigation";
import { getBySlug, getData } from "@/lib/data";
import { API_ENDPOINTS } from "@/config/api";
import FAQSection from '@/components/common/FAQ';
import BlogSection from "@/components/ui/BlogSection";
import { IMAGE_URL } from "@/config/api";

import {
  ArrowLeft,
  Globe,
  Shield,
  TrendingUp,
  Users,
  Award,
  Clock,
  CheckCircle,
  ChevronRight,
  Building2,
  Package,
  Truck,
  Factory,
  Zap,
  Target,
  BarChart3,
  Star,
  ThumbsUp,
  Briefcase,
  HardHat,
  Wrench,
  Cpu,
  Settings,
  PenTool,
  Ruler,
  Thermometer,
  Droplets,
  Wind,
  Gauge,
  AlertCircle,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Play,
  Pause,
  Quote,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube
} from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Testimonial from "@/components/common/testimonial/Testimonial";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let industryData = null;
  try {
    const response = await getBySlug(API_ENDPOINTS.INDUSTRY_SLUG, slug);
    industryData = response?.data;
  } catch (error) {
    console.error("Error fetching industry metadata from API:", error);
  }

  try {
    const localData = await getServerData();
    const localIndustry = localData.industries?.find((i) => i.slug === slug);

    if (!industryData && !localIndustry) {
      return { title: `${formatSlugToTitle(slug)} | KDS International` };
    }

    const name = industryData?.name || localIndustry?.title || localIndustry?.name || slug;
    const metaTitle = industryData?.meta_title || localIndustry?.meta_title || `${formatSlugToTitle(name)} Industry Solutions | KDS International`;
    const metaDescription = industryData?.meta_description || localIndustry?.meta_description || localIndustry?.fullDescription || localIndustry?.description || "";
    const metaKeyword = industryData?.meta_keyword || localIndustry?.meta_keyword || `${name}, industrial solutions, manufacturing, supply chain, ${name} industry`;
    const imagePath = industryData?.image || localIndustry?.ogImage || localIndustry?.image || "/industries/og-default.jpg";
    const imageUrl = imagePath.startsWith("http")
      ? imagePath
      : imagePath.startsWith("/")
        ? `${IMAGE_URL}${imagePath}`
        : `${IMAGE_URL}/${imagePath}`;

    return {
      title: metaTitle,
      description: metaDescription,
      keywords: metaKeyword,
      alternates: {
        canonical: industryData?.canonical_tag,
      },

      robots: industryData?.meta_robots_tag,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        images: [{ url: imageUrl }],
      },
      other: {
        "script:type": typeof industryData?.meta_schema === "string"
          ? industryData.meta_schema
          : JSON.stringify(industryData?.meta_schema || []),
      },
    };
  } catch (error) {
    console.error("Error generating industry metadata:", error);
    return { title: "Industry Solutions | KDS International" };
  }
}

// export async function generateStaticParams() {
//   const data = await getServerData();
//   // console.log("industres",data)
//   const industries = data?.industries || [];
//   return industries
//     .filter((item) => item?.slug && typeof item.slug === "string")
//     .map((item) => ({
//       slug: item.slug,
//     }));
// }

// Helper to format slug to Title Case
const formatSlugToTitle = (slug) => {
  if (!slug) return "";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Industry-specific icon mapping
const getIndustryIcon = (industryTitle) => {
  const title = industryTitle?.toLowerCase() || "";
  const iconMap = {
    'automotive': Truck,
    'electronics': Cpu,
    'industrial': Factory,
    'industrial machinery': Factory,
    'logistics': Package,
    'warehousing, logistics & e-commerce': Package,
    'healthcare': Building2,
    'healthcare & hospitals': Building2,
    'construction': HardHat,
    'construction & infrastructure': HardHat,
    'aerospace': Settings,
    'food & beverage': Thermometer,
    'food and beverage': Thermometer,
    'chemical': Droplets,
    'pharmaceutical': AlertCircle,
    'textile': PenTool,
    'energy': Zap,
    'energy & utilities': Zap,
    'marine': Wind,
    'marine & shipping': Wind,
    'mining': Gauge,
    'oil gas': Gauge,
    'oil & gas': Gauge,
    'hospitality & hotel sector': Building2,
    'corporate offices & it parks': Briefcase
  };
  return iconMap[title] || Building2;
};

// Get industry-specific color scheme
const getIndustryColors = (industryTitle) => {
  const title = industryTitle?.toLowerCase() || "";
  const colorMap = {
    'automotive': { primary: '#1565c0', secondary: '#64b5f6', gradient: 'from-blue-600 to-blue-400' },
    'electronics': { primary: '#7b1fa2', secondary: '#ba68c8', gradient: 'from-purple-600 to-purple-400' },
    'industrial': { primary: '#2e7d32', secondary: '#81c784', gradient: 'from-green-600 to-green-400' },
    'logistics': { primary: '#ed6c02', secondary: '#ffb74d', gradient: 'from-orange-600 to-orange-400' },
    'healthcare': { primary: '#d32f2f', secondary: '#ef5350', gradient: 'from-red-600 to-red-400' },
    'construction': { primary: '#8d6e63', secondary: '#bcaaa4', gradient: 'from-brown-600 to-brown-400' }
  };
  return colorMap[title] || { primary: '#1565c0', secondary: '#64b5f6', gradient: 'from-blue-600 to-blue-400' };
};

export default async function IndustryDetailPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let industryData = null;
  let sections = {};

  try {
    const response = await getBySlug(API_ENDPOINTS.INDUSTRY_SLUG, slug);
    if (response?.success || response?.data) {
      industryData = response.data;
      if (Array.isArray(industryData.sections)) {
        sections = industryData.sections.reduce(
          (acc, section) => {
            acc[section.section_key] = section;
            return acc;
          },
          {}
        );
      }
    }
  } catch (error) {
    console.error("Error fetching industry details from API:", error);
  }

  const data = await getServerData();
  const localIndustry = data.industries?.find((i) => i.slug === slug);

  if (!industryData && !localIndustry) {
    notFound();
  }

  // Create merged industry object
  const industry = {
    title: industryData?.name || localIndustry?.title || localIndustry?.name || slug,
    slug: slug,
    ...localIndustry,
    ...industryData,
  };

  const hero_section = sections.hero_section || { title: industry.title, subtitle: "", description: "" };
  const leading = sections.leading || { title: "", subtitle: "", description: "", points: [], extra_data: [] };
  const bynumber = sections.bynumber || { title: "", description: "", extra_data: [] };
  const capability = sections.capability || { title: "", subtitle: "", description: "", extra_data: [] };
  const results = sections.results || { title: "", subtitle: "", description: "", extra_data: [], image: "" };
  const journey = sections.journey || { title: "", subtitle: "", description: "", extra_data: [] };
  const partner = sections.partners || { extra_data: [] };
  const herSection_stat = sections.herSection_stat || { extra_data: [] };
  const leader_image = sections.leader_image || { title: "", subtitle: "", image: "", extra_data: [] };

  const IndustryIcon = getIndustryIcon(industry.title);
  const colors = getIndustryColors(industry.title);

  // Filter projects related to this industry
  const relatedProjects = data.projects?.filter(p =>
    p.category?.toLowerCase() === industry.title?.toLowerCase()
  ) || [];

  // Fetch all dynamic categories and industries from API to get the correct slugs
  let allApiIndustries = [];
  try {
    const industriesListResponse = await getData(API_ENDPOINTS.INDUSTRIES_LIST);
    allApiIndustries = industriesListResponse?.data?.flatMap(cat => cat.industries || []) || [];

  } catch (error) {
    console.error("Error fetching industries list for sidebar:", error);
  }

  // Combine API and local industries
  const FAQData = await getData(API_ENDPOINTS.FAQ);

  // Fetch live blogs from new API
  let blogsRes;
  try {
    blogsRes = await getData(API_ENDPOINTS.BLOGS_LIST);
  } catch (error) {
    console.error("Error fetching live blogs for industries slug page:", error);
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
    title: "Latest Insights & Articles",
    subtitle: "Explore Our Latest Blogs",
    posts: mappedPosts
  };
  const localIndustries = data.industries || [];
  const combinedIndustries = [...allApiIndustries];

  localIndustries.forEach(local => {
    if (local.slug && !combinedIndustries.some(api => api.slug === local.slug)) {
      combinedIndustries.push({
        name: local.title || local.name,
        slug: local.slug,
        desc: local.description || local.desc
      });
    }
  });

  const relatedIndustries = combinedIndustries
    .filter(i => i.slug && i.slug !== slug)
    .slice(0, 3)
    .map(i => ({
      id: i.id || i.slug,
      title: formatSlugToTitle(i.name || i.title || i.slug),
      slug: i.slug,
      description: i.description || i.desc || ""
    }));

  return (
    <main className="overflow-hidden bg-white dark:bg-[#0d1117] transition-colors duration-500">
      {industryData?.meta_schema?.[0]?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: typeof industryData.meta_schema[0].schema === "string"
              ? industryData.meta_schema[0].schema
              : JSON.stringify(industryData.meta_schema[0].schema)
          }}
        />
      )}

      {/* ─── HERO SECTION WITH VIDEO/PARALLAX ─────────────────────────── */}
      <section className="relative min-h-screen md:h-screen md:min-h-[800px] flex items-center justify-center overflow-hidden !py-12 md:py-20">

        {/* Background */}
        <div className="absolute inset-0">

          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90 z-10" />

          {/* <Image
            src={hero_section.background_image}
            alt={hero_section.background_alt_text}
            fill
            className="object-cover"
            priority
          /> */}

          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-grid-pattern animate-pulse" />
          </div>

        </div>

        {/* Floating */}
        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float" />

          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float-delayed" />

        </div>


        <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-28 md:pt-16 max-w-7xl relative z-20">


          <Link
            href="/industries"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
          >

            <ArrowLeft size={16} className="text-white" />

            <span className="text-white">
              Back to Industries
            </span>

          </Link>


          <div className="max-w-4xl">


            {/* Label */}

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/30 mb-3">

              <IndustryIcon className="w-5 h-5 text-white" />

              <span className="text-white font-bold">
                {hero_section.title}
              </span>

            </div>



            {/* Title */}

            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white mb-3 leading-none">

              {hero_section.title}

              <br />

              <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/60 font-bold mt-2 leading-tight">

                {hero_section.subtitle}

              </span>

            </h1>


            {/* Description */}

            <p
              className="text-base sm:text-lg md:text-xl text-white/80 mb-6 max-w-3xl leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: hero_section.description,
              }}
            />


            {/* Buttons */}

            <div className="flex flex-wrap gap-4 md:gap-6 mb-8">

              {
                hero_section.extra_data?.slice(0, 2).map((btn, index) => (

                  <Button
                    key={index}
                    href={btn.url_path}
                    size="xl"
                    className={
                      index === 0
                        ? "bg-[#1565c0] text-white border border-white !rounded-2xl !px-4 sm:!px-6 py-2.5 sm:py-3 font-bold text-sm sm:text-base hover:bg-[#0d47a1] "
                        : "bg-transparent text-white border-2 border-white !rounded-2xl !px-4 sm:!px-6 py-2.5 sm:py-3 font-bold text-sm sm:text-base hover:bg-white hover:text-[#1565c0]"
                    }
                  >

                    {btn.value}

                  </Button>

                ))
              }

            </div>


            {/* Stats */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">


              {
                herSection_stat?.extra_data?.map((stat, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300"
                  >


                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0">

                      <BarChart3 className="w-6 h-6 text-white" />

                    </div>





                    <div>


                      <div className="text-xl sm:text-2xl font-black text-white">

                        {stat.key}

                      </div>



                      <div className="text-sm sm:text-base text-white/80">

                        {stat.value}

                      </div>


                    </div>


                  </div>


                ))
              }


            </div>




          </div>

        </div>

      </section>

      {/* ─── OVERVIEW SECTION WITH IMAGE GRID ─────────────────────────── */}
      <section className="py-5 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Content */}
            <div className="animate-fade-in-up">


              {/* Heading */}
              <span className="text-[#1565c0] font-black text-sm uppercase tracking-[0.3em] mb-4 block">

                {leading?.title}

              </span>



              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4 leading-tight">

                {leading?.subtitle}

                <br />

                <span className="text-[#1565c0]">

                  {industry.title}

                </span>

              </h2>





              {/* Description */}
              <div className="space-y-6 text-lg text-gray-600 dark:text-[#8b949e] leading-relaxed">
                {leading?.description && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: leading.description,
                    }}
                  />
                )}
              </div>





              {/* Points */}
              <div className="mt-12 grid grid-cols-2 gap-4">


                {
                  leading?.points?.map((item, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-2"
                    >

                      <div className="w-6 h-6 rounded-full bg-[#1565c0]/10 flex items-center justify-center">

                        <CheckCircle className="w-4 h-4 text-[#1565c0]" />

                      </div>


                      <span className="text-gray-700 dark:text-gray-300 font-medium">

                        {item.point}

                      </span>


                    </div>

                  ))
                }


              </div>





              {/* Stats */}
              <div className="mt-4 flex flex-wrap gap-8">


                {
                  leading?.extra_data?.map((stat, index) => (

                    <div key={index}>


                      {/* <div className="text-4xl font-black text-[#1565c0]">

                        {stat.key}

                      </div> */}


                      <div className="text-[16px] text-gray-600 dark:text-[#8b949e]">

                        {stat.value}

                      </div>


                    </div>

                  ))
                }


              </div>


            </div>
            {/* Right Column - Image Grid */}
            <div
              className="relative animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >


              {/* Main Image */}
              <div className="relative h-[600px] rounded-[2rem] overflow-hidden">


                {
                  leader_image?.image ? (

                    <Image
                      src={`${IMAGE_URL}/${leader_image.image}`}
                      alt={leader_image.alt_text}
                      fill
                      className="object-cover"
                    />

                  ) : (

                    <div className="w-full h-full bg-gradient-to-br from-[#1565c0] to-[#64b5f6] flex items-center justify-center">

                      <IndustryIcon className="w-32 h-32 text-white/30" />

                    </div>

                  )

                }


                {/* Overlay Stats */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">


                  <div className="grid grid-cols-3 gap-4">


                    {
                      leader_image?.extra_data?.slice(0, 3).map((stat, index) => (

                        <div
                          key={index}
                          className="text-center"
                        >

                          <div className="text-2xl font-black text-white">

                            {stat.key}

                          </div>


                          <div className="text-sm text-white">

                            {stat.value}

                          </div>


                        </div>

                      ))
                    }


                  </div>


                </div>


              </div>





              {/* Floating Card */}
              <div className="absolute top-0 left-8 bg-white dark:bg-[#0d1117] premium-glass p-3 rounded-2xl shadow-2xl max-w-xs">


                <div className="flex items-center gap-4">


                  <Award className="w-10 h-10 text-[#1565c0]" />


                  <div>


                    <div className="font-black">

                      {leader_image?.title}

                    </div>


                    <div className="text-sm text-gray-600 dark:text-[#8b949e]">

                      {leader_image?.subtitle}

                    </div>


                  </div>


                </div>


              </div>


            </div>
          </div>
        </div>
      </section>

      {/* ─── STATISTICS COUNTER SECTION ───────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-[#1565c0] via-[#1976d2] to-[#42a5f5] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="container max-w-7xl relative z-10 !mt-10">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
              {bynumber?.title}
            </h2>

            <div
              className="max-w-3xl mx-auto text-lg  text-white/90"
              dangerouslySetInnerHTML={{
                __html: bynumber?.description,
              }}
            />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {bynumber?.extra_data?.map((stat, index) => (
              <div
                key={index}
                className="relative bg-white rounded-xl shadow-xl !p-4 h-auto flex flex-col text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl group overflow-hidden"
              >
                {/* Card Number */}
                <span className="absolute top-5 right-5 text-5xl font-black text-[#1565c0]/10">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}


                {/* Title */}
                <h3
                  className="text-2xl font-bold text-gray-900 leading-tight mb-1"
                  dangerouslySetInnerHTML={{
                    __html: stat.key,
                  }}
                />

                {/* Divider */}
                <div className="w-16 h-1 bg-[#1565c0] rounded-full mx-auto mb-5"></div>

                {/* Description */}
                <div
                  className="text-gray-600 leading-7 text-[15px] flex-grow"
                  dangerouslySetInnerHTML={{
                    __html: stat.value,
                  }}
                />

                {/* Bottom Hover Line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#1565c0] group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CAPABILITIES GRID ────────────────────────────────────────── */}
      <section id="capabilities" className="py-5 relative">

        <div className="container mx-auto px-6 max-w-7xl">


          {/* Header */}
          <div className="text-center mb-5">


            <span className="text-[#1565c0] font-black text-sm uppercase tracking-[0.3em] mb-4 block">

              {capability?.title}

            </span>



            <h2 className="text-5xl md:text-4xl font-black text-gray-900 dark:text-white !mb-4">

              {capability?.subtitle}

            </h2>



            <p className="text-xl text-gray-600 dark:text-[#8b949e] max-w-3xl mx-auto"


              dangerouslySetInnerHTML={{
                __html: capability?.description,
              }}

            />


          </div>





          {/* Cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">


            {
              capability?.extra_data?.map((item, index) => (

                <div
                  key={index}
                  className="group bg-white dark:bg-transparent premium-glass p-4 rounded-2xl border border-gray-200 dark:border-white/5 hover:border-[#1565c0]/30 transition-all duration-500 hover:shadow-2xl"
                >


                  <div className="inline-flex p-4 rounded-xl bg-[#1565c0]/10 mb-3 group-hover:scale-110 transition-transform">

                    <CheckCircle className="w-8 h-8 text-[#1565c0]" />

                  </div>

                  {/* Title */}

                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">

                    {item.key}

                  </h3>

                  {/* Description */}

                  <p className="text-gray-600 dark:text-[#8b949e] mb-3">
                    {item.value}
                  </p>

                  {/* Points */}

                  <div className="space-y-3">


                    {
                      item.points?.map((point, pIndex) => (

                        <div
                          key={pIndex}
                          className="flex items-center gap-2"
                        >

                          <CheckCircle className="w-5 h-5 text-[#1565c0]" />


                          <span className="text-sm text-gray-700 dark:text-gray-300">

                            {point.point}

                          </span>


                        </div>


                      ))
                    }


                  </div>



                </div>


              ))
            }



          </div>


        </div>


      </section>

      {/* ─── SUCCESS METRICS SHOWCASE ─────────────────────────────────── */}
      <section className="py-5 bg-gray-50 dark:bg-[#0a0e15]">

        <div className="container mx-auto px-6 max-w-7xl">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">


            {/* Content */}
            <div className="animate-fade-in-up">


              <span className="text-[#1565c0] font-black text-sm uppercase tracking-[0.2em] mb-4 block">

                {results?.title}

              </span>




              <p className="!text-[17px] sm:text-2xl text-gray-500 dark:text-white mb-3">


                {results?.subtitle}





              </p>

              <p className="text-lg text-black-600  dark:text-[#8b949e] mb-3 leading-relaxed"

                dangerouslySetInnerHTML={{
                  __html: results?.description,
                }}

              />







              {/* Metrics */}

              <div className="grid grid-cols-2 gap-8">


                {
                  results?.extra_data?.map((metric, index) => (

                    <div
                      key={index}
                      className="flex items-start gap-4"
                    >


                      {/* <div className="text-4xl font-black text-[#1565c0]">

                        {metric.key}

                      </div> */}


                      <div>
                        <h4 className="!text-sm md:!text-[16px]  !text-gray-600 dark:!text-gray-400 !mb-2">
                          {metric.value}
                        </h4>
                      </div>


                    </div>


                  ))
                }


              </div>



            </div>







            {/* Image */}

            <div
              className="relative animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >


              <div className="bg-white dark:bg-transparent premium-glass overflow-hidden rounded-2xl border border-gray-200 dark:border-white/5">


                <div className="space-y-4">


                  <img
                    src={`${IMAGE_URL}/${results?.image}`}
                    alt={results?.alt_text}
                    className="w-full object-cover rounded-2xl"
                  />


                </div>


              </div>





              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#1565c0]/10 rounded-full blur-2xl" />


              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#1565c0]/10 rounded-full blur-2xl" />


            </div>




          </div>

        </div>

      </section>

      <Testimonial data={data} />

      {/* ─── TIMELINE/MILESTONES SECTION ──────────────────────────────── */}
      <section className="py-5 relative">

        <div className="container mx-auto px-6 max-w-7xl">


          {/* Header */}
          <div className="text-center mb-5">


            <span className="text-[#1565c0] font-black text-sm uppercase tracking-[0.3em] mb-4 block">

              {journey?.title}

            </span>



            <p className="text-base font-normal !text-gray-600 dark:!text-gray-400 mb-3">
              {journey?.subtitle}
            </p>


            <p className="text-xl text-black dark:text-[#8b949e] max-w-3xl mx-auto">
              {journey?.description
                ?.replace(/<[^>]*>/g, "") // Remove HTML tags
                ?.replace(/&nbsp;/g, " ") // Replace &nbsp; with space
                ?.trim()}
            </p>


          </div>


          <div className="relative">

            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#1565c0]/20 via-[#1565c0]/40 to-[#1565c0]/20" />





            <div className="space-y-12 md:space-y-16">


              {
                journey?.extra_data?.map((milestone, index) => (

                  <div
                    key={index}
                    className={`relative flex flex-col md:flex-row ${index % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                      } items-center gap-8 md:gap-12`}
                  >





                    {/* Content */}

                    <div
                      className={`w-full md:w-1/2 ${index % 2 === 0
                        ? "md:text-right"
                        : "md:text-left"
                        }`}
                    >


                      <div className="bg-white dark:bg-transparent premium-glass p-4 rounded-2xl border border-gray-200 dark:border-white/5 hover:border-[#1565c0]/30 transition-all duration-500 hover:shadow-2xl">


                        {/* Year */}

                        <div className="inline-block mb-4">

                          <span className="px-4 py-2 bg-[#1565c0]/10 rounded-full text-[#1565c0] font-black text-sm">

                            {milestone.key}

                          </span>

                        </div>





                        {/* Title */}

                        <p className="!text-[18px] !font-normal !text-gray-600 dark:!text-gray-400 mb-3">
                          {milestone.value}
                        </p>





                        {/* Description */}

                        <p className="text-gray-600 dark:text-[#8b949e] leading-relaxed">

                          {milestone.subtitle}

                        </p>





                        {/* Points */}

                        {
                          milestone.points?.map((point, pIndex) => (

                            <div
                              key={pIndex}
                              className="mt-4 flex items-center gap-2 text-[#1565c0]"
                            >

                              <div className="w-2 h-2 rounded-full bg-[#1565c0]" />

                              <span className="text-xs font-bold uppercase">

                                {point.point}

                              </span>

                            </div>

                          ))
                        }



                      </div>


                    </div>







                    {/* Center Dot */}

                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">


                      <div className="relative">

                        <div className="absolute inset-0 w-6 h-6 bg-[#1565c0]/20 rounded-full animate-ping" />

                        <div className="relative w-6 h-6 bg-[#1565c0] rounded-full border-4 border-white dark:border-[#0d1117]" />

                      </div>


                    </div>





                    {/* Empty */}

                    <div className="hidden md:block w-1/2" />


                  </div>

                ))
              }


            </div>


          </div>




          {/* Decorative */}

          <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#1565c0]/5 rounded-full blur-3xl" />

          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1565c0]/5 rounded-full blur-3xl" />


        </div>

      </section>


      {/* ─── PARTNERS & CERTIFICATIONS ────────────────────────────────── */}
      <section className="py-16 bg-gray-50 dark:bg-[#0a0e15]">

        <div className="container mx-auto px-6 max-w-7xl">

          <p className="text-center text-sm font-black uppercase tracking-[0.3em] text-gray-400 dark:text-[#8b949e] mb-12">
            Trusted By Industry Leaders & Certified By
          </p>


          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">

            {
              partner?.extra_data?.map((item, index) => (

                <div
                  key={item.key}
                  className="flex justify-center grayscale hover:grayscale-0 transition-all duration-500"
                >

                  <Image
                    src={`${IMAGE_URL}/${item.image}`}
                    alt={item.alt_text}
                    width={120}
                    height={60}
                    className="object-contain"
                  />

                </div>

              ))
            }

          </div>

        </div>

      </section>



      {/* ─── CTA SECTION WITH FORM ────────────────────────────────────── */}
      <section className="relative py-5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1565c0] to-[#1976d2]" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }} />

        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
              <Users className="w-4 h-4 text-white" />
              <span className="text-sm font-black uppercase tracking-[0.2em] text-white">
                Ready to Transform Your Operations?
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
              Partner With Us in
              <br />
              <span className="text-white/80">{industry.title}</span>
            </h2>

            <p className="text-white/80 text-base sm:text-xl mb-4 max-w-3xl mx-auto font-medium">
              Let's discuss how our expertise can help you achieve your goals in the {industry.title} industry.
            </p>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Button
                href="/contact"
                size="xl"
                className="bg-white text-[#1565c0] hover:bg-gray-100 border-none shadow-2xl shadow-black/20 px-5 py-3 text-sm sm:text-base font-black uppercase tracking-wider hover:scale-105 transition-all"
              >
                Schedule a Consultation
              </Button>
              <Button
                href="/services"
                variant="outline"
                size="xl"
                className="border-2 border-white text-white hover:bg-white hover:text-[#1565c0] px-5 py-3 text-sm sm:text-base font-black uppercase tracking-wider hover:scale-105 transition-all"
              >
                Download Capability Brochure
              </Button>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-8 mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white" />
                <span className="text-white/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white" />
                <span className="text-white/80">industry@kdsinternational.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-white" />
                <span className="text-white/80">Global Offices</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      <BlogSection data={Latest_insight} />
      <FAQSection faqs={FAQData} />
      {/* ─── RELATED INDUSTRIES ───────────────────────────────────────── */}
      {/* {relatedIndustries.length > 0 && (
        <section className="py-24">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
              <span className="text-[#1565c0] font-black text-sm uppercase tracking-[0.3em] mb-4 block">
                Explore More
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
                Related <span className="text-[#1565c0]">Industries</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-[#8b949e] max-w-3xl mx-auto">
                Discover our expertise in other industrial sectors
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedIndustries.map((relIndustry, idx) => {
                const RelatedIcon = getIndustryIcon(relIndustry.title);
                return (
                  <Link
                    key={relIndustry.id}
                    href={`/industries/${relIndustry.slug}`}
                    className="group bg-white dark:bg-transparent premium-glass p-8 rounded-2xl border border-gray-200 dark:border-white/5 hover:border-[#1565c0]/30 transition-all duration-500"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-[#1565c0]/10 group-hover:scale-110 transition-transform">
                        <RelatedIcon className="w-8 h-8 text-[#1565c0]" />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white group-hover:text-[#1565c0] transition-colors">
                        {relIndustry.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-[#8b949e] mb-6 line-clamp-2">
                      {relIndustry.description}
                    </p>
                    <div className="flex items-center gap-2 text-[#1565c0] font-bold group-hover:gap-3 transition-all">
                      Learn More <ChevronRight className="w-5 h-5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )} */}


    </main>
  );
}