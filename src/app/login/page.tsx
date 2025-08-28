"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";

import css from "./login.module.css"

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user, signInWithGithub } = useUser();
    const router = useRouter();


    if (user) {
        // User is already logged in, redirect to home page
        router.replace("/");
    }

    const handleLogin = async () => {
        setLoading(true);
        setError(null);

        const { error } = await signInWithGithub();

        if (error) setError(error.message);
        setLoading(false);
    };

    return (
        <div className={css.main}>
            <h1>Login</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {loading ? <p>Loading...</p> : <button onClick={handleLogin}>Sign in with GitHub</button>}
        </div>
    );
}
