import { getServerData } from "@/lib/data";
import { CheckCircle, Target, Eye, History } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { getPageSEO } from "@/lib/metadata";
import { IMAGE_URL } from "@/config/api";
import StatCard from "@/components/ui/StatCard";
import Certification from "@/components/common/certification/Certification";
import AboutHero from "@/components/common/herosection/AboutHero";
import { FaLinkedin } from "react-icons/fa";
// import Statistics from "@/components/common/stats/Statistics";
import { API_ENDPOINTS } from "@/config/api";
import { getData } from "@/lib/data";

export async function generateMetadata() {
  const page = await getPageSEO("about");
  return {
    title: page?.meta_title || "KDS International",

    description:
      page?.meta_description || "",

    keywords:
      page?.meta_keywords?.split(",") || [],
 alternates: {
    canonical: page?.canonical_tag,
  },

  robots: page?.meta_robots_tag,
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

export default async function AboutPage() {
  const data = await getServerData();
  const aboutResponse = await getData(API_ENDPOINTS.ABOUT);
  const page = await getPageSEO("about");
  const sections = aboutResponse.data.sections.reduce(
    (acc, section) => {
      acc[section.section_key] = section;
      return acc;
    },
    {}
  );

  const hero = sections.hero_section;
  const statstictic = sections.stats_key;
  const mission = sections.mission_key;
  const whyKds = sections["Why KDS"];
  const whyKdsRight = sections.why_kds_right_section;
  const leadership = sections.Leadership;
  console.log("leadership", leadership)
  const readyBuilt = sections.ready_built;
  const certifications = sections.Certifications;
  const { aboutPage, stats, team, certificate, testimonials } = data;

  return (
    <main className="overflow-hidden bg-white dark:bg-[#0d1117] transition-colors duration-500">
      {/* ─── HERO SECTION ──────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            page?.meta_schema?.[0]?.schema || {}
          )
        }}
      />
      <AboutHero data={hero} />

      {/* ─── STATS STRIP ──────────────────────────────────────────────── */}
      <section className="py-5 bg-gray-50 dark:bg-[#161b22] border-y border-gray-200 dark:border-white/5 relative z-10 transition-colors duration-500">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {statstictic?.extra?.map((stat) => (
              <StatCard
                key={stat.key} stat={stat}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── MISSION & VISION ─────────────────────────────────────────── */}
      <section className="section-padding relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Mission */}
            {mission?.extra?.map((item, idx) => (

              <div key={item.key} className="bg-white dark:bg-transparent premium-glass p-4 rounded-3xl border border-gray-200 dark:border-[#1565c0]/20 hover:border-[#1565c0]/40 dark:hover:border-[#1565c0]/40 transition-all duration-500 group relative overflow-hidden" data-aos="fade-up" data-aos-delay={200}>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#1565c0]/5 rounded-full group-hover:bg-[#1565c0]/10 transition-colors" />
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-[#1565c0]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                  <Target className="text-[#1565c0]" size={32} />
                </div>
                <h2
                  className="text-3xl font-black text-gray-900 dark:text-white mb-6 tracking-tight transition-colors duration-500"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {item?.key || "Our Mission"}
                </h2>
                <p className="text-gray-600 dark:text-[#8b949e] text-lg leading-relaxed transition-colors duration-500">
                  {item?.value || "iguygut"}
                </p>
              </div>))}

            {/* Vision */}

          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE KDS ───────────────────────────────────────────── */}
      <section className="section-padding bg-gray-50 dark:bg-[#161b22]/30 relative transition-colors duration-500">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <SectionTitle
                data={whyKds}
                label="Why KDS"
                title="Uncompromising Standards"
                subtitle="Decades of industrial experience, a certified global network, and a relentless focus on zero-defect quality."
              />

              <div className="mt-12 space-y-8">
                {whyKds.extra?.map((item, idx) => (
                  <div key={item.key} className="flex gap-3 group mb-3" data-aos="fade-up" data-aos-delay={idx * 200}>
                    <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-[#1565c0]/10 flex items-center justify-center shrink-0 group-hover:bg-[#1565c0] group-hover:text-white transition-all duration-300">
                      <CheckCircle size={24} className="text-[#1565c0] group-hover:text-white" />
                    </div>
                    <div>
                      <h3
                        className="text-gray-900 dark:text-white font-bold text-xl mb-2 transition-colors duration-500"
                        style={{ fontFamily: "Outfit, sans-serif" }}
                      >
                        {item.key}
                      </h3>
                      <p className="text-gray-600 dark:text-[#8b949e] leading-relaxed transition-colors duration-500">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative" data-aos="fade-up" data-aos-delay={200}>
              <div className="absolute -inset-4 bg-gradient-to-r from-[#1565c0]/20 to-[#0d47a1]/20 blur-2xl rounded-full opacity-50" />
              <div className="relative bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/5 p-5 rounded-3xl overflow-hidden transition-colors duration-500">
                <History className="text-[#1565c0] mb-3" size={48} />
                <h3
                  className="text-3xl font-black text-gray-900 dark:text-white mb-3 tracking-tighter transition-colors duration-500"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {whyKdsRight.title}
                </h3>
                <p className="text-gray-600 dark:text-[#8b949e] text-lg leading-relaxed mb-3 transition-colors duration-500"
                  dangerouslySetInnerHTML={{
                    __html: whyKdsRight.description || "",
                  }} />

                <div className="grid grid-cols-2 gap-4">
                  {whyKdsRight.extra.slice(0, 2).map((stat) => (
                    <div
                      key={stat.key}
                      className="bg-gray-50 dark:bg-transparent premium-glass p-2 rounded-2xl text-center border border-gray-100 dark:border-white/5 transition-colors duration-500"
                    >
                      <p
                        className="text-3xl font-black text-[#1565c0] mb-1"
                        style={{ fontFamily: "Outfit, sans-serif" }}
                      >
                        {stat.key}
                      </p>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-gray-200 dark:text-[#8b949e] transition-colors duration-500 mb-0">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOARD OF DIRECTORS / LEADERSHIP ─────────────────────────── */}
      <section className="section-padding">
        <div className="container mx-auto px-3 max-w-7xl">
          <SectionTitle
            data={leadership}
            label="Leadership"
            title="The Minds Behind KDS"
            subtitle="A global team of experts committed to delivering industrial excellence."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
            {leadership.extra.map((member, i) => (
              <div key={member.key} className="group relative" data-aos="fade-up" data-aos-delay={i * 400}>
                <div className="bg-white dark:bg-transparent premium-glass p-3 rounded-3xl border border-gray-200 dark:border-white/5 hover:border-[#1565c0]/30 dark:hover:border-[#1565c0]/30 transition-all duration-500 overflow-hidden text-center h-full flex flex-col items-center">
                  <div
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1565c0] to-[#0d47a1] flex items-center justify-center text-white font-black text-3xl mb-3 shadow-xl group-hover:scale-110 transition-transform duration-500"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        src={`${IMAGE_URL}/${member.image}`}
                        alt={member.alt_text || member.key}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3
                    className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-500"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {member.key}
                  </h3>
                  <p className="text-[#1565c0] text-sm font-bold uppercase tracking-widest mb-3">
                    {member.value}
                  </p>
                  <p className="text-gray-600 dark:text-[#8b949e] text-sm leading-relaxed transition-colors duration-500">
                    {member.subtitle}
                  </p>

                  <a
                    href={`${member.url_path}`}

                    className="text-[#0A66C2] hover:scale-110 transition"
                  >
                    <FaLinkedin size={28} />
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
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
            {readyBuilt.title}<br />
            <span className="text-gray-900 dark:text-[#0d1117] transition-colors duration-500">   {readyBuilt.subtitle}</span>
          </h2>
          <p className="text-white/90 text-xl mb-12 max-w-2xl mx-auto font-medium transition-colors duration-500"
            dangerouslySetInnerHTML={{
              __html: readyBuilt?.description || ""
            }} />

          <div className="flex flex-wrap justify-center gap-3">
            <Button
              href={readyBuilt.extra[0].url_path}
              size="lg"
              className="bg-gray-900 dark:bg-[#0d1117] text-white hover:bg-black border-none shadow-2xl transition-colors duration-500"
            >
              {readyBuilt.extra[0].key}
            </Button>
            <Button
              href={readyBuilt.extra[1].url_path}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#1565c0]"
            >
              {readyBuilt.extra[1].key}
            </Button>
          </div>
        </div>
      </section>

      {/* ─── certifications ─────────────────────────── */}
      <Certification data={certifications} />

    </main>
  );
}
