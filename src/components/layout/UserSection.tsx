"use client";

import Link             from "next/link";
import { usePathname }  from "next/navigation";
import { FilePlus }     from "lucide-react";
import { Flex, Button } from "@radix-ui/themes";

import { useAuth }   from "@/contexts/AuthContext";
import { useLayout } from "@/contexts/LayoutContext";

import { sanitizeTestId } from "@/lib/utils";

import UserMenu from "@/components/layout/UserMenu";

import { RadixColor, RadixVariant } from "@/types";

const loggedOutLinks = [
    { href: "/login", label: "Login", variant : "soft", color : "violet" },
    // { href: "/register", label: "Register", variant : "soft" }
];

export const UserSection = () => {
    const { user, loading } = useAuth();
    const { headerUserContent } = useLayout();
    const pathname = usePathname();
    const isSongEditPage = /^\/songs\/[^/]+$/.test(pathname) && pathname !== "/songs/new";

    return (
        <>
            {user && (
                <Flex gap="4" align="center">
                    {!headerUserContent && <Button asChild variant="surface" size="2" radius="full" color="violet">
                        <Link href="/songs/new">
                            <FilePlus/>
                            New song
                        </Link>
                    </Button>}

                    {headerUserContent}

                    <UserMenu />
                </Flex>
            )}

            {!user && !loading && (
                <Flex gap="2" align="center">
                    {headerUserContent}
                    {loggedOutLinks.map((link) => {
                        const label = isSongEditPage ? "Sign up to save" : link.label;

                        return (
                            <Button
                                key={link.href}
                                asChild
                                variant={link.variant as RadixVariant}
                                color={link.color as RadixColor}
                                data-testid={`header-${sanitizeTestId(label)}-button`}
                            >
                                <Link href={link.href}>{label}</Link>
                            </Button>
                        );
                    })}
                </Flex>
            )}
        </>
    );
};