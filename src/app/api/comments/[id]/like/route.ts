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
  const comment = await prisma.comment.findUnique({
    where: {
      id
    },
    select: {
      id: true
    }
  });

  if (!comment) {
    return NextResponse.json({ message: "Comment not found" }, { status: 404 });
  }

  const existingLike = await prisma.commentLike.findUnique({
    where: {
      userId_commentId: {
        userId,
        commentId: id
      }
    }
  });

  if (existingLike) {
    await prisma.commentLike.delete({
      where: {
        id: existingLike.id
      }
    });
  } else {
    await prisma.commentLike.create({
      data: {
        userId,
        commentId: id
      }
    });
  }

  const likes = await prisma.commentLike.count({
    where: {
      commentId: id
    }
  });

  return NextResponse.json({
    liked: !existingLike,
    likes
  });
}
