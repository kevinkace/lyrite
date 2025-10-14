"use client";

import Link from "next/link";
import { useConsent } from "@/hooks/useConsent";
import { Button, Flex, Text } from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./CookieBanner.module.css";

export function CookieBanner() {
    const { hasConsent, setHasConsent } = useConsent();

    const acceptCookies = () => {
        document.cookie = "cookie_consent=true; path=/; max-age=31536000";
        setHasConsent(true);
    };

    return (
        <AnimatePresence>
            {!hasConsent && (
                <motion.div
                    className={styles.banner}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                >
                    <Flex direction="column" gap="2">
                        <Text size="2">
                            We use cookies for analytics to improve your experience.
                        </Text>
                        <Link href="/legal/privacy-policy">Privacy Policy</Link>
                        <Flex justify="end" gap="2">
                            <Button onClick={acceptCookies} variant="soft">Accept</Button>
                        </Flex>
                    </Flex>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
