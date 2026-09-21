import { expect, test } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Signup tests require NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
});

async function deleteUserByEmail(email: string): Promise<void> {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    if (error) throw error;

    const user = data.users.find((candidate) => candidate.email === email);
    if (user) {
        const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id);
        if (deleteError) throw deleteError;
    }
}

async function profileCountForEmail(email: string): Promise<{ userId: string; count: number; tierName: string | null }> {
    const { data: users, error: usersError } = await supabaseAdmin.auth.admin.listUsers();
    if (usersError) throw usersError;

    const user = users.users.find((candidate) => candidate.email === email);
    if (!user) return { userId: "", count: 0, tierName: null };

    const { data: profiles, error: profilesError } = await supabaseAdmin
        .from("profiles")
        .select("id, tier_name")
        .eq("id", user.id);
    if (profilesError) throw profilesError;

    return {
        userId: user.id,
        count: profiles.length,
        tierName: profiles[0]?.tier_name ?? null,
    };
}

async function requestMagicLink(page: import("@playwright/test").Page, email: string) {
    await page.goto("/login");
    const emailInput = page.getByPlaceholder("enter your email address");
    await emailInput.fill(email);
    await page.getByRole("button", { name: "Continue with Email" }).click();
}

test.describe("Account creation", () => {
    test("creates one free profile and shows the email confirmation state", async ({ page }) => {
        const email = `lyrite-signup-${randomUUID()}@example.com`;

        try {
            await requestMagicLink(page, email);
            await expect(page.getByRole("heading", { name: "Check your email" })).toBeVisible();

            await expect.poll(async () => (await profileCountForEmail(email)).count).toBe(1);
            await expect.poll(async () => (await profileCountForEmail(email)).tierName).toBe("free");
        } finally {
            await deleteUserByEmail(email);
        }
    });

    test("reports a duplicate email without creating another profile", async ({ page }) => {
        const email = `lyrite-signup-duplicate-${randomUUID()}@example.com`;

        try {
            await requestMagicLink(page, email);
            await expect(page.getByRole("heading", { name: "Check your email" })).toBeVisible();
            const before = await profileCountForEmail(email);
            expect(before.count).toBe(1);

            await page.getByRole("button", { name: "Try a different email" }).click();
            await requestMagicLink(page, email);

            await expect(page.getByText(/already|registered|exists/i)).toBeVisible();
            await expect.poll(async () => (await profileCountForEmail(email)).count).toBe(1);
        } finally {
            await deleteUserByEmail(email);
        }
    });
});
