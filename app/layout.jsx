"use client";

import "./globals.css";
import {cn} from "@/lib/utils";
import {ThemeProvider} from "@/components/theme-provider";
import {SessionProvider} from "next-auth/react";
import {UserProvider} from "@/app/contexts/UserContext";

export default function RootLayout({ children, session }) {
    return (
        <html lang="fr">
            <body className={cn("min-h-screen font-sans antialiased")}>
                <SessionProvider session={session}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
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
