"use client";

import { useSearchParams } from "next/navigation";

import { SongsProvider } from "@/contexts/SongsContext"
import { useAuth }       from "@/contexts/AuthContext";

import SongsTable from "@/components/songs/SongsTable";

export default function SongPage() {
    const { user, loading : authLoading } = useAuth();
    const searchParams = useSearchParams();

    const page = parseInt(searchParams.get("page") || "1", 10);
    const search = searchParams.get("search") || "";

    if (authLoading) return <p>Loading...</p>;
    if (!user) {
        // redirect to login
        window.location.href = "/login";
        return null;
    };

    return (
        <SongsProvider userId={user?.id} page={page} search={search}>
            <h1>{user?.user_metadata?.preferred_username}</h1>

            <SongsTable />
        </SongsProvider>
    );
}
