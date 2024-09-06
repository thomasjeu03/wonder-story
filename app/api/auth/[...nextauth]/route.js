import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import {stripe} from "@/lib/stripe";
import {resend} from "@/lib/resend";
import WelcomeAboard from "@/emails/WelcomeAboard";

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
            const [firstName, lastName] = name.split(' ');

            if (!userId || !email) return;

            const emailHtml = WelcomeAboard({ name });

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

            await resend.contacts.create({
                email: email,
                firstName: firstName,
                lastName: lastName,
                unsubscribed: false,
                audienceId: '83ef9007-29ba-4883-ba46-e488913ea13b',
            });

            await resend.emails.send({
                from: 'Wonder Story <welcome@wonder-story.app>',
                to: [email],
                subject: 'Bienvenue sur Wonder Story',
                react: emailHtml,
                tags: [
                    {
                        name: 'category',
                        value: 'welcome',
                    },
                ],
            });
        }
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };