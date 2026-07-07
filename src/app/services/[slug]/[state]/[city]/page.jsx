import { getByCity, getServerData } from "@/lib/data";
import { API_ENDPOINTS, IMAGE_URL } from "@/config/api";
import { notFound } from "next/navigation";
import {
  CheckCircle,
  ArrowRight,
  Info,
  Shield,
  Zap,
  Award,
  MapPin,
  ChevronRight,
  Building,
} from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Link from "next/link";
import SidebarEnquiryForm from "@/components/layout/SidebarEnquiryForm";

export const dynamic = "force-dynamic";

// ─── Metadata ──────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug, state, city } = await params;

  // Try to load dynamic data from API
  let apiData = null;
  try {
    const response = await getByCity(API_ENDPOINTS.SERVICES_CITY_SLUG, slug, state, city);
    if (response?.status) {
      apiData = response.data;
    }
  } catch (error) {
    console.error("Error fetching service city metadata:", error);
  }

  // Fallback to local data if needed
  const localData = await getServerData();
  const service = localData.services.find((s) => s.slug === slug);
  const stateData = service?.locations?.find((l) => l.state === state);
  const cityData = stateData?.cities?.find((c) => c.slug === city);

  if (!apiData && !service) return { title: "Service Not Found" };

  const title = apiData?.meta_title || (service && cityData ? `${service.title} in ${cityData.label}, ${stateData.stateLabel}` : `${slug} in ${city}`);
  const description = apiData?.meta_description || (service && cityData ? `Looking for ${service.title} in ${cityData.label}, ${stateData.stateLabel}? KDS International provides reliable and compliant manpower solutions across ${cityData.label}.` : "");
  const keywords = apiData?.meta_keyword || "";

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: `${title} | KDS International`,
      description,
    },
    other: {
      "script:type": typeof apiData?.meta_schema === "string"
        ? apiData.meta_schema
        : JSON.stringify(apiData?.meta_schema || []),
    },
  };
}

// ─── Page Component ─────────────────────────────────────────────────────────
export default async function ServiceLocationPage({ params }) {
  const { slug, state, city } = await params;
  const data = await getServerData();
  const service = data.services.find((s) => s.slug === slug);
  if (!service) notFound();

  // Fetch city-specific sections
  let cityDataApi = null;
  let sections = [];
  try {
    const cityResp = await getByCity(API_ENDPOINTS.SERVICES_CITY_SLUG, slug, state, city);
    if (cityResp?.status) {
      cityDataApi = cityResp.data;
      sections = cityResp.data.sections || [];
    }
    console.log("City sections fetched", sections.length);
  } catch (e) {
    console.error("City API fetch failed", e);
    // Fallback if needed
  }

  const stateData = service.locations?.find((l) => l.state === state);
  const cityData = stateData?.cities?.find((c) => c.slug === city);
  if (!stateData || !cityData) notFound();

  const cityLabel = cityData.label;
  const stateLabel = stateData.stateLabel;

  // Reduce/Map sections by their section_key for explicit extraction
  const sectionsMap = sections.reduce((acc, sec) => {
    if (sec.section_key) {
      acc[sec.section_key] = sec;
    }
    return acc;
  }, {});

  // Extract individual section data from their respective section keys
  const heroSec = sectionsMap.hero_section;
  const contentKeySec = sectionsMap.content_key;
  const precisionSec = sectionsMap.precision;
  const vettingSec = sectionsMap.vetting_section;
  const paraSec = sectionsMap.para;
  const coreCapabilitySec = sectionsMap.core_capability;
  const complianceSec = sectionsMap.compliance;
  const rapidSec = sectionsMap.rapid;
  const expertiseSec = sectionsMap.expertise;

  // Format Hero Section properties
  const displayTitle = heroSec?.title || `${service.title} in ${cityLabel}`;
  let mainTitle = displayTitle;
  let cityLabelText = cityLabel;
  if (displayTitle && /\s+in\s+/i.test(displayTitle)) {
    const parts = displayTitle.split(/\s+in\s+/i);
    mainTitle = parts[0];
    cityLabelText = parts[1];
  }

  const heroContent = heroSec?.content || `<p>“${service.shortDesc} — Serving ${cityLabel}, ${stateLabel} and surrounding areas.”</p>`;

  const otherServices = data.services.filter((s) => s.id !== service.id).slice(0, 3);

  // Other cities in the same state (excluding current)
  const otherCities = stateData.cities.filter((c) => c.slug !== city).slice(0, 4);

  // All states for cross-linking
  const allStates = service.locations || [];

  // Benefits List Mapping using extracted section keys
  const benefitsList = [
    {
      title: complianceSec?.title || "Global Compliance",
      desc: complianceSec?.content
        ? complianceSec.content.replace(/<[^>]*>/g, "")
        : "Adherence to international standards and local regulations.",
      icon: Shield,
    },
    {
      title: rapidSec?.title || "Rapid Execution",
      desc: rapidSec?.content
        ? rapidSec.content.replace(/<[^>]*>/g, "")
        : "Fast turnaround times without compromising on quality.",
      icon: Zap,
    },
    {
      title: expertiseSec?.title || "Certified Expertise",
      desc: expertiseSec?.content
        ? expertiseSec.content.replace(/<[^>]*>/g, "")
        : "Work handled by certified professionals and engineers.",
      icon: Award,
    },
  ];

  return (
    <main className="overflow-hidden bg-white dark:bg-[#0d1117] transition-colors duration-500">
      {cityDataApi?.meta_schema?.[0]?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: typeof cityDataApi.meta_schema[0].schema === "string"
              ? cityDataApi.meta_schema[0].schema
              : JSON.stringify(cityDataApi.meta_schema[0].schema)
          }}
        />
      )}

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative mt-5 pt-5 pb-5 hero-bg overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#1565c0]/10 glow-blob rounded-full blur-[120px]" />

        <div className="container mx-auto mt-5 px-6 max-w-7xl relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-3 flex-wrap animate-fade-in-up">
            <Link
              href="/services"
              className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1565c0] hover:opacity-70 transition-opacity"
            >
              Services
            </Link>
            <ChevronRight size={12} className="text-gray-400" />
            <Link
              href={`/services/${slug}`}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-[#8b949e] hover:text-[#1565c0] transition-colors"
            >
              {service.title}
            </Link>
            <ChevronRight size={12} className="text-gray-400" />
            <Link
              href={`/services/${slug}/${state}`}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-[#8b949e] hover:text-[#1565c0] transition-colors"
            >
              {stateLabel}
            </Link>
            <ChevronRight size={12} className="text-gray-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              {cityLabel}
            </span>
          </nav>

          {/* Location badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full premium-glass border-[#1565c0]/30 mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.05s" }}
          >
            <MapPin size={13} className="text-[#1565c0]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1565c0]">
              {cityLabel}, {stateLabel}
            </span>
          </div>

          <div
            className="max-w-4xl animate-fade-in-up transition-colors duration-500"
            style={{ animationDelay: "0.1s" }}
          >
            <h1
              className="text-5xl md:text-8xl font-black !text-gray-200 dark:text-white mb-8 leading-[0.9] tracking-tighter transition-colors duration-500"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {mainTitle} &nbsp;
              <span className="gradient-text">
                in {cityLabelText}
              </span>
            </h1>
            <div
              className="text-gray-300 dark:text-[#8b949e] text-lg md:text-2xl leading-relaxed max-w-3xl italic transition-colors duration-500 service-content-html"
              dangerouslySetInnerHTML={{ __html: heroContent }}
            />
          </div>
        </div>
      </section>

      {/* ─── CONTENT SECTION ─────────────────────────────────────────── */}
      <section className="section-padding relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
            {/* Main Content */}
            <div
              className="lg:col-span-2 space-y-20 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="space-y-12">
                {/* Location-specific overview */}
                <div className="bg-gray-50 dark:bg-transparent !premium-glass p-4 md:p-12 rounded-[3rem] border border-gray-200 dark:border-white/5 relative overflow-hidden transition-colors duration-500">
                  <SectionTitle
                    label="Local Scope"
                    title={contentKeySec?.title || `${service.title} in ${cityLabel}`}
                  />
                  {contentKeySec?.content ? (
                    <div
                      className="text-gray-600 dark:text-[#8b949e] text-xl leading-relaxed mt-8 transition-colors duration-500 italic border-l-4 border-[#1565c0] ps-3 py-2 dynamic-html"
                      dangerouslySetInnerHTML={{ __html: contentKeySec.content }}
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-[#8b949e] text-xl leading-relaxed mt-8 transition-colors duration-500 italic border-l-4 border-[#1565c0] ps-3 py-2">
                      {service.description} KDS International has been a trusted manpower partner
                      across {cityLabel} and the wider {stateLabel} region for over a decade.
                    </p>
                  )}
                </div>

                {/* Structured Dynamic Content sections */}
                {sections.length > 0 ? (
                  <>
                    {/* Precision Section */}
                    {precisionSec && (
                      <div className="space-y-6 pt-4">
                        {precisionSec.title && (
                          <h3
                            className="text-2xl font-black text-gray-900 dark:text-white tracking-tight pt-4"
                            style={{ fontFamily: "Outfit, sans-serif" }}
                          >
                            {precisionSec.title}
                          </h3>
                        )}
                        {precisionSec.content && (
                          <div
                            className="text-gray-600 dark:text-[#8b949e] text-lg leading-relaxed dynamic-section-html"
                            dangerouslySetInnerHTML={{ __html: precisionSec.content }}
                          />
                        )}
                      </div>
                    )}

                    {/* Vetting Section */}
                    {vettingSec && (
                      <div className="space-y-6 pt-4">
                        {vettingSec.title && (
                          <h3
                            className="text-2xl font-black text-gray-900 dark:text-white tracking-tight pt-4"
                            style={{ fontFamily: "Outfit, sans-serif" }}
                          >
                            {vettingSec.title}
                          </h3>
                        )}
                        {vettingSec.content && (
                          <div
                            className="text-gray-600 dark:text-[#8b949e] text-lg leading-relaxed dynamic-section-html"
                            dangerouslySetInnerHTML={{ __html: vettingSec.content }}
                          />
                        )}
                        {vettingSec.points && vettingSec.points.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            {vettingSec.points.map((pt, pIdx) => {
                              const ptText = typeof pt === "string" ? pt : pt.text || pt.point;
                              return (
                                <div
                                  key={pIdx}
                                  className="flex items-center gap-5 p-3 bg-white dark:bg-transparent premium-glass border border-gray-200 dark:border-white/5 rounded-2xl hover:border-[#1565c0]/40 dark:hover:border-[#1565c0]/40 transition-all group duration-500"
                                >
                                  <div className="w-10 h-10 rounded-xl bg-[#1565c0]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <CheckCircle size={20} className="text-[#1565c0]" />
                                  </div>
                                  <span className="text-gray-900 dark:text-white font-black uppercase tracking-widest text-[10px] transition-colors duration-500">
                                    {ptText}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Para Section */}
                    {paraSec && (
                      <div className="space-y-6 pt-4">
                        {paraSec.title && paraSec.title !== "para" && (
                          <h3
                            className="text-2xl font-black text-gray-900 dark:text-white tracking-tight pt-4"
                            style={{ fontFamily: "Outfit, sans-serif" }}
                          >
                            {paraSec.title}
                          </h3>
                        )}
                        {paraSec.content && (
                          <div
                            className="text-gray-600 dark:text-[#8b949e] text-lg leading-relaxed dynamic-section-html"
                            dangerouslySetInnerHTML={{ __html: paraSec.content }}
                          />
                        )}
                      </div>
                    )}

                    {/* Core Capabilities */}
                    {coreCapabilitySec && (
                      <div className="space-y-10 transition-colors duration-500 pt-6">
                        {coreCapabilitySec.title && (
                          <h3
                            className="text-2xl font-black text-gray-900 dark:text-white tracking-tight transition-colors duration-500 flex items-center gap-3 mb-3"
                            style={{ fontFamily: "Outfit, sans-serif" }}
                          >
                            <div className="w-8 h-[2px] bg-[#1565c0]/30" />
                            {coreCapabilitySec.title}
                          </h3>
                        )}
                        {coreCapabilitySec.content && (
                          <div
                            className="text-gray-600 dark:text-[#8b949e] text-lg leading-relaxed dynamic-section-html"
                            dangerouslySetInnerHTML={{ __html: coreCapabilitySec.content }}
                          />
                        )}
                        {coreCapabilitySec.points && coreCapabilitySec.points.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {coreCapabilitySec.points.map((pt, idx) => {
                              const ptText = typeof pt === "string" ? pt : pt.text || pt.point;
                              return (
                                <div
                                  key={idx}
                                  className="flex items-center gap-5 p-3 bg-white dark:bg-transparent premium-glass border border-gray-200 dark:border-white/5 rounded-2xl hover:border-[#1565c0]/40 dark:hover:border-[#1565c0]/40 transition-all group duration-500"
                                >
                                  <div className="w-10 h-10 rounded-xl bg-[#1565c0]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <CheckCircle size={20} className="text-[#1565c0]" />
                                  </div>
                                  <span className="text-gray-900 dark:text-white font-black uppercase tracking-widest text-[10px] transition-colors duration-500">
                                    {ptText}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {service.content &&
                      service.content.map((block, idx) => (
                        <div key={idx} className="space-y-6">
                          {block.type === "heading" && (
                            <h3
                              className="text-3xl font-black text-gray-900 dark:text-white tracking-tight pt-3"
                              style={{ fontFamily: "Outfit, sans-serif" }}
                            >
                              {block.text}
                            </h3>
                          )}
                          {block.type === "paragraph" && (
                            <p className="text-gray-600 dark:text-[#8b949e] text-lg leading-relaxed">
                              {block.text}
                            </p>
                          )}
                          {block.type === "takeaways" && (
                            <div className="my-4 p-3 bg-blue-50/50 dark:bg-[#161b22]/50 border border-[#1565c0]/10 rounded-[2rem] shadow-sm relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1565c0] blur-3xl" />
                              <h4 className="text-sm font-black text-[#1565c0] uppercase tracking-widest mb-6 border-b border-[#1565c0]/20 pb-4">
                                {block.heading || "Key Performance Metrics"}
                              </h4>
                              <ul className="space-y-4">
                                {block.items.map((item, i) => (
                                  <li key={i} className="flex gap-4 items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1565c0] mt-2 shrink-0 shadow-[0_0_8px_#1565c0]" />
                                    <p className="text-gray-700 dark:text-[#e6edf3] font-medium text-sm leading-relaxed">
                                      {item}
                                    </p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}

                    {/* Fallback Core Capabilities */}
                    <div className="space-y-10 transition-colors duration-500 pt-3">
                      <h3
                        className="text-2xl font-black text-gray-900 dark:text-white tracking-tight transition-colors duration-500 flex items-center gap-3 mb-3"
                        style={{ fontFamily: "Outfit, sans-serif" }}
                      >
                        <div className="w-8 h-[2px] bg-[#1565c0]/30" />
                        Core Capabilities in {cityLabel}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {service.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-5 p-3 bg-white dark:bg-transparent premium-glass border border-gray-200 dark:border-white/5 rounded-2xl hover:border-[#1565c0]/40 dark:hover:border-[#1565c0]/40 transition-all group duration-500"
                          >
                            <div className="w-10 h-10 rounded-xl bg-[#1565c0]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                              <CheckCircle size={20} className="text-[#1565c0]" />
                            </div>
                            <span className="text-gray-900 dark:text-white font-black uppercase tracking-widest text-[10px] transition-colors duration-500">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-4 border-t border-gray-200 dark:border-white/5 transition-colors duration-500">
                {benefitsList.map((benefit, idx) => (
                  <div key={idx} className="group">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-[#161b22] border border-gray-200 dark:border-white/5 flex items-center justify-center mb-3 group-hover:bg-[#1565c0] transition-all duration-500 shadow-xl">
                      <benefit.icon
                        className="text-[#1565c0] group-hover:text-white transition-colors"
                        size={28}
                      />
                    </div>
                    <h4
                      className="text-gray-900 dark:text-white font-black mb-3 tracking-tight uppercase text-sm transition-colors duration-500"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600 dark:text-[#8b949e] text-sm leading-relaxed transition-colors duration-500">
                      {benefit.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Nearby Cities */}
              {otherCities.length > 0 && (
                <div className="pt-4 border-t border-gray-200 dark:border-white/5 transition-colors duration-500">
                  <h3
                    className="text-xl font-black text-gray-900 dark:text-white tracking-tight mb-4 flex items-center gap-3"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    <MapPin size={18} className="text-[#1565c0]" />
                    Also Serving in {stateLabel}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {otherCities.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/services/${slug}/${state}/${c.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-200 dark:border-white/10 text-gray-600 dark:text-[#8b949e] text-xs font-bold uppercase tracking-wider hover:border-[#1565c0] hover:text-[#1565c0] transition-all"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside
              className="space-y-12 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              {/* City Image */}
              {cityDataApi?.image && (
                <div className="bg-gray-200 dark:bg-[#161b22] border border-gray-300 dark:border-white/5 rounded-3xl overflow-hidden shadow-xl">
                  <img
                    src={`${IMAGE_URL}/${cityDataApi.image}`}
                    alt={cityDataApi.alt_text || cityLabel}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* All States */}
              <div className="bg-gray-50 dark:bg-transparent !premium-glass p-4 mb-3 rounded-[2.5rem] border border-gray-200 dark:border-white/5 transition-colors duration-500">
                <h3 className="text-gray-900 dark:text-white font-black text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-2 transition-colors duration-500">
                  <MapPin size={14} className="text-[#1565c0]" />
                  Other Regions
                </h3>
                <div className="space-y-3">
                  {allStates.map((loc) => (
                    <div key={loc.state}>
                      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#1565c0] mb-2">
                        {loc.stateLabel}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {loc.cities.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/services/${slug}/${loc.state}/${c.slug}`}
                            className={`text-[10px] font-bold px-3 py-2 rounded-full border transition-all ${c.slug === city && loc.state === state
                              ? "bg-[#1565c0] border-[#1565c0] text-white"
                              : "border-gray-200 dark:border-white/10 text-gray-600 dark:text-[#8b949e] hover:border-[#1565c0] hover:text-[#1565c0]"
                              }`}
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Services */}
              <div className="bg-gray-50 dark:bg-transparent !premium-glass p-4 mb-3 rounded-[2.5rem] border border-gray-200 dark:border-white/5 transition-colors duration-500">
                <h3 className="text-gray-900 dark:text-white font-black text-xs uppercase tracking-[0.3em] mb-10 flex items-center gap-3 transition-colors duration-500">
                  <Info size={16} className="text-[#1565c0]" /> Related Verticals
                </h3>
                <div className="space-y-4">
                  {otherServices.map((s) => (
                    <Link
                      key={s.id}
                      href={`/services/${s.slug}`}
                      className="flex items-center justify-between group p-3 mb-3 rounded-2xl border border-transparent hover:border-[#1565c0]/20 hover:bg-[#1565c0]/5 transition-all"
                    >
                      <span className="text-gray-600 dark:text-[#8b949e] font-bold text-sm group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-500">
                        {s.title}
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-[#1565c0] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                      />
                    </Link>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/5 text-center transition-colors duration-500">
                  <Link
                    href="/services"
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1565c0] hover:text-gray-900 dark:hover:text-white transition-colors duration-500"
                  >
                    View Capability Map
                  </Link>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-[#1565c0] to-[#0d47a1] rounded-[2.5rem] p-4 text-center shadow-2xl shadow-[#1565c0]/30 relative overflow-hidden group">
                <div className="absolute inset-0 hero-grid opacity-20" />
                <div className="relative z-10">
                  <h3
                    className="text-3xl font-black text-white mb-6 tracking-tighter"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    Need Manpower in {cityLabel}?
                  </h3>
                  <p className="text-white/80 mb-10 text-sm leading-relaxed font-medium italic">
                    &ldquo;Our teams in {cityLabel} are ready to deploy skilled workers
                    within 24–48 hours of project approval.&rdquo;
                  </p>
                  <Button
                    href="/contact"
                    className="w-full py-2 bg-white text-[#1565c0] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white border-none shadow-2xl transition-all scale-105"
                  >
                    Get Fast-Track Quote
                  </Button>
                  <p className="text-white/40 text-[9px] mt-3 uppercase font-black tracking-widest">
                    Serving {cityLabel} &amp; {stateLabel}
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="relative lg:sticky lg:top-28 w-full max-w-[500px] mx-auto mb-8">
                <SidebarEnquiryForm serviceTitle={service.title} />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 bg-white dark:bg-[#0d1117] border-t border-gray-200 dark:border-white/5 transition-colors duration-500" />
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <h2
            className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white mb-10 tracking-tighter transition-colors duration-500"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Your Trusted Partner <br />
            <span className="text-[#1565c0]">in {cityLabel}.</span>
          </h2>
          <p className="text-gray-600 dark:text-[#8b949e] text-xl mb-12 max-w-2xl mx-auto italic transition-colors duration-500">
            Partner with KDS International for mission-critical manpower solutions
            across {cityLabel}, {stateLabel} — with full compliance and zero disruption.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button
              href="/contact"
              size="lg"
              className="bg-gray-900 dark:bg-[#0d1117] text-white hover:bg-black border-none shadow-2xl transition-colors duration-500"
            >
              Start Your Mission
            </Button>
            <Button
              href="/about"
              variant="outline"
              size="lg"
              className="border-gray-300 dark:border-white text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white dark:hover:text-[#0d1117] transition-colors duration-500"
            >
              Explore Our History
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
