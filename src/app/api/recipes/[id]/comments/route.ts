import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;

  if (!userId) {
    return NextResponse.json({ message: "Authentication required" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json().catch(() => null)) as { content?: string } | null;
  const content = body?.content?.trim();

  if (!content || content.length < 2) {
    return NextResponse.json({ message: "Comment is too short" }, { status: 400 });
  }

  if (content.length > 500) {
    return NextResponse.json({ message: "Comment is too long" }, { status: 400 });
  }

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

  const comment = await prisma.comment.create({
    data: {
      userId,
      recipeId: id,
      content
    },
    include: {
      user: true,
      _count: {
        select: {
          likes: true
        }
      }
    }
  });

  return NextResponse.json({
    comment: {
      id: comment.id,
      authorId: comment.userId,
      author: comment.user.nickname ?? comment.user.name ?? "RecipeHub 사용자",
      content: comment.content,
      likes: comment._count.likes,
      liked: false,
      createdAt: comment.createdAt.toISOString()
    }
  });
}
