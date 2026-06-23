import NextAuth from "next-auth";
import Kakao from "next-auth/providers/kakao";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Kakao({
      clientId: process.env.AUTH_KAKAO_ID,
      client: { token_endpoint_auth_method: "none" },
    }),
  ],
  pages: { signIn: "/auth/login" },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // 로그인 시에만 실행: PrismaAdapter 4+ 쿼리 → 최대 2 쿼리로 단축
        const existing = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
          select: { userId: true },
        });

        if (existing) {
          token.id = existing.userId;
        } else {
          const kakao = profile as {
            kakao_account?: {
              email?: string;
              profile?: { nickname?: string; thumbnail_image_url?: string };
            };
          };
          const newUser = await prisma.user.create({
            data: {
              email: kakao.kakao_account?.email ?? null,
              name: kakao.kakao_account?.profile?.nickname ?? null,
              image: kakao.kakao_account?.profile?.thumbnail_image_url ?? null,
              accounts: {
                create: {
                  type: "oauth",
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token ?? null,
                  token_type: account.token_type ?? null,
                  scope: account.scope ?? null,
                },
              },
            },
            select: { id: true },
          });
          token.id = newUser.id;
        }
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
});
