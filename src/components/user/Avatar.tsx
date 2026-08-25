"use client";

import { PersonIcon } from "@radix-ui/react-icons";
import { Avatar as Av } from "@radix-ui/themes";

import { Profile } from "@/types";
import { Responsive } from "@radix-ui/themes/props";

export function Avatar({ profile, size = "6" } : { profile: Profile | null, size?: string | number }) {
    const src = profile?.avatar_url ?? undefined;
    const alt = `${profile?.username || "User"} avatar`;

    return (
        <Av
            size={size as Responsive<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"> | undefined}
            src={src}
            alt={alt}
            fallback={<PersonIcon width={18} height={18} />}
            radius="full"
        />
    );
}
