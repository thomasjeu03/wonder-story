import {Button} from "@/components/ui/button";
import {useSession} from "next-auth/react";
import {billingPortal} from "@/app/actions/userSettings";
import {useLocale} from "@/app/contexts/LocaleContext";
import {Crown} from "lucide-react";

export const AccountSettingsButton = () => {
    const { data: session } = useSession();
    const { t } = useLocale();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!session) {
            alert("Vous devez être connecté pour vous abonner.");
            return;
        }
        window.location.href = await billingPortal({userId: session?.user?.id});
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            <Button type="submit" className="w-full max-w-sm" size="lg" variant='secondary'>
                {t('manage-subscription')}
                <Crown />
            </Button>
        </form>
    );
};