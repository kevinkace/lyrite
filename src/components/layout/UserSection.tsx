"use client";

import Link from "next/link";

import { FilePlus } from "lucide-react";
import { Flex, Button } from "@radix-ui/themes";

import { useAuth } from "@/contexts/AuthContext";
import { useLayout } from "@/contexts/LayoutContext";

import UserMenu from "@/components/layout/UserMenu";

export const UserSection = () => {
    const { user, loading } = useAuth();
    const { headerUserContent } = useLayout();

    if (!user) return null;

    return (
        <>
        <Flex gap="3" align="center">
            <Button asChild variant="surface" size="2" radius="full" color="violet">
                <Link href="/songs/new">
                    <FilePlus/>
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