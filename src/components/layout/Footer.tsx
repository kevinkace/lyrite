import { Flex } from "@radix-ui/themes";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import css from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={css.footer}>
            <Flex align="center" justify="center" gap="2">
                <span>{new Date().getFullYear()}</span>
                <span>
                    <a href="https://github.com/kevinkace/lyrite">
                        <GitHubLogoIcon />
                    </a>
                </span>
                <span><a href="https://kevinkace.dev/">Kevin Cameron</a></span>
            </Flex>
        </footer>
    );
}
