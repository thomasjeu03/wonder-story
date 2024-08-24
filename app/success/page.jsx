import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata({
    title: 'Paiement réussi - Wonder Story'
});

export default function Success() {
    return (
        <>
            Paiement Stripe reussi
        </>
    );
}
