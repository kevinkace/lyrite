import Link from "next/link";

import { useUser } from "@/contexts/userContext";

import css from "./Header.module.css"
import UserMenu from "./UserMenu";

export default function Header() {
    const { user } = useUser();

    return (
        <header className={css.header}>
            <h1><Link href="/">lyrite</Link></h1>

            {user ? (
                    <UserMenu />
            ) : (
                <p>
                    <Link href="/login">Login</Link> | <Link href="/register">Register</Link>
                </p>
            )}
        </header>
    );
}
