"use server";

import prisma from "@/lib/prisma";
import {stripe} from "@/lib/stripe";

export async function createCheckoutSession({ userId }) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        throw new Error("User not found or does not have a Stripe customer ID");
    }

    if (user?.plan === "PREMIUM") {
        throw new Error("User already Premium");
    }

    const stripeCustomerId = user?.stripeCustomerId ?? undefined;

    if (!stripeCustomerId) {
        throw new Error("Stripe customer ID is missing");
    }

    const URL = process.env.NODE_ENV === "development" ? process.env.NEXT_URL_DEVELOPMENT : process.env.NEXT_URL_PRODUCTION

    const session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        mode: 'subscription',
        allow_promotion_codes: true,
        payment_method_types: ['card'],
        line_items: [
            {
                price: process.env.NODE_ENV === "development" ? process.env.STRIPE_TEST_PRICE_ID : process.env.STRIPE_PRICE_ID,
                quantity: 1
            }
        ],
        success_url: `${URL}/success`,
        cancel_url: `${URL}/cancel`,
    });

    if (!session.url) {
        throw new Error("Session URL is missing");
    }

    return session.url;
}