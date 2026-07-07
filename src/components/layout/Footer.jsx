import Link from "next/link";
import {
  Mail, Phone, MapPin, Linkedin, Twitter, Facebook,
  Clock, ChevronRight, Shield, Award, CheckCircle,
} from "lucide-react";

export default function Footer({ siteInfo, services }) {
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Our Services" },
    // { href: "/projects", label: "Projects" },
    { href: "/blog", label: "News & Insights" },
    { href: "/contact", label: "Contact Us" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#040f1f] overflow-hidden">

      {/* ═══ Pre-footer CTA Strip ═══ */}
      <div className="relative bg-gradient-to-r from-[#0d47a1] via-[#1565c0] to-[#1976d2] overflow-hidden !py-10 md:py-0 md:h-[200px] flex items-center">
        <img src="/industry.png" alt="CTA Background" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        {/* dot pattern */}
        <div className="absolute inset-0 opacity-10 " style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px"
        }} />
        <div className="container mx-auto !px-4 max-w-7xl relative z-10 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-3">
            <div className="text-center md:text-left">
              <p className="text-white font-black text-xl md:text-2xl leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
                Need Manpower? We Respond in 24-48 Hours.
              </p>
              <p className="text-white/70 text-sm mt-1">Delhi NCR's most trusted staffing partner</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
              <a
                href={`tel:${siteInfo?.phone || "+919899184918"}`}
                className="inline-flex !items-center justify-center gap-2 !px-6 !py-3 bg-white text-[#1565c0] rounded-xl text-sm font-black uppercase tracking-wider hover:bg-gray-50 transition-all shadow-lg w-full sm:w-auto"
              >
                <Phone size={15} />
                Call Now
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 !px-6 !py-3 bg-white/10 border border-white/30 text-white rounded-xl text-sm font-black uppercase tracking-wider hover:bg-white/20 hover:border-white/50 transition-all w-full sm:w-auto"
              >
                Get a Free Quote
                <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Subtle grid bg ═══ */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "linear-gradient(rgba(21,101,192,1) 1px, transparent 1px), linear-gradient(90deg, rgba(21,101,192,1) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1565c0]/4 rounded-full blur-[160px] pointer-events-none" />

      {/* ═══ Main Footer Body ═══ */}
      <div className="container mx-auto px-2 max-w-7xl relative z-10 pb-16 lg:pb-0">
        <div className="pt-5 pb-4">

          {/* TOP ROW: Logo + Tagline + Badges */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-20 pb-12 border-b border-white/5">

            {/* Brand block */}
            <div className="lg:max-w-xs xl:max-w-sm shrink-0">
              <Link href="/" className="inline-flex items-center gap-4 group mb-6">
                <div className="bg-white rounded-2xl p-3 shadow-xl shadow-[#1565c0]/20 border border-[#1565c0]/20 group-hover:border-[#1565c0]/50 transition-all duration-300">
                  <img
                    src="/kds-logo.png"
                    alt="KDS International Pvt. Ltd."
                    className="h-16 w-auto object-contain"
                  />
                </div>
              </Link>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Delhi NCR's most trusted manpower solutions partner — connecting skilled, semi-skilled, and unskilled workers with businesses that need reliable, compliant, and performance-driven staffing.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-2 mb-6">
                {[
                  { icon: Linkedin, href: siteInfo?.socialLinks?.linkedin || "#", label: "LinkedIn" },
                  { icon: Twitter, href: siteInfo?.socialLinks?.twitter || "#", label: "Twitter" },
                  { icon: Facebook, href: siteInfo?.socialLinks?.facebook || "#", label: "Facebook" },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1565c0] hover:border-[#1565c0] transition-all duration-300">
                    <s.icon size={15} />
                  </a>
                ))}
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 mt-3">
                {[
                  { icon: Shield, text: "PF/ESIC Compliant" },
                  { icon: Award, text: "Trusted Since 2005" },
                  { icon: CheckCircle, text: "500+ Clients" },
                ].map((b, i) => (
                  <div key={i} className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-gray-400 bg-white/3 border border-white/8 px-2 py-2 rounded-lg">
                    <b.icon size={10} className="text-[#1565c0]" />
                    {b.text}
                  </div>
                ))}
              </div>
            </div>

            {/* LINKS GRID */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-10">

              {/* Services */}
              <div>
                <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-4 flex items-center gap-2" style={{wordSpacing:'7px'}}>
                  <span className="w-4 h-1 bg-gradient-to-r from-[#1565c0] to-[#90caf9] rounded-full " />
                  Our Services
                </h4>
                <ul className="space-y-2">
                  {(services || []).slice(0, 6).map((service) => (
                    <li key={service.id} className="mb-2">
                      <Link
                        href={`/services/${service.slug}`}
                        className="group flex items-center gap-2 py-1 text-[15px] text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#1565c0] shrink-0 group-hover:w-2 group-hover:bg-[#90caf9] transition-all duration-200" />
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-gradient-to-r from-[#1565c0] to-[#90caf9] rounded-full" />
                  Quick Links
                </h4>
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.href} className="mb-2">
                      <Link
                        href={link.href}
                        className="group flex items-center gap-2 py-1 text-[15px] text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#1565c0] shrink-0 group-hover:w-2 group-hover:bg-[#90caf9] transition-all duration-200" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-5 flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-gradient-to-r from-[#1565c0] to-[#90caf9] rounded-full" />
                  Contact Us
                </h4>
                <ul className="space-y-4">
                  <li>
                    <a href={`tel:${siteInfo?.phone || "+919899184918"}`}
                      className="group flex items-start gap-3 hover:text-white transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-[#1565c0]/10 border border-[#1565c0]/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#1565c0] group-hover:border-[#1565c0] transition-all">
                        <Phone size={13} className="text-[#90caf9]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-0">Phone</p>
                        <p className="text-sm text-gray-400 font-semibold group-hover:text-white transition-colors">{siteInfo?.phone || "+91 9899184918"}</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${siteInfo?.email || "info@kdsinternational.org"}`}
                      className="group flex items-start gap-3 hover:text-white transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-[#1565c0]/10 border border-[#1565c0]/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#1565c0] group-hover:border-[#1565c0] transition-all">
                        <Mail size={13} className="text-[#90caf9]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-0">Email</p>
                        <p className="text-sm text-gray-400 font-semibold group-hover:text-white transition-colors break-all">{siteInfo?.email || "info@kdsinternational.org"}</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#1565c0]/10 border border-[#1565c0]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin size={13} className="text-[#90caf9]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-0">Office</p>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {siteInfo?.address || "D-105, First Floor, Lalita Park, Laxmi Nagar, Delhi - 110092"}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#1565c0]/10 border border-[#1565c0]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock size={13} className="text-[#90caf9]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-0">Working Hours</p>
                        <p className="text-sm text-gray-400">Mon – Sat: 9:00 AM – 7:00 PM</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="pt-7 flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Left: copyright + legal */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-3">
              <p className="text-gray-400 text-[12px] font-medium mb-0">
                © {currentYear} <span className="text-gray-400">KDS International Pvt. Ltd.</span> All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <span className="hidden sm:block w-px h-3 bg-white/10" />
                <Link href="/privacy-policy" className="text-gray-400 text-[12px] hover:text-[#90caf9] transition-colors">Privacy Policy</Link>
                <span className="text-white/10">·</span>
                <Link href="/term-conditions" className="text-gray-400 text-[12px] hover:text-[#90caf9] transition-colors">Terms of Service</Link>
                <span className="text-white/10">·</span>
                <Link href="/sitemap.xml" className="text-gray-400 text-[12px] hover:text-[#90caf9] transition-colors">Sitemap</Link>
              </div>
            </div>

            {/* Right: status indicator */}
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mt-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                All systems operational
              </div>
              <span className="text-white/10">|</span>
              <a href={siteInfo?.website || "https://www.kdsinternational.org"} target="_blank" rel="noopener noreferrer" className="hover:text-[#90caf9] transition-colors">
                kdsinternational.org
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
