import Link from "next/link";
import { Bookmark, Clock, Eye, Heart, Users } from "lucide-react";
import { FoodImage } from "@/components/food-image";
import { Tag } from "@/components/ui/tag";
import type { Recipe } from "@/types/recipe";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-[var(--color-line-normal-normal)] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link href={`/recipes/${recipe.id}`} className="relative block">
        {recipe.rank ? (
          <span className={`absolute left-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full border-2 text-base font-extrabold shadow-md ${rankClassName(recipe.rank)}`}>
            {recipe.rank}
          </span>
        ) : null}
        <FoodImage
          label={recipe.title}
          src={recipe.thumbnailImg}
          height={190}
          className="transition duration-300 group-hover:scale-[1.02]"
        />
      </Link>
      <div className="p-4">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {recipe.tags.slice(0, 3).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <Link href={`/recipes/${recipe.id}`} className="block">
          <h3 className="line-clamp-2 text-lg font-extrabold leading-snug tracking-normal">
            {recipe.title}
          </h3>
          <p className="mt-2 line-clamp-2 min-h-12 text-sm font-normal leading-6 text-[var(--color-text-neutral-secondary)]">
            {recipe.description}
          </p>
        </Link>
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-lg bg-[var(--color-background-neutral-secondary)] p-2 text-xs font-bold text-[var(--color-text-neutral-secondary)]">
          <span className="inline-flex items-center justify-center gap-1">
            <Clock size={14} />
            {recipe.cookTime}분
          </span>
          <span className="inline-flex items-center justify-center gap-1">
            <Users size={14} />
            {recipe.serving}인분
          </span>
          <span className="inline-flex items-center justify-center gap-1">
            <Bookmark size={14} />
            {recipe.bookmarks}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 text-xs font-bold text-[var(--color-text-neutral-tertiary)]">
          <span className="truncate">{recipe.author}</span>
          <span className="inline-flex shrink-0 items-center gap-3">
            <span className="inline-flex items-center gap-1 text-rose-600">
              <Heart size={14} fill="currentColor" />
              {recipe.likes.toLocaleString()}
            </span>
            <span className="inline-flex items-center gap-1">
              <Eye size={14} />
              {recipe.views.toLocaleString()}
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

function rankClassName(rank: number) {
  if (rank === 1) {
    return "border-amber-300 bg-amber-400 text-amber-950";
  }

  if (rank === 2) {
    return "border-slate-200 bg-slate-300 text-slate-900";
  }

  return "border-orange-300 bg-orange-500 text-white";
}
