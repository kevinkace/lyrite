"use client";

import Link from "next/link";

import { FilePlusIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";

import { Flex, Button, ChevronDownIcon } from "@radix-ui/themes";

import { useAuth } from "@/contexts/AuthContext";

import UserMenu from "@/components/layout/UserMenu";
import { useLayout } from "@/contexts/LayoutContext";

export const UserSection = () => {
    const { user, loading } = useAuth();
    const { headerUserContent } = useLayout();

    if (!user) return null;

    return (
        <>
        <Flex gap="3" align="center">
            <Button asChild variant="surface" size="2" radius="full" color="violet">
                <Link href="/songs/new">
                    <FilePlusIcon />
                    lyric sheet
                </Link>
            </Button>

            {headerUserContent}

            <UserMenu />
        </Flex>

        {!user && !loading && (
            <p>
                <Link href="/login">Login</Link> | <Link href="/register">Register</Link>
            </p>
        )}
        </>
    );
};