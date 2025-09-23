import Link from "next/link";

import { Button } from "@radix-ui/themes";

import { FilePlusIcon } from "@radix-ui/react-icons";

import { useAuth } from "@/contexts/AuthContext";

import UserMenu from "./UserMenu";

import logo from "@/components/icons/lyrite.svg";

import css from "./Header.module.css";
import ErrorButton from "../error/ErrorButton";
import Image from "next/image";

export default function Header() {
    const { user, loading } = useAuth();

    return (
        <>
            <h1 className={css.logo}>
                <Link href="/">
                    {/* lyrite logo svg */}
                    <Image src={logo} alt="lyrite logo" width={32} height={32} className={css.logo} />
                    lyrite
                </Link>
            </h1>

            <Button asChild={true}>
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
