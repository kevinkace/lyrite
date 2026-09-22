import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createClient } from "@supabase/supabase-js";

import {
    createAuthedUser,
    deleteUsersByEmailPrefix,
    expectRlsError,
    type AuthedUser,
} from "./supabase-test-utils";

const emailPrefix = "lyrite-rls-profiles";
let owner: AuthedUser;
let otherUser: AuthedUser;

beforeAll(async () => {
    await deleteUsersByEmailPrefix(emailPrefix);
    owner = await createAuthedUser(emailPrefix);
    otherUser = await createAuthedUser(emailPrefix);
});

afterAll(async () => {
    await deleteUsersByEmailPrefix(emailPrefix);
});

describe("profiles RLS", () => {
    it("allows a user to read and update their own profile", async () => {
        const { data: profile, error: readError } = await owner.client
            .from("profiles")
            .select("id, username, tier_name")
            .eq("id", owner.user.id)
            .single();

        expect(readError).toBeNull();
        expect(profile?.id).toBe(owner.user.id);

        // can update username
        const { error: updateError } = await owner.client
            .from("profiles")
            .update({ username: `user_${owner.user.id.slice(0, 8)}` })
            .eq("id", owner.user.id);

        expect(updateError).toBeNull();
    });

    it("does not expose another user's profile", async () => {
        const { data, error } = await owner.client
            .from("profiles")
            .select("id")
            .eq("id", otherUser.user.id);

        expect(error).toBeNull();
        expect(data).toEqual([]);
    });

    it("does not allow updating another user's profile", async () => {
        const username = `other_${otherUser.user.id.slice(0, 8)}`;
        const { error } = await owner.client
            .from("profiles")
            .update({ username })
            .eq("id", otherUser.user.id);

        expect(error).toBeNull();

        // verify data wasn't updated
        const { data: profile, error: readError } = await otherUser.client
            .from("profiles")
            .select("username")
            .eq("id", otherUser.user.id)
            .single();

        expect(readError).toBeNull();
        expect(profile?.username).not.toBe(username);
    });

    it("does not allow a user to change their tier", async () => {
        const { error } = await owner.client
            .from("profiles")
            .update({ tier_name: "premium" })
            .eq("id", owner.user.id);

        expectRlsError(error);

        const { data, error: readError } = await owner.client
            .from("profiles")
            .select("tier_name")
            .eq("id", owner.user.id)
            .single();

        expect(readError).toBeNull();
        expect(data?.tier_name).toBe("free");
    });
});

describe("public_profiles view", () => {
    it("allows anonymous users to read only public profile fields", async () => {
        const anonClient = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            { auth: { persistSession: false } },
        );

        const { data, error } = await anonClient
            .from("public_profiles")
            .select("*")
            .eq("id", otherUser.user.id)
            .single();

        expect(error).toBeNull();
        expect(data).toEqual({
            id: otherUser.user.id,
            username: null,
            full_name: null,
            avatar_url: null,
            website: null,
            created_at: expect.any(String),
        });
        expect(data).not.toHaveProperty("tier_name");
    });

    it("allows authenticated users to read another user's public profile", async () => {
        const { data, error } = await owner.client
            .from("public_profiles")
            .select("id, username, full_name, avatar_url, website, created_at")
            .eq("id", otherUser.user.id)
            .single();

        expect(error).toBeNull();
        expect(data?.id).toBe(otherUser.user.id);
        expect(data).not.toHaveProperty("tier_name");
    });

    it("does not allow writes through the public profile view", async () => {
        const { error } = await owner.client
            .from("public_profiles")
            .update({ full_name: "Should not update" })
            .eq("id", otherUser.user.id);

        expect(error).not.toBeNull();

        const { data, error: readError } = await otherUser.client
            .from("public_profiles")
            .select("full_name")
            .eq("id", otherUser.user.id)
            .single();

        expect(readError).toBeNull();
        expect(data?.full_name).not.toBe("Should not update");
    });
});
