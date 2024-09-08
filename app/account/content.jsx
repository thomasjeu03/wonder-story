"use client"

import { signOut } from "next-auth/react";
import {Button} from "@/components/ui/button";
import {H2} from "@/components/typo/H2";
import Image from 'next/image';
import {BuyButton} from "@/components/buy/BuyButton";
import {AccountSettingsButton} from "@/components/buy/UserSettings";
import {useUser} from "@/app/contexts/UserContext";
import {useLocale} from "@/app/contexts/LocaleContext";
import {LogOut} from "lucide-react";

export default function AccountContent() {
    const { user, isPremium } = useUser();
    const { t } = useLocale();

    return (
        <section className="min-h-min w-full flex flex-col items-center pt-4 sm:pt-6 gap-6 sm:gap-12 pb-20">
            <div className="flex flex-col gap-3 items-center w-full">
                {user?.image && (
                    <Image
                        src={user?.image}
                        alt={user?.name || 'User Image'}
                        width={80}
                        height={80}
                        unoptimized
                        className={`${isPremium ? 'border-2 border-yellow-500' : ''} rounded-full`}
                        quality={90}
                    />
                )}
                <H2 className='text-center'>{user?.name}</H2>
                <p className='text-center'>{user?.email}</p>
            </div>
            {isPremium ? (
                <AccountSettingsButton/>
            ) : (
                <BuyButton/>
            )}
            <Button variant='destructive' size="lg" className="w-full max-w-sm" onClick={() => signOut()}>
                {t('sign-out')}
                <LogOut />
            </Button>
        </section>
    );
}