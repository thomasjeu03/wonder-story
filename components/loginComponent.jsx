"use client"

import { useSession, signIn, signOut } from "next-auth/react";
import {Button} from "@/components/ui/button";
import {H2} from "@/components/typo/H2";
import Image from 'next/image';
import {BuyButton} from "@/components/buy/BuyButton";
import {AccountSettingsButton} from "@/components/buy/UserSettings";

export default function LoginComponent() {
    const { data: session } = useSession();

    if (session) {
        return (
            <>
                {session?.user?.image && (
                    <Image
                        src={session?.user?.image}
                        alt={session?.user?.name || 'User Image'}
                        width={96}
                        height={96}
                        unoptimized
                        className="rounded-full"
                    />
                )}
                <H2 className='text-center'>Welcome, {session?.user?.name}</H2>
                <p className='text-center'>{session?.user?.email}</p>
                <BuyButton />
                <AccountSettingsButton />
                <Button variant='destructive' onClick={() => signOut()}>
                    Sign out
                </Button>
            </>
        );
    }
    return (
        <>
            <H2 className='text-center'>Not signed in</H2>
            <Button variant='default' onClick={() => signIn("google")}>Sign in with Google</Button>
        </>
    );
}