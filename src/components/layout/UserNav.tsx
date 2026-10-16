"use client";

import Link from "next/link";
import { Flex, Button, Separator } from "@radix-ui/themes";

import { useAuth } from "@/contexts/AuthContext";
import { sanitizeTestId } from "@/lib/utils";

export const UserNav = () => {
    const { user, loading } = useAuth();

    const label = "Login";
    return (
        <Flex gap="2" align="center">
            <Button
                asChild
                variant="soft"
                color="iris"
                data-testid={`header-my-songs-button`}
            >
                <Link href="/profile/songs">
                    New Song
                </Link>
            </Button>

            <Button
                asChild
                variant="soft"
                color="iris"
                data-testid={`header-my-songs-button`}
            >
                <Link href="/profile/songs">
                    My Songs
                </Link>
            </Button>
        </Flex>
    );
};