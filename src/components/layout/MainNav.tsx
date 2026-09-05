"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flex } from "@radix-ui/themes";

import css from "./Header.module.css";

const links = [
    {
        href: "/features",
        label: "Features"
    },
    {
        href: "/pricing",
        label: "Pricing"
    },
    {
        href: "/docs/migration-guide",
        label: "Migration Guide"
    }
];

export const MainNav = () => {
    const pathname = usePathname();

    if (/^\/songs/.test(pathname) || /^\/profile/.test(pathname)) {
        return null;
    }

    return (
        <Flex asChild gap="5" className={css.mainNav} align="center">
            <nav className={css.mainNav}>
                {links.map((link) => (
                    <Link href={link.href} key={link.href} className={css.userNavLink}>
                        {link.label}
                    </Link>
                ))}
            </nav>
        </Flex>

    );
};