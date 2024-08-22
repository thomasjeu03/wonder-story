import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import {stripe} from "@/lib/stripe";

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
        async session({ session, token, user }) {
            if (session?.user && user?.id) {
                session.user.id = user.id;
            } else if (session?.user && token?.id) {
                session.user.id = token.id;
            }
            return session;
        },
        async jwt({ token, user }) {
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
    events: {
        createUser: async (message) => {
            const userId = message.user.id;
            const email = message.user.email;
            const name = message.user.name;

            if (!userId || !email) return;


            const stripeCustomer = await stripe.customers.create({
                email,
                name: name ?? undefined,
            })

            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    stripeCustomerId: stripeCustomer.id
                }
            })
        }
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };