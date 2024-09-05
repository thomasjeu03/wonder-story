import {Stripe} from "stripe";

export const stripe = new Stripe(process.env.NODE_ENV === "development" ? process.env.STRIPE_SECRET_KEY : process.env.STRIPE_LIVE_SECRET_KEY, {
    apiVersion: "2023-10-16",
    typescript: false
})