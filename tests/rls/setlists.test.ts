import { afterAll, beforeAll, describe, expect, it } from "vitest";

import {
    createAuthedUser,
    deleteUsersByEmailPrefix,
    expectRlsError,
    songRow,
    supabaseAdmin,
    type AuthedUser,
} from "./supabase-test-utils";

const emailPrefix = "lyrite-rls-setlists";
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

describe("setlists RLS", () => {
    it("allows an owner to create a setlist and add their song", async () => {
        const song = songRow(owner.user.id);
        const { error: songError } = await owner.client.from("songs").insert(song);
        expect(songError).toBeNull();

        const { data: setlist, error: setlistError } = await owner.client
            .from("setlists")
            .insert({ name: "Sunday service", user_id: owner.user.id })
            .select()
            .single();
        expect(setlistError).toBeNull();

        const { error: membershipError } = await owner.client.from("setlist_songs").insert({
            setlist_id: setlist!.id,
            song_id: song.id,
            position: 0,
        });
        expect(membershipError).toBeNull();

        await supabaseAdmin.from("setlists").delete().eq("id", setlist!.id);
        await supabaseAdmin.from("songs").delete().eq("id", song.id);
    });

    it("prevents cross-user setlist access and song membership", async () => {
        const song = songRow(owner.user.id);
        await owner.client.from("songs").insert(song);
        const { data: setlist } = await owner.client
            .from("setlists")
            .insert({ name: "Private set", user_id: owner.user.id })
            .select()
            .single();

        const { data: hiddenSetlists, error: readError } = await otherUser.client
            .from("setlists")
            .select("id")
            .eq("id", setlist!.id);
        expect(readError).toBeNull();
        expect(hiddenSetlists).toEqual([]);

        const { error: membershipError } = await otherUser.client.from("setlist_songs").insert({
            setlist_id: setlist!.id,
            song_id: song.id,
            position: 0,
        });
        expectRlsError(membershipError);

        await supabaseAdmin.from("setlists").delete().eq("id", setlist!.id);
        await supabaseAdmin.from("songs").delete().eq("id", song.id);
    });
});