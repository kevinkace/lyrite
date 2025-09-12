"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";

import UserSongs from "@/components/songs/UserSongs";

export default function SongPage() {
    const { user } = useAuth();
    const router = useRouter();

    if (!user) {
        router.replace("/");
    }

    return (
        <>
            <h1>{user?.user_metadata?.preferred_username}</h1>

            <UserSongs />
        </>
    );
}
