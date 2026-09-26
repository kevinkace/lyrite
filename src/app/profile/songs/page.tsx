"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { useAuth }       from "@/contexts/AuthContext";
import { SongsProvider } from "@/contexts/SongsContext";
import { getCollectionParams } from "@/lib/collectionParams";

import SongsTable from "@/components/songs/SongsTable";

const pageSize = 10;

function ProfileSongsContent() {
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const { page, search, sort, sortAscending } = getCollectionParams(searchParams);

    if (!user) return null;

    return (
        <SongsProvider
            userId={user.id}
            page={page}
            search={search}
            sort={sort}
            sortAscending={sortAscending}
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
