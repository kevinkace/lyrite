"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/contexts/userContext";

import css from "./login.module.css"

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user } = useUser();
    const router = useRouter();


    if (user) {
        // User is already logged in, redirect to home page
        router.replace("/");
    }

    const signInWithGithub = async () => {
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: window.location.origin // redirect back to app
            }
        });

        if (error) setError(error.message);
        setLoading(false);
    };

    return (
        <main className={css.main}>
            <h1>Login</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {loading ? <p>Loading...</p> : <button onClick={signInWithGithub}>Sign in with GitHub</button>}
        </main>
    );
}
