import prisma from "../../../../lib/prisma";
import {NextResponse} from "next/server";

exports.POST = async (req) => {
    const body = await req.json();

    switch (body.type) {
        case "checkout.session.completed": {
            const session = body.data.object;
            const stripeCustomerId = session.customer;
            const user = await findUserFromCustomer(stripeCustomerId);

            if (!user?.id) {
                break;
            }

            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    plan: 'PREMIUM'
                }
            });
            console.log("Checkout session completed", session);
            break;
        }
        case "invoice.paid": {
            const invoice = body.data.object;
            const stripeCustomerId = invoice.customer;
            const user = await findUserFromCustomer(stripeCustomerId);

            if (!user?.id) {
                break;
            }

            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    plan: 'PREMIUM'
                }
            });
            console.log("Payment completed", invoice);
            break;
        }
        case "invoice.payment_failed": {
            const invoice = body.data.object;
            const stripeCustomerId = invoice.customer;
            const user = await findUserFromCustomer(stripeCustomerId);

            if (!user?.id) {
                break;
            }

            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    plan: 'FREE'
                }
            });
            console.log("Payment failed", invoice);
            break;
        }
        case "customer.subscription.deleted": {
            const subscription = body.data.object;
            const stripeCustomerId = subscription.customer;
            const user = await findUserFromCustomer(stripeCustomerId);

            if (!user?.id) {
                break;
            }

            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    plan: 'FREE'
                }
            });
            console.log("Subscription deleted", subscription);
            break;
        }
        default:
            console.log(`Unhandled event type ${body.type}`);
    }

    return NextResponse.json({
        ok: true,
    });
};

const findUserFromCustomer = async (stripeCustomerId) => {
    if (typeof stripeCustomerId !== "string") {
        return null;
    }

    return prisma.user.findFirst({
        where: {
            stripeCustomerId
        }
    });
};