import { Filter, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Tag } from "@/components/ui/tag";
import { getPopularTags, getRecipePage, normalizeRecipeSort } from "@/lib/recipe-queries";
import { RecipeGrid } from "./recipe-grid";

export const revalidate = 30;

type RecipesPageProps = {
  searchParams?: Promise<{
    q?: string | string[];
    tag?: string | string[];
    sort?: string | string[];
  }>;
};

function getParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function buildRecipesHref({ q, tag, sort }: { q?: string; tag?: string; sort?: string }) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (tag) params.set("tag", tag);
  if (sort && sort !== "popular") params.set("sort", sort);
  const query = params.toString();
  return query ? `/recipes?${query}` : "/recipes";
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const params = (await searchParams) ?? {};
  const q = getParam(params.q)?.trim() ?? "";
  const tag = getParam(params.tag)?.trim() ?? "";
  const sort = normalizeRecipeSort(getParam(params.sort));

  const [{ items, hasMore }, popularTags] = await Promise.all([
    getRecipePage({ q, tag, sort, page: 1 }),
    getPopularTags(12)
  ]);

  return (
    <PageShell>
      <div className="container-page">
        <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-normal">레시피 찾기</h1>
            <p className="mt-2 font-normal text-[var(--color-text-neutral-secondary)]">
              한식 집밥부터 간단한 면요리까지, 재료와 태그로 바로 찾아보세요.
            </p>
          </div>
        </div>

        <form
          action="/recipes"
          className="mb-5 grid gap-3 rounded-xl border border-[var(--color-line-normal-normal)] bg-white p-4 shadow-sm md:grid-cols-[1fr_180px_auto]"
        >
          <label className="flex h-11 min-w-0 items-center gap-3 rounded-lg border border-[var(--color-line-solid-neutral)] px-3">
            <Search size={19} className="text-[var(--color-text-neutral-tertiary)]" />
            <input
              name="q"
              aria-label="레시피 검색"
              placeholder="불고기, 김치찌개, 된장찌개, 김밥..."
              className="min-w-0 flex-1 border-0 bg-transparent text-sm outline-none placeholder:text-[var(--color-text-neutral-tertiary)]"
              defaultValue={q}
            />
          </label>
          {tag ? <input type="hidden" name="tag" value={tag} /> : null}
          <label className="flex h-11 items-center gap-2 rounded-lg border border-[var(--color-line-solid-neutral)] px-3">
            <SlidersHorizontal size={17} className="text-[var(--color-text-neutral-tertiary)]" />
            <select
              name="sort"
              aria-label="정렬"
              defaultValue={sort}
              className="w-full border-0 bg-white text-sm font-bold outline-none"
            >
              <option value="popular">좋아요순</option>
              <option value="latest">최신순</option>
              <option value="oldest">오래된순</option>
              <option value="cookTimeAsc">조리시간 짧은순</option>
              <option value="cookTimeDesc">조리시간 긴순</option>
            </select>
          </label>
          <button className="h-11 rounded-lg bg-primary px-5 text-sm font-bold text-white">
            검색
          </button>
        </form>

        <div className="mb-7 flex flex-wrap items-center gap-2">
          <Link
            href={buildRecipesHref({ q, sort })}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold ${
              tag
                ? "border border-[var(--color-line-normal-normal)] bg-white text-[var(--color-text-neutral-secondary)]"
                : "bg-[var(--color-background-neutral-inverse)] text-white"
            }`}
          >
            전체
          </Link>
          {popularTags.map((popularTag) => (
            <Link key={popularTag} href={buildRecipesHref({ q, tag: popularTag, sort })}>
              <Tag active={popularTag === tag}>{popularTag}</Tag>
            </Link>
          ))}
          {q || tag || sort !== "popular" ? (
            <Link
              href="/recipes"
              className="inline-flex items-center gap-1 rounded-full border border-[var(--color-line-normal-normal)] bg-white px-3 py-1.5 text-xs font-bold text-[var(--color-text-neutral-secondary)]"
            >
              <Filter size={13} />
              초기화
            </Link>
          ) : null}
        </div>

        {items.length > 0 ? (
          <RecipeGrid
            key={`${q}-${tag}-${sort}`}
            initialItems={items}
            initialHasMore={hasMore}
            q={q}
            tag={tag}
            sort={sort}
          />
        ) : (
          <div className="rounded-xl border border-[var(--color-line-normal-normal)] bg-white p-10 text-center">
            <h2 className="text-xl font-extrabold tracking-normal">검색 결과가 없습니다</h2>
            <p className="mt-2 text-sm font-normal text-[var(--color-text-neutral-secondary)]">
              다른 키워드나 태그로 다시 찾아보세요.
            </p>
            <Link
              href="/recipes"
              className="mt-5 inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-bold text-white"
            >
              전체 레시피 보기
            </Link>
          </div>
        )}
      </div>
    </PageShell>
  );
}
