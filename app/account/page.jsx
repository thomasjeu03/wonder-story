import generateMetadata from '@/lib/metadata';
import AccountContent from "@/app/account/content";

export const metadata = generateMetadata({
    title: 'Mon profile - Wonder Story'
});

export default function Account() {
    return (
        <>
            <AccountContent />
        </>
    );
}
