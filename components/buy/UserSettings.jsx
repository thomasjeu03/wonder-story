import {Button} from "@/components/ui/button";
import {useSession} from "next-auth/react";
import {billingPortal} from "@/app/actions/userSettings";

export const AccountSettingsButton = () => {
    const { data: session } = useSession();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!session) {
            alert("Vous devez être connecté pour effectuer un achat.");
            return;
        }
        window.location.href = await billingPortal({userId: session?.user?.id});
    };

    return (
        <form onSubmit={handleSubmit}>
            <Button type="submit" variant="outline" size="lg">
                Settings Stripe
            </Button>
        </form>
    );
};