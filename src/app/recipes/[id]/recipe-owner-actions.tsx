"use client";

import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RecipeOwnerActions({
  recipeId,
  recipeUserId,
}: {
  recipeId: string;
  recipeUserId: string;
}) {
  const { data: session } = useSession();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  const isOwner = Boolean(userId && userId === recipeUserId);

  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  if (!isOwner) return null;

  async function deleteRecipe() {
    const confirmed = window.confirm("이 레시피를 삭제할까요? 삭제 후에는 되돌릴 수 없습니다.");
    if (!confirmed) return;

    setIsDeleting(true);
    setError("");

    const response = await fetch(`/api/recipes/${recipeId}`, { method: "DELETE" });

    if (!response.ok) {
      setError("레시피를 삭제하지 못했습니다.");
      setIsDeleting(false);
      return;
    }

    router.push("/recipes");
    router.refresh();
  }

  return (
    <div className="mb-7 flex flex-wrap items-center gap-2">
      <Link
        href={`/recipes/${recipeId}/edit`}
        className="inline-flex h-10 items-center gap-2 rounded-md border border-[var(--color-line-normal-normal)] bg-white px-4 text-sm font-bold"
      >
        <Pencil size={16} />
        수정
      </Link>
      <button
        type="button"
        onClick={deleteRecipe}
        disabled={isDeleting}
        className="inline-flex h-10 items-center gap-2 rounded-md border border-red-200 bg-white px-4 text-sm font-bold text-red-600 disabled:opacity-60"
      >
        <Trash2 size={16} />
        삭제
      </button>
      {error ? <p className="basis-full text-xs font-bold text-red-600">{error}</p> : null}
    </div>
  );
}
