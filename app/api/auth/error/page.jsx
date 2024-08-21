import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata({});

export default function Error() {
    return (
        <>
            <main className="flex min-h-screen flex-col items-center gap-6 p-8">
                <h1 className="text-destructive">Erreur login</h1>
            </main>
        </>
    );
}
