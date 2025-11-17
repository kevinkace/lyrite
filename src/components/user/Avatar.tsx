"use client";

import { Avatar as Av} from "@radix-ui/themes";

import { Profile } from "@/types";

export function Avatar({ profile, size = "6" } : { profile: Profile | null, size?: string | number }) {
    const src = profile?.avatar_url || "default-avatar.png";
    const alt = `${profile?.username || "User"} avatar`;
    const fallback = profile?.username ? profile.username[0].toUpperCase() : "U";

    return (
        <Av
            size={size}
            src={src}
            alt={alt}
            fallback={fallback}
            radius="full"
        />
    );
}
