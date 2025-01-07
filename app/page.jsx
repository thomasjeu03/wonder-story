import generateMetadata from '@/lib/metadata';
import HomeContent from "@/app/content";
import AdBanner from "@/components/adSense/AdBanner";

export const metadata = generateMetadata({});

export default function Home() {

    return (
        <>
            {/*<div className="w-full max-w-2xl">*/}
            {/*    <AdBanner*/}
            {/*        dataAdFormat="auto"*/}
            {/*        dataFullWidthResponsive={true}*/}
            {/*        dataAdSlot="8653074776"*/}
            {/*    />*/}
            {/*</div>*/}
            
            <HomeContent />
        </>
    );
}
