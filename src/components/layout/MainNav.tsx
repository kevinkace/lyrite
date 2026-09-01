"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flex } from "@radix-ui/themes";

import css from "./Header.module.css";

export const MainNav = () => {
    const pathname = usePathname();

    if (/^\/songs/.test(pathname) || /^\/profile/.test(pathname)) {
        return null;
    }

    return (
        <Flex asChild gap="5" className={css.mainNav}>
        <nav className={css.mainNav}>
            <Link href="/features" className={css.userNavLink}>
                Features
            </Link>
            <Link href="/pricing" className={css.userNavLink}>
                Pricing
            </Link>
            </nav>
        </Flex>

    );
};