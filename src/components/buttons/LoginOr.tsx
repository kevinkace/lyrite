"use client";

import { Button, type ButtonProps } from "@radix-ui/themes";
import Link                         from "next/link";
import { ListMusic, FilePen }       from "lucide-react";

import { useAuth }   from "@/contexts/AuthContext";

import css from "./LoginOr.module.css";

export default function LoginOr(props: ButtonProps) {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    return (
        <Button asChild={true} size="4" variant="classic" className={css.loginOr} {...props}>
            {user ?
                <Link href="/profile/songs">
                    <FilePen size={28} />
                    My Songs
                </Link> :
                <Link href="/login">
                    <ListMusic size={28} />
                    Get started for free
                </Link>
            }
        </Button>
    );
}