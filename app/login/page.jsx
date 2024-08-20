import generateMetadata from "@/lib/metadata";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export const metadata = generateMetadata({
    title: "Connection - Wonder Story",
});

export default function Login() {
    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <h1>Login page</h1>
                <Button variant="">
                    <Link href="/">Back landing page</Link>
                </Button>
                <Button variant="secondary">
                    <Link href="/playground">Playground</Link>
                </Button>
            </main>
        </>
    );
}
