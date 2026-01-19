import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { env } from "../env";

export async function createServerSupabaseClient() {
    const cookieStore = await cookies();

    return createClient(
        env.NEXT_PUBLIC_SUPABASE_URL,
        env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            auth: {
                storage: {
                    getItem: async (key) => // force promise
                        (cookieStore.get(key)?.value ?? null),

                    setItem: (key, value) => {
                        cookieStore.set(key, value, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === "production",
                            sameSite: "lax",
                            maxAge: 60 * 60 * 24 * 7,
                        });
                        return Promise.resolve();
                    },

                    removeItem: (key) => {
                        cookieStore.delete(key);
                        return Promise.resolve();
                    },
                },
            },
        }
    );
}
