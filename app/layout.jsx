"use client";

import "./globals.css";
import {cn} from "@/lib/utils";
import {ThemeProvider} from "@/components/theme-provider";
import {SessionProvider} from "next-auth/react";
import {UserProvider} from "@/app/contexts/UserContext";
import ContainerIsLogin from "@/components/containerIsLogin";
import {LocaleProvider} from "@/app/contexts/LocaleContext";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import AdSense from "@/components/adSense/AdSense";

export default function RootLayout({ children, session }) {
    return (
        <html lang="fr" className="dark">
            <head>
                <AdSense />
            </head>
            <body className={cn("min-h-dvh bg-background text-foreground font-sans antialiased p-3 pb-9")}>
                <SessionProvider session={session}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        disableTransitionOnChange
                    >
                        <LocaleProvider>
                            <UserProvider>
                                <ContainerIsLogin>
                                    {children}
                                </ContainerIsLogin>
                            </UserProvider>
                        </LocaleProvider>
                    </ThemeProvider>
                </SessionProvider>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
