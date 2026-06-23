import { BookOpen, Flame, PenLine, Search, Sparkles } from "lucide-react";
import { FoodImage } from "@/components/food-image";
import { PageShell } from "@/components/page-shell";
import { RecipeCard } from "@/components/recipe-card";
import { ButtonLink } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { routes } from "@/constants/routes";
import { getPopularTags, getRecipeCards } from "@/lib/recipe-queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [recipes, popularTags] = await Promise.all([getRecipeCards(), getPopularTags(10)]);
  const featuredRecipe = recipes[0];
  const topRecipes = recipes.slice(0, 3);

  return (
    <PageShell>
      <div className="container-page">
        <section className="mb-8 overflow-hidden rounded-2xl border border-[var(--color-line-normal-normal)] bg-white shadow-sm lg:grid lg:grid-cols-[minmax(360px,500px)_1fr]">
          <FoodImage
            label={featuredRecipe?.title ?? "RecipeHub"}
            src={featuredRecipe?.thumbnailImg}
            height={350}
          />
          <div className="flex flex-col justify-center p-6 md:p-9">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-extrabold text-rose-600">
              <Flame size={14} />
              오늘의 인기 레시피
            </span>
            <h1 className="max-w-xl text-3xl font-extrabold leading-tight tracking-normal md:text-4xl">
              {featuredRecipe?.title ?? "맛있는 집밥 레시피를 찾아보세요"}
            </h1>
            <p className="mt-4 max-w-xl text-base font-normal leading-7 text-[var(--color-text-neutral-secondary)]">
              실제 음식 이미지가 있는 레시피만 모아 좋아요순으로 보여줍니다. 좋아요를 많이 받은 레시피는
              카드 이미지 위에 1, 2, 3위 배지로 표시됩니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={routes.recipes} icon={Search}>
                인기 레시피 보기
              </ButtonLink>
              <ButtonLink href={routes.write} variant="secondary" icon={PenLine}>
                레시피 작성
              </ButtonLink>
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <section>
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="mb-2 inline-flex items-center gap-2 text-sm font-extrabold text-[var(--color-primary-strong)]">
                  <Sparkles size={16} />
                  좋아요 랭킹
                </span>
                <h2 className="text-2xl font-extrabold tracking-normal">사람들이 많이 고른 레시피</h2>
                <p className="mt-1 text-sm font-normal text-[var(--color-text-neutral-secondary)]">
                  이미지와 메뉴가 맞는 큐레이션 레시피만 보여줍니다.
                </p>
              </div>
              <ButtonLink href={routes.recipes} variant="secondary">
                전체 보기
              </ButtonLink>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {recipes.slice(0, 12).map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>

          <aside className="space-y-5">
            <section className="rounded-xl border border-[var(--color-line-normal-normal)] bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-base font-extrabold">TOP 3</h3>
              <div className="space-y-3">
                {topRecipes.map((recipe) => (
                  <div key={recipe.id} className="flex items-center gap-3">
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 text-sm font-extrabold shadow-sm ${rankClassName(recipe.rank ?? 0)}`}>
                      {recipe.rank}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-extrabold">{recipe.title}</p>
                      <p className="text-xs font-bold text-rose-600">
                        좋아요 {recipe.likes.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-[var(--color-line-normal-normal)] bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-base font-extrabold">인기 태그</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </section>

            <section className="rounded-xl bg-[var(--color-background-neutral-inverse)] p-5 text-white">
              <BookOpen size={22} />
              <h3 className="mt-3 text-lg font-extrabold">내 레시피도 올려보세요</h3>
              <p className="mt-2 text-sm font-normal leading-6 text-white/70">
                재료, 조리 순서, 이미지를 함께 기록하면 다른 사용자가 더 쉽게 따라 만들 수 있습니다.
              </p>
              <ButtonLink href={routes.write} className="mt-4 w-full">
                작성하기
              </ButtonLink>
            </section>
          </aside>
        </div>
      </div>
    </PageShell>
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
