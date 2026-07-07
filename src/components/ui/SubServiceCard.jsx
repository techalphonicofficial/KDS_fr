import Link from "next/link";
import { ArrowRight, ChevronRight, Factory, FileText, HardHat, Settings, Users, Wrench, Briefcase } from "lucide-react";

const serviceIconMap = {
  "skilled-manpower": Wrench,
  "unskilled-manpower": Users,
  "contract-manpower": FileText,
  "semi-skilled-manpower": Settings,
  "industrial-manpower": Factory,
  "labour-manpower": HardHat,
};

const gradients = [
  "from-[#0d47a1] to-[#1565c0]",
  "from-[#1565c0] to-[#1976d2]",
  "from-[#1976d2] to-[#1e88e5]",
  "from-[#0d47a1] to-[#1976d2]",
  "from-[#1565c0] to-[#0d47a1]",
  "from-[#1e88e5] to-[#1565c0]",
];

export default function SubServiceCard({ service, index = 0 }) {
  // Get the icon component from the map, fallback to Briefcase if not found
  const Icon = serviceIconMap[service.slug] || Briefcase;

  // Use the index to pick a gradient, or fallback to a default
  const gradientIndex = index % gradients.length;
  const gradientClass = gradients[gradientIndex] || "from-[#1565c0] to-[#0d47a1]";

  return (
    <Link
      key={service.id}
      href={`/services/${service.slug}`}
      data-aos="fade-up"
      data-aos-delay={index * 100}
      className="group relative bg-gray-50 dark:bg-[#0a1628] rounded-2xl p-4 border border-gray-200 dark:border-[#1565c0]/10 hover:border-[#1565c0]/40 dark:hover:border-[#1565c0]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#1565c0]/5 hover:-translate-y-1 overflow-hidden"
    >
      {/* Top colour accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl`} />

      <div className="relative">
        {/* Icon with gradient background */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientClass} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={20} className="text-white" />
        </div>

        <h3 className="font-black text-gray-900 dark:text-white text-lg mb-3 group-hover:text-[#1565c0] dark:group-hover:text-[#90caf9] transition-colors duration-300">
          {service.title}
        </h3>

        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3 transition-colors duration-300">
          {service.shortDesc}
        </p>

        <div className="flex items-center gap-1.5 text-[#1565c0] dark:text-[#90caf9] text-xs font-black uppercase tracking-widest">
          Know More <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}