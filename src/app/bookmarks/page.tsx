import { Bookmark } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { RecipeCard } from "@/components/recipe-card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toRecipeCard } from "@/lib/recipe-queries";

export const dynamic = "force-dynamic";

export default async function BookmarksPage() {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;

  if (!userId) {
    redirect("/auth/login?callbackUrl=/bookmarks");
  }

  const bookmarks = await prisma.bookmark.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      recipe: {
        include: {
          user: true,
          tags: { include: { tag: true } },
          ingredients: { orderBy: { order: "asc" } },
          steps: { orderBy: { order: "asc" } },
          _count: { select: { bookmarks: true, likes: true } }
        }
      }
    }
  });

  const recipes = bookmarks.map((b) => toRecipeCard(b.recipe));

  return (
    <PageShell>
      <div className="container-page">
        <div className="mb-7">
          <h1 className="text-3xl font-extrabold tracking-normal">저장한 레시피</h1>
          <p className="mt-2 font-normal text-[var(--color-text-neutral-secondary)]">
            북마크해둔 레시피를 모아서 볼 수 있습니다.
          </p>
        </div>

        {recipes.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-[var(--color-line-normal-normal)] bg-white p-10 text-center">
            <Bookmark size={36} className="mx-auto mb-4 text-[var(--color-text-neutral-assistive)]" />
            <h2 className="text-xl font-extrabold tracking-normal">저장한 레시피가 없습니다</h2>
            <p className="mt-2 text-sm font-normal text-[var(--color-text-neutral-secondary)]">
              레시피 상세 페이지에서 저장 버튼을 눌러 모아보세요.
            </p>
            <Link
              href="/recipes"
              className="mt-5 inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-bold text-white"
            >
              레시피 둘러보기
            </Link>
          </div>
        )}
      </div>
    </PageShell>
  );
}
