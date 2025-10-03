"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@radix-ui/themes";

import { useAuth } from "@/contexts/AuthContext";

import css from "./page.module.css"

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { user, signInWithGithub } = useAuth();

    const router = useRouter();

    if (user) {
        router.replace("/");
    }

    const handleLogin = async () => {
        setLoading(true);
        setError(null);

        const { error } = await signInWithGithub();

        if (error) {
            setError(error.message);
        }

        setLoading(false);
    };

    return (
        <div className={css.main}>
            <h1>Login</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {loading ? <p>Loading...</p> : <Button color="gray" onClick={handleLogin}>Sign in with GitHub</Button>}
        </div>
    );
}
