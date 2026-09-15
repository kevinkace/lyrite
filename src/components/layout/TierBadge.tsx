import React from "react";
import { Badge } from "@radix-ui/themes";
import { Crown, CircleCheck, type LucideIcon } from "lucide-react";

import { UserTierName } from "@/types";

import css from "./TierBadge.module.css";

const colors: Record<UserTierName, "indigo" | "cyan" | "orange"> = {
    free: "indigo",
    pro: "cyan",
    premium: "orange",
};

const icons: Partial<Record<UserTierName, LucideIcon>> = {
    pro: CircleCheck,
    premium: Crown,
};

type TierBadgeProps = {
    tier: UserTierName;
};

export function TierBadge({ tier }: TierBadgeProps) {
    const Icon = icons[tier];
    const color = colors[tier];

    return (
        <Badge
            className={css.tierBadge}
            radius="full"
            color={color}
        >
            {Icon && <Icon />}
            {tier}
        </Badge>
    );
}