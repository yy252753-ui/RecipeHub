"use client";

import { Heart, MessageCircle, Send } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useToast } from "@/components/toast-provider";

export type RecipeComment = {
  id: string;
  author: string;
  content: string;
  likes: number;
  liked: boolean;
  createdAt: string;
};

type RecipeCommentsProps = {
  recipeId: string;
  initialComments: RecipeComment[];
};

export function RecipeComments({ recipeId, initialComments }: RecipeCommentsProps) {
  const { data: session } = useSession();
  const isLoggedIn = Boolean(session?.user);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingLikeId, setPendingLikeId] = useState<string | null>(null);

  async function submitComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isLoggedIn) {
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    const trimmed = content.trim();
    if (!trimmed) return;

    setIsSubmitting(true);
    const response = await fetch(`/api/recipes/${recipeId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: trimmed })
    });
    setIsSubmitting(false);

    if (response.status === 401) {
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }
    if (!response.ok) return;

    const result = (await response.json()) as { comment: RecipeComment };
    setComments((current) => [result.comment, ...current]);
    setContent("");
    toast("댓글이 등록됐습니다.", "success");
    router.refresh();
  }

  async function toggleCommentLike(commentId: string) {
    if (!isLoggedIn) {
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    setPendingLikeId(commentId);
    const response = await fetch(`/api/comments/${commentId}/like`, { method: "POST" });
    setPendingLikeId(null);

    if (response.status === 401) {
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }
    if (!response.ok) return;

    const result = (await response.json()) as { liked: boolean; likes: number };
    setComments((current) =>
      current.map((comment) =>
        comment.id === commentId ? { ...comment, liked: result.liked, likes: result.likes } : comment
      )
    );
    toast(result.liked ? "좋아요를 눌렀습니다." : "좋아요를 취소했습니다.");
  }

  return (
    <section className="mt-10 rounded-xl border border-[var(--color-line-normal-normal)] bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="inline-flex items-center gap-2 text-2xl font-extrabold tracking-normal">
            <MessageCircle size={23} />
            댓글
          </h2>
          <p className="mt-1 text-sm font-normal text-[var(--color-text-neutral-secondary)]">
            만들어 본 사람들의 맛 평가와 팁을 확인해보세요.
          </p>
        </div>
        <span className="rounded-full bg-[var(--color-background-neutral-secondary)] px-3 py-1 text-sm font-extrabold">
          {comments.length}개
        </span>
      </div>

      <form onSubmit={submitComment} className="mb-5 grid gap-3">
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="맛은 어땠는지, 어떤 재료를 더하면 좋은지 남겨보세요."
          className="min-h-24 resize-none rounded-lg border border-[var(--color-line-normal-normal)] bg-white px-4 py-3 text-sm leading-6 outline-none focus:border-[var(--color-primary-normal)]"
          maxLength={500}
        />
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-bold text-[var(--color-text-neutral-tertiary)]">
            {content.length}/500
          </span>
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-white disabled:opacity-50"
          >
            <Send size={16} />
            등록
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {comments.map((comment) => (
          <article
            key={comment.id}
            className="rounded-lg border border-[var(--color-line-solid-neutral)] bg-[var(--color-background-neutral-secondary)] p-4"
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold">{comment.author}</p>
                <p className="text-xs font-bold text-[var(--color-text-neutral-tertiary)]">
                  {comment.createdAt}
                </p>
              </div>
              <button
                type="button"
                onClick={() => { void toggleCommentLike(comment.id); }}
                disabled={pendingLikeId === comment.id}
                className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md border px-3 text-xs font-extrabold disabled:opacity-60 ${
                  comment.liked
                    ? "border-rose-200 bg-rose-50 text-rose-600"
                    : "border-[var(--color-line-normal-normal)] bg-white text-[var(--color-text-neutral-secondary)]"
                }`}
              >
                <Heart size={14} fill={comment.liked ? "currentColor" : "none"} />
                {comment.likes}
              </button>
            </div>
            <p className="whitespace-pre-line text-sm font-normal leading-7 text-[var(--color-text-neutral-secondary)]">
              {comment.content}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
