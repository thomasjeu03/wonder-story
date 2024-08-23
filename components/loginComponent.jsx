"use client"

import { useSession, signIn, signOut } from "next-auth/react";
import {Button} from "@/components/ui/button";
import {H2} from "@/components/typo/H2";
import Image from 'next/image';
import {BuyButton} from "@/components/buy/BuyButton";
import {AccountSettingsButton} from "@/components/buy/UserSettings";
import {useUser} from "@/app/contexts/UserContext";
import { Skeleton } from "@/components/ui/skeleton"

export default function LoginComponent() {
    const { data: session, status: sessionStatus } = useSession();
    const { user, status, isPremium } = useUser();

    if (status === 'loading' || sessionStatus === 'loading') {
        return <Skeleton className="w-[300px] h-[300px] rounded-lg" />;
    }

    if (!session) {
        return (
            <>
                <H2 className='text-center'>Not signed in</H2>
                <Button variant='secondary' onClick={() => signIn("google")}>Sign in with Google</Button>
            </>
        );
    }

    return (
        <>
            {user ? (
                <>
                    {user?.image && (
                        <Image
                            src={user?.image}
                            alt={user?.name || 'User Image'}
                            width={60}
                            height={60}
                            unoptimized
                            className="rounded-full"
                        />
                    )}
                    <H2 className='text-center'>Welcome, {user?.name}</H2>
                    <p className='text-center'>{user?.email}</p>
                    <p className={`rounded-md px-4 py-1 text-white 
                    ${isPremium ? 'bg-yellow-600' : 'bg-green-600'}`}
                    >
                        {user?.plan}
                    </p>
                    <div className='flex gap-2'>
                        {isPremium ? (
                            <AccountSettingsButton />
                        ):(
                            <BuyButton />
                        )}
                        <Button variant='link' className='text-destructive' onClick={() => signOut()}>
                            Sign out
                        </Button>
                    </div>
                </>
            ):(
                <Skeleton className="w-[300px] h-[300px] rounded-lg" />
            )}
        </>
    );
}