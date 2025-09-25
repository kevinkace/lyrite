import Link from "next/link";

import { Button, Flex } from "@radix-ui/themes";
import { FilePlusIcon } from "@radix-ui/react-icons";

import { useAuth } from "@/contexts/AuthContext";

import { LogoIcon } from "@/components/icons/LogoIcon.svg";

import UserMenu from "./UserMenu";

import css from "./Header.module.css";

export default function Header() {
    const { user, loading } = useAuth();

    return (
        <header className={css.header}>
            <Flex align="center" gap="6">
                <h1 className={css.logo}>
                    <Link href="/" data-gid="header-home-link" className={css.logoLink}>
                        <LogoIcon />
                        lyrite
                    </Link>
                </h1>

                {user && (
                    <nav className={css.userNav}>
                        <Link href="/profile/songs" className={css.userNavLink}>
                            my lyric sheets
                        </Link>
                    </nav>
                )}
            </Flex>

            {user && (
                <Flex gap="3">
                    <Button asChild variant="surface" size="2" radius="full" color="violet">
                        <Link href="/songs/new">
                            <FilePlusIcon />
                            lyric sheet
                        </Link>
                    </Button>

                    <UserMenu />
                </Flex>
            )}

            {!user && !loading && (
                <p>
                    <Link href="/login">Login</Link> | <Link href="/register">Register</Link>
                </p>
            )}

        </header>
    );
}
