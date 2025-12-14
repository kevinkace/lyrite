"use client";

import { Button } from "@radix-ui/themes";

import { useAuth } from "@/contexts/AuthContext";

export default function LogoutPage() {
    const { signOut } = useAuth();

    return (
        <Button color="crimson" onClick={() => signOut()}>Sign out</Button>
    )
}
