import Link from 'next/link';
import {Button} from "@/components/ui/button";

import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata({});

export default function Home() {
    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <Button variant="outline">
                    <Link href="/login">Se connecter</Link>
                </Button>
            </main>
        </>
    );
}
