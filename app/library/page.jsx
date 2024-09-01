import generateMetadata from '@/lib/metadata';
import LibraryContent from "@/app/library/content";

export const metadata = generateMetadata({
    title: 'Ma librairie - Wonder Story'
});

export default function Library() {
    return (
        <>
            <LibraryContent />
        </>
    );
}
