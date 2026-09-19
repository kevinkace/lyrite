import type { Metadata } from "next";
import { Flex } from "@radix-ui/themes";

import Layout   from "@/components/layout/Layout";
import Article from "@/components/layout/Article";
import { TierInfo } from "@/components/tiers/TierInfo";

import { pricingPlans } from "@/data/pricing";

import css from "./Pricing.module.css";

export const metadata: Metadata = {
    title: "Lyrite features",
    description: "How Lyrite can help you sing better, faster, and more confidently.",
};

export default function PricingPage() {
    return <Layout bg="mesh">
        <Article>
            <h1>Always free!</h1>
            <p>Lyrite is a simple tool to format and organize your lyrics, and to help you sing better, faster, and more confidently.</p>
            <p>Lyrite will ALWAYS be free to use, but you can support the site and get additional features by signing up to a paid plan.</p>

            <Flex columns="3" gap="6" justify="center" className={css.pricingCards}>
                {pricingPlans.map(({ tier }) => {
                    return <TierInfo key={tier} tier={tier} />;
                })}
            </Flex>
        </Article>
    </Layout>;
}
