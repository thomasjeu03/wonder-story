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
            authorization: {
                params: {
                    scope: "openid profile email",
                },
            },
        }),
    ],
    callbacks: {
        signIn: async ({account}) => {
            if (account.provider === 'google') {
                return true;
            }
            return false;
        },
        jwt: async ({ user, token }) => {
            if (user) {
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email },
                });
    
                if (!existingUser) {
                    const newUser = await prisma.user.create({
                        data: {
                            email: user.email,
                            name: user.name,
                            image: user.image,
                        },
                    });
                    token.id = newUser.id;
                    token.email = newUser.email;
                } else {
                    token.id = existingUser.id;
                    token.email = existingUser.email;
                }
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.user.id = token.id;
            session.user.email = token.email;
            return session;
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