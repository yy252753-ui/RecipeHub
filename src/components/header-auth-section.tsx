"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Bookmark, User } from "lucide-react";
import { signOutUser } from "@/app/auth/actions";
import { routes } from "@/constants/routes";

export function HeaderAuthSection() {
  const { data: session } = useSession();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  const profileHref = userId ? `/users/${userId}` : routes.login;

  return (
    <>
      {userId ? (
        <Link
          href={routes.bookmarks}
          className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-[var(--color-text-neutral-secondary)] hover:bg-[var(--color-background-neutral-tertiary)] hidden md:inline-flex"
        >
          <Bookmark size={17} />
          저장
        </Link>
      ) : null}
      <Link
        href={profileHref}
        className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-[var(--color-text-neutral-secondary)] hover:bg-[var(--color-background-neutral-tertiary)] hidden md:inline-flex"
      >
        <User size={17} />
        프로필
      </Link>
      <div className="hidden md:block">
        {session?.user ? (
          <form action={signOutUser}>
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
            className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-bold text-white"
          >
            로그인
          </Link>
        )}
      </div>
    </>
  );
}
