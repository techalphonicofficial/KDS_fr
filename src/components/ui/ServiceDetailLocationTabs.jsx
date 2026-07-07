"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Building2, ArrowRight, ChevronRight } from "lucide-react";

export default function ServiceDetailLocationTabs({ service }) {
  const locations = service?.locations || [];
  const [activeState, setActiveState] = useState(locations[0]?.state || "");

  const currentStateData = locations.find((l) => l.state === activeState);

  if (!locations.length) return null;

  return (
    <div className="w-full">
      {/* ── State Tabs ─────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3 mb-3">
        {locations.map((loc) => (
          <button
            key={loc.state}
            onClick={() => setActiveState(loc.state)}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.18em] border transition-all duration-300 ${
              activeState === loc.state
                ? "bg-[#1565c0] border-[#1565c0] text-white shadow-lg shadow-[#1565c0]/25"
                : "bg-white dark:bg-transparent border-gray-200 dark:border-white/10 text-gray-600 dark:text-[#8b949e] hover:border-[#1565c0]/50 hover:text-[#1565c0]"
            }`}
          >
            <MapPin size={11} />
            {loc.stateLabel}
          </button>
        ))}
      </div>

      {/* ── Cities Grid ─────────────────────────────────────────── */}
      {currentStateData && (
        <div key={activeState} className="animate-fade-in-up mt-3">
          {/* "View all in state" link */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-[#8b949e]">
              {currentStateData.cities.length} cities in {currentStateData.stateLabel}
            </p>
            <Link
              href={`/services/${service.slug}/${activeState}`}
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#1565c0] hover:opacity-70 transition-opacity"
            >
              View all in {currentStateData.stateLabel}
              <ChevronRight size={11} />
            </Link>
          </div>

          {/* City cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {currentStateData.cities.map((cityObj, idx) => (
              <Link
                key={cityObj.slug}
                href={`/services/${service.slug}/${activeState}/${cityObj.slug}`}
                className="group flex flex-col items-center p-3 bg-white dark:bg-transparent premium-glass border border-gray-200 dark:border-white/5 rounded-[1.5rem] hover:border-[#1565c0]/50 hover:shadow-lg hover:shadow-[#1565c0]/5 transition-all duration-400 text-center"
                style={{ animationDelay: `${0.04 * idx}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#1565c0]/10 mb-2 flex items-center justify-center group-hover:bg-[#1565c0] transition-all duration-400">
                  <Building2
                    size={18}
                    className="text-[#1565c0] group-hover:text-white transition-colors"
                  />
                </div>
                <div>
                  <p className="font-black text-gray-900 dark:text-white text-xs tracking-tight group-hover:text-[#1565c0] transition-colors leading-tight">
                    {cityObj.label}
                  </p>
                  <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-gray-400 mt-0.5 mb-0">
                    {currentStateData.stateLabel}
                  </p>
                </div>
                <ArrowRight
                  size={12}
                  className="text-[#1565c0] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
