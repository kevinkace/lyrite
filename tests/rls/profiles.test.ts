import { afterAll, beforeAll, describe, expect, it } from "vitest";

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

        expectRlsError(error);

        // verify data wasn't updated
        const { data: profile, error: readError } = await owner.client
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

        expect(error).toBeNull();

        const { data, error: readError } = await owner.client
            .from("profiles")
            .select("tier_name")
            .eq("id", owner.user.id)
            .single();

        expect(readError).toBeNull();
        expect(data?.tier_name).toBe("free");
    });
});
