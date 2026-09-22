"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
    Avatar,
    Box,
    Card,
    Flex,
    Heading,
    Text,
    Separator,
    IconButton
} from "@radix-ui/themes";
import { PanelRightOpen } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

import { useLayout } from "@/contexts/LayoutContext";
import { useAuth }   from "@/contexts/AuthContext";

import { userLinks } from "@/data/consts";

import Layout from "@/components/layout/Layout";
import UserLinks from "@/components/layout/UserLinks";

import css from "./layout.module.css";


export default function ProfileLayout({ children }: { children: React.ReactNode; }) {
    const { user, loading } = useAuth();
    const { startLoading, stopLoading } = useLayout();
    const router = useRouter();
    const currentPath = usePathname();

    const [ showMobileNav, setShowMobileNav ] = useState(false);

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

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [loading, user, router]);

    if (!user && !loading) {
        return null;
    }

    return (
        <Layout bg="mesh">
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

                    <div className={css.nav}>
                        <UserLinks />
                    </div>
                </Box>

                {/* Full-height separator */}
                <Separator orientation="vertical" className={css.separator} color="gray" size="4" />

                {/* Main content */}
                <Box className={css.content}>
                    <Flex gap="3" className={css.mobileNavHeader} align="center">
                        <IconButton
                            variant="soft"
                            onClick={() => {setShowMobileNav(!showMobileNav)}}
                            className={css.mobileNavButton}
                        >
                            <PanelRightOpen />
                        </IconButton>

                        <h2 className={css.pageTitle}>{pageTitle}</h2>
                    </Flex>

                    <AnimatePresence>

                        {showMobileNav && <motion.nav
                            initial={{ opacity: 0, x: -80 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -80 }}
                            transition={{ duration: 0.25 }}
                            className={css.mobileNav}
                        >
                            <UserLinks
                                onLinkClick={() => setShowMobileNav(false)}
                            />
                        </motion.nav>}

                    </AnimatePresence>

                    {children}
                </Box>
            </Flex>
        </Layout>
    );
}
