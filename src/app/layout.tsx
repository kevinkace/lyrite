import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";

import { ErrorProvider } from "@/contexts/ErrorContext";
import { AuthProvider } from "@/contexts/AuthContext";

import ErrorModal from "@/components/error/errorModal";
import Header from "@/components/layout/Header";
import LoadingGate from "@/components/layout/LoadingGate"; // move your loading logic here

import "./globals.css";
import css from "./layout.module.css";
import { LayoutProvider } from "@/contexts/LayoutContext";

export const metadata: Metadata = {
    title: "lyrite",
    description: "Create and share lyric sheets with ease.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={css.body}>
                <Theme appearance="dark" accentColor="cyan" hasBackground={false}>
                    <ErrorProvider>
                        <AuthProvider>
                            <LoadingGate>

                                <LayoutProvider>
                                    <div className={css.layout}>
                                        <Header />
                                        <main className={css.main}>
                                            {children}
                                        </main>
                                    </div>
                                </LayoutProvider>

                                <ErrorModal />

                            </LoadingGate>
                        </AuthProvider>
                    </ErrorProvider>
                </Theme>
            </body>
        </html>
    );
}
