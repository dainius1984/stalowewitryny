import { cn } from "@/lib/utils";

export function Button({ 
  className, 
  variant = "primary", 
  children, 
  ...props 
}) {
  const variants = {
    primary: "bg-primary text-primary-foreground font-semibold hover:opacity-90 shadow-[0_0_20px_hsl(var(--primary)/0.3)] font-sans",
    outline: "border border-white/20 bg-transparent text-white hover:bg-white/10 font-sans",
    ghost: "bg-transparent text-neutral-400 hover:text-white font-sans",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
