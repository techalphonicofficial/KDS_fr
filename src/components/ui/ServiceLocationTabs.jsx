"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Building, ArrowRight, ChevronRight } from "lucide-react";

export default function ServiceLocationTabs({ services }) {
  // Build a unified location map (states → cities) across all services
  // Use the first service's locations as the base, since all share the same locations
  const locationMap = [];
  if (services && services.length > 0 && services[0].locations) {
    for (const loc of services[0].locations) {
      locationMap.push(loc);
    }
  }

  const [activeState, setActiveState] = useState(locationMap[0]?.state || "");

  const currentStateData = locationMap.find((l) => l.state === activeState);

  return (
    <div className="w-full">
      {/* ── State Tabs ─────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3 mb-3">
        {locationMap.map((loc) => (
          <button
            key={loc.state}
            onClick={() => setActiveState(loc.state)}
            className={`relative inline-flex items-center gap-2 px-3 py-2 rounded-full overflow-hidden font-black text-xs uppercase tracking-[0.18em] border transition-all duration-300 ${
              activeState === loc.state
                ? "bg-[#1565c0] border-[#1565c0] text-white shadow-lg shadow-[#1565c0]/30"
                : "bg-white dark:bg-transparent border-gray-200 dark:border-white/10 text-gray-600 dark:text-[#8b949e] hover:border-[#1565c0]/50 hover:text-[#1565c0]"
            }`}
          >
            <MapPin size={12} />
            {loc.stateLabel}
            {activeState === loc.state && (
              <span className="ml-1 bg-white/20 text-white text-[9px] px-2 py-0.5 rounded-full font-black">
                {loc.cities.length} cities
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── City × Service Grid ─────────────────────────────────── */}
      {currentStateData && (
        <div
          key={activeState}
          className="animate-fade-in-up"
        >
          {/* City Pills Row */}
          {/* <div className="flex flex-wrap gap-3 mb-10">
            {currentStateData.cities.map((cityObj) => (
              <div
                key={cityObj.slug}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-[#8b949e] text-[10px] font-black uppercase tracking-[0.15em]"
              >
                <Building size={10} className="text-[#1565c0]" />
                {cityObj.label}
              </div>
            ))}
          </div> */}

          {/* Service × City table */}
          <div className="overflow-x-auto rounded-[2rem] border border-gray-200 dark:border-white/5 bg-white dark:bg-transparent premium-glass">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/5">
                  <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-[#8b949e] w-56">
                    Service
                  </th>
                  {currentStateData.cities.map((cityObj) => (
                    <th
                      key={cityObj.slug}
                      className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 dark:text-[#8b949e] text-center whitespace-nowrap"
                    >
                      {cityObj.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {services.map((service, sIdx) => (
                  <tr
                    key={service.id}
                    className={`group transition-colors duration-200 hover:bg-[#1565c0]/3 dark:hover:bg-[#1565c0]/5 ${
                      sIdx < services.length - 1
                        ? "border-b border-gray-100 dark:border-white/5"
                        : ""
                    }`}
                  >
                    {/* Service name */}
                    <td className="px-3 py-2">
                      <Link
                        href={`/services/${service.slug}/${activeState}`}
                        className="inline-flex items-center gap-2 font-bold text-gray-900 dark:text-white hover:text-[#1565c0] transition-colors text-sm group/link"
                      >
                        {service.title}
                        <ChevronRight
                          size={13}
                          className="text-[#1565c0] opacity-0 group-hover/link:opacity-100 transition-opacity"
                        />
                      </Link>
                    </td>

                    {/* City cells */}
                    {currentStateData.cities.map((cityObj) => (
                      <td
                        key={cityObj.slug}
                        className="px-4 py-5 text-center"
                      >
                        <Link
                          href={`/services/${service.slug}/${activeState}/${cityObj.slug}`}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1565c0]/10 text-[#1565c0] hover:bg-[#1565c0] hover:text-white transition-all duration-300 group/cell mx-auto"
                          title={`${service.title} in ${cityObj.label}`}
                        >
                          <ArrowRight size={13} className="group-hover/cell:translate-x-0.5 transition-transform" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer hint */}
          <p className="mt-5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-[#8b949e]">
            Click any cell to view{" "}
            <span className="text-[#1565c0]">{currentStateData.stateLabel}</span>{" "}
            location details
          </p>
        </div>
      )}
    </div>
  );
}
