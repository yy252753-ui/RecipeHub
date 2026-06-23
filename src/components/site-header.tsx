import Link from "next/link";
import { Home, PenLine, Search } from "lucide-react";
import { Logo } from "@/components/logo";
import { HeaderAuthSection } from "@/components/header-auth-section";
import { routes } from "@/constants/routes";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-line-normal-normal)] bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-5">
        <Logo />
        <nav className="ml-4 hidden items-center gap-1 md:flex">
          <Link
            href={routes.home}
            className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-[var(--color-text-neutral-secondary)] hover:bg-[var(--color-background-neutral-tertiary)]"
          >
            <Home size={17} />
            홈
          </Link>
          <Link
            href={routes.recipes}
            className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-[var(--color-text-neutral-secondary)] hover:bg-[var(--color-background-neutral-tertiary)]"
          >
            <Search size={17} />
            레시피
          </Link>
          <Link
            href={routes.write}
            className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-[var(--color-text-neutral-secondary)] hover:bg-[var(--color-background-neutral-tertiary)]"
          >
            <PenLine size={17} />
            작성
          </Link>
        </nav>
        <div className="flex-1" />
        <HeaderAuthSection />
      </div>
    </header>
  );
}
