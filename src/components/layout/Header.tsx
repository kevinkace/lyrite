import Link from "next/link";

import { Button } from "@radix-ui/themes";

import { FilePlusIcon } from "@radix-ui/react-icons";

import { useAuth } from "@/contexts/AuthContext";

import UserMenu from "./UserMenu";


import css from "./Header.module.css";
import { LogoIcon } from "../icons/LogoIcon";

export default function Header() {
    const { user, loading } = useAuth();

    return (
        <>
            <h1 className={css.logo}>
                <Link href="/">
                    {/* lyrite logo svg */}
                    <LogoIcon />
                    lyrite
                </Link>
            </h1>

            <Button asChild={true}  variant="surface">
                <Link href="/songs/new">
                    <FilePlusIcon />
                    lyric sheet
                </Link>
            </Button>

            {/* <ErrorButton /> */}

            {user && (<UserMenu />)}

            {!user && !loading && (
                <p>
                    <Link href="/login">Login</Link> | <Link href="/register">Register</Link>
                </p>
            )}

        </>
    );
}
