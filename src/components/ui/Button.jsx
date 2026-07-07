import Link from "next/link";
import clsx from "clsx";

const base =
  "inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-300 cursor-pointer tracking-tight active:scale-95";

const variants = {
  primary:
    "bg-gradient-to-br from-[#1565c0] to-[#0d47a1] text-white hover:shadow-2xl hover:shadow-[#1565c0]/40 btn-glow border border-white/10",
  outline:
    "border-2 border-[#1565c0]/40 text-[#1565c0] hover:bg-[#1565c0] hover:text-white hover:border-[#1565c0] premium-glass-hover",
  ghost: "text-[#1565c0] hover:bg-[#1565c0]/10 font-bold",
};

const sizes = {
  sm: "px-2 py-2 text-xs uppercase tracking-widest",
  md: "px-2 py-2 text-sm",
  lg: "px-2 py-2 text-base",
};

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  external,
  disabled,
}) {
  const classes = clsx(
    base,
    variants[variant],
    sizes[size],
    disabled && "opacity-40 cursor-not-allowed grayscale pointer-events-none",
    className,
  );

  if (href && !disabled) {
    return external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
