"use client";

import { ReactNode, useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseClient";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

import Link from "next/link";

import { ErrorProvider } from "@/contexts/errorContext";
import { SongsProvider } from "@/contexts/songsContext";
import { UserProvider }  from "@/contexts/userContext";

import ErrorModal from "@/components/errorModal";

import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
    const user = useSupabaseAuth();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        if (window.location.hash.includes("access_token")) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        setLoading(false);
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <html>
            <body>
                <header>
                    {loading ? (
                        <p>Loading...</p>
                    ) : user ? (
                        <p>
                            Logged in as {user.email} |{" "}
                            <button onClick={handleSignOut}>Sign out</button>
                        </p>
                    ) : (
                        <p>
                            Not logged in | <Link href="/login">Login</Link> | <Link href="/register">Register</Link>
                        </p>
                    )}
                </header>

                <ErrorProvider>
                    <UserProvider>
                        <SongsProvider limit={10}>
                            <main>{children}</main>
                        </SongsProvider>

                        <ErrorModal />
                    </UserProvider>
                </ErrorProvider>
            </body>
        </html>
    );
}
