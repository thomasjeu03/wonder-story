import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata({
    title: 'Paiement annulé - Wonder Story'
});

export default function Cancel() {
    return (
        <>
            Paiement Stripe annulé
        </>
    );
}
