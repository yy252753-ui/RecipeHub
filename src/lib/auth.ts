import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Kakao from "next-auth/providers/kakao";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Kakao({
            clientId: process.env.AUTH_KAKAO_ID,
            client: {
                token_endpoint_auth_method: "none",
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
            }

            return session;
        },
    },
});
