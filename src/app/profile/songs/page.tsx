"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SongsProvider } from "@/contexts/SongsContext";
import { useAuth }       from "@/contexts/AuthContext";
import SongsTable from "@/components/songs/SongsTable";

const pageSize = 10;

function ProfileSongsContent() {
    const { user, loading } = useAuth();
    const searchParams = useSearchParams();

    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const search = searchParams.get("search") ?? "";
    const sortParam = searchParams.get("sort");
    const sort = sortParam === "none" ? "" : sortParam ?? undefined;
    const direction = searchParams.get("direction");

    if (!user && !loading) {
        return <div>Please log in to view your songs.</div>;
    }

    if (!user) {
        return null;
    }

    return (
        <SongsProvider
            userId={user.id}
            page={page}
            search={search}
            sort={sort}
            sortAscending={direction !== "desc"}
            pageSize={pageSize}
        >
            <SongsTable editControls />
        </SongsProvider>
    );
}

export default function ProfileSongsPage() {
    return (
        <Suspense fallback={<div>Loading your songs...</div>}>
            <ProfileSongsContent />
        </Suspense>
    );
}
