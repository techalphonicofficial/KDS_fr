import { getServerData } from "@/lib/data";
import { CheckCircle, Target, Eye, History, Calendar, Shield, Lock, Mail, Phone, MapPin, Globe } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import StatCard from "@/components/ui/StatCard";
import Certification from "@/components/common/certification/Certification";

export const metadata = {
  title: "Privacy Policy | KDS International",
  description:
    "Read our privacy policy to understand how KDS International collects, uses, and protects your personal information in compliance with Indian data protection laws.",
};

const isCenter = "left" === "center";

export default async function PrivacyPolicy() {
  const data = await getServerData();
  const { privacyPolicy, siteInfo } = data;

  // Format the last updated date
  const lastUpdated = new Date(privacyPolicy.lastUpdated).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="overflow-hidden bg-white dark:bg-[#0d1117] transition-colors duration-500">
      {/* ─── HERO SECTION ──────────────────────────────────────────────── */}
      <section className="relative mt-5 pt-5 pb-5 hero-bg overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#1565c0]/15 glow-blob rounded-full" />

        <div className="container mx-auto mt-5 px-6 max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full premium-glass border-[#1565c0]/30 mb-8 animate-fade-in-up">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1565c0]">
              Read Carefully
            </span>
          </div>
          <h1
            className="text-6xl md:text-8xl font-black !text-gray-200 dark:text-white mb-3 mt-2 leading-[0.9] tracking-tighter animate-fade-in-up transition-colors duration-500"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="ms-3 gradient-text">Privacy Policy.</span>
          </h1>
          <p
            className="text-gray-300 dark:text-[#8b949e] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-3 animate-fade-in-up transition-colors duration-500"
            style={{ animationDelay: "0.2s" }}
          >
            How we collect, use, and protect your information in compliance with Indian data protection laws.
          </p>
          
          {/* Last Updated Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1565c0]/10 rounded-full mt-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Calendar className="w-4 h-4 text-[#1565c0]" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Last Updated: <span className="font-semibold text-[#1565c0]">{lastUpdated}</span>
            </span>
          </div>
        </div>
      </section>

      {/* ─── PRIVACY POLICY CONTENT ───────────────────────────────────── */}
      <section className="section-padding bg-gray-50 dark:bg-[#161b22]/30 relative transition-colors duration-500">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* Introduction Section with Shield Icon */}
          <div className="mb-4 p-4 bg-white dark:bg-[#0d1117] rounded-3xl shadow-lg border border-gray-200 dark:border-white/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#1565c0]/10 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-[#1565c0]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
                  {privacyPolicy.sections[0].title}
                </h2>
                <div className="space-y-4">
                    {privacyPolicy.sections[0].content.map((paragraph, idx) => (
                    <p key={idx} className="text-gray-600 dark:text-[#8b949e] text-lg leading-relaxed">
                        {paragraph}
                    </p>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Sections */}
          <div className="space-y-8">
            {privacyPolicy.sections.slice(1).map((section, index) => (
              <div 
                key={index}
                className="p-4 mb-4 bg-white dark:bg-[#0d1117] rounded-2xl border border-gray-200 dark:border-white/5 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3" style={{ fontFamily: "Outfit, sans-serif" }}>
                  <span className="w-8 h-8 rounded-full bg-[#1565c0]/10 flex items-center justify-center text-sm font-bold text-[#1565c0]">
                    {index + 2}
                  </span>
                  {section.title}
                </h3>
                
                {section.content && (
                        <div className="space-y-4 mb-4">
                        {typeof section.content === 'string' ? (
                            // If content is a string, check if it has multiple paragraphs
                            section.content.includes('\n\n') ? (
                            section.content.split('\n\n').map((paragraph, idx) => (
                                <p key={idx} className="text-gray-600 dark:text-[#8b949e] text-lg leading-relaxed">
                                {paragraph}
                                </p>
                            ))
                            ) : (
                            // Single paragraph
                            <p className="text-gray-600 dark:text-[#8b949e] text-lg leading-relaxed">
                                {section.content}
                            </p>
                            )
                        ) : Array.isArray(section.content) ? (
                            // If content is an array of paragraphs
                            section.content.map((paragraph, idx) => (
                            <p key={idx} className="text-gray-600 dark:text-[#8b949e] text-lg leading-relaxed">
                                {paragraph}
                            </p>
                            ))
                        ) : null}
                        </div>
                    )}

                {/* List Items */}
                {section.listItems && section.listItems.length > 0 && (
                  <ul className="space-y-3 mt-4">
                    {section.listItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#1565c0] shrink-0 mt-0.5" />
                        <span className="text-gray-600 dark:text-[#8b949e]">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Note/Bullet Point */}
                {section.note && (
                  <div className="mt-4 p-4 bg-[#1565c0]/5 rounded-xl border-l-4 border-[#1565c0]">
                    <p className="text-sm text-gray-600 dark:text-[#8b949e] italic">
                      {section.note}
                    </p>
                  </div>
                )}

                {/* Contact Details */}
                {section.contactDetails && (
                  <div className="mt-3 p-4 bg-gray-50 dark:bg-[#161b22] rounded-xl">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#1565c0]" />
                      Contact Information
                    </h4>
                    <div className="space-y-3">
                      <p className="flex items-center gap-3 text-gray-600 dark:text-[#8b949e]">
                        <span className="font-medium text-gray-900 dark:text-white min-w-[100px]">Entity:</span>
                        {section.contactDetails.entity}
                      </p>
                      <p className="flex items-center gap-3 text-gray-600 dark:text-[#8b949e]">
                        <MapPin className="w-4 h-4 text-[#1565c0] shrink-0" />
                        <span>{section.contactDetails.address}</span>
                      </p>
                      <p className="flex items-center gap-3 text-gray-600 dark:text-[#8b949e]">
                        <Mail className="w-4 h-4 text-[#1565c0] shrink-0" />
                        <a href={`mailto:${section.contactDetails.email}`} className="hover:text-[#1565c0] transition-colors">
                          {section.contactDetails.email}
                        </a>
                      </p>
                      <p className="flex items-center gap-3 text-gray-600 dark:text-[#8b949e]">
                        <Phone className="w-4 h-4 text-[#1565c0] shrink-0" />
                        <a href={`tel:${section.contactDetails.phone}`} className="hover:text-[#1565c0] transition-colors">
                          {section.contactDetails.phone}
                        </a>
                      </p>
                      <p className="flex items-center gap-3 text-gray-600 dark:text-[#8b949e]">
                        <Globe className="w-4 h-4 text-[#1565c0] shrink-0" />
                        <a href={section.contactDetails.website} target="_blank" rel="noopener noreferrer" className="hover:text-[#1565c0] transition-colors">
                          {section.contactDetails.website.replace('https://', '')}
                        </a>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Disclaimer Section */}
          {privacyPolicy.disclaimer && (
            <div className="mt-4 p-4 bg-[#1565c0]/5 rounded-2xl text-center border border-[#1565c0]/20">
              <Lock className="w-8 h-8 text-[#1565c0] mx-auto mb-3" />
              <p className="text-sm text-gray-600 dark:text-[#8b949e] italic mb-1">
                {privacyPolicy.disclaimer}
              </p>
            </div>
          )}

          {/* Contact CTA */}
          <div className="mt-5 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1565c0]/10 rounded-full mb-4">
              <span className="text-sm font-medium text-[#1565c0]">Have Questions?</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
              We're Here to Help
            </h3>
            <p className="text-gray-600 dark:text-[#8b949e] max-w-2xl mx-auto mb-6">
              If you have any questions about our privacy practices or would like to exercise your data rights, please don't hesitate to contact us.
            </p>
            <Button href="/contact" size="lg" className="shadow-2xl shadow-[#1565c0]/20">
              Contact Our Data Protection Team
            </Button>
          </div>

        </div>
      </section>
    </main>
  );
}