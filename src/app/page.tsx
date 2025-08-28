"use client";

import { useUser } from "@/contexts/userContext";
import Link from "next/link";

import css from "./page.module.css"

export default function HomePage() {
    const { user } = useUser();

    return (
        <div className={css.main}>
            <h1>Lyrite</h1>

            {/* if logged in, show a button to create a new song */}
            {user && <Link href="/songs/new">Create New Song</Link>}
        </div>
    );
}
