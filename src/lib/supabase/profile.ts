import { supabase } from "@/lib/supabase/client";

import type { Profile } from "@/types";

export async function fetchProfile(userId: string): Promise<{ data: Profile | null; error: any; }> {
    return await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
}