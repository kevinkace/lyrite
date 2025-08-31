import type { PostgrestError } from "@supabase/supabase-js";

export function getErrorMessage(err: unknown): string {
    if (err instanceof Error) return err.message;

    const supabaseErr = err as PostgrestError | null;
    if (supabaseErr?.message) return supabaseErr.message;

    return "An unknown error occurred";
}
