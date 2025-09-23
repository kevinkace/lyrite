"use client";

import Link       from "next/link";
import { Button } from "@radix-ui/themes";

import { SongsProvider } from "@/contexts/SongsContext";
import { useAuth }       from "@/contexts/AuthContext";

import FeaturedSongs from "@/components/songs/FeaturedSongs";

import css from "./page.module.css"

const featuredIds = [
    "8cb14731-d89e-4159-81f4-491187ba2b52",
    "13f08d51-9295-431c-8e35-3ddc6459fa2f"
];

export default function HomePage() {
    const { user, loading } = useAuth();

    return (
        <SongsProvider ids={featuredIds} pageSize={10}>
            <div className={css.main}>
                <h1>Lyrite</h1>

                {user && <Button variant="classic" color="gray"><Link href="/songs/new">Create New Song</Link></Button>}
                {!user && !loading && <Link href="/login">Login</Link>}

                <FeaturedSongs />
            </div>
        </SongsProvider>
    );
}
