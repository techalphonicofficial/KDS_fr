import { ArrowRight, Tag } from "lucide-react";
import Link from "next/link";

const projectGradients = [
  "from-[#1565c0]/25 to-[#0d47a1]/15",
  "from-[#264653]/40 to-[#1565c0]/10",
  "from-[#0d47a1]/30 to-[#1565c0]/10",
];

const projectEmoji = {
  Automotive: "🚗",
  Electronics: "💡",
  Logistics: "📦",
};

export default function ProjectCard({ project }) {
  console.log("caseStudy", project);
  const emoji = projectEmoji[project.category] || "🏗️";
  console.log("projects", project);
  return (
    <div className="group block h-full">
      <div className="bg-white dark:bg-transparent premium-glass p-3 rounded-[2rem] border border-gray-200 dark:border-white/5 group-hover:border-[#1565c0]/40 transition-all duration-500 h-full flex flex-col relative overflow-hidden">
        {/* Visual Area */}
        <div className="relative h-64 rounded-2xl bg-gray-50 dark:bg-[#0d1117] overflow-hidden mb-6 flex items-center justify-center border border-gray-100 dark:border-white/5 transition-colors duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1565c0]/10 to-transparent group-hover:opacity-40 transition-opacity" />
          <div className="absolute inset-0 hero-grid opacity-10 group-hover:opacity-20 transition-opacity" />

          {/* Animated Glow behind icon */}
          <div className="absolute w-24 h-24 bg-[#1565c0]/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

          <span className="text-6xl relative z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
            {emoji}
          </span>

          <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d1117]/80 backdrop-blur-md border border-[#1565c0]/30">
            <Tag size={12} className="text-[#1565c0]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#1565c0]">
              {project.icon}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 px-2">
          {/* Title */}
          <h3
            className=" font-black text-gray-900 dark:text-white leading-[1.1] my-3 tracking-tight group-hover:text-[#1565c0] transition-colors duration-500"
            style={{ fontFamily: "Outfit, sans-serif", fontSize: '20px' }}
          >
            {project.key}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-[#8b949e] text-sm leading-relaxed mb-3 flex-1 line-clamp-3 italic transition-colors duration-500">
            &ldquo;{project.value}&rdquo;
          </p>

          {/* View Details clickable link appearance */}
          <Link href={`industries/${project.slug}`} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#1565c0] pb-2 group-hover:text-[#1565c0] dark:group-hover:text-white transition-colors duration-500">
            <span>Case Study Analysis</span>
            <ArrowRight
              size={14}
              className="group-hover:translate-x-2 transition-transform"
            />
          </Link>

        </div>
      </div>
    </div>
  );
}
