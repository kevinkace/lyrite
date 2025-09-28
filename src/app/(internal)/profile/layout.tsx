"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
    Avatar,
    Box,
    Card,
    Flex,
    Heading,
    Text,
    Separator,
} from "@radix-ui/themes";

import { useAuth } from "@/contexts/AuthContext";
import { userLinks } from "@/data/consts";

import { useLayout } from "@/contexts/LayoutContext";

import css from "./layout.module.css";
import { useEffect } from "react";


export default function ProfileLayout({ children }: { children: React.ReactNode; }) {
    const { user, loading } = useAuth();
    const { startLoading, stopLoading } = useLayout();
    const router = useRouter();
    const currentPath = usePathname();

    const pageTitle = userLinks.find(link => link.href === currentPath)?.label || "Profile";

    useEffect(() => {
        if (loading) {
            startLoading();
        } else {
            stopLoading();
        }
        return () => {
            stopLoading();
        };
    }, [loading]);

    if (!user && !loading) {
        router.replace("/login");

        return null;
    }

    return (
        <Flex className={css.container} gap="6" align="stretch">
            {/* Left rail */}
            <Box className={css.rail}>
                <Card size="3" className={css.profileCard}>
                    <Flex direction="column" align="center" gap="3">
                        <Avatar
                            size="7"
                            src={user?.user_metadata?.avatar_url}
                            fallback={user?.email?.[0]?.toUpperCase() ?? "U"}
                            radius="full"
                        />
                        <Heading size="4">
                            {user?.user_metadata?.preferred_username ??
                                user?.user_metadata?.full_name ??
                                "User"}
                        </Heading>
                        <Text color="gray" size="2">
                            {user?.email}
                        </Text>
                    </Flex>
                </Card>

                <nav className={css.nav}>
                    {userLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={link.href === currentPath ? css.navLinkActive : css.navLink}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </Box>

            {/* Full-height separator */}
            <Separator orientation="vertical" className={css.separator} color="gray" size="4" />

            {/* Main content */}
            <Box className={css.content}>
                <h2 className={css.pageTitle}>{pageTitle}</h2>
                {children}
            </Box>
        </Flex>
    );
}
