import generateMetadata from '@/lib/metadata';
import AccountContent from "@/app/account/content";

export const metadata = generateMetadata({
    title: 'Connexion - Wonder Story'
});

export default function SignIn() {
    return (
        <>
            <AccountContent />
        </>
    );
}
