"use client";

import Link from "next/link";

import { SongsProvider } from "@/contexts/songsContext";

import FeaturedSongs from "@/components/songs/FeaturedSongs";

import css from "./page.module.css"
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
    const { user, loading } = useAuth();

    return (
        <SongsProvider>
            <div className={css.main}>
                <h1>Lyrite</h1>

                {user && <Link href="/songs/new">Create New Song</Link>}
                {!user && !loading && <Link href="/login">Login</Link>}

                <FeaturedSongs />
            </div>
        </SongsProvider>
    );
}
