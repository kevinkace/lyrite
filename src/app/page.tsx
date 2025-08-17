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
        </main>
    );
}
