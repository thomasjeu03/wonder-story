import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        signIn: async (user) => {
            const isUserExist = await prisma.user.findUnique({
                where: { email: user.email },
            });

            if (!isUserExist) {
                await prisma.user.create({
                    data: {
                        email: user.email,
                        name: user.name,
                        image: user.image,
                    },
                });
            }

            return true;
        },
        session: async ({ session, token }) => {
            session.user.id = token.id;
            return session;
        },
        jwt: async ({ user, token }) => {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };