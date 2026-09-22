"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { userLinks } from "@/data/consts";

import css from "./UserLinks.module.css";

type UserLinksProps = {
    onLinkClick?: () => void;
};

export default function UserLinks({
    onLinkClick,
}: UserLinksProps) {
    const currentPath = usePathname();

    return (
        <nav className={css.nav}>
            {userLinks.map((link) => {
                const isActive = link.href === currentPath;

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={isActive ? css.navLinkActive : css.navLink}
                        onClick={onLinkClick}
                    >
                        {link.icon}
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
}
