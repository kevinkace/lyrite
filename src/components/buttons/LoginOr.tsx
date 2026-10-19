"use client";

import { Button, type ButtonProps } from "@radix-ui/themes";
import Link                         from "next/link";
import { ListMusic, FilePen }       from "lucide-react";
import { clsx } from "clsx";

import { useAuth }   from "@/contexts/AuthContext";

import css from "./LoginOr.module.css";

export default function LoginOr(props: ButtonProps) {
    const { user } = useAuth();

    return (
        <Button asChild={true} size="4" variant="classic" className={clsx(css.loginOr, css.spin)} {...props}>
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