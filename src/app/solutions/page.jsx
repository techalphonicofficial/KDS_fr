import { solutionsData } from "@/lib/solutionsAndTechData";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { getData } from "@/lib/data";
import { API_ENDPOINTS } from "@/config/api";
import { getPageSEO } from "@/lib/metadata";
import { IMAGE_URL } from "@/config/api";
import {
  Briefcase,
  Building2,
  Shield,
  Truck,
  Warehouse,
  Server,
  LayoutGrid,
  ArrowRight,
  Sparkles,
  ChevronRight,
  TrendingUp
} from "lucide-react";

export async function generateMetadata() {
  const page = await getPageSEO("solutions");

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
  Briefcase: Briefcase,
  Building2: Building2,
  ShieldCheck: Shield,
  Truck: Truck,
  Warehouse: Warehouse,
  Server: Server,
  LayoutGrid: LayoutGrid,
};

const caseStudies = [
  {
    title: "Optimizing 2.5M Sq. Ft Warehouse Facility Operations",
    category: "Warehouse & Facilities",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
    desc: "How we deployed 350+ skilled staff and automated tracking to reduce inventory leakage by 94%.",
    link: "/contact"
  },
  {
    title: "Real-time CCTV Monitoring & Surveillance Deployment",
    category: "Surveillance & Security",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800&auto=format&fit=crop",
    desc: "Deployment of smart AI patrol tracking and remote guard systems for a major industrial manufacturer.",
    link: "/contact"
  },
  {
    title: "On-Demand Shift Scheduling for Automotive Assembly Plant",
    category: "Workforce Management",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=800&auto=format&fit=crop",
    desc: "Architected a zero-downtime labor replacement model handling 24/7 rotational shifts.",
    link: "/contact"
  }
];

export default async function SolutionsPage() {
  const SOLUTIONS = await getData(API_ENDPOINTS.SOLUTIONS);
  const page = await getPageSEO("solutions");
  // console.log("SOLUTION",SOLUTIONS)
  // console.log("solutions", SOLUTIONS)
  const sections = SOLUTIONS.data.sections.reduce(
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
  // const overview = sections.overview;
  // const para = sections.para
  // const benefits =sections.benefits
  //  const whyChoose =sections.why_choose;
  //  const Elevate = sections.Elevate;
  //  const expertise_part =sections.expertise_part
  //  const Latest_insight=sections.Latest_insight



  return (
    <main className="overflow-hidden  dark:bg-[#0d1117] transition-colors duration-500">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            page?.meta_schema?.[0]?.schema || {}
          )
        }}
      />
      {/* ─── HERO SECTION ──────────────────────────────────────────────── */}
      <section
        className="relative mt-16 pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: heroSection?.background_image
            ? `url(${IMAGE_URL}/${heroSection.background_image})`
            : "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#020d1f]/95 via-[#06111e]/85 to-[#06111e]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-90" />

        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#1565c0]/15 glow-blob rounded-full blur-[120px]" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-teal-500/10 glow-blob rounded-full blur-[100px]" />


        <div className="container mx-auto px-6 !my-20 max-w-7xl relative z-10">

          <div className="max-w-4xl">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full premium-glass border-[#1565c0]/30 mb-8 animate-fade-in-up">

              <Sparkles size={14} className="text-[#1565c0]" />

              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1565c0]">
                {heroSection?.title}
              </span>

            </div>


            <h1
              className="text-6xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter animate-fade-in-up"
              style={{
                animationDelay: "0.1s",
                fontFamily: "Outfit, sans-serif"
              }}
            >

              {heroSection?.title}

              <br />

              <span className="gradient-text">
                {heroSection?.subtitle}
              </span>

            </h1>


            <p
              className="text-gray-300 dark:text-[#8b949e] text-lg md:text-xl leading-relaxed mb-12 max-w-2xl animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
              dangerouslySetInnerHTML={{
                __html: heroSection?.description
              }}
            />


            <div className="animate-fade-in-up mb-4">
              {
                heroSection?.extra?.map((btn, index) => (

                  <Button
                    key={index}
                    href={btn.url_path}
                    size="lg"
                    className="shadow-2xl !rounded-2xl shadow-[#1565c0]/20 font-bold"
                  >
                    {btn.key}
                    <ArrowRight size={18} className="ml-2" />
                  </Button>

                ))
              }

            </div>


          </div>

        </div>

      </section>

      {/* ─── TRUST STRIP ──────────────────────────────────────────────── */}
      <section className="bg-gray-50 dark:bg-[#161b22] border-y border-gray-200 dark:border-white/5 py-8 relative z-10 transition-colors duration-500">

        <div className="container mx-auto px-6 max-w-7xl">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center">

            {
              stats?.extra?.map((stat, i) => (

                <div key={i} className="flex flex-col items-center">

                  <span
                    className="text-2xl md:text-3xl font-black text-[#1565c0]"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {stat.key}
                  </span>


                  <span className="text-xs font-black text-gray-800 dark:text-gray-200 mt-1 uppercase tracking-wider">

                    {stat.value}

                  </span>


                  <span className="text-[10px] text-gray-400 dark:text-[#8b949e]">

                    {stat.subtitle}

                  </span>


                </div>

              ))
            }

          </div>

        </div>

      </section>

      {/* ─── SOLUTIONS GRID ────────────────────────────────────────── */}
      <section id="explore-solutions" className="section-padding relative bg-white dark:bg-[#0d1117] transition-colors duration-500">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <SectionTitle
              data={solution}
              label="Our Solutions"
              title="Targeted Operational Frameworks"
              subtitle="We coordinate skilled manpower, workflows, and infrastructure to build highly reliable specialized environments for your business."
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solution?.extra?.map((sol, index) => {
              const Icon = IconMap[sol.icon] || LayoutGrid;

              return (
                <div
                  key={index}
                  className="group flex flex-col bg-white dark:bg-[#161b22]/50 premium-glass rounded-[2rem] border border-gray-200 dark:border-white/5 hover:border-[#1565c0]/40 dark:hover:border-[#1565c0]/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(21,101,192,0.15)] overflow-hidden"
                >

                  {/* Category Image */}
                  <div className="relative h-48 w-full overflow-hidden">

                    <img
                      src={
                        sol.image
                          ? `${IMAGE_URL}/${sol.image}`
                          : "/placeholder.png"
                      }
                      alt={sol.alt_text || sol.key}
                      className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />


                    <div className="absolute bottom-4 left-6 flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-[#1565c0]/80 backdrop-blur-md flex items-center justify-center text-white border border-white/20">

                        <Icon size={18} />

                      </div>


                      <h3
                        className="text-white font-black text-lg tracking-tight"
                        style={{ fontFamily: "Outfit, sans-serif" }}
                      >
                        {sol.key}
                      </h3>

                    </div>

                  </div>



                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col">

                    <p className="text-gray-600 px-4 dark:text-[#8b949e] text-sm leading-relaxed mb-6">
                      {sol.value}
                    </p>



                    <div className="border-t px-4 border-gray-100 dark:border-white/5 pt-4 mb-6">


                      <p className="text-[10px] font-black uppercase tracking-widest text-[#1565c0] mb-3">
                        {sol.subtitle || "Key Capabilities"}
                      </p>


                      <div className="flex flex-col gap-2">

                        {sol.points?.map((item, idx) => (

                          <Link
                            key={idx}
                            href={`/solutions/${item.point
                              ?.toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            className="flex items-center justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#1565c0] transition-colors py-1 group/link"
                          >

                            <span className="flex items-center gap-2">

                              <span className="w-1.5 h-1.5 rounded-full bg-[#1565c0]" />

                              {item.point}

                            </span>


                            <ChevronRight
                              size={14}
                              className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-[#1565c0]"
                            />

                          </Link>

                        ))}

                      </div>


                    </div>



                    {/* CTA */}
                    <div className="mt-auto py-4 px-4 border-t border-gray-100 dark:border-white/5 flex justify-between items-center">


                      <Link
                        href={sol.url_path || "#"}
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#1565c0] hover:text-[#0d47a1] transition-colors"
                      >
                        Learn More
                        <ArrowRight size={14} />
                      </Link>


                      <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">
                        KDS Solution
                      </span>


                    </div>


                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CASE STUDIES SHOWCASE ────────────────────────────────────────── */}
      <section className="section-padding bg-gray-50 dark:bg-[#161b22]/30 border-t border-gray-200 dark:border-white/5 transition-colors duration-500">

        <div className="container mx-auto px-6 max-w-7xl">


          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">

            <div className="max-w-2xl">

              <span className="inline-block text-[#1565c0] font-black text-xs uppercase tracking-[0.2em] mb-3">
                {proven_deplo?.title}
              </span>


              <h2
                className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {proven_deplo?.subtitle}
              </h2>


              <div
                className="text-[#8b949e] text-base mt-4 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: proven_deplo?.description || ""
                }}
              />

            </div>


            <Button href="/contact" className="font-bold flex items-center gap-2">
              Request Case Studies <TrendingUp size={16} />
            </Button>


          </div>




          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">


            {proven_deplo?.extra?.map((cs, i) => (


              <div
                key={i}
                className="group bg-white dark:bg-[#0d1117] rounded-3xl overflow-hidden border border-gray-200 dark:border-white/5 hover:border-[#1565c0]/30 transition-all duration-300 hover:shadow-xl"
              >



                {/* Image */}
                <div className="relative h-48 overflow-hidden">


                  {cs.show_image && cs.image && (

                    <img
                      src={`${IMAGE_URL}/${cs.image}`}
                      alt={cs.alt_text || cs.key}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                  )}



                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />



                  {/* Category badge */}
                  <span className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-wider py-1 px-3 rounded-full">

                    {cs.key}

                  </span>


                </div>




                {/* Content */}

                <div className="p-6">


                  <h3
                    className="text-gray-900 px-4 dark:text-white font-bold text-lg mb-3 tracking-tight group-hover:text-[#1565c0] transition-colors"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >

                    {cs.value}

                  </h3>




                  {cs.show_subtitle && (

                    <p className="text-gray-600 px-4 dark:text-[#8b949e] text-sm leading-relaxed mb-6">

                      {cs.subtitle}

                    </p>

                  )}




                  {cs.show_url_path && cs.url_path && (

                    <Link
                      href={cs.url_path}
                      className="inline-flex items-center gap-1 px-4 text-xs font-bold uppercase tracking-wider text-[#1565c0] hover:text-[#0d47a1]"
                    >

                      Contact Representative
                      <ChevronRight size={14} />

                    </Link>

                  )}



                </div>



              </div>


            ))}


          </div>


        </div>


      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────── */}
      <section className="section-padding relative overflow-hidden bg-gradient-to-br from-[#0d47a1] to-[#1565c0]">

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />


        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none" />



        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">


          {/* Title */}
          <h2
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >

            {ctaBlue?.title}

            <br />

            {ctaBlue?.subtitle}

          </h2>



          {/* Description */}
          <div
            className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: ctaBlue?.description || ""
            }}
          />




          {/* Buttons from extra_data */}

          <div className="flex flex-wrap justify-center gap-6">


            {ctaBlue?.extra?.map((btn, index) => (


              <Button
                key={index}
                href={btn.url_path}
                size="lg"
                // variant={index === 0 ? "default" : "outline"}
                className="border-white text-white hover:bg-white hover:text-[#1565c0] px-8 py-3 font-bold">
                {btn.key}

              </Button>


            ))}


          </div>


        </div>


      </section>
    </main>
  );
}
