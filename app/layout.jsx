"use client";

import "./globals.css";
import {cn} from "@/lib/utils";
import {ThemeProvider} from "@/components/theme-provider";
import {SessionProvider} from "next-auth/react";
import {UserProvider} from "@/app/contexts/UserContext";
import {useTheme} from "next-themes";

export default function RootLayout({ children, session }) {
    const { theme } = useTheme()
    return (
        <html lang="fr" className={theme}>
            <body className={cn("min-h-dvh bg-background text-foreground font-sans antialiased")}>
                <SessionProvider session={session}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <UserProvider>
                            {children}
                        </UserProvider>
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
