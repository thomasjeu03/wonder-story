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
        session: async ({ session, token }) => {
            session.user.id = token.id;
            session.user.email = token.email;
            return session;
        },
        jwt: async ({ user, token }) => {
            // Le `user` est disponible uniquement lors de la première connexion
            if (user) {
                token.id = user.id;
                token.email = user.email;
                
                // Vérifier si l'utilisateur existe déjà dans la DB
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