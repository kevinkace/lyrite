"use client";

import { SongsProvider } from "@/contexts/songsContext";

import Link from "next/link";

import css from "./page.module.css"
import FeaturedSongs from "@/components/songs/FeaturedSongs";



export default function HomePage() {
    return (
        <SongsProvider>
            <div className={css.main}>
                <h1>Lyrite</h1>

                {<Link href="/songs/new">Create New Song</Link>}

                <FeaturedSongs />
            </div>
        </SongsProvider>
    );
}
