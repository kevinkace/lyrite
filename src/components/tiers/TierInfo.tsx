
import { Card } from "@radix-ui/themes";
import clsx from "clsx";

import type { UserTierName } from "@/types";

import { pricingPlanFromTier } from "@/data/pricing";

import css from "./TierInfo.module.css";

export const TierInfo = ({tier} : { tier : UserTierName}) => {
    const { level, price, priceTime, tag, feats } = pricingPlanFromTier(tier);

    return (
        <Card key={tier} className={clsx(css[`card-${tier}`], css.card)}>
            <h3>{level}</h3>

            <p className={css.price}>
                <strong>
                    <span className={css.currency}>$</span>
                    {price}
                </strong>
                <span className={css.priceTime}>{priceTime}</span>
            </p>

            <hr/>

            <ul>
                {feats.map((feat, idx)=> (<li key={level + idx}>{feat}</li>))}
            </ul>

            {tag && (<p className={css.tag}>{tag}</p>)}
        </Card>
    );
}
