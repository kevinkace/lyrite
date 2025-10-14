"use client";

import { GoogleTagManager } from "@next/third-parties/google";

import { useConsent } from "@/hooks/useConsent";

export function AnalyticsLoader() {
    const { hasConsent } = useConsent();

    if (!hasConsent) return null;

    return <GoogleTagManager gtmId="GTM-WG5XVWB" />;
}
