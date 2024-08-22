import {Button} from "@/components/ui/button";
import {stripe} from "@/lib/stripe";
import {redirect} from "next/navigation";

export const BuyButton = () => {
    return (
        <form>
            <Button formeAction={async () => {
                "use server";

                const authSession = await auth();
                const user = await prisma.user.findUnique({
                    where: {
                        id: authSession?.user?.id ?? "",
                    },
                    select: {
                        stripeCustomerId: true,
                    }
                });

                const stripeCustomerId = user?.stripeCustomerId ?? undefined;

                const session = await stripe.checkout.sessions.create({
                    customer: stripeCustomerId,
                    mode: 'subscription',
                    payment_method_types: ['card', 'link'],
                    line_items: [
                        {
                            price: process.env.NODE_ENV === "development" ? process.env.STRIPE_TEST_PRICE_ID : process.env.STRIPE_PRICE_ID,
                            quantity: 1
                        }
                    ],
                    success_url: `${window.location.origin}/success`,
                    cancel_url: `${window.location.origin}/cancel`,
                })

                if (!session.url) {
                    throw new Error("Session URL is missing");
                }
                redirect(session.url);
            }} variant='secondary' size='lg'>
                Upgrade to Premium
            </Button>
        </form>
    )
}