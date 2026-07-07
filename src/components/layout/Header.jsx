"use client";

import { useState, useEffect, useRef, useMemo } from "react"; 
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  ArrowRight,
  Briefcase,
  Building2,
  ShieldCheck,
  Truck,
  Warehouse,
  Server,
  LayoutGrid,
  Cpu,
  Users,
  ClipboardCheck,
  FileWarning,
  MapPinned,
  BarChart3,
  Factory,
  Zap,
  Construction,
  Radio,
  Hospital,
  Monitor,
  ShoppingCart,
  Landmark,
  Coins,
  Theater,
} from "lucide-react";
import clsx from "clsx";
import { solutionsData, technologyData } from "@/lib/solutionsAndTechData";


const navLinks = [
  { href: "/solutions", label: "Solutions", hasMegaMenu: true },
  { href: "/technology-and-operations", label: "Technology and Operations", hasMegaMenu: true },
  { href: "/services", label: "Services", hasDropdown: true },
  { href: "/industries", label: "Industries", hasMegaMenu: true },
  { href: "/blog", label: "Blogs" },
  { href: "/other", label: "Other", hasDropdown: true },
  { href: "/contact", label: "Contact" },
];

const otherLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/clients", label: "Clients" },
  { href: "/career", label: "Career" },
];

const industriesData = [
  {
    category: "Manufacturing",
    items: [
      { name: "Automotive", slug: "automotive" },
      { name: "Aerospace", slug: "aerospace" },
      { name: "Electronics", slug: "electronics" },
      { name: "Industrial Machinery", slug: "industrial-machinery" },
    ]
  },
  {
    category: "Energy & Utilities",
    items: [
      { name: "Oil & Gas", slug: "oil-gas" },
      { name: "Renewable Energy", slug: "renewable-energy" },
      { name: "Power Generation", slug: "power-generation" },
      { name: "Mining", slug: "mining" },
    ]
  },
  {
    category: "Infrastructure",
    items: [
      { name: "Construction", slug: "construction" },
      { name: "Transportation", slug: "transportation" },
      { name: "Marine & Shipping", slug: "marine-shipping" },
      { name: "Railways", slug: "railways" },
    ]
  },
  {
    category: "Technology",
    items: [
      { name: "Telecommunications", slug: "telecommunications" },
      { name: "Data Centers", slug: "data-centers" },
      { name: "Semiconductors", slug: "semiconductors" },
      { name: "Medical Technology", slug: "medical-technology" },
    ]
  }
];

const solutionIcons = {
  "Workforce Management": Briefcase,
  "Facility Operations": Building2,
  "Surveillance & Monitoring": ShieldCheck,
  "Logistics Coordination": Truck,
  "Warehouse Operations": Warehouse,
  "Infrastructure Support": Server,
  "Integrated Site Management": LayoutGrid,
};

const technologyIcons = {
  "Command Center": Cpu,
  "Workforce Digitization": Users,
  "Attendance & Compliance": ClipboardCheck,
  "Incident Reporting": FileWarning,
  "GPS & Patrol Tracking": MapPinned,
  "Analytics & Reporting": BarChart3,
};

const industryIcons = {
  "Manufacturing": Factory,
  "Energy & Utilities": Zap,
  "Infrastructure": Construction,
  "Technology": Monitor,
  "Healthcare": Hospital,
  "Health Care": Hospital,
  "Retail & Consumer": ShoppingCart,
  "Public Sector": Landmark,
  "Financial Services": Coins,
  "Transportation": Truck,
  "Transporatation": Truck,
  "Transporatation ": Truck,
  "Entertainment": Theater,
};

const formatTitle = (title) => {
  if (!title) return "";
  if (title.includes(" ") || /[A-Z]/.test(title)) return title;
  return title
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function Header({ services, solutions = [], technologies = [], industries = [], siteName }) {
  const formattedSolutions = useMemo(() => {
    if (!solutions || solutions.length === 0) return solutionsData;
    const groups = {};
    solutions.forEach(item => {
      const catTitle = item.category?.title || "Solutions";
      if (!groups[catTitle]) {
        groups[catTitle] = [];
      }
      groups[catTitle].push({
        name: formatTitle(item.title),
        slug: item.slug
      });
    });
    return Object.keys(groups).map(title => ({
      category: title,
      items: groups[title]
    }));
  }, [solutions]);

  const formattedTechnologies = useMemo(() => {
    if (!technologies || technologies.length === 0) return technologyData;
    const groups = {};
    technologies.forEach(item => {
      const catTitle = item.category?.title || "Technology & Operations";
      if (!groups[catTitle]) {
        groups[catTitle] = [];
      }
      groups[catTitle].push({
        name: formatTitle(item.title),
        slug: item.slug
      });
    });
    return Object.keys(groups).map(title => ({
      category: title,
      items: groups[title]
    }));
  }, [technologies]);

  const formattedIndustries = useMemo(() => {
    if (!industries || industries.length === 0) return industriesData;
    return industries
      .map(cat => ({
        category: formatTitle(cat.name),
        items: (cat.industries || []).map(ind => ({
          name: formatTitle(ind.name),
          slug: ind.slug
        }))
      }))
      .filter(cat => cat.items.length > 0);
  }, [industries]);

  const getMenuData = (label) => {
    if (label === "Solutions") return {
      header: "Our Solutions",
      viewAllLink: "/solutions",
      viewAllText: "Explore All Solutions →",
      data: formattedSolutions,
      baseSlug: "solutions"
    };
    if (label === "Technology and Operations") return {
      header: "Technology & Operations",
      viewAllLink: "/technology-and-operations",
      viewAllText: "Explore Technology & Operations →",
      data: formattedTechnologies,
      baseSlug: "technology-and-operations"
    };
    if (label === "Industries") return {
      header: "Industries We Serve",
      viewAllLink: "/industries",
      viewAllText: "Explore All Industries →",
      data: formattedIndustries,
      baseSlug: "industries"
    };
    return null;
  };
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  const handleMouseEnter = (menuId) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenMenu(menuId);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 100);
  };

  const handleNavItemMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenMenu(null);
  };

  const isHome = pathname === "/";
  const isTransparent = !scrolled && isHome;

  return (
    <>
      <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled || !isHome
          ? "py-3 bg-white dark:bg-[#0d1117] backdrop-blur-lg border-b border-gray-200 dark:border-[#1565c0]/20 shadow-lg"
          : "py-4  bg-transparent",
      )}
    >
      {(scrolled || !isHome) && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0d47a1] via-[#1565c0] to-[#1976d2] " />
      )}

      <div className="container mx-auto px-2 max-w-7xl  text-gray-950">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className={clsx(
              "rounded-xl overflow-hidden transition-all duration-500 border-2",
              isTransparent
                ? "border-white/20 shadow-lg shadow-black/30 bg-white backdrop-blur-sm "
                : "border-[#1565c0]/30 dark:border-[#1565c0]/40 bg-white dark:bg-white shadow-md shadow-[#1565c0]/20 ",
            )}>
              <img
                src="/kds-logo.png"
                alt="KDS International Pvt. Ltd"
                className="h-16 w-auto object-contain p-1"
              />
            </div>
          </Link>
          <nav className="hidden lg:flex items-center justify-center gap-1 flex-1" ref={navRef}>
            {navLinks.filter(l => l.href !== "/contact").map((link) =>
              link.hasMegaMenu ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}>
                  <button
                    className={clsx(
                      "flex items-center gap-2 px-2 py-2 rounded-lg !text-[14px] whitespace-nowrap !lg:text-[10px] !xl:text-[14px] font-bold uppercase tracking-[0.12em] transition-all duration-300",
                      pathname.startsWith(link.href)
                        ? "bg-[#1565c0]/10 text-[#1565c0]"
                        : isTransparent
                          ? "text-white hover:text-white/80 hover:bg-white/10"
                          : "text-[#1565c0] dark:text-[#90caf9] hover:text-[#0d47a1] hover:bg-[#1565c0]/5 dark:hover:bg-[#1565c0]/10",
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      size={11}
                      className={clsx(
                        "transition-transform duration-300",
                        openMenu === link.label && "rotate-180",
                      )}
                    />
                  </button>

                  {(() => {
                    const menuInfo = getMenuData(link.label);
                    if (!menuInfo) return null;

                    if (link.label === "Industries") {
                      return (
                        <div
                          className={clsx(
                            "absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white dark:bg-[#0d1117] border border-gray-100 dark:border-[#1565c0]/20 rounded-2xl shadow-2xl shadow-[#1565c0]/10 overflow-hidden transition-all duration-300 origin-top w-[1140px] !p-6 z-[9999]",
                            openMenu === link.label
                              ? "opacity-100 scale-100 translate-y-0"
                              : "opacity-0 scale-95 -translate-y-3 pointer-events-none",
                          )}
                        >
                          <div className="text-center mb-6">
                            <h2 className="text-[#0d47a1] dark:text-[#90caf9] font-black !text-xl uppercase tracking-widest">
                              {menuInfo.header}
                            </h2>
                            <div className="flex items-center justify-center gap-2 mt-2">
                              <div className="w-16 h-[2px] bg-[#1565c0]" />
                              <div className="w-2.5 h-2.5 rounded-full bg-[#1565c0]" />
                              <div className="w-16 h-[2px] bg-[#1565c0]" />
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-x-8 gap-y-6 text-start">
                            {menuInfo.data.map((category, idx) => {
                              const IconComponent = industryIcons[category.category] || Factory;

                              return (
                                <div key={idx} className="space-y-3">
                                  <div className="flex items-center gap-3 border-b border-gray-100 dark:border-white/10 pb-2">
                                    <IconComponent size={50} className="text-[#1565c0] shrink-0" />
                                    <h3 className="font-extrabold text-gray-800 dark:text-white uppercase tracking-wider !text-[18px] leading-tight">
                                      {category.category}
                                    </h3>
                                  </div>
                                  <div className="space-y-2">
                                    {category.items.map((item) => (
                                      <Link
                                        key={item.slug}
                                        href={`/${menuInfo.baseSlug}/${item.slug}`}
                                        className="flex items-center gap-2 text-[14px] font-semibold text-gray-600 dark:text-gray-400 hover:text-[#1565c0] dark:hover:text-[#90caf9] transition-all group/item py-0.5"
                                      >
                                        <span className="text-[#1565c0] dark:text-[#90caf9] font-bold text-[12px] group-hover/item:translate-x-0.5 transition-transform">
                                          &gt;
                                        </span>
                                        <span className="group-hover/item:translate-x-0.5 transition-transform text-start">
                                          {item.name}
                                        </span>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="mt-8">
                            <Link
                              href={menuInfo.viewAllLink}
                              className="block w-full py-3 bg-[#1565c0] hover:bg-[#0d47a1] rounded-xl text-sm font-black text-center uppercase tracking-widest text-white transition-all shadow-md shadow-[#1565c0]/20 hover:scale-[1.01]"
                            >
                              {menuInfo.viewAllText}
                            </Link>
                          </div>
                        </div>
                      );
                    }

                    const colCount = Math.min(4, Math.max(1, menuInfo.data?.length || 1));
                    const widthClass =
                      colCount === 1 ? "w-[320px]" :
                        colCount === 2 ? "w-[600px]" :
                          colCount === 3 ? "w-[880px]" :
                            "w-[1140px]";
                    const gridClass =
                      colCount === 1 ? "grid-cols-1" :
                        colCount === 2 ? "grid-cols-2" :
                          colCount === 3 ? "grid-cols-3" :
                            "grid-cols-4";
                    return (
                      <div
                        className={clsx(
                          "absolute top-full left-1/2 -translate-x-1/2 mt-3 mx-auto bg-white dark:bg-[#0d1117] border border-gray-100 dark:border-[#1565c0]/20 rounded-2xl shadow-2xl shadow-[#1565c0]/10 overflow-hidden transition-all duration-300 origin-top z-[9999]",
                          widthClass,
                          openMenu === link.label
                            ? "opacity-100 scale-100 translate-y-0 "
                            : "opacity-0 scale-95 -translate-y-3 pointer-events-none",
                        )}
                      >
                        <div className="h-1 bg-gradient-to-r from-[#0d47a1] via-[#1565c0] to-[#1976d2]" />

                        <div className="p-4">
                          <div className="mb-4 px-3">
                            <p className="text-[13px] font-black text-[#1565c0] dark:text-[#90caf9] uppercase tracking-[0.3em]">
                              {menuInfo.header}
                            </p>
                          </div>

                          <div className={clsx("grid gap-6", gridClass)}>
                            {menuInfo.data.map((category, idx) => {
                              const IconComponent = solutionIcons[category.category] || technologyIcons[category.category] || industryIcons[category.category];

                              return (
                                <div key={idx} className="space-y-3">
                                  <h3 className=" font-black text-gray-800 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-white/10 pb-2" style={{ fontSize: '18px' }}>
                                    {category.category}
                                    {IconComponent && <IconComponent size={20} className="inline-block ms-2 text-[#1565c0]" />}
                                  </h3>
                                  <div className="space-y-2">
                                    {category.items.map((item) => (
                                      <Link
                                        key={item.slug}
                                        href={`/${menuInfo.baseSlug}/${item.slug}`}
                                        className="flex items-center justify-between px-3 py-2 mb-2 rounded-xl text-[14px] font-semibold text-gray-600 dark:text-gray-400 hover:text-[#1565c0] dark:hover:text-[#90caf9] hover:bg-[#1565c0]/5 dark:hover:bg-[#1565c0]/10 transition-all group/item"
                                      >
                                        {item.name}
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#1565c0] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                      </Link>
                                    ))}
                                  </div>
                                </div>)
                            })}
                          </div>

                          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
                            <Link
                              href={menuInfo.viewAllLink}
                              className="block px-2 py-3 bg-gradient-to-r from-[#0d47a1] to-[#1565c0] rounded-xl text-[12px] font-black text-center uppercase tracking-widest text-white hover:from-[#1565c0] hover:to-[#1976d2] transition-all"
                            >
                              {menuInfo.viewAllText}
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : link.hasDropdown ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={clsx(
                      "flex items-center gap-2 px-xxl-4 px-xl-3 px-lg-2 px-4 py-2 rounded-lg !text-[14px] whitespace-nowrap !lg:text-[10px] !xl:text-[15px] font-bold uppercase tracking-[0.12em] transition-all duration-300",
                      pathname.startsWith(link.href)
                        ? "text-[#1565c0] dark:text-[#90caf9] bg-[#1565c0]/10"
                        : isTransparent
                          ? "text-white hover:text-white/80 hover:bg-white/10"
                          : "text-[#1565c0] dark:text-[#90caf9] hover:text-[#0d47a1] hover:bg-[#1565c0]/5 dark:hover:bg-[#1565c0]/10",
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      size={11}
                      className={clsx(
                        "transition-transform duration-300",
                        openMenu === link.label && "rotate-180",
                      )}
                    />
                  </button>

                  <div
                    className={clsx(
                      "absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white dark:bg-[#0d1117] border border-gray-100 dark:border-[#1565c0]/20 rounded-2xl shadow-2xl shadow-[#1565c0]/10 overflow-hidden transition-all duration-300 origin-top",
                      openMenu === link.label
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-3 pointer-events-none",
                    )}
                  >
                    <div className="h-1 bg-gradient-to-r from-[#0d47a1] via-[#1565c0] to-[#1976d2]" />
                    <div className="p-3 space-y-0.5">
                      <div className="px-3 py-2 mb-1">
                        <p className="text-[13px] font-black text-[#1565c0] dark:text-[#90caf9] uppercase tracking-[0.3em]">
                          {link.label === "Services" ? "Global Capabilities" : "More Information"}
                        </p>
                      </div>
                      {(link.label === "Services" ? services : otherLinks)?.map((item) => (
                        <Link
                          key={item.id || item.href}
                          href={item.slug ? `/services/${item.slug}` : item.href}
                          className="flex items-center justify-between px-3 py-2 rounded-xl text-[14px] font-semibold text-gray-600 dark:text-gray-400 hover:text-[#1565c0] dark:hover:text-[#90caf9] hover:bg-[#1565c0]/5 dark:hover:bg-[#1565c0]/10 transition-all group/item"
                        >
                          {item.title || item.label}
                          {link.label !== "Services" && (
                            <ArrowRight
                              size={16}
                              className=" group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all"
                            />
                          )}
                          <div className="w-1.5 h-1.5 rounded-full bg-[#1565c0] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                      {link.label === "Services" && (
                        <div className="pt-1 border-t border-gray-100 dark:border-white/5 mt-1">
                          <Link
                            href="/services"
                            className="block px-3 py-3 bg-gradient-to-r from-[#0d47a1] to-[#1565c0] rounded-xl text-[12px] font-black text-center uppercase tracking-widest text-white hover:from-[#1565c0] hover:to-[#1976d2] transition-all"
                          >
                            Explore All Services →
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "px-xxl-4 sakshi px-xl-3 px-lg-2 px-4 py-2 rounded-lg text-[15px] whitespace-nowrap lg:text-[10px] xl:text-[14px] font-bold tracking-[0.12em] transition-all duration-300 ",
                    pathname === link.href
                      ? "text-[#1565c0] dark:text-[#90caf9] bg-[#1565c0]/10"
                      : isTransparent
                        ? "text-white hover:text-white/80 hover:bg-white/10"
                        : "text-[#1565c0] dark:text-[#90caf9] hover:text-[#0d47a1] hover:bg-[#1565c0]/5 dark:hover:bg-[#1565c0]/10",
                  )}
                  onMouseEnter={handleNavItemMouseEnter}
                >
                  {link.label}
                </Link>
              ),
            )}

            <div
              className="ms-3 ps-3 border-l border-gray-200 dark:border-white/10"
              onMouseEnter={handleNavItemMouseEnter}
            >
              <Link
                href="/contact"
                className={`flex items-center gap-2 px-5 py-2   ${!isTransparent ? 'bg-blue-800 text-white' : 'text-blue-800 bg-white'} rounded-lg text-[11px] font-black uppercase tracking-wider hover:from-[#1565c0] hover:to-[#1976d2] transition-all shadow-md shadow-[#1565c0]/30 active:scale-95`}
              >
                <Phone size={12} />
                Get a Quote
              </Link>
            </div>
          </nav>

          <button
            className={clsx(
              "lg:hidden w-10 h-10 flex items-center justify-center rounded-xl border transition-all",
              isTransparent
                ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-[#1565c0] dark:text-[#90caf9] hover:text-[#0d47a1] h-10"
            )}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>

    <div
      className={clsx(
        "lg:hidden fixed inset-0 top-0 bg-white dark:bg-[#0d1117] transition-all duration-500 ease-in-out overflow-y-auto z-[60]",
        mobileOpen
          ? "opacity-100 translate-x-0 pointer-events-auto"
          : "opacity-0 translate-x-full pointer-events-none",
      )}
    >
        <div className="h-1 bg-gradient-to-r from-[#0d47a1] via-[#1565c0] to-[#1976d2]" />

        <div className="container mx-auto px-4 py-4 space-y-2">
          <div className="flex items-center justify-between gap-4 pb-3 border-b border-gray-100 dark:border-white/5">
            <div className="bg-white dark:bg-white rounded-xl p-2 border-2 border-[#1565c0]/30 shadow-md">
              <img src="/kds-logo.png" alt="KDS International" className="h-12 w-auto object-contain" />
            </div>
            <button
              className={clsx(
                "lg:hidden w-10 h-10 flex items-center justify-center rounded-xl border transition-all z-20",
                "bg-[#1565c0] text-white hover:bg-[#0d47a1]"
              )}
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {navLinks.map((link, idx) => (
            <div
              key={link.href}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {link.hasDropdown ? (
                <div>
                  <p className="text-2xl tracking-tight font-black  tracking-[0.3em] mb-3 mt-4">
                    {link.label === "Services" ? "Our Services" : "Other Links"}
                  </p>
                  <div className="grid grid-cols-1 gap-1 pl-2">
                    {(link.label === "Services" ? services : otherLinks)?.map((item) => (
                      <Link
                        key={item.id || item.href}
                        href={item.slug ? `/services/${item.slug}` : item.href}
                        className="text-base font-semibold text-gray-500 dark:text-white/50 hover:text-[#1565c0] dark:hover:text-[#90caf9] transition-colors py-1.5 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1565c0]/40 shrink-0" />
                        {item.title || item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : link.hasMegaMenu ? (
                <div>
                  <p className="text-2xl tracking-tight font-black tracking-[0.3em] mb-3 mt-4">
                    {link.label}
                  </p>
                  <div className="space-y-4 pl-2">
                    {getMenuData(link.label)?.data.map((category, idx) => (
                      <div key={idx} className="space-y-2 my-3">
                        <h3 className="text-lg font-black text-[#1565c0] !text-[13px] dark:text-[#90caf9] uppercase tracking-wider">
                          {category.category}
                        </h3>
                        <div className="grid grid-cols-1 gap-1">
                          {category.items.map((item) => (
                            <Link
                              key={item.slug}
                              href={`/${getMenuData(link.label)?.baseSlug}/${item.slug}`}
                              className="text-base font-semibold text-gray-500 dark:text-white/50 hover:text-[#1565c0] dark:hover:text-[#90caf9] transition-colors py-1 flex items-center gap-2 text-[13px]"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1565c0]/40 shrink-0" />
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={link.href}
                  className={clsx(
                    "block text-2xl font-black tracking-tight py-3 border-b border-gray-50 dark:border-white/5 transition-all",
                    pathname === link.href
                      ? "text-[#1565c0] dark:text-[#90caf9]"
                      : "text-gray-800 dark:text-white hover:text-[#1565c0] dark:hover:text-[#90caf9] hover:pl-2",
                  )}
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}

          <div className="pt-6">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-[#0d47a1] to-[#1565c0] text-white rounded-xl text-sm font-black uppercase tracking-[0.2em] shadow-lg shadow-[#1565c0]/30 hover:from-[#1565c0] hover:to-[#1976d2] transition-all"
            >
              <Phone size={16} />
              Get a Quote / Booking
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}