"use client";

import { useEffect, useRef, useState } from "react";
import Link  from "next/link";
import { Button, Card, Flex, Separator } from "@radix-ui/themes";
import { motion, AnimatePresence } from "framer-motion";
import { FilePen, Settings, User, FilePlus } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

import { userLinks } from "@/data/consts";

import { Avatar } from "@/components/user/Avatar";

import css from "./UserMenu.module.css"

const iconMap: Record<string, React.ReactNode> = {
    profile: <User />,
    file: <FilePen />,
    settings: <Settings />
};

export default function UserMenu() {
    const { user, profile, signOut } = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement;

            if (ref.current && !ref.current.contains(target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!user) {
        return null;
    }

    return (
        <div className={css.userMenu} ref={ref}>

            <div
                className={css.avatarButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Avatar profile={profile} size="2"/>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={css.dropdown}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Card>
                            <Flex gap="3" className={css.userCard}>
                                <Avatar profile={profile} size="3"/>
                                <div className={css.cardText}>
                                    <p className={css.username}>{user.user_metadata.preferred_username}</p>
                                    <p className={css.email}>{user.user_metadata.full_name}</p>
                                </div>
                            </Flex>

                            <Separator orientation="horizontal" size="4"/>

                            <Flex gap="4" direction="column">
                                <nav className={css.links}>
                                    {userLinks.map(link =>
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className={css.link}
                                            >
                                                {iconMap[link.icon]}
                                                {link.label}
                                            </Link>
                                        )}
                                </nav>

                                <Separator orientation="horizontal" size="4"/>


                                <Button asChild={true} variant="surface" color="violet">
                                    <Link href="/songs/new">
                                        <FilePlus width="1em" height="auto" />
                                        New song
                                    </Link>
                                </Button>

                                <Separator orientation="horizontal" size="4"/>

                                <Button
                                    onClick={() => signOut()}
                                    color="crimson"
                                    variant="soft"
                                >
                                    Sign out
                                </Button>
                            </Flex>

                        </Card>

                        {/* <pre className="user-name">{JSON.stringify(user, null, 2)}</pre> */}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
