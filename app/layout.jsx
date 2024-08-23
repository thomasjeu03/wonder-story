"use client";

import "./globals.css";
import {cn} from "@/lib/utils";
import {ThemeProvider} from "@/components/theme-provider";
import {SessionProvider} from "next-auth/react";
import {UserProvider} from "@/app/contexts/UserContext";
import {useTheme} from "next-themes";
import MenuBar from "@/components/menuBar/MenuBar";

export default function RootLayout({ children, session }) {
    const { theme } = useTheme()
    return (
        <html lang="fr" className={theme}>
            <body className={cn("min-h-dvh bg-background text-foreground font-sans antialiased p-1.5 sm:p-3 flex flex-col gap-3")}>
                <SessionProvider session={session}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <UserProvider>
                            <MenuBar/>
                            <main className="flex flex-col items-center gap-6 w-full">
                                {children}
                            </main>
                        </UserProvider>
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
