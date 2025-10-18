"use client";

import { useEffect, useState } from "react";

export function useConsent() {
    const [hasConsent, setHasConsent] = useState(false);

    useEffect(() => {
        const cookieConsent = document.cookie.includes("cookie_consent=true");
        setHasConsent(cookieConsent);
    }, []);

    return { hasConsent, setHasConsent };
}
