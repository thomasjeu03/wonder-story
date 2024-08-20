import { Inter } from "next/font/google";
import "./globals.css";

import {cn} from "@/lib/utils";
import {ThemeProvider} from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
            <body className={inter.className + cn("min-h-screen font-sans antialiased")}>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
