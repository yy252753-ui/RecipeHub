import { PageShell } from "@/components/page-shell";
import { RecipeCard } from "@/components/recipe-card";
import { getRecipeCards } from "@/lib/recipe-queries";

export const dynamic = "force-dynamic";

export default async function FeedPage() {
  const recipes = await getRecipeCards({ limit: 3 });

  return (
    <PageShell>
      <div className="container-page">
        <h1 className="text-3xl font-extrabold tracking-normal">피드</h1>
        <p className="mt-2 text-[var(--color-text-neutral-secondary)]">
          팔로우한 작성자의 새 레시피를 모아보는 V2 화면입니다.
        </p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
