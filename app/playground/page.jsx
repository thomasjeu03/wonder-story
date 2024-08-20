import generateMetadata from "@/lib/metadata";

export const metadata = generateMetadata({
    title: "Playground - Wonder Story",
});

export default function Login() {
    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <h1>Playground page</h1>
            </main>
        </>
    );
}
