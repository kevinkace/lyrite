import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createClient } from "@supabase/supabase-js";

import {
    createAuthedUser,
    deleteUsersByEmailPrefix,
    expectRlsError,
    songRow,
    supabaseAdmin,
    type AuthedUser,
} from "./supabase-test-utils";

const emailPrefix = "lyrite-rls-songs";
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

describe("songs RLS", () => {
    it("allows full CRUD for the owning user", async () => {

        // new song
        const row = songRow(owner.user.id);
        const { data: inserted, error: insertError } = await owner.client
            .from("songs")
            .insert(row)
            .select()
            .single();

        expect(insertError).toBeNull();
        expect(inserted?.user_id).toBe(owner.user.id);

        // get
        const { data: selected, error: selectError } = await owner.client
            .from("songs")
            .select("id, title")
            .eq("id", row.id)
            .single();
        expect(selectError).toBeNull();
        expect(selected?.id).toBe(row.id);

        // edit
        const { error: updateError } = await owner.client
            .from("songs")
            .update({ title: "Updated title" })
            .eq("id", row.id);
        expect(updateError).toBeNull();

        // delete
        const { error: deleteError } = await owner.client
            .from("songs")
            .delete()
            .eq("id", row.id);
        expect(deleteError).toBeNull();
    });

    it("isolates a private song from another user", async () => {
        // new song
        const row = songRow(owner.user.id);
        const { error: insertError } = await owner.client.from("songs").insert(row);
        expect(insertError).toBeNull();

        // other user access
        const { data: selected, error: selectError } = await otherUser.client
            .from("songs")
            .select("id")
            .eq("id", row.id);
        expect(selectError).toBeNull();
        expect(selected).toEqual([]);

        // other user can't update
        const { error: updateError } = await otherUser.client
            .from("songs")
            .update({ title: "Cross-user update" })
            .eq("id", row.id);
        expect(updateError).toBeNull();

        // other user can't delete
        const { error: deleteError } = await otherUser.client
            .from("songs")
            .delete()
            .eq("id", row.id);
        expect(deleteError).toBeNull();

        await supabaseAdmin.from("songs").delete().eq("id", row.id);
    });

    it("rejects an insert that names another user's id", async () => {
        const row = songRow(otherUser.user.id);
        const { error } = await owner.client.from("songs").insert(row);

        expectRlsError(error);
    });

    it("rejects unauthenticated reads and writes", async () => {
        const anonClient = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            { auth: { persistSession: false } },
        );
        const row = songRow(owner.user.id);

        const { data, error: readError } = await anonClient
            .from("songs")
            .select("id")
            .eq("id", row.id);
        expect(readError).toBeNull();
        expect(data).toEqual([]);

        const { error: insertError } = await anonClient.from("songs").insert(row);
        expectRlsError(insertError);
    });
});
