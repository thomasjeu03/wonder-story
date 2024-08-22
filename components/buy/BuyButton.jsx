import {Button} from "@/components/ui/button";
import {useSession} from "next-auth/react";
import {createCheckoutSession} from "@/app/actions/checkout";

export const BuyButton = () => {
    const { data: session } = useSession();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!session) {
            alert("Vous devez être connecté pour effectuer un achat.");
            return;
        }
        window.location.href = await createCheckoutSession({userId: session?.user?.id});
    };

    return (
        <form onSubmit={handleSubmit}>
            <Button type="submit" variant="secondary" size="lg">
                Upgrade to Premium
            </Button>
        </form>
    );
};