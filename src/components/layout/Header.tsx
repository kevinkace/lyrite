"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Flex } from "@radix-ui/themes";
import { clsx } from "clsx";

import { UserSection } from "@/components/layout/UserSection";
import { MainNav }     from "@/components/layout/MainNav";
// import { UserNav } from "@/components/layout/UserNav";

import { useLayout } from "@/contexts/LayoutContext";

// import ErrorButton from "@/components/error/ErrorButton";
import { LogoIcon }    from "@/components/icons/LogoIcon.svg";

import css from "./Header.module.css";

export default function Header() {
    const { headerContent } = useLayout();
    const pathname = usePathname();

    return (
        <header className={css.header}>
            <Flex align="center" gap="6" className={css.left}>
                <h1 className={css.logo}>
                    <Link
                        href="/"
                        data-testid="header-logo-link"
                        data-gid="header-home-link"
                        className={css.logoLink}
                    >
                        <LogoIcon />
                        <span className={clsx({
                            [css.hidable] : /^\/songs/.test(pathname)
                        })}>Lyrite</span>
                    </Link>
                </h1>

                <MainNav />
                {/* <UserNav /> */}
                {/* <ErrorButton /> */}
            </Flex>

            {headerContent && (
                <div className={css.center}>
                    <Flex
                        align={{ initial: 'start', md: 'center' }}
                        direction="column"
                        className={css.title}
                    >
                        {headerContent}
                    </Flex>
                </div>
            )}

            <div className={css.right}>
                <UserSection />
            </div>

        </header>
    );
}
