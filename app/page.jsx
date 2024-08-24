import generateMetadata from '@/lib/metadata';
import HomeContent from "@/app/content";

export const metadata = generateMetadata({});

export default function Home() {

    return (
        <>
            <HomeContent />
        </>
    );
}
