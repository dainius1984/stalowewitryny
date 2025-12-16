import { cn } from "@/lib/utils";

export function BentoCard({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[2rem] bg-neutral-900/50 border border-white/5 p-6",
        "transition-all duration-300 hover:bg-neutral-800 hover:border-white/10",
        className
      )}
      {...props}
    >
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}
