"use server";

import prisma from "@/lib/prisma";
import {stripe} from "@/lib/stripe";

export async function billingPortal({ userId }) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        throw new Error("User not found or does not have a Stripe customer ID");
    }

    const stripeCustomerId = user?.stripeCustomerId ?? undefined;

    if (!stripeCustomerId) {
        throw new Error("Stripe customer ID is missing");
    }

    const session = await stripe.billingPortal.sessions.create({
        customer: user?.stripeCustomerId ?? "",
        return_url: `https://wonder-story.app/account`
    });

    if (!session.url) {
        throw new Error("Session URL is missing");
    }

    return session.url;
}