import { getServerData } from "@/lib/data";
import ServiceCard from "@/components/ui/ServiceCard";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { ArrowRight, CheckCircle } from "lucide-react";
import ServiceLocationTabs from "@/components/ui/ServiceLocationTabs";
import { API_ENDPOINTS, IMAGE_URL } from "@/config/api";
import { getData } from "@/lib/data";
import AboutHero from "@/components/common/herosection/AboutHero";
import { getPageSEO } from "@/lib/metadata";

export async function generateMetadata() {
  const page = await getPageSEO("services");

  return {
    title: page?.meta_title || "KDS International",
    description: page?.meta_description || "",
    keywords: page?.meta_keywords?.split(",") || [],
     alternates: {
    canonical: page?.canonical_tag,
  },

  robots: page?.meta_robots_tag,
    openGraph: {
      title: page?.meta_title,
      description: page?.meta_description,
      images: [{ url: `${IMAGE_URL}/${page.image}` }],
    },
    other: {
      "script:type": JSON.stringify(page?.meta_schema || []),
    },
  };
}

export default async function ServicesPage() {
  const data = await getServerData();
  const services = await getData(API_ENDPOINTS.SERVICES)
  const page = await getPageSEO("services");

  const sections = services.data.sections.reduce(
    (acc, section) => {
      acc[section.section_key] = section;
      return acc;
    },
    {}
  );

  const hero_section = sections.hero_section;
  const service = sections.service_list
  const serviceData = service?.extra?.map((item, index) => ({ id: index + 1, slug: item.url_path?.split("/").filter(Boolean).pop() || "service", title: item.key || "", shortDesc: item.value || "", icon: item.icon || "⚙️", features: item.subtitle?.split(" ").slice(0, 5) || [] })) || [];
  const last_section = sections.last_section;
  const workflowData =
    last_section?.extra?.map((item, index) => ({
      step: String(index + 1).padStart(2, "0"),
      title: item.key || "",
      desc: item.value || "",
    })) || [];

  const point_section = sections.point_section;
  const industries =
    point_section?.points?.map((item, index) => ({
      id: index + 1,
      name: item.point?.trim() || ""
    })) || [];
  return (
    <main className="overflow-hidden dark:bg-[#0d1117] transition-colors duration-500">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            page?.meta_schema?.[0]?.schema || {}
          )
        }}
      />
      {/* ─── HERO SECTION ──────────────────────────────────────────────── */}
      {/* <section className="relative  mt-5 pt-5 pb-5 hero-bg overflow-hidden ">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#1565c0]/15 glow-blob rounded-full" />

        <div className="container mx-auto mt-5 px-6 max-w-7xl relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full premium-glass border-[#1565c0]/30 mb-8 animate-fade-in-up">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1565c0]">
                Our Core Capabilities
              </span>
            </div>
            <h1
              className="text-6xl md:text-8xl font-black !text-gray-200 dark:text-white mb-8 leading-[0.9] tracking-tighter animate-fade-in-up transition-colors duration-500"
              style={{ animationDelay: "0.1s" }}
            >
              Precision Services.
              <br />
              <span className="gradient-text">Global Impact.</span>
            </h1>
            <p
              className="text-gray-300 dark:text-[#8b949e] text-lg md:text-xl leading-relaxed mb-12 max-w-2xl animate-fade-in-up transition-colors duration-500"
              style={{ animationDelay: "0.2s" }}
            >
              Full-lifecycle industrial solutions — from rigorous testing and
              quality inspection to intelligent global sourcing and logistics.
            </p>
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Button
                href="/contact"
                size="lg"
                className="shadow-2xl shadow-[#1565c0]/20"
              >
                Request a Precision Quote{" "}
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section> */}
      <AboutHero data={hero_section} />

      {/* ─── TRUST STRIP ──────────────────────────────────────────────── */}
      <section className="bg-gray-50 dark:bg-[#161b22] border-y border-gray-200 dark:border-white/5 py-10 relative z-10 transition-colors duration-500">
        <div className="container mx-auto px-4 py-3 max-w-7xl">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              "ISO 9001:2015 Certified",
              "Zero Defect Policy",
              "30+ Countries",
              "43+ Years Experience",
            ].map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-[#8b949e] group hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
              >
                <CheckCircle size={18} className="text-[#1565c0]" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES GRID ────────────────────────────────────────── */}
      <section className="section-padding relative dark:bg-[#0d1117] transition-colors duration-500">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-4 ">
            <SectionTitle
              data={service}
              label="Our Services"
              title="End-to-End Industrial Excellence"
              subtitle="We provide a comprehensive ecosystem of services designed to optimize speed, quality, and cost across your global operations."
              align="center"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3  !pt-4">
            {serviceData.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>


      {/* ─── LOCATIONS WE SERVE ───────────────────────────────────── */}
      <section className="section-padding bg-gray-50 dark:bg-[#161b22]/30 relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#1565c0]/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="mb-3 animate-fade-in-up">
            <SectionTitle
              label="Service Locations"
              title="States & Cities We Serve"
              subtitle="KDS International operates across Delhi NCR, Uttar Pradesh, and Haryana. Select a state to explore city-wise service availability."
              align="center"
            />
          </div>
          <ServiceLocationTabs services={data.services} />
        </div>
      </section>

      {/* ─── PROCESS / WORKFLOW ────────────────────────────────────── */}
      <section className="section-padding bg-gray-50 dark:bg-[#161b22]/30 relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#1565c0]/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 max-w-8xl">
          <div className="text-center mb-20">
            <SectionTitle
              data={last_section}
              label="Our Process"
              title="The KDS Workflow"
              subtitle="A transparent, data-driven methodology that ensures consistency and precision at every stage of the project."
              align="center"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">

            {workflowData.map((item, i) => (

              <div key={item.step} className="group cursor-default">

                <div className="bg-white dark:bg-transparent premium-glass p-3 rounded-3xl border border-gray-200 dark:border-white/5 group-hover:border-[#1565c0]/40 transition-all duration-500 h-full relative overflow-hidden">


                  <div className="absolute -top-3 -right-3 text-7xl !p-3 font-black text-gray-300 dark:text-white/5 group-hover:text-[#1565c0]/10 transition-colors duration-500 pointer-events-none">
                    {item.step}
                  </div>


                  <h3
                    className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight group-hover:text-[#1565c0] transition-colors duration-500"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {item.title}
                  </h3>


                  <p className="text-gray-600 dark:text-[#8b949e] leading-relaxed italic mb-3 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-500">
                    &ldquo;{item.desc}&rdquo;
                  </p>


                  <div className="w-10 h-1 bg-gray-200 dark:bg-[#161b22] group-hover:w-full group-hover:bg-[#1565c0] transition-all duration-500 rounded-full" />

                </div>


                {i < workflowData.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gray-300 dark:bg-white/10 z-0" />
                )}

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* ─── INDUSTRIES WE SERVE ──────────────────────────────────── */}
      <section className="section-padding bg-white dark:bg-[#0d1117] relative transition-colors duration-500">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-4 items-">
            <div className="lg:col-span-3 col-span-5" >
              <SectionTitle
                data={point_section}
                label="Industries"
                title="Vertical Solutions"
                subtitle="We don't believe in one-size-fits-all. Our experts bring niche knowledge to solve sector-specific challenges."
              />

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {industries.map((industry) => (
                  <div
                    key={industry.id}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#1565c0] group-hover:scale-150 transition-transform" />
                    <span
                      className="text-gray-900 dark:text-white font-bold text-lg group-hover:text-[#1565c0] transition-colors duration-500"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {industry.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Card */}
            <div className="lg:col-span-2 md:col-span-5 col-span-5 bg-white dark:bg-transparent premium-glass p-4 rounded-[2.5rem] border border-gray-200 dark:border-white/5 relative overflow-hidden group transition-colors duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#1565c0]/10 blur-[100px] pointer-events-none" />
              <h3
                className="text-3xl font-black text-gray-900 dark:text-white mb-3 leading-tight tracking-tighter transition-colors duration-500"
                style={{ fontFamily: "Outfit, sans-serif", lineHeight: "38px" }}
              >
                Scalable Infrastructure <br />
                <span className="text-[#1565c0]">For Global Industry.</span>
              </h3>
              <div className="space-y-3">
                {point_section?.extra.slice(0, 3).map((stat) => (
                  <div
                    key={stat.key}
                    className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-4 transition-colors duration-500"
                  >
                    <span className="text-gray-600 dark:text-[#8b949e] font-medium transition-colors duration-500">
                      {stat.key}
                    </span>
                    <span
                      className="text-2xl font-black text-gray-900 dark:text-white transition-colors duration-500"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────── */}
      <section className="py-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#1565c0]" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <h2
            className="text-4xl md:text-6xl font-black text-white mb-3 tracking-tighter"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Ready to Optimize Your <br />
            <span className="text-gray-900 dark:text-[#0d1117] transition-colors duration-500">Industrial Supply Chain?</span>
          </h2>
          <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto font-medium">
            Our precision specialists are ready to architect the perfect
            solution for your global operations.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button
              href="/contact"
              size="lg"
              className="bg-gray-900 dark:bg-[#0d1117] text-white hover:bg-black border-none shadow-2xl transition-colors duration-500  px-4 py-3"
            >
              Request a Proposal
            </Button>
            <Button
              href="/about"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#1565c0] px-4 py-3"
            >
              About KDS
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
