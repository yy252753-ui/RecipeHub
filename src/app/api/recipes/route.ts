import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildRecipeRelationData, recipePayloadSchema } from "@/lib/recipe-mutations";
import { getRecipePage, normalizeRecipeSort } from "@/lib/recipe-queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const { items, hasMore } = await getRecipePage({
    q: searchParams.get("q") ?? undefined,
    tag: searchParams.get("tag") ?? undefined,
    sort: normalizeRecipeSort(searchParams.get("sort") ?? undefined),
    page
  });

  return NextResponse.json({ items, hasMore });
}

export async function POST(request: Request) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;

  if (!userId) {
    return NextResponse.json({ message: "Authentication required" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = recipePayloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Invalid recipe payload",
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const recipe = await prisma.recipe.create({
    data: {
      userId,
      title: data.title,
      description: data.description,
      cookTime: data.cookTime,
      serving: data.serving,
      difficulty: data.difficulty,
      status: data.status,
      thumbnailImg: data.thumbnailImg || null,
      ...buildRecipeRelationData(data)
    },
    include: {
      ingredients: true,
      steps: true,
      tags: {
        include: {
          tag: true
        }
      }
    }
  });

  return NextResponse.json(recipe, { status: 201 });
}
