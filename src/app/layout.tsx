import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";

import { ErrorProvider }  from "@/contexts/ErrorContext";
import { ModalProvider }  from "@/contexts/ModalContext";
import { AuthProvider }   from "@/contexts/AuthContext";
import { LayoutProvider } from "@/contexts/LayoutContext";

import LoadingGate  from "@/components/layout/LoadingGate";
import Loading      from "@/components/layout/LoadingBar";
import ErrorModal   from "@/components/error/ErrorModal";
import ModalRoot    from "@/components/modal/ModalRoot";
import CookieBanner from "@/components/analytics/CookieBanner";

import "./globals.css";
import css from "./layout.module.css";
import { SongProvider } from "@/contexts/SongContext";

export const metadata: Metadata = {
    title: "lyrite",
    description: "Create and share lyric sheets with ease.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={css.body}>
                <Theme appearance="dark" accentColor="cyan" hasBackground={false}>
                    <ErrorProvider>
                    <AuthProvider>
                    <SongProvider>
                    <ModalProvider>
                        <LoadingGate>

                            <LayoutProvider>
                                <Loading />
                                {children}
                            </LayoutProvider>

                            <ErrorModal />
                            <ModalRoot />

                        </LoadingGate>
                    </ModalProvider>
                    </SongProvider>
                    </AuthProvider>
                    </ErrorProvider>

                    <CookieBanner />
                </Theme>
            </body>
        </html>
    );
}
