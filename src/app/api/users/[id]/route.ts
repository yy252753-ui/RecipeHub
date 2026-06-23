import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const userProfileSchema = z.object({
  nickname: z.string().trim().min(1).max(30),
  bio: z.string().trim().max(160).optional().or(z.literal("")),
  profileImg: z.string().url().optional().or(z.literal(""))
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  const { id } = await params;

  if (!userId) {
    return NextResponse.json({ message: "Authentication required" }, { status: 401 });
  }

  if (userId !== id) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = userProfileSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Invalid profile payload",
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const user = await prisma.user.update({
    where: {
      id
    },
    data: {
      nickname: data.nickname,
      bio: data.bio || null,
      profileImg: data.profileImg || null
    },
    select: {
      id: true,
      nickname: true,
      bio: true,
      profileImg: true
    }
  });

  return NextResponse.json(user);
}
