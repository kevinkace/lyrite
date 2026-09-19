import type { UserTierName } from "@/types";

export type PricingPlan = {
    tier: UserTierName;
    level: string;
    price: string;
    priceTime: string;
    feats: readonly string[];
    tag?: string;
};

export const pricingPlans: PricingPlan[] = [
    {
        tier : "free",
        level : "Free",
        price : "0",
        priceTime : "always",
        feats : [
            "10 Songs",
            "2000 Characters per song",
            "All formatting options"
        ]
    },
    {
        tier : "pro",
        level : "Pro",
        price : "5",
        priceTime : "lifetime",
        feats : [
            "100 songs",
            "5000 Characters per song*",
            "All formatting options"
        ],
        tag : "Coming Soon!"
    },
    {
        tier : "premium",
        level : "Premium",
        price : "10",
        priceTime : "monthly",
        feats : [
            "1000 songs!",
            "9999 Characters per song!",
            "All formatting options"
        ],
        tag : "Coming Soon!"
    }
];

export const pricingPlanFromTier = (_tier) => {
    return pricingPlans.find(({ tier }) => (tier === _tier));
}

export const getNextTier = (tier) => {
    return pricingPlans.find((pp, idx) => {
        return pricingPlans[idx - 1]?.tier === tier;
    });
}