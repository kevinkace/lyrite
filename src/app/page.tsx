"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/contexts/userContext";
import Link from "next/link";

export default function HomePage() {
    const router = useRouter();

    const { user, loading } = useUser();

    useEffect(() => {
        if (window.location.hash.includes("access_token")) {
            router.replace("/"); // clears the fragment
        }
    }, [router]);

    return (
        <main>
            <h1>Lyrite</h1>

            {/* if logged in, show a button to create a new song */}
            {user && <Link href="/songs/new">Create New Song</Link>}
        </main>
    );
}
