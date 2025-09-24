"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { useAuth }       from "@/contexts/AuthContext";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    if (!user && !authLoading) {
        // redirect to login
        router.replace("/login");

        return null;
    };

    if (authLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Profile</h1>

            <h2>{user?.user_metadata?.preferred_username}</h2>

            <nav>
                <Link href="/profile">Overview</Link>
                <Link href="/profile/songs">Songs</Link>
                <Link href="/profile/settings">Settings</Link>
            </nav>
            {children}
        </div>
    );
}
