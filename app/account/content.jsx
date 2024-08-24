"use client"

import { signOut } from "next-auth/react";
import {Button} from "@/components/ui/button";
import {H2} from "@/components/typo/H2";
import Image from 'next/image';
import {BuyButton} from "@/components/buy/BuyButton";
import {AccountSettingsButton} from "@/components/buy/UserSettings";
import {useUser} from "@/app/contexts/UserContext";

export default function AccountContent() {
    const { user, isPremium } = useUser();

    return (
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
            <H2 className='text-center'>{user?.name}</H2>
            <p className='text-center'>{user?.email}</p>
            <p className={`rounded-md px-4 py-1 text-white 
                    ${isPremium ? 'bg-yellow-600' : 'bg-green-600'}`}
            >
                {user?.plan}
            </p>
            <div className='flex gap-2'>
                {isPremium ? (
                    <AccountSettingsButton/>
                ) : (
                    <BuyButton/>
                )}
                <Button variant='link' className='text-destructive' onClick={() => signOut()}>
                    Sign out
                </Button>
            </div>
        </>
    );
}