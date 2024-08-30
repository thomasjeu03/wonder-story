import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";

export default function LandingPage() {
    // TODO: landing page
    return (
        <>
            <header>
                header langing
                <Button onClick={() => signIn("google")}>Se connecter</Button>
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