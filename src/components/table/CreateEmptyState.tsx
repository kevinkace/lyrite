"use client";

import Link from "next/link";
import { Button, Flex } from "@radix-ui/themes";
import type { LucideIcon } from "lucide-react";

import css from "./CreateEmptyState.module.css";

export default function CreateEmptyState({
    message,
    href,
    label,
    icon: Icon,
}: {
    message: string;
    href: string;
    label: string;
    icon: LucideIcon;
}) {
    return (
        <Flex align="center" justify="center" direction="column" className={css.empty}>
            <p>{message}</p>
            <Button asChild variant="surface" color="violet" radius="full" size="3">
                <Link href={href}>
                    <Icon />
                    {label}
                </Link>
            </Button>
        </Flex>
    );
}