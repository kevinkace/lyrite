"use client";

import { supabase } from "@/lib/supabaseClient";

export default function logoutPage() {
    const signOut = async () => {
        await supabase.auth.signOut();
    }

    return (
        <button onClick={signOut}>Sign out</button>
    )
}
