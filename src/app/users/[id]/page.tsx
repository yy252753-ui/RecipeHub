import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { RecipeCard } from "@/components/recipe-card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toRecipeCard } from "@/lib/recipe-queries";
import { ProfileEditForm } from "./profile-edit-form";

export const dynamic = "force-dynamic";

type ProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  const [session, user] = await Promise.all([
    auth(),
    prisma.user.findUnique({
      where: {
        id
      },
      include: {
        recipes: {
          where: {
            status: "PUBLISHED"
          },
          orderBy: {
            createdAt: "desc"
          },
          include: {
            user: true,
            tags: {
              include: {
                tag: true
              }
            },
            ingredients: {
              orderBy: {
                order: "asc"
              }
            },
            steps: {
              orderBy: {
                order: "asc"
              }
            },
            _count: {
              select: {
                bookmarks: true,
                likes: true
              }
            }
          }
        }
      }
    })
  ]);

  if (!user) {
    notFound();
  }

  const sessionUserId = (session?.user as { id?: string } | undefined)?.id;
  const isOwner = sessionUserId === user.id;
  const displayName = user.nickname ?? user.name ?? "RecipeHub 사용자";
  const bio = user.bio ?? "아직 소개가 없습니다.";
  const recipes = user.recipes.map(toRecipeCard);

  return (
    <PageShell>
      <div className="container-page">
        <section className="mb-8 rounded-2xl border border-[var(--color-line-normal-normal)] bg-white p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <ProfileAvatar name={displayName} src={user.profileImg ?? user.image} />
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-extrabold tracking-normal">{displayName}</h1>
              <p className="mt-2 text-sm font-normal leading-6 text-[var(--color-text-neutral-secondary)]">
                {bio}
              </p>
              <p className="mt-3 text-sm font-bold text-[var(--color-text-neutral-tertiary)]">
                공개 레시피 {recipes.length}개
              </p>
              {isOwner ? (
                <ProfileEditForm
                  userId={user.id}
                  initialNickname={displayName}
                  initialBio={user.bio ?? ""}
                  initialProfileImg={user.profileImg ?? ""}
                />
              ) : null}
            </div>
          </div>
        </section>

        <h2 className="mb-5 text-2xl font-extrabold tracking-normal">작성한 레시피</h2>
        {recipes.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-[var(--color-line-normal-normal)] bg-white p-10 text-center">
            <h3 className="text-xl font-extrabold tracking-normal">공개 레시피가 없습니다</h3>
            <p className="mt-2 text-sm font-normal text-[var(--color-text-neutral-secondary)]">
              출간된 레시피가 생기면 여기에 표시됩니다.
            </p>
          </div>
        )}
      </div>
    </PageShell>
  );
}

function ProfileAvatar({ name, src }: { name: string; src?: string | null }) {
  return (
    <div className="relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full bg-[var(--color-background-primary-low)] text-2xl font-extrabold text-primary">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <span>{name.slice(0, 1)}</span>
      )}
    </div>
  );
}
