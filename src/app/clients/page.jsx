import React from 'react';
import ClientList from '@/components/common/clientList/ClientList';
import { API_ENDPOINTS, IMAGE_URL } from "@/config/api";
import { getData } from "@/lib/data";
import AboutHero from "@/components/common/herosection/AboutHero";
import StatCard from "@/components/ui/StatCard";
import { getPageSEO } from "@/lib/metadata";

export async function generateMetadata() {
  const page = await getPageSEO("clients");
  return {
    title: page?.meta_title || "Our Clients | KDS International",
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

export default async function Clients() {
  const clientResponse = await getData(API_ENDPOINTS.CLIENTS);
  const page = await getPageSEO("clients");

  let valuedClientsData = [];
  try {
    valuedClientsData = await getData(API_ENDPOINTS.VALUED_CLIENTS);
  } catch (error) {
    console.error("Error fetching clients from API:", error);
  }

  const sections = clientResponse.data.sections.reduce(
    (acc, section) => {
      acc[section.section_key] = section;
      return acc;
    },
    {}
  );

  const hero = sections.hero_section;
  const statstictic = sections.stats_key;
  const valuedClient = sections.valued_clients;

  // Fallback to static data if API fetch returned no data or failed
  if (!valuedClientsData || valuedClientsData.length === 0) {
    valuedClientsData = valuedClient?.extra || [];
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

      {/* ─── PARTNERS SECTION ─────────────────────────────────────────── */}

      {/* Cleint lists */}
      <ClientList clientData={valuedClientsData}
        title={valuedClient?.title}
        subtitle={valuedClient?.subtitle}
        description={valuedClient?.description} />

    </main>
  );
}

