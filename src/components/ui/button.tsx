import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "tinted";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  icon: Icon,
  variant = "primary",
  className
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-bold",
        variant === "primary" && "bg-primary text-white",
        variant === "secondary" && "border border-[var(--color-line-normal-normal)] bg-white text-[var(--color-text-neutral-secondary)]",
        variant === "tinted" && "bg-[var(--color-background-primary-low)] text-[var(--color-primary-strong)]",
        className
      )}
    >
      {Icon ? <Icon size={17} /> : null}
      {children}
    </Link>
  );
}
