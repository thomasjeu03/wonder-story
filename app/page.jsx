import generateMetadata from '@/lib/metadata';
import LoginComponent from "@/components/loginComponent";

export const metadata = generateMetadata({});

export default function Home() {
    return (
        <>
            <main className="flex min-h-screen flex-col items-center gap-6 p-8">
                <LoginComponent />
            </main>
        </>
    );
}
