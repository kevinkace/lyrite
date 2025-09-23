"use client";

import { useState } from "react";
import Link  from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "@/contexts/AuthContext";

import css from "./UserMenu.module.css"
import { Button } from "@radix-ui/themes";

export default function UserMenu() {
    const { user, signOut } = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    if (!user) {
        return null;
    }

    const links = [
        { href: "/profile",          label: "Profile" },
        { href: "/profile/settings", label: "Settings" }
    ];

    return (
        <div
            className={css.userMenu}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >

            <div
                className={css.avatarButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={user?.user_metadata?.avatar_url || "/default-avatar.png"}
                    alt={`${user?.user_metadata?.preferred_username || "User"} avatar`}
                    className={css.avatar}
                    width={40}
                    height={40}
                />
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
                        <div className="dropdown-header">
                            <p className={css.username}>{user.user_metadata.preferred_username}</p>
                            <p className={css.email}>{user.email}</p>
                        </div>

                        <nav className={css.links}>
                            {links.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={css.link}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <Button
                                onClick={() => signOut()}
                                color="crimson"
                                variant="soft"
                            >
                                Sign out
                            </Button>
                        </nav>


                        {/* <pre className="user-name">{JSON.stringify(user, null, 2)}</pre> */}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
