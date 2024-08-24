"use client";

import {useSession} from "next-auth/react";
import {Skeleton} from "@/components/ui/skeleton";
import LandingPage from "@/components/LandingPage/LandingPage";
import MenuBar from "@/components/menuBar/MenuBar";

export default function ContainerIsLogin({ children }) {
    const { data: session, status: sessionStatus } = useSession();

    if (sessionStatus === 'loading') {
        // TODO : loader de l app
        return <Skeleton className="w-full rounded-lg" style={{ height: 'calc(100dvh - 24px)' }} />;
    }

    if (session) {
        return (
            <>
                <MenuBar/>
                <main className="flex flex-col items-center gap-6 w-full">
                    {children}
                </main>
            </>
        )
    }

    return (
        <LandingPage />
    );
}