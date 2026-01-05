import { cn } from "@/lib/utils";

export function Container({ className, children, ...props }) {
  return (
    <div
      className={cn("max-w-7xl mx-auto px-4 md:px-6 lg:px-12 w-full", className)}
      {...props}
    >
      {children}
    </div>
  );
}

