"use client";

import { supabase } from "@/lib/supabase/client";
import { Button } from "@radix-ui/themes";

export default function logoutPage() {
    const signOut = async () => {
        await supabase.auth.signOut();
    }

    return (
        <Button color="crimson" onClick={signOut}>Sign out</Button>
    )
}
