import Link from "next/link";

import { Flex } from "@radix-ui/themes";

import { UserNav } from "@/components/layout/UserNav";
import { UserSection } from "@/components/layout/UserSection";
import { LogoIcon } from "@/components/icons/LogoIcon.svg";
import { Title } from "@/components/layout/Title";

import css from "./Header.module.css";
import ErrorButton from "../error/ErrorButton";

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

                {/* <UserNav /> */}
                <ErrorButton />
            </Flex>

            <Title />

            <UserSection />

        </header>
    );
}
