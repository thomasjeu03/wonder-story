import {Button} from "@/components/ui/button";
import {useSession} from "next-auth/react";
import {createCheckoutSession} from "@/app/actions/checkout";
import {Crown} from "lucide-react";
import {useLocale} from "@/app/contexts/LocaleContext";

export const BuyButton = ({size = 'lg', varient = 'default'}) => {
    const { data: session } = useSession();
    const { t } = useLocale();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!session) {
            alert("Vous devez être connecté pour effectuer un achat.");
            return;
        }
        window.location.href = await createCheckoutSession({userId: session?.user?.id});
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            <Button type="submit" className="w-full max-w-sm" size={size} variant={varient}>
                {t('upgrade-to-premium')}
                <Crown />
            </Button>
        </form>
    );
};