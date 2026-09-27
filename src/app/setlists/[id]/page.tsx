"use client";

import { useAuth } from "@/contexts/AuthContext";
import { SetlistsProvider } from "@/contexts/SetlistsContext";
import { SongsProvider } from "@/contexts/SongsContext";

import SetlistEditor from "@/components/setlist/SetlistEditor";
import { SetlistEditingProvider } from "@/contexts/SetlistEditingContext";

export default function SetlistPage() {
    const { user } = useAuth();

    return (
        <SetlistsProvider userId={user?.id}>
            <SongsProvider userId={user?.id} pageSize={100}>
                <SetlistEditingProvider>
                    <SetlistEditor />
                </SetlistEditingProvider>
            </SongsProvider>
        </SetlistsProvider>
    );
}
