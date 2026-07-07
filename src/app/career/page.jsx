import React from 'react';
import { getServerData } from "@/lib/data";
import { API_ENDPOINTS, IMAGE_URL } from "@/config/api";
import { getData } from "@/lib/data";
import CareerList from '@/components/common/careerList/CareerList';
import ApiJobList from '@/components/common/careerList/ApiJobList';
import AboutHero from "@/components/common/herosection/AboutHero";
import StatCard from "@/components/ui/StatCard";
import { getPageSEO } from "@/lib/metadata";

export async function generateMetadata() {
  const page = await getPageSEO("career");
  return {
    title: page?.meta_title || "Careers | KDS International",
    description: page?.meta_description || "",
    keywords: page?.meta_keywords?.split(",") || [],
     alternates: {
    canonical: page?.canonical_tag,
  },

  robots: page?.meta_robots_tag,
    openGraph: {
      title: page?.meta_title,
      description: page?.meta_description,
      images: [{ url: `${IMAGE_URL}/${page?.image}` }],
    },
    other: {
      "script:type": JSON.stringify(page?.meta_schema || []),
    },
  };
}

export default async function Career() {
  const data = await getServerData();
  const careerResponse = await getData(API_ENDPOINTS.CAREER);
  const page = await getPageSEO("career");
  const sections = careerResponse.data.sections.reduce(
    (acc, section) => {
      acc[section.section_key] = section;
      return acc;
    },
    {}
  );
  const { partners, careerData } = data;
  const hero = sections.hero_section;
  const statstictic = sections.stats_key;

  let initialJobsData = null;
  try {
    initialJobsData = await getData(API_ENDPOINTS.JOBS);
  } catch (error) {
    console.error("Failed to fetch initial jobs data:", error);
  }

  return (
    <main className="overflow-hidden bg-white dark:bg-[#0d1117] transition-colors duration-500">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            page?.meta_schema?.[0]?.schema || {}
          )
        }}
      />
      {/* ─── HERO SECTION ──────────────────────────────────────────────── */}
      <AboutHero data={hero} />

      {/* stats */}
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

      {/* ─── PARTNERS SECTION ─────────────────────────────────────────── */}
      {/* <section className="py-4 border-y border-gray-200 dark:border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <p className="text-center text-sm font-black uppercase tracking-[0.3em] text-gray-400 dark:text-[#8b949e] mb-5">
            Our Prestigious Clients
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex justify-center opacity-100 transition-all duration-500"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={96}
                  height={48}
                  className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Career Listings */}
      {/* <CareerList careerData={careerData} /> */}

      {/* Dynamic API Job Listings */}
      <ApiJobList initialJobsData={initialJobsData} />
    </main>
  );
}