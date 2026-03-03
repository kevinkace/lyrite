"use client";

import { useEffect, useState } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import { Button, Flex, Text } from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import styles from "./CookieBanner.module.css";

export default function CookieBanner() {
  const [hasConsent, setHasConsent] = useState(false);
  const [checked, setChecked] = useState(false); // ensures we’ve read cookies before rendering

  useEffect(() => {
    const cookieConsent = document.cookie.includes("cookie_consent=true");
    setHasConsent(cookieConsent);
    setChecked(true);
  }, []);

  const acceptCookies = () => {
    document.cookie = "cookie_consent=true; path=/; max-age=31536000";
    setHasConsent(true);
  };

  if (!checked) return null; // avoid flicker before cookies are read

  return (
    <>
      {hasConsent && <GoogleTagManager gtmId="GTM-WG5XVWB" />}

      <AnimatePresence>
        {!hasConsent && (
          <motion.div
            className={styles.banner}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            data-testid="cookie-banner"
          >
            <Flex direction="column" gap="2">
              <Text size="2">
                We use cookies for analytics to improve your experience.
              </Text>
              <Link href="/legal/privacy-policy">Privacy Policy</Link>
              <Flex justify="end" gap="2">
                <Button
                  onClick={acceptCookies}
                  variant="soft"
                  data-testid="cookie-banner-accept"
                >
                  Accept
                </Button>
              </Flex>
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
