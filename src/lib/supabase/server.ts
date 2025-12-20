import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { env } from "../env";

export const createServerSupabaseClient = async () => {
    const cookieStore = await cookies();

    return createClient(
        env.NEXT_PUBLIC_SUPABASE_URL,
        env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            auth: {
                storage: {
                    getItem: (key: string) => {
                        const cookie = cookieStore.get(key);
                        return Promise.resolve(cookie?.value || null);
                    },
                    setItem: (key: string, value: string) => {
                        cookieStore.set(key, value, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'lax',
                            maxAge: 60 * 60 * 24 * 7, // 1 week
                        });
                        return Promise.resolve();
                    },
                    removeItem: (key: string) => {
                        cookieStore.delete(key);
                        return Promise.resolve();
                    },
                },
            },
        }
    );
};
