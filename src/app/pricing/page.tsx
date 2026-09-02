import type { Metadata } from "next";
import { Grid, Card } from "@radix-ui/themes";
import clsx from "clsx";

import Layout   from "@/components/layout/Layout";
import Article from "@/components/layout/Article";

import css from "./Pricing.module.css";

const pricing = [
    {
        level : "Free",
        price : "0",
        priceTime : "always",
        feats : [
            "5 Songs",
            "1000 Characters per song",
            "All formatting options"
        ]
    },
    {
        level : "Pro",
        price : "5",
        priceTime : "lifetime",
        feats : [
            "50 songs",
            "5000 Characters per song",
            "All formatting options"
        ],
        tag : "Coming Soon!"
    },
    {
        level : "Premium",
        price : "10",
        priceTime : "per month",
        feats : [
            "Unlimited songs!",
            "Unlimited Characters per song!",
            "All formatting options"
        ],
        tag : "Coming Soon!"
    }
];

export const metadata: Metadata = {
    title: "Lyrite features",
    description: "How Lyrite can help you sing better, faster, and more confidently.",
};

export default function PricingPage() {
    return <Layout bg="mesh">
        <Article>
            <h1>Lyrite pricing</h1>
            <p>Lyrite is a simple tool to format and organize your lyrics, and to help you sing better, faster, and more confidently.</p>
            <p>Lyrite will ALWAYS be free to use, but you can support the site and get additional features by signing up to a paid plan.</p>

            <Grid columns="3" gap="6" justify="center" className={css.pricingCards}>
                {pricing.map(({ level, price, priceTime, feats, tag }) => {
                    return (
                        <Card key={level} className={clsx(css[`card-${level}`], css.card)}>
                            <h3>{level}</h3>
                            <p className={css.price}>
                                <strong>
                                    <span>$</span>
                                    {price}
                                </strong>
                                <div>{priceTime}</div>
                            </p>

                            <hr/>

                            <ul>
                                {feats.map((feat, idx)=> (<li key={level + idx}>{feat}</li>))}
                            </ul>
                            {tag && (<p className={css.tag}>{tag}</p>)}
                        </Card>
                    );
                })}
            </Grid>
        </Article>
    </Layout>;
}
