"use client";

import {useSession} from "next-auth/react";
import {Skeleton} from "@/components/ui/skeleton";
import LandingPage from "@/components/LandingPage/LandingPage";
import MenuBar from "@/components/menuBar/MenuBar";

export default function ContainerIsLogin({ children }) {
    const { data: session, status: sessionStatus } = useSession();

    if (sessionStatus === 'loading') {
        // TODO : loader de l app, par exemple animation du logo avec la baguette
        return <Skeleton className="w-full rounded-lg" style={{ height: 'calc(100dvh - 48px)' }} />;
    }

    if (session) {
        return (
            <>
                <MenuBar/>
                <main className="flex flex-col items-center gap-6 w-full pt-10 sm:pt-12">
                    {children}
                </main>
                <div className="gradient-blur-reverse">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </>
        )
    }

    return (
        <LandingPage />
    );
}