import { Flex }           from "@radix-ui/themes";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { version } from "../../../package.json";

import { sanitizeTestId } from "@/lib/utils";

import css from "./Footer.module.css";

const links = [
    {
        href: "/docs/release-notes",
        label: "Release Notes",
    },
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
        <footer className={css.footer} data-testid="footer">
            <Flex align="center" justify="center" gap="3" className={css.links}>
                {links.map(({ href, label }) => (
                    <a
                    key={href}
                    href={href}
                    data-testid={`footer-${sanitizeTestId(label)}`}
                >
                    {label}
                </a>
                ))}
            </Flex>


            <a
                href="https://github.com/kevinkace/lyrite/tree/nextjs-supabase"
                className={css.github}
                data-testid="footer-version"
            >
                <GitHubLogoIcon />
                v{version}
            </a>
        </footer>
    );
}
