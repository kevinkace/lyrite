"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { useAuth }          from "@/contexts/AuthContext";
import { SetlistsProvider } from "@/contexts/SetlistsContext";
import { getCollectionParams } from "@/lib/collectionParams";

import SetlistsTable from "@/components/setlists/SetlistsTable";

function ProfileSetlistsContent() {
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const { page, search, sort, sortAscending } = getCollectionParams(searchParams);

    if (!user) return null;

    return (
        <SetlistsProvider
            userId={user.id}
            page={page}
            search={search}
            sort={sort}
            sortAscending={sortAscending}
            pageSize={10}
        >
            <SetlistsTable editControls />
        </SetlistsProvider>
    );
}

export default function ProfileSetlistsPage() {
    return (
        <Suspense fallback={<div>Loading your setlists...</div>}>
            <ProfileSetlistsContent />
        </Suspense>
    );
}