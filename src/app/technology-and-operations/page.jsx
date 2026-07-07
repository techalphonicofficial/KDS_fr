import { technologyData } from "@/lib/solutionsAndTechData";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { getData } from "@/lib/data";
import { API_ENDPOINTS } from "@/config/api";
import { IMAGE_URL } from "@/config/api";
import { getPageSEO } from "@/lib/metadata";
import Link from "next/link";
import {
  Cpu,
  Users,
  ClipboardCheck,
  FileWarning,
  MapPinned,
  BarChart3,
  ArrowRight,
  ShieldAlert,
  Settings,
  Activity,
  CheckCircle,
  Zap,
  ChevronRight,
  TrendingUp,
  Fingerprint
} from "lucide-react";

export async function generateMetadata() {
  const page = await getPageSEO("technology-and-operations");

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

const IconMap = {
  Cpu: Cpu,
  Users: Users,
  ClipboardCheck: ClipboardCheck,
  FileWarning: FileWarning,
  MapPinned: MapPinned,
  BarChart3: BarChart3,
};

const techShowcase = [
  {
    title: "IoT Systems & Live Geo-fencing Telemetry",
    category: "Connectivity & Telematics",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    desc: "Enforcing digital perimeter constraints and live route deviation notifications for logistics.",
    icon: MapPinned
  },
  {
    title: "State-of-the-Art Biometric & Fingerprint Hubs",
    category: "Identity & Access Control",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=800&auto=format&fit=crop",
    desc: "Tamper-proof attendance logging integrated directly with central compliance audits.",
    icon: Fingerprint
  },
  {
    title: "Automated Incident Escalation Protocols",
    category: "Safety & Command Center",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    desc: "Instant SMS/email emergency broadcast paths to minimize site response times.",
    icon: ShieldAlert
  }
];

export default async function TechnologyPage() {

  const technology = await getData(API_ENDPOINTS.TECHNOLOGY);

  // const page = await getPageSEO("technology");

  const sections = technology.data.sections.reduce(
    (acc, section) => {
      acc[section.section_key] = section;
      return acc;
    },
    {}
  );


  const heroSection = sections.hero_section;
  const stats = sections.stats_key;
  const solution = sections.our_solutions;
  const proven_deplo = sections.proven_deplo
  const ctaBlue = sections.cta_Blue;

  return (
    <main className="overflow-hidden dark:bg-[#0d1117] transition-colors duration-500">
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            page?.meta_schema?.[0]?.schema || {}
          )
        }}
      /> */}
      {/* ─── HERO SECTION ──────────────────────────────────────────────── */}

      <section className="relative section-padding hero-bg overflow-hidden">
        {/* Visual Background grid and glow blobs */}
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-teal-500/10 glow-blob rounded-full blur-[140px]" />
        <div className="absolute top-1/4 right-10 w-[600px] h-[600px] bg-[#1565c0]/10 glow-blob rounded-full blur-[160px]" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Text */}
            <div className="lg:col-span-7 max-w-3xl">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full premium-glass border-teal-600/30 mb-8 animate-fade-in-up">

                <Activity size={14} className="text-teal-600" />

                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-600">
                  {heroSection?.subtitle}
                </span>

              </div>


              <h1
                className="text-5xl md:text-7xl font-black !text-gray-200 dark:text-white mb-8 leading-[1.05] tracking-tighter animate-fade-in-up"
                style={{
                  animationDelay: "0.1s",
                  fontFamily: "Outfit, sans-serif"
                }}
              >

                {heroSection?.title}

                <br />

                <span className="gradient-text bg-gradient-to-r from-teal-500 to-[#1565c0]">
                  {heroSection?.subtitle}
                </span>

              </h1>



              <p
                className="text-gray-300 dark:text-[#8b949e] text-lg md:text-xl leading-relaxed mb-10 max-w-xl animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                {heroSection?.description?.replace(/<[^>]+>/g, "")}
              </p>



              <div
                className="animate-fade-in-up flex flex-wrap gap-4"
                style={{ animationDelay: "0.3s" }}
              >

                {heroSection?.extra?.map((item, index) => (

                  item?.show_url_path && (

                    <Button
                      key={index}
                      href={item.url_path}
                      size="lg"
                      className="bg-teal-600 hover:bg-teal-700 text-white border-none shadow-2xl shadow-teal-500/20 font-bold"
                    >

                      {item.key}

                      <ArrowRight size={18} className="ml-2" />

                    </Button>

                  )

                ))}
              </div>

            </div>



            {/* Image */}
            <div
              className="lg:col-span-5 relative h-[350px] md:h-[450px] w-full rounded-[2.5rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >

              <img
                src={`${IMAGE_URL}/${heroSection?.image}`}
                alt={heroSection?.alt_text || "Hero Image"}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />


              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />


              <div className="absolute bottom-6 left-6 right-6 text-white">

                <p className="text-teal-400 font-black text-xs uppercase tracking-widest mb-1">
                  {heroSection?.subtitle}
                </p>


                <h3 className="text-xl font-bold tracking-tight">
                  {heroSection?.title}
                </h3>


                <p className="text-white/80 text-xs mt-1">
                  {heroSection?.description?.replace(/<[^>]+>/g, "")}
                </p>


              </div>

            </div>


          </div>
        </div>
      </section>

       {/* ─── PROCESS / TECH METRICS ───────────────────────────────────── */}
      <section className="bg-gray-50 dark:bg-[#161b22] border-y border-gray-200 dark:border-white/5 section-padding relative z-10 transition-colors duration-500">

        <div className="container mx-auto px-6 max-w-7xl">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center">


            {stats?.extra?.map((stat, i) => (

              <div
                key={i}
                className="flex flex-col items-center"
              >

                {/* Percentage / Main Value */}
                <span
                  className="text-2xl md:text-3xl font-black text-blue-700"
                  style={{
                    fontFamily: "Outfit, sans-serif"
                  }}
                >
                  {stat?.key}
                </span>


                {/* Label */}
                <span
                  className="text-xs font-black text-gray-800 dark:text-gray-200 mt-1 uppercase tracking-wider"
                >
                  {stat?.value}
                </span>



                {/* Subtitle */}
                {stat?.show_subtitle && stat?.subtitle && (

                  <span
                    className="text-[10px] text-gray-400 dark:text-[#8b949e]"
                  >
                    {stat.subtitle}
                  </span>

                )}


              </div>

            ))}


          </div>

        </div>

      </section>

        {/* ─── TECHNOLOGY GRID ────────────────────────────────────────── */}
      <section id="explore-tech" className="section-padding relative bg-white dark:bg-[#0d1117] transition-colors duration-500">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <SectionTitle
              data={solution}
              label="Our Capabilities"
              title="State-of-the-Art Operations Tech"
              subtitle="We deploy custom digital apps, IoT command center telemetry, and strict biometric audit tools to guarantee compliance and real-time support."
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {solution?.extra?.map((tech, index) => {

              const Icon = Cpu;

              return (

                <div
                  key={index}
                  className="group flex flex-col bg-white dark:bg-[#161b22]/50 premium-glass rounded-[2rem] border border-gray-200 dark:border-white/5 hover:border-teal-500/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(20,184,166,0.15)] overflow-hidden"
                >


                  {/* Image */}
                  {tech?.show_image && (

                    <div className="relative h-48 w-full overflow-hidden">

                      <img
                        src={`${IMAGE_URL}/${tech.image}`}
                        alt={tech.alt_text || tech.key}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />


                      <div className="absolute bottom-4 left-6 flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-blue-600/80 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                          <Icon size={18} />
                        </div>


                        <h3
                          className="text-white font-black text-lg tracking-tight"
                          style={{ fontFamily: "Outfit,sans-serif" }}
                        >
                          {tech.key}
                        </h3>


                      </div>

                    </div>

                  )}



                  {/* Body */}

                  <div className="p-6 flex-1 flex flex-col">


                    <p className="text-gray-600 px-4 py-2 dark:text-[#8b949e] text-sm leading-relaxed mb-6">
                      {tech.value}
                    </p>



                    {tech?.show_points && tech?.points?.length > 0 && (

                      <div className="border-t border-gray-100 dark:border-white/5 px-4 mb-6">


                        <p className="text-[10px] font-black uppercase tracking-widest text-black mb-3">
                          {tech.subtitle || "Key Capabilities"}
                        </p>



                        <div className="flex flex-col gap-2">

                          {tech.points.map((item, idx) => (

                            <div
                              key={idx}
                              className="flex items-center justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 py-1"
                            >

                              <span className="flex items-center gap-2">

                                <span className="w-1.5 h-1.5 rounded-full bg-blue-200" />

                                {item.point}

                              </span>


                              <ChevronRight
                                size={14}
                                className="text-teal-500"
                              />

                            </div>

                          ))}

                        </div>

                      </div>

                    )}



                    {/* CTA */}

                    <div className="mt-auto py-4 border-t px-4 border-gray-100 dark:border-white/5 flex justify-between items-center">

                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-teal-600 hover:text-teal-700"
                      >

                        Launch Tech Spec

                        <ArrowRight size={14} />

                      </Link>


                    </div>


                  </div>


                </div>

              )

            })}


          </div>
        </div>
      </section>

        {/* ─── INFRASTRUCTURE SHOWCASE ────────────────────────────────────────── */}
      <section className="section-padding bg-gray-50 dark:bg-[#161b22]/30 border-t border-gray-200 dark:border-white/5 transition-colors duration-500">

        <div className="container mx-auto px-6 max-w-7xl">


          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">


            <div className="max-w-2xl">

              <span className="inline-block text-blue-800 font-black text-xs uppercase tracking-[0.2em] mb-3">

                {proven_deplo?.subtitle}

              </span>


              <h2
                className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight"
                style={{ fontFamily: "Outfit,sans-serif" }}
              >

                {proven_deplo?.title}

              </h2>


              <p className="text-[#8b949e] text-base mt-4 leading-relaxed">

                {proven_deplo?.description?.replace(/<[^>]+>/g, "")}

              </p>

            </div>



            <div>

              <Button
                href="/contact"
                className="bg-blue-700 hover:bg-teal-700 border-none font-bold flex items-center gap-2"
              >

                Request Architecture Brief

                <TrendingUp size={16} />

              </Button>

            </div>


          </div>





          {/* Cards */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">


            {proven_deplo?.extra?.map((ts, i) => {


              return (

                <div
                  key={i}
                  className="group bg-white dark:bg-[#0d1117] rounded-3xl overflow-hidden border border-gray-200 dark:border-white/5 hover:border-teal-500/30 transition-all duration-300 hover:shadow-xl"
                >



                  {/* Image */}

                  {ts?.show_image && (

                    <div className="relative h-48 overflow-hidden">


                      <img

                        src={`${IMAGE_URL}/${ts.image}`}

                        alt={ts.alt_text || ts.key}

                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"

                      />


                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />



                      <span className="absolute top-4 left-4 bg-blue-900/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-wider py-1 px-3 rounded-full">

                        {ts.key}

                      </span>


                    </div>

                  )}





                  <div className="p-6">


                    <h3
                      className="text-gray-900 px-4 dark:text-white font-bold text-lg mb-3 tracking-tight group-hover:text-teal-600 transition-colors"
                      style={{ fontFamily: "Outfit,sans-serif" }}
                    >

                      {ts.value}

                    </h3>



                    <p className="text-gray-600 px-4 dark:text-[#8b949e] text-sm leading-relaxed mb-6">

                      {ts.subtitle}

                    </p>





                    {/* Points */}

                    {ts?.show_points && ts?.points?.map((p, index) => (

                      <div
                        key={index}
                        className="px-4 text-xs font-semibold text-gray-500 mb-2"
                      >

                        • {p.point}

                      </div>

                    ))}




                    <Link

                      href={
                        ts?.show_url_path
                          ? ts.url_path
                          : "/contact"
                      }

                      className="inline-flex items-center gap-1 text-xs p-4 font-bold uppercase tracking-wider text-teal-600 hover:text-teal-700"

                    >

                      Speak with Architect

                      <ChevronRight size={14} />

                    </Link>


                  </div>


                </div>

              )

            })}



          </div>


        </div>

      </section>


  {/* ─── FINAL CTA ────────────────────────────────────────────── */}
      <section className="section-padding relative overflow-hidden bg-gradient-to-br from-teal-900 to-[#0d47a1]">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <h2
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Power Your Operations <br />
            With Live Telemetry.
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Eliminate operational friction, paper logs, and attendance manipulation. Deploy KDS telemetry networks on your factory floor or warehouse site today.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button
              href="/contact"
              size="lg"
              className="bg-white text-teal-900 hover:bg-gray-100 border-none shadow-2xl px-8 py-4 font-bold"
            >
              Get Free Demo Console
            </Button>
            <Button
              href="/about"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-teal-900 px-8 py-4 font-bold"
            >
              Technology Whitepaper
            </Button>
          </div>
        </div>
      </section>



     
    </main>
  );
}
