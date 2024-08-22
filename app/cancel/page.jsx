import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata({});

export default function Cancel() {
    return (
        <>
            <main className="flex min-h-screen flex-col items-center gap-6 p-8">
                Paiement Stripe annulé
            </main>
        </>
    );
}
