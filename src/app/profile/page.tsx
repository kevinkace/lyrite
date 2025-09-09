"use client";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";

import SongsList from "@/components/songs/SongsList";

const featuredIds = [
    "8cb14731-d89e-4159-81f4-491187ba2b52",
    "9e943dc9-e852-4dbc-9cdc-cd450cb59ed9"
];

export default function SongPage() {
    const { user } = useAuth();
    const router = useRouter();

    if (!user) {
        router.replace("/");
    }

    return (
        <>
            <h1>{user?.user_metadata?.preferred_username}</h1>

            <SongsList ids={featuredIds} />
        </>
    );
}
