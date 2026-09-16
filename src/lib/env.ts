import { z } from "zod";

const envSchema = z.object({
    NEXT_PUBLIC_LOGIN_REDIRECT: z.string().url(),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(32).max(255),
    NEXT_PUBLIC_FEATURED_SONGS: z
        .string()
        .optional()
        .default("")
        .transform((value) =>
            value
                .split(",")
                .map((id) => id.trim())
                .filter(Boolean),
        ),
});

export const env = envSchema.parse({
    NEXT_PUBLIC_LOGIN_REDIRECT: process.env.NEXT_PUBLIC_LOGIN_REDIRECT,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_FEATURED_SONGS: process.env.NEXT_PUBLIC_FEATURED_SONGS,
});
