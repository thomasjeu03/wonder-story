import prisma from "../../../../lib/prisma";
import {NextResponse} from "next/server";
// import {resend} from "@/lib/resend";
// import {TrialEndTemplate} from "@/components/email/trial-end-template";

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
            break;
        }
        // case "customer.subscription.trial_will_end": {
        //     const subscription = body.data.object;
        //     const stripeCustomerId = subscription.customer;
        //     const user = await findUserFromCustomer(stripeCustomerId);
        //
        //     if (!user?.id) {
        //         break;
        //     }
        //
        //     await sendTrialEndNotification(user.email, user.name);
        //     break;
        // }
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

// TODO: Envoi email notification when:
//  -customer.subscription.created
//  -checkout.session.completed
// const sendTrialEndNotification = async (email, name) => {
//     if (!email) {
//         return;
//     }
//
//     const msg = {
//         from: 'Thomas <contact@wonder-story.app>',
//         to: [email],
//         subject: 'Votre période d’essai se termine bientôt',
//         react: TrialEndTemplate({ name: name }),
//     };
//
//     try {
//         await resend.emails.send(msg);
//     } catch (error) {
//         console.error("Error sending trial end notification", error);
//         if (error.response) {
//             console.error(error.response.body);
//         }
//     }
// };