"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Flex } from "@radix-ui/themes";
import { clsx } from "clsx";

import { UserSection } from "@/components/layout/UserSection";
import { Title }       from "@/components/layout/Title";
import { MainNav }     from "@/components/layout/MainNav";
// import { UserNav } from "@/components/layout/UserNav";

// import ErrorButton from "@/components/error/ErrorButton";
import { LogoIcon }    from "@/components/icons/LogoIcon.svg";

import css from "./Header.module.css";

export default function Header() {


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

            <div className={css.center}>
                <Title />
            </div>

            <div className={css.right}>
                <UserSection />
            </div>

        </header>
    );
}
