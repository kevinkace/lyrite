"use client";

import { useAuth } from "@/contexts/AuthContext";
import { SetlistsProvider } from "@/contexts/SetlistsContext";

import SetlistEditor from "@/components/setlist/SetlistEditor";
import { SetlistEditingProvider } from "@/contexts/SetlistEditingContext";

export default function SetlistPage() {
    const { user } = useAuth();

    return (
        <SetlistsProvider userId={user?.id}>
            <SetlistEditingProvider>
                <SetlistEditor />
            </SetlistEditingProvider>
        </SetlistsProvider>
    );
}
