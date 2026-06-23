import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildRecipeRelationData, recipePayloadSchema } from "@/lib/recipe-mutations";
import { getRecipeById, toRecipeCard } from "@/lib/recipe-queries";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
  }

  return NextResponse.json({
    ...toRecipeCard(recipe),
    ingredients: recipe.ingredients,
    steps: recipe.steps
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;

  if (!userId) {
    return NextResponse.json({ message: "Authentication required" }, { status: 401 });
  }

  const { id } = await params;
  const existingRecipe = await prisma.recipe.findUnique({
    where: {
      id
    },
    select: {
      userId: true
    }
  });

  if (!existingRecipe) {
    return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
  }

  if (existingRecipe.userId !== userId) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
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

  const recipe = await prisma.$transaction(async (tx) => {
    await tx.ingredient.deleteMany({
      where: {
        recipeId: id
      }
    });
    await tx.step.deleteMany({
      where: {
        recipeId: id
      }
    });
    await tx.recipeTag.deleteMany({
      where: {
        recipeId: id
      }
    });

    return tx.recipe.update({
      where: {
        id
      },
      data: {
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
  });

  return NextResponse.json(recipe);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;

  if (!userId) {
    return NextResponse.json({ message: "Authentication required" }, { status: 401 });
  }

  const { id } = await params;
  const existingRecipe = await prisma.recipe.findUnique({
    where: {
      id
    },
    select: {
      userId: true
    }
  });

  if (!existingRecipe) {
    return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
  }

  if (existingRecipe.userId !== userId) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  await prisma.recipe.delete({
    where: {
      id
    }
  });

  return NextResponse.json({ ok: true });
}
