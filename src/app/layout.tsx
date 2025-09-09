"use client";

import { ReactNode, useEffect, useState } from "react";


import { ErrorProvider } from "@/contexts/errorContext";
import { UserProvider }  from "@/contexts/userContext";

import "./globals.css";
import css from "./layout.module.css"

import ErrorModal from "@/components/error/errorModal";
import Header     from "@/components/layout/Header";
import Loading    from "@/components/Loading";

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
                <ErrorProvider>
                    <UserProvider>
                            {loading && <Loading />}

                            <header className={css.header}>
                                <Header />
                            </header>

                            <main className={css.main}>{children}</main>

                        <ErrorModal />
                    </UserProvider>
                </ErrorProvider>
            </body>
        </html>
    );
}
