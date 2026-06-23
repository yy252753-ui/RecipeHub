"use client";

import { useEffect, useRef, useState } from "react";
import { RecipeCard } from "@/components/recipe-card";
import type { Recipe } from "@/types/recipe";

type RecipeGridProps = {
  initialItems: Recipe[];
  initialHasMore: boolean;
  q: string;
  tag: string;
  sort: string;
};

export function RecipeGrid({ initialItems, initialHasMore, q, tag, sort }: RecipeGridProps) {
  const [items, setItems] = useState(initialItems);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const pageRef = useRef(2);
  const isLoadingRef = useRef(false);
  const hasMoreRef = useRef(initialHasMore);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const paramsRef = useRef({ q, tag, sort });

  useEffect(() => {
    paramsRef.current = { q, tag, sort };
  }, [q, tag, sort]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        if (isLoadingRef.current || !hasMoreRef.current) return;

        isLoadingRef.current = true;
        setIsLoading(true);

        const { q: curQ, tag: curTag, sort: curSort } = paramsRef.current;
        const params = new URLSearchParams({ page: String(pageRef.current) });
        if (curQ) params.set("q", curQ);
        if (curTag) params.set("tag", curTag);
        if (curSort) params.set("sort", curSort);

        fetch(`/api/recipes?${params}`)
          .then((res) => res.json() as Promise<{ items: Recipe[]; hasMore: boolean }>)
          .then((data) => {
            setItems((prev) => [...prev, ...data.items]);
            hasMoreRef.current = data.hasMore;
            setHasMore(data.hasMore);
            pageRef.current += 1;
          })
          .catch(() => {})
          .finally(() => {
            isLoadingRef.current = false;
            setIsLoading(false);
          });
      },
      { rootMargin: "300px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((recipe, i) => (
          <RecipeCard key={recipe.id} recipe={recipe} priority={i < 6} />
        ))}
      </div>
      <div ref={sentinelRef} className="mt-10 flex justify-center py-4">
        {isLoading && (
          <span className="text-sm font-bold text-[var(--color-text-neutral-tertiary)]">
            불러오는 중...
          </span>
        )}
        {!hasMore && items.length > 0 && (
          <span className="text-sm font-bold text-[var(--color-text-neutral-tertiary)]">
            모든 레시피를 확인했습니다
          </span>
        )}
      </div>
    </>
  );
}
