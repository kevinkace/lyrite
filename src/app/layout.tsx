"use client";

import { ReactNode, useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseClient";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

import Link from "next/link";

import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
    const user = useSupabaseAuth();
    const [loading, setLoading] = useState(true);

    // optional: clear access_token fragment on all pages
    useEffect(() => {
        if (window.location.hash.includes("access_token")) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
        setLoading(false);
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        // page will automatically reflect logged-out state
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
                <main>{children}</main>
            </body>
        </html>
    );
}
