import Link from "next/link";

import { Flex } from "@radix-ui/themes";

import { LogoIcon } from "@/components/icons/LogoIcon.svg";

import css from "./Header.module.css";
import { UserNav } from "./UserNav";
import { UserSection } from "./UserSection";

export default function Header() {
    return (
        <header className={css.header}>
            <Flex align="center" gap="6">
                <h1 className={css.logo}>
                    <Link href="/" data-gid="header-home-link" className={css.logoLink}>
                        <LogoIcon />
                        lyrite
                    </Link>
                </h1>

                <UserNav />
            </Flex>

            <Flex align="center" gap="6">
                song title
            </Flex>

            <UserSection />

        </header>
    );
}
