"use client";

import { Button, Card, Flex } from "@radix-ui/themes";

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
        const storedSession = window.localStorage.getItem(authKey);

        if (!storedSession) return;

        const sessionData = JSON.parse(storedSession);
        sessionData.expires_at = Math.floor(Date.now() / 1000) - 60;
        sessionData.refresh_token = "invalid-refresh-token";

        window.localStorage.setItem(authKey, JSON.stringify(sessionData));
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