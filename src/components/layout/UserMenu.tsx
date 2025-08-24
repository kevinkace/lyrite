"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { useUser } from "@/contexts/userContext";

import css from "./UserMenu.module.css"
import { link } from "framer-motion/m";

export default function UserMenu() {
    const { user, handleSignOut } = useUser();

    const [isOpen, setIsOpen] = useState(false);

    if (!user) {
        return null;
    }

    const links = [
        { href: "/profile", label: "Profile" },
        { href: "/settings", label: "Settings" }
    ];

    return (
        <div
            className={css.userMenu}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >

            <button
                className={css.avatarButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                <img
                    src={user?.user_metadata?.avatar_url}
                    alt={`${user?.user_metadata?.preferred_username} avatar`} className={css.avatar}
                />
            </button>

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

                            <button
                                onClick={handleSignOut}
                                className={css.signout}
                            >
                                Sign out
                            </button>
                        </nav>


                        {/* <pre className="user-name">{JSON.stringify(user, null, 2)}</pre> */}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
