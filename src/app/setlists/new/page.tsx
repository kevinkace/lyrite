"use client";

import { useAuth } from "@/contexts/AuthContext";
import { SetlistsProvider } from "@/contexts/SetlistsContext";

import SetlistForm from "@/components/setlists/SetlistForm";

export default function NewSetlistPage() {
    const { user, loading } = useAuth();

    return (
        <>
            <h1>New Setlist</h1>
            {!user && !loading && <p>Please log in to create a setlist.</p>}
            {user && (
                <SetlistsProvider userId={user.id}>
                    <SetlistForm />
                </SetlistsProvider>
            )}
        </>
    );
}