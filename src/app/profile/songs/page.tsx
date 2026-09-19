"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SongsProvider } from "@/contexts/SongsContext";
import { useAuth }       from "@/contexts/AuthContext";
import SongsTable from "@/components/songs/SongsTable";

const pageSize = 10;

function ProfileSongsContent() {
    const { user } = useAuth();
    const searchParams = useSearchParams();

    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const search = searchParams.get("search") ?? "";

    if (!user) return <div>Please log in to view your songs.</div>;

    return (
        <SongsProvider
            userId={user.id}
            page={page}
            search={search}
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
