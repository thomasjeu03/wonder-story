"use client"

import { useSession, signIn, signOut } from "next-auth/react";
import {Button} from "@/components/ui/button";
import {H2} from "@/components/typo/H2";
import Image from 'next/image';
import {BuyButton} from "@/components/buy/BuyButton";
import {AccountSettingsButton} from "@/components/buy/UserSettings";
import {useUser} from "@/app/contexts/UserContext";

export default function LoginComponent() {
    const { data: session} = useSession();
    const { user, status } = useUser();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!session) {
        return (
            <>
                <H2 className='text-center'>Not signed in</H2>
                <Button variant='default' onClick={() => signIn("google")}>Sign in with Google</Button>
            </>
        );
    }

    return (
        <>{user?.image && (
            <Image
                src={user?.image}
                alt={user?.name || 'User Image'}
                width={96}
                height={96}
                unoptimized
                className="rounded-full"
            />
        )}
            <H2 className='text-center'>Welcome, {user?.name}</H2>
            <p className='text-center'>{user?.email}</p>
            <p>plan : {user?.plan}</p>
            {user?.plan === "PREMIUM" ? (
                <AccountSettingsButton />
            ):(
                <BuyButton />
            )}
            <Button variant='destructive' onClick={() => signOut()}>
                Sign out
            </Button>
        </>
    );
}