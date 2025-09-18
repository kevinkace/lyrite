"use client";

import Link from "next/link";

import { SongsProvider } from "@/contexts/SongsContext";
import { useAuth } from "@/contexts/AuthContext";

import FeaturedSongs from "@/components/songs/FeaturedSongs";

import css from "./page.module.css"

const featuredIds = [
    "8cb14731-d89e-4159-81f4-491187ba2b52",
    "9e943dc9-e852-4dbc-9cdc-cd450cb59ed9"
];

export default function HomePage() {
    const { user, loading } = useAuth();

    return (
        <SongsProvider ids={featuredIds} pageSize={10}>
            <div className={css.main}>
                <h1>Lyrite</h1>

                {user && <Link href="/songs/new">Create New Song</Link>}
                {!user && !loading && <Link href="/login">Login</Link>}

                <FeaturedSongs />
            </div>
        </SongsProvider>
    );
}
