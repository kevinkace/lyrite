"use client";

import { ReactNode, useEffect, useState } from "react";


import { ErrorProvider } from "@/contexts/errorContext";
import { SongsProvider } from "@/contexts/songsContext";
import { UserProvider }  from "@/contexts/userContext";

import ErrorModal from "@/components/errorModal";

import "./globals.css";
import Header from "@/components/layout/Header";

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
