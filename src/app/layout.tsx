"use client";

import { ReactNode, useEffect, useState } from "react";


import { ErrorProvider } from "@/contexts/errorContext";
import { SongsProvider } from "@/contexts/songsContext";
import { UserProvider }  from "@/contexts/userContext";

import "./globals.css";

import ErrorModal from "@/components/errorModal";
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
            <body>
                <ErrorProvider>
                    <UserProvider>
                        <SongsProvider limit={10}>
                            {loading && <Loading />}

                            <Header/>


                            <main>{children}</main>
                        </SongsProvider>

                        <ErrorModal />
                    </UserProvider>
                </ErrorProvider>
            </body>
        </html>
    );
}
