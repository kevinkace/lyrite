import Link from "next/link";

import { useUser } from "@/contexts/userContext";

export default function Header() {
    const { user, loading, handleSignOut } = useUser();

    return (
        <header>
            {loading ? (
                <p>Loading...</p>
            ) : user ? (
                <p>
                    Logged in as {user.email} |{" "}
                    <button onClick={handleSignOut}>Sign out</button>
                </p>
            ) : (
                <p>
                    Not logged in | <Link href="/login">Login</Link> | <Link href="/register">Register</Link>
                </p>
            )}
        </header>
    );
}
