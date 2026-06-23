"use client";

import { Bookmark, Heart, Share2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/toast-provider";

export function RecipeEngagementActions({
  recipeId,
  title,
  initialBookmarks,
  initialLikes,
}: {
  recipeId: string;
  title: string;
  initialBookmarks: number;
  initialLikes: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [bookmarked, setBookmarked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch(`/api/recipes/${recipeId}/user-status`)
      .then((r) => r.json())
      .then((data: { bookmarked: boolean; liked: boolean }) => {
        setBookmarked(data.bookmarked);
        setLiked(data.liked);
      })
      .catch(() => {});
  }, [recipeId, status]);

  async function toggleBookmark() {
    if (!isLoggedIn) {
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    setIsBookmarking(true);
    const response = await fetch(`/api/recipes/${recipeId}/bookmark`, { method: "POST" });
    setIsBookmarking(false);

    if (response.status === 401) {
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }
    if (!response.ok) return;

    const result = (await response.json()) as { bookmarked: boolean; bookmarks: number };
    setBookmarked(result.bookmarked);
    setBookmarks(result.bookmarks);
    toast(result.bookmarked ? "저장했습니다." : "저장을 취소했습니다.");
    router.refresh();
  }

  async function toggleLike() {
    if (!isLoggedIn) {
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    setIsLiking(true);
    const response = await fetch(`/api/recipes/${recipeId}/like`, { method: "POST" });
    setIsLiking(false);

    if (response.status === 401) {
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }
    if (!response.ok) return;

    const result = (await response.json()) as { liked: boolean; likes: number };
    setLiked(result.liked);
    setLikes(result.likes);
    toast(result.liked ? "좋아요를 눌렀습니다." : "좋아요를 취소했습니다.");
    router.refresh();
  }

  async function shareRecipe() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title, url });
      return;
    }
    await navigator.clipboard.writeText(url);
    toast("링크를 복사했습니다.");
  }

  return (
    <div className="flex flex-wrap justify-end gap-2">
      <button
        type="button"
        onClick={toggleBookmark}
        disabled={isBookmarking}
        className={`inline-flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-bold disabled:opacity-60 ${
          bookmarked
            ? "border-[var(--color-primary-normal)] bg-[var(--color-background-primary-low)] text-[var(--color-primary-strong)]"
            : "border-[var(--color-line-normal-normal)] bg-white"
        }`}
      >
        <Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} />
        저장 {bookmarks}
      </button>
      <button
        type="button"
        onClick={toggleLike}
        disabled={isLiking}
        className={`inline-flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-bold disabled:opacity-60 ${
          liked
            ? "border-rose-200 bg-rose-50 text-rose-700"
            : "border-[var(--color-line-normal-normal)] bg-white"
        }`}
      >
        <Heart size={16} fill={liked ? "currentColor" : "none"} />
        좋아요 {likes}
      </button>
      <button
        type="button"
        aria-label="공유"
        onClick={() => { void shareRecipe(); }}
        className="grid h-10 w-10 place-items-center rounded-md border border-[var(--color-line-normal-normal)] bg-white"
      >
        <Share2 size={16} />
      </button>
    </div>
  );
}
