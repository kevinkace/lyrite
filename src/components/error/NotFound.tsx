import Link from "next/link";
import { Flex } from "@radix-ui/themes";

import css from "./NotFound.module.css";

export default function NotFound() {
    return (
        <Flex direction="column" align="center" justify="center" gap="1">
            <p className={css.code}>404</p>
            <h1>Page not found</h1>
            <p>The page or song you are looking for does not exist.</p>
            <Link href="/">Return to Lyrite</Link>
        </Flex>
    );
}
