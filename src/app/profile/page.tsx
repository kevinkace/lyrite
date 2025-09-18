"use client";

import { useSearchParams } from "next/navigation";

import { SongsProvider } from "@/contexts/SongsContext"
import { useAuth }       from "@/contexts/AuthContext";

import SongsTable from "@/components/songs/SongsTable";

export default function ProfilePage() {
    const { user } = useAuth();
    const searchParams = useSearchParams();

    const page = parseInt(searchParams.get("page") || "1", 10);
    const search = searchParams.get("search") || "";

    return (
        <SongsProvider userId={user?.id} page={page} search={search}>
            <SongsTable />
        </SongsProvider>
    );
}
