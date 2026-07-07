import { getByState, getServerData } from "@/lib/data";
import { API_ENDPOINTS } from "@/config/api";
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
  const { slug, state } = await params;

  // Try to load dynamic data from API
  let apiData = null;
  try {
    const response = await getByState(API_ENDPOINTS.SERVICES_DETAIL_SLUG, slug, state);
    if (response?.status) {
      apiData = response.data;
    }
  } catch (error) {
    console.error("Error fetching service state metadata:", error);
  }

  // Fallback to local data if needed
  const localData = await getServerData();
  const service = localData.services.find((s) => s.slug === slug);
  const stateData = service?.locations?.find((l) => l.state === state);

  if (!apiData && !service) return { title: "Service Not Found" };

  const title = apiData?.meta_title || (apiData?.title) || (service && stateData ? `${service.title} in ${stateData.stateLabel}` : `${slug} in ${state}`);
  const description = apiData?.meta_description || (service && stateData ? `KDS International provides trusted ${service.title} across ${stateData.stateLabel}. We serve ${stateData.cities.map((c) => c.label).join(", ")} and surrounding areas with fully compliant manpower solutions.` : "");
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

// ─── Static Params ─────────────────────────────────────────────────────────
// export async function generateStaticParams() {
//   const data = await getServerData();
//   const params = [];
// 
//   for (const service of data.services) {
//     if (!service.locations) continue;
//     for (const loc of service.locations) {
//       params.push({ slug: service.slug, state: loc.state });
//     }
//   }
// 
//   return params;
// }

// ─── Page Component ─────────────────────────────────────────────────────────
export default async function ServiceStatePage({ params }) {
  const { slug, state } = await params;

  // Fetch API data
  let serviceData = null;
  try {
    const response = await getByState(API_ENDPOINTS.SERVICES_DETAIL_SLUG, slug, state);
    console.log("statewise", response)
    if (response?.status) {
      serviceData = response.data;
    }
  } catch (error) {
    console.error("Error fetching service state from API:", error);
  }

  // Load local data as fallback
  const localData = await getServerData();
  const service = localData.services.find((s) => s.slug === slug);

  if (!serviceData && !service) notFound();

  const stateData = service?.locations?.find((l) => l.state === state);
  if (!serviceData && !stateData) notFound();

  // Other services & states from local fallback
  const otherServices = service
    ? localData.services.filter((s) => s.id !== service.id).slice(0, 3)
    : [];
  const otherStates = service && service.locations
    ? service.locations.filter((l) => l.state !== state)
    : [];

  // Determine title text
  const displayTitle = serviceData?.title || (service ? `${service.title} in ${stateData?.stateLabel || state}` : `${slug} in ${state}`);
  let mainTitle = displayTitle;
  let stateLabel = stateData?.stateLabel || state;
  if (displayTitle && /\s+in\s+/i.test(displayTitle)) {
    const parts = displayTitle.split(/\s+in\s+/i);
    mainTitle = parts[0];
    stateLabel = parts[1];
  }

  // Cities mapping
  const cities = serviceData?.cities && serviceData.cities.length > 0
    ? serviceData.cities.map((c) => ({
      slug: c.city?.slug || c.slug,
      label: c.city?.name || c.alt_text || c.slug,
    }))
    : (stateData?.cities || []).map((c) => ({
      slug: c.slug,
      label: c.label,
    }));

  // Benefits mapping from sections or fallback
  const benefitSections = (serviceData?.sections || []).filter(s =>
    s.title === "State-Wide Coverage" ||
    s.title === "Rapid Deployment" ||
    s.title === "Local Compliance"
  );

  const benefitsList = benefitSections.length > 0
    ? benefitSections.map((sec) => {
      let icon = Shield;
      if (sec.title === "Rapid Deployment") icon = Zap;
      if (sec.title === "Local Compliance") icon = Award;
      return {
        title: sec.title,
        desc: sec.content ? sec.content.replace(/<[^>]*>/g, "") : "",
        icon: icon,
      };
    })
    : [
      {
        title: "State-Wide Coverage",
        desc: `Full manpower coverage across all major districts of ${stateLabel}.`,
        icon: Shield,
      },
      {
        title: "Rapid Deployment",
        desc: "Workers mobilised within 24–48 hours anywhere in the state.",
        icon: Zap,
      },
      {
        title: "Local Compliance",
        desc: `All statutory obligations met per ${stateLabel} labour regulations.`,
        icon: Award,
      },
    ];

  return (
    <main className="overflow-hidden bg-white dark:bg-[#0d1117] transition-colors duration-500">
      {serviceData?.meta_schema?.[0]?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: typeof serviceData.meta_schema[0].schema === "string"
              ? serviceData.meta_schema[0].schema
              : JSON.stringify(serviceData.meta_schema[0].schema)
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
              className="text-[10px] font-black uppercase tracking-[0.2em] text-[#000000] hover:opacity-70 transition-opacity"
            >
              Services
            </Link>
            <ChevronRight size={12} className="text-gray-400" />
            <Link
              href={`/services/${slug}`}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-[#8b949e] hover:text-[#1565c0] transition-colors"
            >
              {service?.title || slug}
            </Link>
            <ChevronRight size={12} className="text-gray-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              {/* {hero_above.} */}
            </span>
          </nav>

          {/* State badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full premium-glass border-[#1565c0]/30 mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.05s" }}
          >
            <MapPin size={13} className="text-[#1565c0]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1565c0]">
              {stateLabel}, India
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
              <span className="gradient-text">in {stateLabel}</span>
            </h1>
            {serviceData?.content ? (
              <div
                className="text-gray-300 dark:text-[#8b949e] text-lg md:text-2xl leading-relaxed max-w-3xl italic transition-colors duration-500 service-content-html"
                dangerouslySetInnerHTML={{ __html: serviceData.content }}
              />
            ) : (
              <p className="text-gray-300 dark:text-[#8b949e] text-lg md:text-2xl leading-relaxed max-w-3xl italic transition-colors duration-500">
                &ldquo;{service?.shortDesc || ""} — Available across{" "}
                {cities.map((c) => c.label).join(", ")} and nearby areas.&rdquo;
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ─── CITY CARDS ──────────────────────────────────────────────────── */}
      <section className="py-4 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-12 animate-fade-in-up">
            <SectionTitle
              label="Locations"
              title={`Cities We Serve in ${stateLabel}`}
            />
            <p className="text-gray-600 dark:text-[#8b949e] text-lg mt-4 max-w-2xl">
              Select a city to view tailored{" "}
              <strong>{service?.title || slug}</strong> solutions specific to your area.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-3 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            {cities.map((cityObj, idx) => (
              <Link
                key={cityObj.slug}
                href={`/services/${slug}/${state}/${cityObj.slug}`}
                className="group flex flex-col items-center p-3 bg-white dark:bg-transparent premium-glass border border-gray-200 dark:border-white/5 rounded-[2rem] hover:border-[#1565c0]/50 hover:shadow-xl hover:shadow-[#1565c0]/5 transition-all duration-500"
                style={{ animationDelay: `${0.05 * idx}s` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#1565c0]/10 flex items-center justify-center group-hover:bg-[#1565c0] transition-all duration-500">
                  <Building
                    size={22}
                    className="text-[#1565c0] group-hover:text-white transition-colors"
                  />
                </div>
                <div className="text-center mt-3">
                  <p className="font-black text-gray-900 dark:text-white text-sm tracking-tight group-hover:text-[#1565c0] transition-colors">
                    {cityObj.label}
                  </p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-0">
                    {stateLabel}
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className="text-[#1565c0] opacity-0 hover:opacity-100 group-hover:translate-x-1 transition-all"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTENT SECTION ─────────────────────────────────────────── */}
      <section className="section-padding relative pt-0">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
            {/* Main Content */}
            <div
              className="lg:col-span-2 space-y-20 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="space-y-12">
                {/* State-specific overview */}
                <div className=" dark:bg-transparent  p-4 md:p-12 rounded-[3rem] border border-gray-200 dark:border-white/5 relative overflow-hidden transition-colors duration-500">
                  <SectionTitle
                    label="State Coverage"
                    title={
                      serviceData?.sections?.[0]?.title ||
                      (service ? `${service.title} across ${stateLabel}` : `Coverage across ${stateLabel}`)
                    }
                  />
                  {serviceData?.sections?.[0]?.content ? (
                    <div
                      className="text-gray-600 dark:text-[#8b949e] text-xl leading-relaxed mt-3 transition-colors duration-500 italic border-l-4 border-[#1565c0] ps-3 py-2 dynamic-html"
                      dangerouslySetInnerHTML={{ __html: serviceData.sections[0].content }}
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-[#8b949e] text-xl leading-relaxed mt-3 transition-colors duration-500 italic border-l-4 border-[#1565c0] ps-3 py-2">
                      {service?.description || ""} We have an established presence across{" "}
                      {stateLabel}, with dedicated teams ready to serve businesses of all sizes.
                    </p>
                  )}
                </div>

                {/* Structured Content & Core Capabilities */}
                {serviceData?.sections ? (
                  serviceData.sections.slice(1).map((sec, idx) => {
                    // Skip benefit sections
                    if (
                      sec.title === "State-Wide Coverage" ||
                      sec.title === "Rapid Deployment" ||
                      sec.title === "Local Compliance"
                    ) {
                      return null;
                    }

                    return (
                      <div key={sec.id || idx} className="space-y-6 pt-4">
                        {sec.title && (
                          <h3
                            className="text-2xl font-black text-gray-900 dark:text-white tracking-tight pt-4"
                            style={{ fontFamily: "Outfit, sans-serif" }}
                          >
                            {sec.title}
                          </h3>
                        )}

                        {sec.content && (
                          <div
                            className="text-gray-600 dark:text-[#8b949e] text-lg leading-relaxed dynamic-section-html"
                            dangerouslySetInnerHTML={{ __html: sec.content }}
                          />
                        )}

                        {sec.points && sec.points.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            {sec.points.map((pt, pIdx) => (
                              <div
                                key={pIdx}
                                className="flex items-center gap-5 p-3 bg-white dark:bg-transparent premium-glass border border-gray-200 dark:border-white/5 rounded-2xl hover:border-[#1565c0]/40 dark:hover:border-[#1565c0]/40 transition-all group duration-500"
                              >
                                <div className="w-10 h-10 rounded-xl bg-[#1565c0]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                  <CheckCircle size={20} className="text-[#1565c0]" />
                                </div>
                                <span className="text-gray-900 dark:text-white font-black uppercase tracking-widest text-[10px] transition-colors duration-500">
                                  {pt.text || pt}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <>
                    {service?.content &&
                      service.content.map((block, idx) => (
                        <div key={idx} className="my-3">
                          {block.type === "heading" && (
                            <h3
                              className="text-3xl font-black text-gray-900 dark:text-white tracking-tight pt-8"
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
                            <div className="my-10 p-3 bg-blue-50/50 dark:bg-[#161b22]/50 border border-[#1565c0]/10 rounded-[2rem] shadow-sm relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1565c0]/5 blur-3xl" />
                              <h4 className="text-sm font-black text-[#1565c0] uppercase tracking-widest mb-6 border-b border-[#1565c0]/20 pb-4">
                                {block.heading || "Key Performance Metrics"}
                              </h4>
                              <ul className="space-y-4 my-3">
                                {block.items.map((item, i) => (
                                  <li key={i} className="flex gap-4 items-start py-2">
                                    <div className="w-1.5 h-1.5 mt-2 rounded-full bg-[#1565c0] shrink-0 shadow-[0_0_8px_#1565c0]" />
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

                    {service?.features && (
                      <div className="space-y-10 transition-colors duration-500 pt-4">
                        <h3
                          className="text-2xl font-black text-gray-900 dark:text-white tracking-tight transition-colors duration-500 flex items-center gap-3"
                          style={{ fontFamily: "Outfit, sans-serif" }}
                        >
                          <div className="w-8 h-[2px] bg-[#1565c0]/30" />
                          Core Capabilities
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
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
                    )}
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
            </div>

            {/* Sidebar */}
            <aside
              className="space-y-12 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              {/* Quick City Links */}
              <div className="bg-gray-50 dark:bg-transparent !premium-glass p-4 rounded-[2.5rem] border border-gray-200 dark:border-white/5 transition-colors duration-500 mb-3">
                <h3 className="text-gray-900 dark:text-white font-black text-xs uppercase tracking-[0.3em] mb-3 flex items-top gap-2 transition-colors duration-500">
                  <Building size={32} className="text-[#1565c0] mt-1" />
                  Cities in {stateLabel}
                </h3>
                <div className="space-y-2">
                  {cities.map((cityObj) => (
                    <Link
                      key={cityObj.slug}
                      href={`/services/${slug}/${state}/${cityObj.slug}`}
                      className="flex items-center justify-between group p-4 mb-3 rounded-2xl border border-transparent hover:border-[#1565c0]/20 hover:bg-[#1565c0]/5 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin size={12} className="text-[#1565c0] shrink-0" />
                        <span className="text-gray-600 dark:text-[#8b949e] font-bold text-sm group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                          {cityObj.label}
                        </span>
                      </div>
                      <ArrowRight
                        size={14}
                        className="text-[#1565c0] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                      />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other States */}
              {otherStates.length > 0 && (
                <div className="bg-gray-50 dark:bg-transparent !premium-glass p-4 mb-3 rounded-[2.5rem] border border-gray-200 dark:border-white/5 transition-colors duration-500">
                  <h3 className="text-gray-900 dark:text-white font-black text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-2 transition-colors duration-500">
                    <MapPin size={24} className="text-[#1565c0]" />
                    Other States
                  </h3>
                  <div className="space-y-3">
                    {otherStates.map((loc) => (
                      <Link
                        key={loc.state}
                        href={`/services/${slug}/${loc.state}`}
                        className="flex items-center justify-between group p-3 mb-3 rounded-2xl border border-transparent hover:border-[#1565c0]/20 hover:bg-[#1565c0]/5 transition-all"
                      >
                        <span className="text-gray-600 dark:text-[#8b949e] font-bold text-sm group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                          {loc.stateLabel}
                        </span>
                        <ArrowRight
                          size={14}
                          className="text-[#1565c0] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

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
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-white/5 text-center transition-colors duration-500">
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
                    Ready in {stateLabel}?
                  </h3>
                  <p className="text-white/80 mb-10 text-sm leading-relaxed font-medium italic">
                    &ldquo;Our teams across {stateLabel} deploy skilled workers
                    within 24–48 hours of project approval.&rdquo;
                  </p>
                  <Button
                    href="/contact"
                    className="w-full py-3 bg-white text-[#1565c0] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white border-none shadow-2xl transition-all scale-105"
                  >
                    Get Fast-Track Quote
                  </Button>
                  <p className="text-white/40 text-[9px] mt-3 mb-0 uppercase font-black tracking-widest">
                    Serving all of {stateLabel}
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="relative lg:sticky lg:top-28 w-full max-w-[500px] mx-auto mb-8">
                <SidebarEnquiryForm serviceTitle={service?.title || slug} />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-5 relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 bg-white dark:bg-[#0d1117] border-t border-gray-200 dark:border-white/5 transition-colors duration-500" />
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <h2
            className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white mb-3 tracking-tighter transition-colors duration-500"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Your Partner Across &nbsp;
            <span className="text-[#1565c0]">{stateLabel}.</span>
          </h2>
          <p className="text-gray-600 dark:text-[#8b949e] text-xl mb-4 max-w-2xl mx-auto italic transition-colors duration-500">
            KDS International provides mission-critical {(service?.title || slug).toLowerCase()} across{" "}
            {stateLabel} — with full compliance and zero disruption.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button
              href="/contact"
              size="lg"
              className="bg-gray-900 dark:bg-[#0d1117] text-white hover:bg-black border-none shadow-2xl transition-colors duration-500 px-4"
            >
              Start Your Mission
            </Button>
            <Button
              href="/about"
              variant="outline"
              size="lg"
              className="border-gray-300 dark:border-white text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white dark:hover:text-[#0d1117] transition-colors duration-500 px-4 "
            >
              Explore Our History
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
