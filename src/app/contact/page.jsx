import { getServerData } from "@/lib/data";
import { API_ENDPOINTS } from "@/config/api";
import { getData } from "@/lib/data";
import { IMAGE_URL } from "@/config/api";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { getPageSEO } from "@/lib/metadata";
import ContactForm from "@/components/layout/ContactForm";

export async function generateMetadata() {

  const page = await getPageSEO("contact");

  return {
    title: page?.meta_title || "",

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

export default async function ContactPage() {
  const CONTACT = await getData(API_ENDPOINTS.CONTACT);
  const page = await getPageSEO("contact");


  const sections = CONTACT.data.sections.reduce(
    (acc, section) => {
      acc[section.section_key] = section;
      return acc;
    },
    {}
  );


  const hero_section = sections.hero_section;
  const contact_part = sections.contact_part;
  const data = await getServerData();
  const { siteInfo } = data;

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
      <section className="relative mt-5 pt-5 pb-5 hero-bg overflow-hidden text-center">

        <div className="absolute inset-0 hero-grid opacity-30" />

        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#1565c0]/10 glow-blob rounded-full blur-[120px]" />



        <div className="container mx-auto mt-5 px-6 max-w-7xl relative z-10">


          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full premium-glass border-[#1565c0]/30 mb-8 animate-fade-in-up">

            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1565c0]">

              {hero_section?.title}

            </span>

          </div>





          {/* Heading */}

          <h1
            className="text-6xl md:text-8xl font-black !text-gray-100 dark:text-white mb-3 leading-[0.9] tracking-tighter animate-fade-in-up transition-colors duration-500"
            style={{ animationDelay: "0.1s" }}
          >

            {hero_section?.subtitle?.split(" ")[0]}

            <span className="ms-3 gradient-text">

              {
                hero_section?.subtitle
                  ?.split(" ")
                  ?.slice(1)
                  ?.join(" ")
              }

            </span>


          </h1>





          {/* Description */}

          <p
            className="text-gray-300 dark:text-[#8b949e] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in-up transition-colors duration-500"
            style={{ animationDelay: "0.2s" }}
          >

            {hero_section?.description?.replace(/<[^>]*>/g, "")}

          </p>


        </div>

      </section>

      {/* ─── CONTACT SECTION ─────────────────────────────────────────── */}
      <section className="section-padding relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {/* Info Column */}
            <div
              className=""
              data-aos="fade-up"
              data-aos-delay={400}
            >

              <SectionTitle
                data={contact_part}
              // title={contact_part?.subtitle}

              />
              <div className="mt-3 space-y-2">


                {
                  contact_part?.extra?.map((item, idx) => {

                    const Icon =
                      item.key === "Technical Inquiries"
                        ? Mail
                        : item.key === "Direct Line"
                          ? Phone
                          : item.key === "HQ Address"
                            ? MapPin
                            : Clock;


                    const href =
                      item.key === "Technical Inquiries"
                        ? `mailto:${item.value}`
                        : item.key === "Direct Line"
                          ? `tel:${item.value}`
                          : "#";


                    return (

                      <div
                        key={idx}
                        className="flex gap-3 mb-4 group"
                      >


                        <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-[#161b22] border border-gray-200 dark:border-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#1565c0] transition-all duration-500 shadow-xl">


                          <Icon
                            size={28}
                            className="text-[#1565c0] group-hover:text-white transition-colors"
                          />


                        </div>





                        <div>


                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-[#8b949e] mb-2">

                            {item.key}

                          </p>



                          <a
                            href={href}
                            className="text-xl font-bold text-gray-900 dark:text-white hover:text-[#1565c0] transition-colors"
                            style={{ fontFamily: "Outfit, sans-serif" }}
                          >

                            {item.value}

                          </a>


                        </div>


                      </div>

                    )

                  })
                }


              </div>





              {/* Social Ecosystem */}
              <div className="mt-3 pt-2 border-t border-gray-200 dark:border-white/5">


                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-[#8b949e] mb-3">

                  Digital Ecosystem

                </p>


                <div className="flex gap-4">


                  {[
                    { icon: Linkedin, href: "#" },
                    { icon: Twitter, href: "#" },
                    { icon: Facebook, href: "#" },
                  ].map((social, i) => (


                    <a
                      key={i}
                      href={social.href}
                      className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-[#161b22] border border-gray-200 dark:border-white/5 flex items-center justify-center text-gray-600 dark:text-[#8b949e] hover:text-[#1565c0] transition-all hover:scale-110"
                    >

                      <social.icon size={22} />

                    </a>


                  ))}


                </div>


              </div>


            </div>

            {/* Form Column */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <ContactForm services={data.services} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTERACTIVE MAP ─────────────────────────────────────────── */}
      {/* <section className="h-[600px] w-full bg-gray-100 dark:bg-[#0d1117] relative border-t border-gray-200 dark:border-white/5 overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 brightness-[0.8] opacity-90">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113943.08056230872!2d80.859666014457!3d26.848820626027607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1716388487654!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        Map Overlays
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0d1117] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none" />

        <div className="absolute top-1/2 left-10 -translate-y-1/2 p-4 bg-white dark:bg-transparent premium-glass border border-gray-200 dark:border-white/10 rounded-[2.5rem] max-w-sm hidden lg:block animate-fade-in-up shadow-2xl transition-colors duration-500">
          <div className="inline-flex px-3 py-1 rounded-full bg-[#1565c0]/10 border border-[#1565c0]/30 mb-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#1565c0]">
              Our HQ
            </span>
          </div>
          <h5
            className="text-2xl font-black text-gray-900 dark:text-white mb-4 mt-2 tracking-tight transition-colors duration-500"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Explore Our Office
          </h5>
          <p className="text-gray-600 dark:text-[#8b949e] text-sm leading-relaxed mb-8 transition-colors duration-500">
            Located in the heart of industrial innovation, our headquarters
            serves as the central hub for our global supply chain network.
          </p>
          <div className="p-4 bg-gray-50 dark:bg-[#0d1117]/50 rounded-2xl border border-gray-200 dark:border-white/5 text-[11px] font-bold text-gray-500 dark:text-[#8b949e] leading-relaxed italic transition-colors duration-500">
            &ldquo;{siteInfo.address}&rdquo;
          </div>
        </div>
      </section> */}
    </main>
  );
}
