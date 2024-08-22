"use client"

import { useSession, signIn, signOut } from "next-auth/react";
import {Button} from "@/components/ui/button";

export default function LoginComponent() {
    const { data: session } = useSession();

    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br />
                <Button variant='destructive' onClick={() => signOut()}>Sign out</Button>
            </>
        );
    }
    return (
        <>
            Not signed in <br />
            <br />
            <Button variant='secondary' onClick={() => signIn("google")}>Sign in with Google</Button>
            <br />
            <Button variant='outline' onClick={() => signIn("apple")}>Sign in with Apple</Button>
        </>
    );
}