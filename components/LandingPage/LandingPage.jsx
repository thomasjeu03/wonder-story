import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";

export default function LandingPage() {
    // TODO: landing page
    return (
        <>
            <header>
                header langing
                <Button variant='secondary' onClick={() => signIn("google")}>Sign in with Google</Button>
            </header>
            <main>
                main landing
            </main>
            <footer>
                footer landing
            </footer>
        </>
    );
}