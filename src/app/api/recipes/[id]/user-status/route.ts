import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;

  if (!userId) {
    return NextResponse.json({ bookmarked: false, liked: false, isOwner: false });
  }

  const [bookmark, like, recipe] = await Promise.all([
    prisma.bookmark.findUnique({ where: { userId_recipeId: { userId, recipeId: id } } }),
    prisma.like.findUnique({ where: { userId_recipeId: { userId, recipeId: id } } }),
    prisma.recipe.findUnique({ where: { id }, select: { userId: true } }),
  ]);

  return NextResponse.json({
    bookmarked: Boolean(bookmark),
    liked: Boolean(like),
    isOwner: recipe?.userId === userId,
  });
}
