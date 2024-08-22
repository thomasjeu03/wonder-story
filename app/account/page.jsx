import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata({});

export default function Account() {
    return (
        <>
            <main className="flex min-h-screen flex-col items-center gap-6 p-8">
                Account page
            </main>
        </>
    );
}
