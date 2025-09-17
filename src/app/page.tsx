"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { SongsProvider } from "@/contexts/SongsContext";
import { useAuth } from "@/contexts/AuthContext";

import FeaturedSongs from "@/components/songs/FeaturedSongs";

import css from "./page.module.css"

export default function HomePage() {
    const { user, loading } = useAuth();

    return (
        <SongsProvider filters={{ tag: "featured" }} pageSize={10}>
            <div className={css.main}>
                <h1>Lyrite</h1>

                {user && <Link href="/songs/new">Create New Song</Link>}
                {!user && !loading && <Link href="/login">Login</Link>}

                <FeaturedSongs />
            </div>
        </SongsProvider>
    );
}
