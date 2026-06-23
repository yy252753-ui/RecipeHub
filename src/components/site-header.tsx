import Link from "next/link";
import { Bookmark, Home, PenLine, Search, User } from "lucide-react";
import { signOutUser } from "@/app/auth/actions";
import { Logo } from "@/components/logo";
import { routes } from "@/constants/routes";
import { auth } from "@/lib/auth";

export async function SiteHeader() {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  const profileHref = userId ? `/users/${userId}` : routes.login;

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
          {userId ? (
            <Link
              href={routes.bookmarks}
              className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-[var(--color-text-neutral-secondary)] hover:bg-[var(--color-background-neutral-tertiary)]"
            >
              <Bookmark size={17} />
              저장
            </Link>
          ) : null}
          <Link
            href={profileHref}
            className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-[var(--color-text-neutral-secondary)] hover:bg-[var(--color-background-neutral-tertiary)]"
          >
            <User size={17} />
            프로필
          </Link>
        </nav>
        <div className="flex-1" />
        {session?.user ? (
          <form action={signOutUser} className="hidden md:block">
            <button
              type="submit"
              className="h-10 rounded-md border border-[var(--color-line-normal-normal)] bg-white px-4 text-sm font-bold text-[var(--color-text-neutral-secondary)]"
            >
              로그아웃
            </button>
          </form>
        ) : (
          <Link
            href={routes.login}
            className="hidden h-10 items-center rounded-md bg-primary px-4 text-sm font-bold text-white md:inline-flex"
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
