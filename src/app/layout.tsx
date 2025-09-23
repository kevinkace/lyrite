"use client";

import { ReactNode, useEffect, useState } from "react";
import { Theme, ThemePanel } from "@radix-ui/themes";


import { ErrorProvider } from "@/contexts/ErrorContext";
import { AuthProvider }  from "@/contexts/AuthContext";

import ErrorModal from "@/components/error/errorModal";
import Header     from "@/components/layout/Header";
import Loading    from "@/components/Loading";

import "./globals.css";

import css from "./layout.module.css"

export default function RootLayout({ children }: { children: ReactNode }) {
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        if (window.location.hash.includes("access_token")) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        setLoading(false);
    }, []);

    return (
        <html>
            <body className={css.body}>
                <Theme appearance="dark" hasBackground={false}>
                    {/* <ThemePanel /> */}
                    <ErrorProvider>
                        <AuthProvider>
                            {loading && <Loading />}

                            <header className={css.header}>
                                <Header />
                            </header>

                            <main className={css.main}>{children}</main>

                            <ErrorModal />
                        </AuthProvider>
                    </ErrorProvider>
                </Theme>
            </body>
        </html>
    );
}
