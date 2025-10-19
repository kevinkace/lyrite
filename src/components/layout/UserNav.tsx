"use client";
import Link from "next/link";

import { useAuth } from "@/contexts/AuthContext";

import css from "./Header.module.css";

export const UserNav = () => {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <nav className={css.userNav}>
            <Link href="/profile/songs" className={css.userNavLink}>
                my songs
            </Link>
        </nav>
    );
};