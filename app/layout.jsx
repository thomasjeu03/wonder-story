"use client";

import "./globals.css";
import {cn} from "@/lib/utils";
import {ThemeProvider} from "@/components/theme-provider";
import {SessionProvider} from "next-auth/react";

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
                        {children}
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
