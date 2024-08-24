import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata({
    title: 'Erreur - Wonder Story'
});

export default function Error() {
    return (
        <>
            <h2 className="text-destructive">Error login</h2>
        </>
    );
}
