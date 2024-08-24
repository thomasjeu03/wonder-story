import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata({
    title: 'Page introuvable - Wonder Story'
});

export default function Erreur() {
    return (
        <>
            Erreur 404 page
        </>
    );
}
