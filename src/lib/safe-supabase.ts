import { supabase } from "./supabaseClient";

import { useError } from "@/contexts/errorContext";

// helper hook for safe queries
export function useSafeSupabase() {
    const { setError } = useError();

    async function query<T>(fn: () => Promise<T>) {
        try {
            const result: any = await fn();
            if (result.error) {
                setError(result.error.message);
            }
            return result;
        } catch (err: any) {
            setError(err.message ?? "Unknown error");
            throw err;
        }
    }

    return { query };
}
