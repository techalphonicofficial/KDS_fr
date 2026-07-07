import { Target, Users, Globe, Award } from "lucide-react";

export default function StatCard({ stat }) {

  const icons = {
    "Workers Placed": Users,
    "Satisfied Clients": Award,
    "Manpower Response": Globe,
    "Compliance Assured": Target,
  };

  const Icon = icons[stat?.value] || Target;

  return (
    <div
      className="flex items-center gap-3 bg-white dark:bg-[#161b22] rounded-2xl p-3 border border-gray-200 dark:border-white/10 shadow-xl transition-all duration-500 hover:bg-gray-50 dark:hover:bg-[#1c2126]"
      data-aos="fade-up"
    >
      <div className="flex-shrink-0 bg-gray-100 dark:bg-[#0d1117] p-3 rounded-xl border border-gray-200 dark:border-white/5">
        <Icon
          size={28}
          className="text-gray-500 dark:text-gray-300"
        />
      </div>

      <div>
        <h4 className="text-3xl font-black text-gray-900 dark:text-white leading-none tracking-tighter">
          {stat?.key}
        </h4>

        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mt-1">
          {stat?.value}
        </p>
      </div>
    </div>
  );
}