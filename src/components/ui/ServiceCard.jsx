import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Simple icon map for lucide icons by name string
const IconMap = {
  ClipboardCheck: "📋",
  BadgeCheck: "✅",
  BookOpen: "📖",
  FolderKanban: "🗂️",
  Truck: "🚛",
  Globe: "🌍",
};

export default function ServiceCard({ service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block bg-white dark:bg-[#161b22]/50 premium-glass rounded-2xl p-4 border border-gray-200 dark:border-white/5 hover:border-[#1565c0]/60 dark:hover:border-[#1565c0]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(10,147,150,0.2)] relative overflow-hidden"
    >
      {/* Subtle Gradient Glow */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#1565c0]/5 blur-3xl group-hover:bg-[#1565c0]/10 transition-colors" />

      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1565c0]/20 to-transparent flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform duration-500 border border-[#1565c0]/10">
        {IconMap[service.icon] || "⚙️"}
      </div>

      {/* Title */}
      <h3
        className="text-gray-900 dark:text-white font-bold text-xl mb-3 group-hover:text-[#1565c0] transition-colors tracking-tight duration-500"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        {service.title}
      </h3>

      {/* Desc */}
      <p className="text-gray-600 dark:text-[#8b949e] text-sm leading-relaxed mb-6 group-hover:text-gray-900 dark:group-hover:text-[#e6edf3] transition-colors duration-500">
        {service.shortDesc}
      </p>

      {/* Features */}
      <ul className="space-y-2 mb-3">
        {service.features.slice(0, 3).map((f) => (
          <li
            key={f}
            className="flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-[#8b949e] transition-colors duration-500"
          >
            <span className="w-2 h-2 rounded-full bg-[#1565c0] shadow-[0_0_8px_rgba(10,147,150,0.8)]" />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5 transition-colors duration-500">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1565c0]">
          Details{" "}
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </span>
        <span className="text-[10px] uppercase tracking-tighter text-gray-400 dark:text-[#8b949e]/40 font-black transition-colors duration-500">
          Global Precision
        </span>
      </div>
    </Link>
  );
}
