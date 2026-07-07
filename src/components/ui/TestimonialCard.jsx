import { Star } from "lucide-react";

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-[#1565c0]/15 rounded-xl p-6 flex flex-col gap-4 hover:border-[#1565c0]/40 dark:hover:border-[#1565c0]/40 transition-all duration-500 hover:shadow-lg hover:shadow-[#1565c0]/10">
      {/* Stars */}
      {/* <div className="flex items-center gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} className="fill-[#e9c46a] text-[#e9c46a]" />
        ))}
      </div> */}

      {/* Quote */}
      <p className="text-gray-600 dark:text-[#8b949e] text-sm leading-relaxed italic transition-colors duration-500">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-[#1565c0]/10 transition-colors duration-500">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1565c0] to-[#0d47a1] flex items-center justify-center text-white font-bold text-sm">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p
            className="text-gray-900 dark:text-white font-semibold text-sm transition-colors duration-500"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {testimonial.name}
          </p>
          <p className="text-gray-500 dark:text-[#8b949e] text-xs transition-colors duration-500">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
