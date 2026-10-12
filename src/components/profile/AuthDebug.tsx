"use client";

import { Button, Card } from "@radix-ui/themes";

import { env } from "@/lib/env";
import { supabase } from "@/lib/supabase/client";

import css from "./ProfileData.module.css";

export function AuthDebug() {
    if (process.env.NODE_ENV !== "development") return null;

    const simulateInvalidRefreshToken = async () => {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) return;

        const projectId = new URL(env.NEXT_PUBLIC_SUPABASE_URL).hostname.split(".")[0];
        const authKey = `sb-${projectId}-auth-token`;
        document.cookie
            .split(";")
            .map(cookie => cookie.trim().split("=")[0])
            .filter(name => name === authKey || name.startsWith(`${authKey}.`))
            .forEach(name => {
                document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
            });

        const invalidSession = {
            ...session,
            expires_at: Math.floor(Date.now() / 1000) - 60,
            refresh_token: "invalid-refresh-token",
        };
        const encodedSession = btoa(JSON.stringify(invalidSession))
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");

        document.cookie = `${authKey}=base64-${encodedSession}; Path=/; SameSite=Lax`;
        window.location.reload();
    };

    return (
        <Card size="3" variant="surface" className={css.card}>
            <h4>Development auth tools</h4>

            <p>
                Force the next session restore to use an invalid refresh token.
            </p>
            <Button color="amber" onClick={simulateInvalidRefreshToken}>
                Simulate invalid refresh token
            </Button>
        </Card>
    );
}