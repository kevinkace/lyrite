"use client";

import { Avatar as Av} from "@radix-ui/themes";

import { Profile } from "@/types";
import { Responsive } from "@radix-ui/themes/props";

export function Avatar({ profile, size = "6" } : { profile: Profile | null, size?: string | number }) {
    const src = profile?.avatar_url || "default-avatar.png";
    const alt = `${profile?.username || "User"} avatar`;
    const fallback = profile?.username ? profile.username[0].toUpperCase() : "U";



    return (
        <Av
            size={size as Responsive<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"> | undefined}
            src={src}
            alt={alt}
            fallback={fallback}
            radius="full"
        />
    );
}
