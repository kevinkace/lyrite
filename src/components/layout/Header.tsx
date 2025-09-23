import Link from "next/link";

import { useAuth } from "@/contexts/AuthContext";

import UserMenu from "./UserMenu";

import css from "./Header.module.css";

export default function Header() {
    const { user, loading } = useAuth();

    return (
        <>
            <h1><Link href="/">lyrite</Link></h1>

            <Link className={css.addSong} href="/songs/new">Add Song</Link>

            {user && (<UserMenu />)}

            {!user && !loading && (
                <p>
                    <Link href="/login">Login</Link> | <Link href="/register">Register</Link>
                </p>
            )}

        </>
    );
}
