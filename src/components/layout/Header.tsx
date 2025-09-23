import Link from "next/link";

import { Button } from "@radix-ui/themes";

import { useAuth } from "@/contexts/AuthContext";

import UserMenu from "./UserMenu";

import css from "./Header.module.css";
import ErrorButton from "../error/ErrorButton";

export default function Header() {
    const { user, loading } = useAuth();

    return (
        <>
            <h1><Link href="/">lyrite</Link></h1>

            <Button asChild={true}>
                <Link href="/songs/new">Add Song</Link>
            </Button>

            <ErrorButton />

            {user && (<UserMenu />)}

            {!user && !loading && (
                <p>
                    <Link href="/login">Login</Link> | <Link href="/register">Register</Link>
                </p>
            )}

        </>
    );
}
