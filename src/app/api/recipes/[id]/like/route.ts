import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;

  if (!userId) {
    return NextResponse.json({ message: "Authentication required" }, { status: 401 });
  }

  const { id } = await params;
  const recipe = await prisma.recipe.findFirst({
    where: {
      id,
      status: "PUBLISHED"
    },
    select: {
      id: true
    }
  });

  if (!recipe) {
    return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
  }

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_recipeId: {
        userId,
        recipeId: id
      }
    }
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id
      }
    });
  } else {
    await prisma.like.create({
      data: {
        userId,
        recipeId: id
      }
    });
  }

  const likes = await prisma.like.count({
    where: {
      recipeId: id
    }
  });

  return NextResponse.json({
    liked: !existingLike,
    likes
  });
}
