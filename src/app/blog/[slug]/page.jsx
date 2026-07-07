import { getBySlug, getData } from "@/lib/data";
import { notFound } from "next/navigation";
import {
  Calendar,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import { API_ENDPOINTS, IMAGE_URL, API_URL } from "@/config/api";
import { getPageSEO } from "@/lib/metadata";
import SidebarEnquiryForm from "@/components/layout/SidebarEnquiryForm";


export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  try {
    const response = await getBySlug(API_ENDPOINTS.BLOGS_SLUG, slug);
    const post = response?.data;

    if (!post) return { title: "Post Not Found | KDS International" };

    const name = post.title || slug;
    const metaTitle = post.meta_title || `${name} | KDS International Blog`;
    const metaDescription = post.meta_description || post.excerpt || "";
    const metaKeyword = post.meta_keywords || `${name}, blog, insights, industry news, KDS International`;

    const imagePath = post.featured_image || "";
    const imageUrl = imagePath
      ? (imagePath.startsWith("http")
        ? imagePath
        : imagePath.startsWith("/")
          ? `${IMAGE_URL}${imagePath}`
          : `${IMAGE_URL}/${imagePath}`)
      : "";

    return {
      title: metaTitle,
      description: metaDescription,
      keywords: metaKeyword,
      alternates: {
        canonical: post?.canonical_tag,
      },

      robots: post?.meta_robots_tag,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        images: imageUrl ? [{ url: imageUrl }] : [],
      },
      other: {
        "script:type": typeof post.meta_schema === "string"
          ? post.meta_schema
          : JSON.stringify(post.meta_schema || []),
      },
    };
  } catch (error) {
    console.error("Error generating blog metadata:", error);
    return { title: "Blog Post | KDS International" };
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  let blog;
  let relatedPosts = [];

  try {
    const response = await getBySlug(API_ENDPOINTS.BLOGS_SLUG, slug);
    blog = response?.data;
    console.log("blogdata", blog)
  } catch (error) {
    console.error("Error fetching blog details:", error);
  }

  if (!blog) notFound();

  try {
    const allBlogsResponse = await getData(API_ENDPOINTS.BLOGS_LIST);
    const allBlogsList = allBlogsResponse?.data?.data || [];
    relatedPosts = allBlogsList
      .filter((p) => p.id !== blog.id)
      .slice(0, 3)
      .map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        category: typeof p.category === "object" ? p.category?.name : p.category || "General",
      }));
  } catch (error) {
    console.error("Error fetching related blogs:", error);
  }

  const authorName = typeof blog.author === "object" ? blog.author?.name : blog.author || "KDS International";
  const categoryName = typeof blog.category === "object" ? blog.category?.name : blog.category || "General";
  const postDate = blog.created_at || blog.date;
  const formattedDate = postDate ? new Date(postDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }) : "";

  const featuredImage = blog.featured_image
    ? (blog.featured_image.startsWith("http") ? blog.featured_image : `${IMAGE_URL}/${blog.featured_image}`)
    : "";

  const hasSpecialSections = blog.details?.some(
    detail => detail.content && (detail.content.includes("Executive Summary") || detail.content.includes("Strategic Takeaways"))
  ) || false;

  return (
    <main className="overflow-x-clip bg-white dark:bg-[#0d1117] transition-colors duration-500">

      {/* ─── HERO SECTION ──────────────────────────────────────────────── */}
      <section className="relative  mt-5 pt-5 pb-5 hero-bg overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#1565c0]/10 glow-blob rounded-full blur-[120px]" />

        <div className="container mx-auto mt-5 px-6 max-w-5xl relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full premium-glass border-[#1565c0]/30 mb-4 animate-fade-in-up hover:border-[#1565c0] transition-colors group"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform text-white"
            />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1565c0]">
              Return to Archive
            </span>
          </Link>

          <div
            className="mb-4 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ffffff]/90 mb-4 block">
              {categoryName}
            </span>
            <h1
              className="text-4xl md:text-7xl font-black !text-gray-200 dark:text-white leading-[0.9] tracking-tighter transition-colors duration-500"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {blog.title}
            </h1>
          </div>

          <div
            className="flex flex-wrap items-center gap-8 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1565c0] to-[#0d47a1] flex items-center justify-center text-white font-black shadow-xl overflow-hidden">
                {blog.author?.profile_photo ? (
                  <img
                    src={blog.author.profile_photo.startsWith("http") ? blog.author.profile_photo : `${IMAGE_URL}/${blog.author.profile_photo}`}
                    alt={authorName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  authorName.charAt(0)
                )}
              </div>
              <div>
                <p className="text-gray-300 mb-1 dark:text-white text-sm font-black uppercase tracking-widest transition-colors duration-500">
                  {authorName}
                </p>
                <p className="text-gray-400 mb-0 dark:text-[#8b949e] text-[10px] font-bold uppercase tracking-widest transition-colors duration-500">
                  Global Analyst
                </p>
              </div>
            </div>
            <div className="h-10 w-px bg-gray-200 dark:bg-white/10 hidden sm:block transition-colors duration-500" />
            <div className="flex items-center gap-2 text-gray-300 dark:text-[#8b949e] transition-colors duration-500">
              <Calendar size={16} className="text-[#1565c0]" />
              <span className="text-xs font-bold uppercase tracking-widest transition-colors duration-500">
                {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ARTICLE CONTENT ─────────────────────────────────────────── */}
      <section className="section-padding relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Main Pillar */}
            <article
              className="lg:col-span-8 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className=" dark:bg-transparent !premium-glass p-4 md:p-4 rounded-[3rem] border border-gray-200 dark:border-white/5 relative overflow-hidden transition-colors duration-500">
                <div className="absolute top-0 left-0 w-32 h-32 bg-[#1565c0]/5 blur-3xl" />

                {/* ADD IMAGE HERE */}
                {blog.details?.[0]?.image && (
                  <div className="mb-4 relative rounded-2xl overflow-hidden">
                    <img
                      src={
                        blog.details[0].image.startsWith("http")
                          ? blog.details[0].image
                          : `${IMAGE_URL}/${blog.details[0].image}`
                      }
                      alt={blog.details[0].alt_text || blog.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                <div className="prose prose-teal dark:prose-invert max-w-none relative z-10 transition-colors duration-500">
                  {blog.excerpt && (
                    <p className="text-2xl leading-relaxed text-gray-800 dark:text-white/90 font-medium italic mb-4 border-l-[6px] border-[#1565c0] ps-3 py-4 bg-[#1565c0]/5 rounded-r-2xl transition-colors duration-500">
                      &ldquo;{blog.excerpt}&rdquo;
                    </p>
                  )}

                  {hasSpecialSections ? (
                    <>
                      {blog.details
                        ?.filter(detail =>
                          detail.content.includes("Executive Summary")
                        )
                        .map(detail => (
                          <div key={detail.id}>
                            <div
                              className="text-gray-600 dark:text-[#8b949e] text-lg leading-relaxed mb-4 transition-colors duration-500"
                              dangerouslySetInnerHTML={{
                                __html: detail.content
                              }}
                            />
                          </div>
                        ))}

                      <div className="my-4 p-4 bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/5 rounded-[2rem] shadow-sm dark:shadow-inner relative overflow-hidden group transition-colors duration-500">
                        <div className="absolute inset-0 hero-grid opacity-10" />
                        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 tracking-widest uppercase relative z-10 transition-colors duration-500">
                          Strategic Takeaways
                        </h3>
                        <ul className="space-y-6 relative z-10 ps-2">
                          {(() => {
                            const strategic = blog.details?.find(
                              detail => detail.content.includes("Strategic Takeaways")
                            )?.content;

                            const parser = strategic
                              ?.match(/<li>(.*?)<\/li>/g)
                              ?.map(item =>
                                item.replace(/<[^>]+>/g, "")
                              );

                            return parser?.map((item, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#1565c0]/20 flex icon items-center justify-center shrink-0 mt-1">
                                  <div className="w-2 h-2 rounded-full bg-[#1565c0] shadow-[0_0_10px_#1565c0]" />
                                </div>
                                <p className="text-gray-700 dark:text-[#e6edf3] font-medium transition-colors duration-500">
                                  {item}
                                </p>
                              </li>
                            ));
                          })()}
                        </ul>
                      </div>

                      {blog.details
                        ?.filter(detail =>
                          detail.content.includes("Technological Integration")
                        )
                        .map(detail => (
                          <div key={detail.id}>
                            <div
                              className="text-gray-600 dark:text-[#8b949e] text-lg leading-relaxed mb-8 transition-colors duration-500"
                              dangerouslySetInnerHTML={{
                                __html: detail.content
                              }}
                            />
                          </div>
                        ))}
                    </>
                  ) : (
                    blog.details?.map((detail, idx) => (
                      <div key={detail.id} className="mb-8">
                        {idx > 0 && detail.image && detail.image !== blog.featured_image && (
                          <div className="mb-6 relative rounded-2xl overflow-hidden shadow-md">
                            <img
                              src={
                                detail.image.startsWith("http")
                                  ? detail.image
                                  : `${IMAGE_URL}/${detail.image}`
                              }
                              alt={detail.alt_text || blog.title}
                              className="w-full h-auto object-cover max-h-[450px]"
                            />
                          </div>
                        )}
                        <div
                          className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed transition-colors duration-500"
                          dangerouslySetInnerHTML={{
                            __html: detail.content
                          }}
                        />
                      </div>
                    ))
                  )}
                </div>

                {/* Author Signature */}
                {/* <div className="mt-20 pt-12 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row gap-10 items-center transition-colors duration-500">
                  <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-[#1565c0] to-[#0d47a1] flex items-center justify-center text-white text-4xl font-black shrink-0 shadow-2xl rotate-3 overflow-hidden">
                    {blog.author?.profile_photo ? (
                      <img
                        src={blog.author.profile_photo.startsWith("http") ? blog.author.profile_photo : `${IMAGE_URL}/${blog.author.profile_photo}`}
                        alt={authorName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      authorName.charAt(0)
                    )}
                  </div>
                  <div className="text-center md:text-left">
                    <h4
                      className="text-2xl font-black text-gray-900 dark:text-white mb-3 transition-colors duration-500"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      About the Analysis Team
                    </h4>
                    <p className="text-gray-600 dark:text-[#8b949e] leading-relaxed max-w-xl italic transition-colors duration-500">
                      The {authorName} division at KDS International leverages
                      43 years of forensic industrial data to provide unmatched
                      perspectives on global trade and precision engineering.
                    </p>
                  </div>
                </div> */}
                <div className="mt-20 pt-12 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row gap-10 items-center transition-colors duration-500">
                  {/* Author Image */}
                  <div className="relative shrink-0">
                    <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-[#1565c0] to-[#0d47a1] flex items-center justify-center text-white text-4xl font-black shadow-2xl rotate-3 overflow-hidden">
                      {blog.author?.profile_photo ? (
                        <img
                          src={
                            blog.author.profile_photo.startsWith("http")
                              ? blog.author.profile_photo
                              : `${IMAGE_URL}/${blog.author.profile_photo}`
                          }
                          alt={authorName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        authorName.charAt(0)
                      )}
                    </div>

                    {/* LinkedIn Icon */}
                    <a
                      href={blog.author?.linkedin || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute -bottom-2 -left-2 w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center shadow-lg hover:scale-110 transition"
                    >
                      <FaLinkedinIn size={18} />
                    </a>
                  </div>

                  {/* Author Details */}
                  <div className="text-center md:text-left">
                    <p className="text-sm uppercase tracking-wider text-[#1565c0] font-semibold mb-1">
                      Author
                    </p>

                    <h3
                      className="text-2xl font-black text-gray-900 dark:text-white mb-3"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {authorName}
                    </h3>

                    <h4
                      className="text-xl font-bold text-gray-900 dark:text-white mb-3"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      About the Analysis Team
                    </h4>

                    <p className="text-gray-600 dark:text-[#8b949e] leading-relaxed max-w-xl italic">
                      The <strong>{authorName}</strong> division at KDS International leverages
                      43 years of forensic industrial data to provide unmatched perspectives on
                      global trade and precision engineering.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar Pillar */}
            <aside
              className="lg:col-span-4 space-y-12 "
              style={{ animationDelay: "0.4s" }}
            >
              {/* Share Hub */}
              <div className=" dark:bg-transparent !premium-glass p-4 mb-4 rounded-[2rem] border   border-gray-200 dark:border-white/5 transition-colors duration-500">
                <h3 className="text-gray-900 dark:text-white font-black text-xs uppercase tracking-[0.3em] mb-8 flex items-center gap-3 transition-colors duration-500">
                  <Share2 size={16} className="text-[#1565c0]" /> Distribute
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: Linkedin, label: "In" },
                    { icon: Twitter, label: "X" },
                    { icon: Facebook, label: "Fb" },
                  ].map((social, i) => (
                    <button
                      key={i}
                      className="flex flex-col items-center justify-center gap-3 p-2 py-3 rounded-4 bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/5 hover:border-[#1565c0]/50 dark:hover:border-[#1565c0]/50 transition-all text-gray-600 dark:text-[#8b949e] hover:text-[#1565c0] dark:hover:text-[#1565c0] group duration-500"
                    >
                      <social.icon
                        size={22}
                        className="group-hover:scale-110 transition-transform"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Related Perspectives */}
              {relatedPosts.length > 0 && (
                <div className="bg-gray-50 dark:bg-transparent !premium-glass p-4 mb-4 rounded-[2rem] border border-gray-200 dark:border-white/5 transition-colors duration-500">
                  <h3 className="text-gray-900 dark:text-white font-black text-xs uppercase tracking-[0.3em] mb-8 transition-colors duration-500">
                    Related Blogs
                  </h3>
                  <div className="space-y-8">
                    {relatedPosts.map((rp) => (
                      <Link
                        key={rp.id}
                        href={`/blog/${rp.slug}`}
                        className="group block my-4"
                      >
                        <p className="text-[#1565c0] text-[10px] font-black uppercase tracking-widest mb-2 opacity-70">
                          {rp.category}
                        </p>
                        <h4
                          className="text-gray-900 dark:text-white text-lg font-black leading-tight group-hover:text-[#1565c0] dark:group-hover:text-[#1565c0] transition-colors tracking-tight duration-500"
                          style={{ fontFamily: "Outfit, sans-serif" }}
                        >
                          {rp.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-3 text-gray-600 dark:text-[#8b949e] text-[10px] font-bold uppercase tracking-widest transition-colors duration-500">
                          <span>Read More</span>
                          <ArrowLeft
                            size={12}
                            className="rotate-180 group-hover:translate-x-1 transition-transform"
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="relative lg:sticky lg:top-28 w-full">
                <SidebarEnquiryForm serviceTitle={blog.title} />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
