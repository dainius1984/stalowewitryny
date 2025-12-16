import { cn } from "@/lib/utils";

export function Badge({ className, variant = "default", children }) {
  const variants = {
    default: "bg-white/10 text-white border border-white/5",
    success: "bg-primary/10 text-primary border border-primary/20", // For "Available" status - using primary color
    accent: "bg-primary/10 text-primary border border-primary/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur-md font-sans",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

