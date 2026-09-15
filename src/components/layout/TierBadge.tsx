import React from "react";
import { Badge } from "@radix-ui/themes";
import { Crown, CircleCheck } from "lucide-react";

import css from "./TierBadge.module.css";

const colors = {
    "free" : "indigo",
    "pro" : "cyan",
    "premium" : "orange"
}

const icons = {
    "pro" : CircleCheck,
    "premium" : Crown
};

export function TierBadge({tier}) {
    const Icon = icons[tier];
    const color = colors[tier];

    return (
        <Badge
            className={css.tierBadge}
            radius="full"
            color={color}
        >
            {Icon && <Icon/>}
            {tier}
        </Badge>
    );
}