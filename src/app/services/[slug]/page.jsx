// app/services/[slug]/page.jsx
import { getServerData } from "@/lib/data";
import { notFound } from "next/navigation";
import ServiceHero from "@/components/ui/ServiceHero";
import { API_ENDPOINTS } from "@/config/api";
import { getBySlug, getData } from "@/lib/data";
import { IMAGE_URL } from "@/config/api";
import FAQSection from '@/components/common/FAQ';
import BlogSection from "@/components/ui/BlogSection";
import {
  CheckCircle,
  ArrowRight,
  Info,
  Shield,
  Zap,
  Award,
  User,
  Mail,
  Phone,
  Globe,
  MessageSquare,
  MapPin,
} from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Link from "next/link";
import ServiceCard from "@/components/ui/ServiceCard";
import SubServiceCard from "@/components/ui/SubServiceCard";
import ServiceDetailLocationTabs from "@/components/ui/ServiceDetailLocationTabs";
import HeroBanner from "@/components/ui/heroBanner";
import Keyfeature from "@/components/common/keyfeature/Keyfeature";
import Benefits from "@/components/common/benefit/Benefits";
import SidebarEnquiryForm from "@/components/layout/SidebarEnquiryForm";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  try {
    const response = await getBySlug(API_ENDPOINTS.SERVICES_SLUG, slug);
    const serviceData = response?.data;

    // Load fallback data from getServerData
    const localData = await getServerData();
    const localService = localData.services?.find((s) => s.slug === slug);

    if (!serviceData && !localService) {
      return { title: "Service Not Found | KDS International" };
    }

    const title = serviceData?.title || localService?.title || slug;
    const metaTitle = serviceData?.meta_title || localService?.meta_title || `${title} | KDS International`;
    const metaDescription = serviceData?.meta_description || localService?.meta_description || localService?.shortDesc || "";
    const metaKeyword = serviceData?.meta_keyword || localService?.meta_keyword || `${title}, manpower services, staffing solutions`;
    const imagePath = serviceData?.image || localService?.image || "/services/og-default.jpg";
    const metaRobot = serviceData?.canonical_tag;
    const imageUrl = imagePath.startsWith("http")
      ? imagePath
      : imagePath.startsWith("/")
        ? `${IMAGE_URL}${imagePath}`
        : `${IMAGE_URL}/${imagePath}`;

    return {
      title: metaTitle,
      description: metaDescription,
      keywords: metaKeyword,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        images: [{ url: imageUrl }],
      },
      alternates: {
        canonical: metaRobot,
      },
      robots: serviceData?.meta_robots_tag,
      other: {
        "script:type": typeof serviceData?.meta_schema === "string"
          ? serviceData.meta_schema
          : JSON.stringify(serviceData?.meta_schema || []),
      },
    };
  } catch (error) {
    console.error("Error generating service metadata:", error);
    return { title: "Service Solutions | KDS International" };
  }
}

// export async function generateStaticParams() {
//   try {
//     const data = await getServerData();
//     console.log("generateStaticParams - generating for slugs:", data.services.map(s => s.slug));
//     return data.services.map((service) => ({
//       slug: service.slug,
//     }));
//   } catch (error) {
//     console.error("Error generating static params:", error);
//     return [];
//   }
// }

export default async function ServiceDetailPage({ params }) {

  try {

    const { slug } = await params;


    const response = await getBySlug(API_ENDPOINTS.SERVICES_SLUG, slug);
    const FAQData = await getData(API_ENDPOINTS.FAQ);

    // Fetch live blogs from new API
    let blogsRes;
    try {
      blogsRes = await getData(API_ENDPOINTS.BLOGS_LIST);
    } catch (error) {
      console.error("Error fetching live blogs for services slug page:", error);
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

    const sections = response.data.sections.reduce(
      (acc, section) => {
        acc[section.section_key] = section;
        return acc;
      },
      {}
    );


    const hero_section = sections.hero_section;
    const content = sections.content_key;
    const top_security = sections.top_security;
    const benefit = sections.benefits;
    const advantage = sections.Advantage
    const security_management = sections.security_management;
    const professional_trained = sections.professional_trained;
    const related = sections.related_service;
    const stats = sections.why_choose;
    const needService = sections.need_service;
    const needManpower = sections.Need_manpower;


    const locations = (response.data.states || []).map((stateItem) => ({
      state: stateItem.state?.slug || stateItem.slug,
      stateLabel: stateItem.state?.name || stateItem.title,
      cities: (stateItem.cities || []).map((cityItem) => ({
        slug: cityItem.city?.slug || cityItem.slug,
        label: cityItem.city?.name || cityItem.alt_text || ""
      }))
    }));

    const service = {
      title: hero_section?.title || "",
      slug: slug,
      locations: locations
    };



    const tableContents = [
      { id: "overview", label: "Overview" },
      { id: "features", label: "Key Features" },
      { id: "benefits", label: "Benefits" },
      { id: "content", label: "Detailed Info" },
      { id: "locations", label: "Locations" },
    ];

    return (
      <main className="scroll-smooth overflow-x-clip bg-white dark:bg-[#0d1117] transition-colors duration-500">
        {response.data?.meta_schema?.[0]?.schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: typeof response.data.meta_schema[0].schema === "string"
                ? response.data.meta_schema[0].schema
                : JSON.stringify(response.data.meta_schema[0].schema)
            }}
          />
        )}

        <ServiceHero service={hero_section} />



        {/* ─── CONTENT SECTION ─────────────────────────────────────────── */}
        <section className=" relative  flex flex-row mt-16 lg:mt-16">

          {/* table of contents */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-28">

              {/* Wrapper */}
              <div className=" p-4  ">

                {/* Items */}
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
              <div className="mx-4 mt-6 p-2 rounded-2xl bg-gradient-to-br from-[#0d47a1] to-[#1565c0] text-white shadow-xl relative overflow-hidden group">

                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

                <div className="relative z-10">

                  <h4 className="font-black text-lg mb-2">
                    {needManpower?.title}
                  </h4>

                  <p className="text-white/80 text-xs leading-relaxed mb-4">
                    {needManpower?.subtitle}
                  </p>

                  <Link
                    href={needManpower?.url_path || "/contact"}
                    className="inline-flex items-center justify-center gap-2 w-full py-2 bg-white text-[#1565c0] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-blue-50 transition-colors duration-300 active:scale-95 shadow-lg shadow-[#0d47a1]/20"
                  >

                    <Phone size={12} />

                    <span>
                      {needManpower?.description
                        ?.replace(/<[^>]*>/g, "") || "Talk to Expert"}
                    </span>

                  </Link>

                </div>

              </div>

            </div>
          </div>

          <div className="container mx-auto my-2.5 px-6 max-w-7xl ">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">


              {/* Main Content */}
              <div
                className="lg:col-span-2 space-y-12 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                {/* Description */}
                <div id="overview" className="scroll-mt-28 bg-white dark:bg-transparent premium-glass p-4 md:p-3 rounded-[2rem] border border-gray-200 dark:border-white/5 relative overflow-hidden transition-colors duration-500">
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                    {top_security.title}
                  </h2>
                  <p className="text-gray-600 dark:text-[#8b949e] text-lg leading-relaxed transition-colors duration-500">
                    {top_security.description.replace(/<[^>]*>/g, "")}
                  </p>


                </div>

                {/* Features */}

                <Keyfeature data={content} />


                <Benefits data={benefit} />

                {security_management && (
                  <section id="security-management" className="my-16">
                    {/* Heading */}
                    <div className="max-w-3xl mb-12">
                      <span className="inline-flex items-center px-4 py-1 rounded-full bg-[#1565c0]/10 text-[#1565c0] text-sm font-semibold mb-4">
                        Our Process
                      </span>

                      <h2
                        className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white"
                        style={{ fontFamily: "Outfit, sans-serif" }}
                      >
                        {security_management.title}
                      </h2>

                      {security_management.subtitle && (
                        <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-[#8b949e]">
                          {security_management.subtitle
                            ?.replace(/<[^>]*>/g, "")
                            ?.replace(/&nbsp;/g, " ")
                            ?.trim()}
                        </p>
                      )}
                    </div>

                    {/* Process */}
                    <div className="relative">
                      {/* Vertical Line */}
                      <div className="hidden md:block absolute left-6 top-0 bottom-0 w-[2px] bg-gray-200 dark:bg-gray-700"></div>

                      <div className="space-y-8">
                        {security_management.extra_data?.map((item, index) => (
                          <div
                            key={index}
                            className="relative flex gap-6 group"
                          >
                            {/* Step */}
                            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1565c0] text-white font-bold shadow-lg">
                              {String(index + 1).padStart(2, "0")}
                            </div>

                            {/* Card */}
                            <div className="flex-1 rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#161b22] !p-3 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                {item.key}
                              </h4>

                              <p className="text-gray-600 dark:text-[#8b949e] leading-7">
                                {item.value
                                  ?.replace(/<[^>]*>/g, "")
                                  ?.replace(/&nbsp;/g, " ")
                                  ?.trim()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}
                {professional_trained && (
                  <section id="professional-trained" className="my-16">
                    {/* Heading */}
                    <div className="max-w-3xl mb-10">
                      <h2
                        className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4"
                        style={{ fontFamily: "Outfit, sans-serif" }}
                      >
                        {professional_trained.title}
                      </h2>

                      {professional_trained.subtitle && (
                        <p className="text-lg text-gray-600 dark:text-[#8b949e] leading-8">
                          {professional_trained.subtitle
                            ?.replace(/<[^>]*>/g, "")
                            ?.replace(/&nbsp;/g, " ")
                            ?.trim()}
                        </p>
                      )}

                      {professional_trained.description && (
                        <p className="mt-6 text-lg font-semibold text-[#1565c0]">
                          {professional_trained.description
                            ?.replace(/<[^>]*>/g, "")
                            ?.replace(/&nbsp;/g, " ")
                            ?.trim()}
                        </p>
                      )}
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {professional_trained.extra_data?.map((item, index) => (
                        <div
                          key={index}
                          className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#161b22] !p-4 hover:border-[#1565c0] hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <div className="h-10 w-10 rounded-full bg-[#4172ae] text-white flex items-center justify-center font-bold">
                              {index + 1}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {item.key?.trim()}
                            </h3>
                          </div>

                          <p className="text-gray-600 dark:text-[#8b949e] leading-7">
                            {item.value
                              ?.replace(/<[^>]*>/g, "")
                              ?.replace(/&nbsp;/g, " ")
                              ?.trim()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Content Sections from the service.content array */}
                {advantage && (
                  <div
                    id="content"
                    className="scroll-mt-28 my-4 pt-3 border-t border-gray-200 dark:border-white/5"
                  >

                    {/* Title */}
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                      {advantage.title}
                    </h3>


                    {/* Subtitle */}
                    {advantage.subtitle && (
                      <p className="text-gray-600 dark:text-[#8b949e] leading-relaxed mt-2">
                        {advantage.subtitle}
                      </p>
                    )}


                    {/* Pointer Box */}
                    {advantage?.extra_data?.map((item, idx) => (
                      <div
                        key={item.key}
                        className="bg-[#1565c0]/5 p-4 my-4 rounded-2xl border border-[#1565c0]/10"
                      >

                        <h4 className="font-black text-gray-900 dark:text-white mb-4">
                          {item.key}
                        </h4>

                        <ul className="my-3 ps-1">

                          {item.points?.map((pointer, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 my-3"
                            >

                              <CheckCircle
                                size={18}
                                className="text-[#1565c0] shrink-0 mt-0.5"
                              />

                              <span className="text-gray-600 dark:text-gray-400 text-sm">
                                {pointer.point}
                              </span>

                            </li>
                          ))}

                        </ul>

                      </div>
                    ))}

                    {/* Description */}
                    {advantage.description && (
                      <p className="text-gray-600 dark:text-[#8b949e] leading-relaxed">
                        {advantage.description.replace(/<[^>]*>/g, "")}
                      </p>
                    )}

                  </div>
                )}

              </div>

              {/* Sidebar */}
              <aside
                className="space-y-8 animate-fade-in-up"
                style={{ animationDelay: "0.3s" }}
              >

                {/* blog image */}
                <div className="bg-gray-200 dark:bg-[#161b22] border border-gray-300 dark:border-white/5 rounded-3xl overflow-hidden">
                  <img
                    src={`${IMAGE_URL}/${related.image}`}
                    alt={related.alt_text}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Related Services */}

                <div className="bg-white dark:bg-transparent premium-glass p-4 rounded-[2rem] border border-gray-200 dark:border-white/5">
                  <h3 className="text-gray-900 dark:text-white font-black text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                    <Info size={16} className="text-[#1565c0]" />
                    {related.title}
                  </h3>
                  <div className="my-3">
                    {related.extra_data.map((s) => (
                      <Link
                        key={s.key}
                        href={`/services/${s.url_path}`}
                        className="flex items-center justify-between group p-3 mb-3  rounded-xl border border-transparent hover:border-[#1565c0]/20 hover:bg-[#1565c0]/5 transition-all"
                      >
                        <span className="text-gray-700 dark:text-gray-300 font-medium text-sm group-hover:text-gray-900 dark:group-hover:text-white">
                          {s.key}
                        </span>
                        <ArrowRight
                          size={16}
                          className="text-[#1565c0] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                        />
                      </Link>
                    ))}
                  </div>
                </div>


                {/* Quick Stats */}
                <div className="bg-gradient-to-br from-[#1565c0] to-[#0d47a1] rounded-[2rem] p-4 text-white mt-4">

                  <h3 className="text-xl font-black mb-4">
                    {stats.title}
                  </h3>

                  <div className="space-y-4">

                    {stats?.extra_data?.slice(0, 3).map((stat, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center border-b border-white/20 py-3 last:border-0"
                      >

                        <span className="text-white/80 text-sm">
                          {stat.key}
                        </span>

                        <span className="font-black text-lg">
                          {stat.value}
                        </span>

                      </div>
                    ))}

                  </div>

                </div>

                {/* CTA */}
                <div className="bg-gray-900 dark:bg-[#0d1117] rounded-[2rem] p-4 text-center border border-gray-200 dark:border-white/5 mt-4">

                  <h3 className="text-xl font-black text-white mb-3">
                    {needService?.title}
                  </h3>

                  <p className="text-gray-200 text-sm mb-3">
                    {needService?.subtitle}
                  </p>

                  <Button
                    href={needService?.url_path || "/contact"}
                    className="w-full bg-[#1565c0] text-white hover:bg-[#0d47a1] border-none"
                  >
                    {needService?.description?.replace(/<[^>]*>/g, "") || "Request Quote"}
                  </Button>

                </div>

                {/* Form */}
                <div className="relative lg:sticky lg:top-28 w-full max-w-[500px] mx-auto mb-8">
                  <SidebarEnquiryForm serviceTitle={service.title} />
                </div>
              </aside>
            </div>

            {/* ─── LOCATIONS WE SERVE ───────────────────────────────────────── */}
            {service.locations && service.locations.length > 0 && (
              <section id="locations" className="scroll-mt-28 bg-gray-50 dark:bg-[#161b22]/30 relative overflow-hidden transition-colors duration-500 p-4 rounded">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#1565c0]/5 to-transparent pointer-events-none" />
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                  <div className="mb-3 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 mb-4">
                      <MapPin size={14} className="text-[#1565c0]" />
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1565c0]">
                        Service Locations
                      </span>
                    </div>
                    <h2
                      className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-4 transition-colors duration-500"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      Where We Serve —{" "}
                      <span className="text-[#1565c0]">
                        {service.locations.map((l) => l.stateLabel).join(", ")}
                      </span>
                    </h2>
                    <p className="text-gray-600 dark:text-[#8b949e] text-lg max-w-2xl leading-relaxed transition-colors duration-500">
                      KDS International provides <strong className="text-gray-900 dark:text-white">{service.title}</strong> across
                      multiple states and cities. Select your state and city to get
                      location-specific details.
                    </p>
                  </div>
                  <ServiceDetailLocationTabs service={service} />
                </div>
              </section>
            )}


          </div>

        </section>
        <BlogSection data={Latest_insight} />
        <FAQSection faqs={FAQData} />
      </main>
    );
  } catch (error) {
    console.error("Error loading service:", error);
    notFound();
  }
}