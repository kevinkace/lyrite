import Link from "next/link";

import { useUser } from "@/contexts/userContext";

import css from "./Header.module.css"
import UserMenu from "./UserMenu";

export default function Header() {
    const { user, loading } = useUser();

    return (
        <>
            <h1><Link href="/">lyrite</Link></h1>

            {user && (<UserMenu />)}
            {!user && !loading && (
                <p>
                    <Link href="/login">Login</Link> | <Link href="/register">Register</Link>
                </p>
            )}

        </>
    );
}
