import { ArrowRight } from "lucide-react";

const placeholderGradients = [
  "from-[#1565c0]/30 via-[#0d47a1]/20 to-[#0d1117]",
  "from-[#264653]/40 via-[#1565c0]/15 to-[#0d1117]",
  "from-[#0d47a1]/30 via-[#1565c0]/20 to-[#0d1117]",
  "from-[#1565c0]/20 via-[#264653]/30 to-[#0d1117]",
  "from-[#94d2bd]/15 via-[#1565c0]/20 to-[#0d1117]",
];

const industryEmoji = {
  Automotive: "🚗",
  Logistics: "🚛",
  Manufacturing: "🏭",
  "Memory & Electronics": "💾",
  "Precision Catalog": "⚙️",
};

export default function IndustryCard({ industry, index }) {
  const gradient = placeholderGradients[index % placeholderGradients.length];
  const emoji = industryEmoji[industry.title] || "🏗️";

  return (
    <div className="group relative overflow-hidden rounded-2xl premium-glass border-white/5 hover:border-[#1565c0]/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] cursor-pointer">
      {/* Image / gradient area */}
      <div
        className={`relative h-60 bg-gradient-to-br ${gradient} flex items-end overflow-hidden`}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl opacity-10 group-hover:opacity-20 group-hover:scale-125 transition-all duration-700 blur-[2px] group-hover:blur-0">
          {emoji}
        </div>

        {/* Dynamic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/20 to-transparent group-hover:from-[#0d1117]/90 transition-all duration-500" />

        {/* Title on image overlay */}
        <div className="relative z-10 p-6 w-full transform group-hover:translate-y-[-8px] transition-transform duration-500">
          <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#1565c0] mb-2 block opacity-0 group-hover:opacity-100 transition-opacity">
            Sector Excellence
          </span>
          <h3
            className="text-white font-black text-2xl group-hover:text-[#1565c0] transition-colors leading-none"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {industry.title}
          </h3>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 bg-gradient-to-b from-transparent to-[#0d1117]/50">
        <p className="text-[#8b949e] text-sm leading-relaxed mb-6 group-hover:text-[#e6edf3] transition-colors line-clamp-2 md:line-clamp-none">
          {industry.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1565c0]">
            Explore{" "}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </span>
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-[#1565c0]/30"></div>
            <div className="w-1 h-1 rounded-full bg-[#1565c0]/60"></div>
            <div className="w-1 h-1 rounded-full bg-[#1565c0]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
