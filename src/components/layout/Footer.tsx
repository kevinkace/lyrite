import { Flex } from "@radix-ui/themes";
import css from "./Footer.module.css";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Footer() {
    return (
        <footer className={css.footer}>
            <Flex align="center" justify="center" gap="2">
                <p>{new Date().getFullYear()}</p>
                <p><a href="https://kevinkace.dev/">Kevin Cameron</a></p>
                <p>
                    <a href="https://github.com/kevinkace/lyrite">
                        <GitHubLogoIcon />
                    </a>
                </p>
            </Flex>
        </footer>
    );
}
