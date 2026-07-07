// import { Tag } from "lucide-react";
// import { getServerData } from "@/lib/data";
// import BlogCard from "@/components/ui/BlogCard";
// import Button from "@/components/ui/Button";


//   title: "Industry Insights & Blog",
//   description:
//     "Latest news, industry trends, and expert perspectives from the KDS International team.",
// };

// export default async function BlogListingPage() {
//   const data = await getServerData();
//   const { blogPosts } = data;

//   return (
//     <main className="overflow-hidden bg-white dark:bg-[#0d1117] transition-colors duration-500">
//       {/* ─── HERO SECTION ──────────────────────────────────────────────── */}
//       <section className="relative  mt-5 pt-5 pb-5 hero-bg overflow-hidden text-center">
//         <div className="absolute inset-0 hero-grid opacity-30" />
//         <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#1565c0]/10 glow-blob rounded-full blur-[120px]" />

//         <div className="container mx-auto  mt-5 px-6 max-w-7xl relative z-10">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full premium-glass border-[#1565c0]/30 mb-8 animate-fade-in-up">
//             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1565c0]">
//               Industry Intelligence
//             </span>
//           </div>
//           <h1
//             className="text-6xl md:text-8xl font-black !text-gray-200 dark:text-white mb-8 leading-[0.9] tracking-tighter animate-fade-in-up transition-colors duration-500"
//             style={{ animationDelay: "0.1s" }}
//           >
//             The Global
//             <br />
//             <span className="gradient-text">Insight Archive.</span>
//           </h1>
//           <p
//             className="text-gray-300 dark:text-[#8b949e] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in-up transition-colors duration-500"
//             style={{ animationDelay: "0.2s" }}
//           >
//             Strategic analysis, industrial trends, and technical perspectives
//             from the frontline of global supply chain management.
//           </p>
//         </div>
//       </section>

//       {/* ─── BLOG FEED ────────────────────────────────────────────────── */}
//       <section className="section-padding relative">
//         <div className="container mx-auto px-6 max-w-7xl">
//           {blogPosts.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {blogPosts.map((post, idx) => (
//                 <div
//                   key={post.id}
//                   className="animate-fade-in-up"
//                   style={{ animationDelay: `${0.1 * (idx + 1)}s` }}
//                 >
//                   <BlogCard post={post} />
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-5 bg-white dark:bg-transparent premium-glass border border-gray-200 dark:border-white/5 rounded-[3rem] animate-fade-in-up transition-colors duration-500">
//               <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-[#161b22] flex items-center justify-center mx-auto mb-8 border border-gray-200 dark:border-white/5 transition-colors duration-500">
//                 <Tag className="text-[#1565c0]/40" size={40} />
//               </div>
//               <h3
//                 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight transition-colors duration-500"
//                 style={{ fontFamily: "Outfit, sans-serif" }}
//               >
//                 No Analysis Published Yet
//               </h3>
//               <p className="text-gray-600 dark:text-[#8b949e] max-w-md mx-auto leading-relaxed transition-colors duration-500">
//                 Our engineers and analysts are currently compiling new industry
//                 reports. Check back shortly for fresh insights.
//               </p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
//       <section className="py-5 relative overflow-hidden">
//         <div className="absolute inset-0 bg-[#0d1117] border-t border-white/5" />
//         <div className="absolute inset-0 hero-grid opacity-20" />
//         <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
//           <h2
//             className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter"
//             style={{ fontFamily: "Outfit, sans-serif" }}
//           >
//             Stay Infomed. <br />
//             <span className="text-[#1565c0]">Stay Precise.</span>
//           </h2>
//           <p className="text-[#8b949e] text-xl mb-3 italic">
//             &ldquo;In a world of noise, data-driven precision is the only
//             competitive advantage that lasts.&rdquo;
//           </p>
//           <div className="flex justify-center">
//             <Button
//               href="/contact"
//               size="lg"
//               className="shadow-2xl shadow-[#1565c0]/20"
//             >
//               Partner With KDS
//             </Button>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }



import { Suspense } from 'react'

import { Tag, Info, ArrowRight } from "lucide-react";
import { getServerData } from "@/lib/data";
import BlogCard from "@/components/ui/BlogCard";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import Link from "next/link";
import { API_ENDPOINTS } from "@/config/api";
import { getBySlug } from "@/lib/data";
import { IMAGE_URL } from "@/config/api";
import { getData } from '@/lib/data';
import { getPageSEO } from '@/lib/metadata';
import StatCard from '@/components/ui/StatCard';
import SidebarEnquiryForm from '@/components/layout/SidebarEnquiryForm';


export async function generateMetadata() {
  const page = await getPageSEO("blog");
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

export default async function BlogListingPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;
  const categoryFilter = resolvedSearchParams?.category;

  // Fetch page layout/SEO design from old layout endpoint
  const pageResponse = await getData(API_ENDPOINTS.BLOGS);
  const pages = await getPageSEO("blog");

  const sections = pageResponse?.data?.sections?.reduce(
    (acc, section) => {
      acc[section.section_key] = section;
      return acc;
    },
    {}
  ) || {};

  const hero = sections.hero_section;

  // Fetch live blogs from new API
  let blogsRes;
  try {
    blogsRes = await getData(`${API_ENDPOINTS.BLOGS_LIST}?page=${page}`);
  } catch (error) {
    console.error("Error fetching live blogs:", error);
    blogsRes = { status: false, data: { data: [] }, categories: [] };
  }

  const rawBlogs = blogsRes?.data?.data || [];
  const categoriesList = blogsRes?.categories || [];

  const apiBlogs = rawBlogs.map(post => {
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      date: post.created_at,
      author: post.author?.name || "KDS Team",
      image: post.featured_image,
      category: post.category?.name || "General",
      categorySlug: post.category?.slug || "general",
      excerpt: post.excerpt || post.details?.[0]?.content?.replace(/<[^>]*>/g, "").substring(0, 150) || ""
    };
  });

  const filteredBlogs = categoryFilter
    ? apiBlogs.filter(post => post.categorySlug === categoryFilter || post.category?.toLowerCase() === categoryFilter.toLowerCase())
    : apiBlogs;

  const paginatedPosts = filteredBlogs;
  const totalPages = blogsRes?.data?.last_page || 1;

  return (
    <Suspense>

      <main className="overflow-x-clip bg-white transition-colors duration-500">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              pages?.meta_schema?.[0]?.schema || {}
            )
          }}
        />
        {/* ─── HERO SECTION ──────────────────────────────────────────────── */}
        <section className="relative mt-5 pt-5 pb-5 hero-bg overflow-hidden text-center">
          <div className="absolute inset-0 hero-grid opacity-30" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#1565c0]/10 glow-blob rounded-full blur-[120px]" />
          <div className="container mx-auto mt-5 px-6 max-w-7xl relative z-10">
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full premium-glass border-[#1565c0]/30 mb-8 animate-fade-in-up">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1565c0]">
                {hero?.title}
              </span>

            </div>
            {/* Heading */}
            <h1
              className="text-6xl md:text-8xl font-black !text-gray-200 dark:text-white mb-8 leading-[0.9] tracking-tighter animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >

              {hero?.subtitle?.split(" ").slice(0, 2).join(" ")}

              <br />

              <span className="gradient-text">

                {
                  hero?.subtitle
                    ?.split(" ")
                    ?.slice(2)
                    ?.join(" ")
                }

              </span>
            </h1>

            {/* Description */}
            <p
              className="text-gray-300 dark:text-[#8b949e] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >

              {hero?.description?.replace(/<[^>]*>/g, "")}

            </p>



          </div>

        </section>

        {/* ─── BLOG FEED WITH SIDEBAR ────────────────────────────────────── */}
        <section className="section-padding relative">
          <div className="container mx-auto px-6 max-w-7xl">

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content - Blog Posts (3 columns) */}
              <div className="lg:col-span-3">
                {paginatedPosts.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                      {paginatedPosts.map((post, idx) => (
                        <div
                          key={post.id}
                          className="animate-fade-in-up"
                          style={{ animationDelay: `${0.1 * (idx + 1)}s` }}
                        >
                          <BlogCard post={post} />
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-5 animate-fade-in-up">
                        <Pagination
                          currentPage={page}
                          totalPages={totalPages}
                          baseUrl="/blog"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-5 bg-gray-50 border border-gray-200 rounded-[3rem] animate-fade-in-up transition-colors duration-500">
                    <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mx-auto mb-8 border border-gray-200 shadow-sm">
                      <Tag className="text-gray-400" size={40} />
                    </div>
                    <h3
                      className="text-2xl font-black text-gray-900 mb-4 tracking-tight"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      No Analysis Published Yet
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                      Our engineers and analysts are currently compiling new industry
                      reports. Check back shortly for fresh insights.
                    </p>
                  </div>
                )}
              </div>

              {/* Sidebar (1 column) */}
              <aside className="space-y-8 animate-fade-in-up lg:col-span-1">
                {/* Related Services */}
                {categoriesList.length > 0 && (
                  <div className=" bg-white dark:bg-transparent premium-glass p-4 rounded-[2rem] border border-gray-200 dark:border-white/5">
                    <h3 className="text-gray-900 dark:text-white font-black text-sm  tracking-wider mb-2 flex items-center gap-2">
                      Categories
                    </h3>
                    <div className="my-3">
                      {categoriesList.map((category, idx) => (
                        <Link
                          key={category.id || idx}
                          href={`/blog?category=${category.slug}`}
                          className={`flex items-center justify-between group p-3 mb-3 rounded-xl border border-transparent transition-all ${categoryFilter === category.slug
                            ? "border-[#1565c0]/30 bg-[#1565c0]/10 text-[#1565c0]"
                            : "hover:border-[#1565c0]/20 hover:bg-[#1565c0]/5"
                            }`}
                        >
                          <span className="text-gray-700 dark:text-gray-300 font-medium text-sm group-hover:text-gray-900 dark:group-hover:text-white">
                            {category.name}
                          </span>
                          <ArrowRight
                            size={16}
                            className="text-[#1565c0] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                <div className="space-y-4">
                  <StatCard stat={{ key: "Workers Placed", value: "500+" }} />
                  <StatCard stat={{ key: "Satisfied Clients", value: "200+" }} />
                  <StatCard stat={{ key: "Projects Completed", value: "150+" }} />
                </div>

                <div className="relative md:sticky md:top-28 w-full mt-8">
                  <SidebarEnquiryForm serviceTitle="Blog" />
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
        <section className="py-5 relative overflow-hidden bg-gradient-to-br from-[#f8fafc] to-white border-t border-gray-200">
          <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
            <h2
              className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tighter"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Stay Informed. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1565c0] to-[#1e88e5]">Stay Precise.</span>
            </h2>
            <p className="text-gray-600 text-xl mb-8 italic">
              &ldquo;In a world of noise, data-driven precision is the only
              competitive advantage that lasts.&rdquo;
            </p>
            <div className="flex justify-center">
              <Button
                href="/contact"
                size="lg"
                className="bg-gradient-to-r from-[#1565c0] to-[#1e88e5] text-white border-0 shadow-lg shadow-[#1565c0]/20 hover:shadow-xl hover:shadow-[#1565c0]/30 transition-all"
              >
                Partner With KDS
              </Button>
            </div>
          </div>
        </section>

      </main>
    </Suspense>
  );
}