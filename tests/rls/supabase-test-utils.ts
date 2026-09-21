import { randomUUID } from "node:crypto";

import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("RLS tests require NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
});

export type AuthedUser = {
    email: string;
    password: string;
    user: User;
    client: SupabaseClient;
};

export function createTestEmail(prefix: string): string {
    return `${prefix}-${randomUUID()}@example.com`;
}

export async function createAuthedUser(prefix = "lyrite-rls"): Promise<AuthedUser> {
    const email = createTestEmail(prefix);
    const password = `Test-${randomUUID()}-password!`;
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    });

    if (error || !data.user) {
        throw error ?? new Error("Supabase did not return the created test user");
    }

    const client = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "", {
        auth: { autoRefreshToken: false, persistSession: false },
    });
    const { error: signInError } = await client.auth.signInWithPassword({ email, password });

    if (signInError) {
        await supabaseAdmin.auth.admin.deleteUser(data.user.id);
        throw signInError;
    }

    return { email, password, user: data.user, client };
}

export async function deleteUsersByEmailPrefix(prefix: string): Promise<void> {
    let page = 1;
    const perPage = 1000;

    while (true) {
        const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage });

        if (error) {
            throw error;
        }

        const matchingUsers = data.users.filter((user) => user.email?.startsWith(prefix));

        await Promise.all(matchingUsers.map((user) => supabaseAdmin.auth.admin.deleteUser(user.id)));

        if (data.users.length < perPage) {
            return;
        }

        page += 1;
    }
}

export function expectRlsError(error: { code?: string; message?: string } | null): void {
    if (!error) {
        throw new Error("Expected a Postgres RLS error");
    }

    // permission denied
    if (error.code !== "42501") {
        throw new Error(`Expected Postgres RLS error 42501, received ${error.code}: ${error.message}`);
    }
}

export function songRow(userId: string, index = 0, lyrics = "test lyrics") {
    const id = randomUUID();

    return {
        id,
        title: `Test song ${index}`,
        artist: "Test artist",
        lyrics,
        is_public: false,
        user_id: userId,
        slug: `test-song-${id}`,
    };
}
