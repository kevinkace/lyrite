import { Flex } from "@radix-ui/themes";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import css from "./Footer.module.css";

const links = [
    {
        href: "/legal/terms-of-service",
        label: "Terms of Service",
    },
    {
        href: "/legal/privacy-policy",
        label: "Privacy Policy",
    }
];

export default function Footer() {
    return (
        <footer className={css.footer}>
            <Flex align="center" justify="center" gap="3" className={css.links}>
                {links.map(({ href, label }) => (
                    <a key={href} href={href}>{label}</a>
                ))}
            </Flex>


            <a
                href="https://github.com/kevinkace/lyrite"
                className={css.github}
            >
                <GitHubLogoIcon />
                v1.0.0
            </a>
        </footer>
    );
}
