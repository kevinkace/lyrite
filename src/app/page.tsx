"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        if (window.location.hash.includes("access_token")) {
            router.replace("/"); // clears the fragment
        }
    }, [router]);

    return (
        <main>
            <h1>Lyrite</h1>

            {/* if logged in, show a button to create a new song */}
            {user && (
                <Link href="/songs/new">
                    <button>Create New Song</button>
                </Link>
            )}
        </main>
    );
}
