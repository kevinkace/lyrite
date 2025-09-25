"use client";

import { useState } from "react";
import Link  from "next/link";
import { Button, Card, Flex, Separator } from "@radix-ui/themes";
import { motion, AnimatePresence } from "framer-motion";

import { FileIcon, PersonIcon, GearIcon } from "@radix-ui/react-icons";

import { useAuth } from "@/contexts/AuthContext";

import css from "./UserMenu.module.css"
import { userLinks } from "@/data/consts";
import { Avatar } from "../user/Avatar";

const iconMap: Record<string, React.ReactNode> = {
    profile: <PersonIcon />,
    file: <FileIcon />,
    settings: <GearIcon />
};

export default function UserMenu() {
    const { user, signOut } = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    if (!user) {
        return null;
    }


    return (
        <div className={css.userMenu}>

            <div
                className={css.avatarButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Avatar user={user} />
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
                            <Card className={css.userCard}>
                                <Avatar user={user} />
                                <div className={css.cardText}>
                                    <p className={css.username}>{user.user_metadata.preferred_username}</p>
                                    <p className={css.email}>{user.email}</p>
                                </div>
                            </Card>


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
