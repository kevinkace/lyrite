import type { PostgrestError } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase/client";

import type { Profile } from "@/types";

export async function fetchProfile(userId: string): Promise<{ data: Profile | null; error: PostgrestError | null; }> {
    return await supabase
        .from("public_profiles")
        .select("*")
        .eq("id", userId)
        .single();
}

export async function fetchOwnProfile(userId: string): Promise<{ data: Profile | null; error: PostgrestError | null; }> {
    return await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
}