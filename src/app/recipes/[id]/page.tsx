import { notFound } from "next/navigation";
import { Bookmark, Clock, Heart, Users } from "lucide-react";
import { FoodImage } from "@/components/food-image";
import { PageShell } from "@/components/page-shell";
import { ButtonLink } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getRecipeById, getRecipeTasteNote, toRecipeCard } from "@/lib/recipe-queries";
import { RecipeComments, type RecipeComment } from "./recipe-comments";
import { RecipeEngagementActions } from "./recipe-engagement-actions";
import { RecipeOwnerActions } from "./recipe-owner-actions";

export const dynamic = "force-dynamic";

type RecipeDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: RecipeDetailPageProps) {
  const { id } = await params;
  const recipe = await getRecipeById(id, {});
  if (!recipe) return {};
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
  const imageUrl = recipe.thumbnailImg?.startsWith("http")
    ? recipe.thumbnailImg
    : recipe.thumbnailImg && baseUrl
      ? `${baseUrl}${recipe.thumbnailImg}`
      : undefined;
  return {
    title: `${recipe.title} | RecipeHub`,
    description: recipe.description,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      type: "article" as const,
      ...(imageUrl ? { images: [imageUrl] } : {})
    }
  };
}

export default async function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const { id } = await params;
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  const recipeData = await getRecipeById(id, { incrementView: true });

  if (!recipeData) {
    notFound();
  }

  const recipe = toRecipeCard(recipeData);
  const isOwner = Boolean(userId && userId === recipeData.userId);
  const existingBookmark = userId
    ? await prisma.bookmark.findUnique({
        where: {
          userId_recipeId: {
            userId,
            recipeId: recipe.id
          }
        }
      })
    : null;
  const existingLike = userId
    ? await prisma.like.findUnique({
        where: {
          userId_recipeId: {
            userId,
            recipeId: recipe.id
          }
        }
      })
    : null;
  const comments = await prisma.comment.findMany({
    where: {
      recipeId: recipe.id
    },
    orderBy: [
      {
        likes: {
          _count: "desc"
        }
      },
      {
        createdAt: "desc"
      }
    ],
    include: {
      user: true,
      likes: userId
        ? {
            where: {
              userId
            },
            select: {
              id: true
            }
          }
        : false,
      _count: {
        select: {
          likes: true
        }
      }
    }
  });
  const formattedComments: RecipeComment[] = comments.map((comment) => ({
    id: comment.id,
    author: comment.user.nickname ?? comment.user.name ?? "RecipeHub 사용자",
    content: comment.content,
    likes: comment._count.likes,
    liked: Array.isArray(comment.likes) && comment.likes.length > 0,
    createdAt: new Intl.DateTimeFormat("ko-KR", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(comment.createdAt)
  }));
  const tasteNote = getRecipeTasteNote(recipe.id, recipe.title);

  return (
    <PageShell>
      <div className="container-page max-w-[1120px]">
        <div className="mb-4 flex flex-wrap gap-2">
          {recipe.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-normal">
              {recipe.title}
            </h1>
            <p className="mt-3 text-sm font-bold text-[var(--color-text-neutral-tertiary)]">
              {recipe.author} · 좋아요 {recipe.likes.toLocaleString()} · 조회{" "}
              {recipe.views.toLocaleString()} · {recipe.createdAt}
            </p>
          </div>
          <RecipeEngagementActions
            recipeId={recipe.id}
            title={recipe.title}
            initialBookmarks={recipe.bookmarks}
            initialBookmarked={Boolean(existingBookmark)}
            initialLikes={recipe.likes}
            initialLiked={Boolean(existingLike)}
            isLoggedIn={Boolean(userId)}
          />
        </div>
        {isOwner ? (
          <div className="mb-7">
            <RecipeOwnerActions recipeId={recipe.id} />
          </div>
        ) : null}

        <FoodImage
          label={recipe.title}
          src={recipe.thumbnailImg}
          height={460}
          className="mb-9 rounded-xl border border-[var(--color-line-normal-normal)] shadow-sm"
        />

        <div className="grid gap-9 lg:grid-cols-[1fr_300px]">
          <article>
            <p className="mb-9 text-lg font-normal leading-8 text-[var(--color-text-neutral-secondary)]">
              {recipe.description}
            </p>

            <section className="mb-10 rounded-xl border border-[var(--color-line-normal-normal)] bg-white p-5 shadow-sm">
              <h2 className="text-2xl font-extrabold tracking-normal">맛 설명</h2>
              <p className="mt-3 whitespace-pre-line text-base font-normal leading-8 text-[var(--color-text-neutral-secondary)]">
                {tasteNote}
              </p>
            </section>

            <section className="mb-10">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-extrabold tracking-normal">재료</h2>
                <span className="text-sm font-bold text-[var(--color-text-neutral-tertiary)]">
                  {recipeData.ingredients.length}개 항목
                </span>
              </div>
              <div className="rounded-xl border border-[var(--color-line-normal-normal)] bg-white p-5 shadow-sm">
                <div className="grid gap-x-8 md:grid-cols-2">
                  {recipeData.ingredients.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b border-[var(--color-line-solid-neutral)] py-3 last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0"
                    >
                      <span className="font-semibold">{item.name}</span>
                      <span className="text-sm font-bold text-[var(--color-text-neutral-tertiary)]">
                        {[item.amount, item.unit].filter(Boolean).join(" ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-extrabold tracking-normal">조리 순서</h2>
                <span className="text-sm font-bold text-[var(--color-text-neutral-tertiary)]">
                  {recipeData.steps.length}단계
                </span>
              </div>
              <div className="space-y-5">
                {recipeData.steps.map((step, index) => (
                  <section
                    key={step.id}
                    className="grid gap-5 rounded-xl border border-[var(--color-line-normal-normal)] bg-white p-5 shadow-sm md:grid-cols-[44px_1fr_220px]"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-extrabold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-extrabold">Step {index + 1}</h3>
                      <p className="mt-2 text-sm font-normal leading-7 text-[var(--color-text-neutral-secondary)]">
                        {step.description}
                      </p>
                    </div>
                    <FoodImage
                      label={`${recipe.title} ${index + 1}단계`}
                      src={step.img}
                      height={150}
                      className="rounded-lg"
                    />
                  </section>
                ))}
              </div>
            </section>

            <RecipeComments
              recipeId={recipe.id}
              initialComments={formattedComments}
              isLoggedIn={Boolean(userId)}
            />
          </article>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-[var(--color-line-normal-normal)] bg-white p-5 shadow-sm">
              <div className="grid gap-3">
                <Stat icon={Clock} label="조리시간" value={`${recipe.cookTime}분`} />
                <Stat icon={Users} label="분량" value={`${recipe.serving}인분`} />
                <Stat icon={Heart} label="좋아요" value={`${recipe.likes.toLocaleString()}개`} />
                <Stat icon={Bookmark} label="난이도" value={recipe.difficulty} />
              </div>
            </div>
            <ButtonLink href="/recipes/write" icon={Bookmark} className="w-full">
              내 레시피로 기록하기
            </ButtonLink>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}

function Stat({
  icon: Icon,
  label,
  value
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-[var(--color-background-neutral-secondary)] px-3 py-3">
      <span className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-text-neutral-secondary)]">
        <Icon size={16} />
        {label}
      </span>
      <span className="text-sm font-extrabold">{value}</span>
    </div>
  );
}
