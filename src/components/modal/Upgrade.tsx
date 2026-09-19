"use client";

import { Flex, Button } from "@radix-ui/themes";

import { useAuth } from "@/contexts/AuthContext";

import { TierInfo } from "@/components/tiers/TierInfo";

import { getNextTier } from "@/data/pricing";

import css from "./Upgrade.module.css";

export default function Upgrade({ closeModal }: { closeModal: () => void; }) {
    const { profile } = useAuth();
    const nextPlan = getNextTier(profile?.tier_name);

    return (
        <Flex direction="column" gap="3">
            <p>
                This feature is available on a paid plan. Choose a plan below to get more songs and more room for your lyrics.
            </p>

            <div className={css.plan}>
                {nextPlan ? (
                    <>
                        <TierInfo tier={nextPlan.tier} />

                        {nextPlan.tag ? null : <Button>
                            {`Choose ${nextPlan.level}`}
                        </Button>}
                    </>
                ) : <p>You are already on the highest available plan.</p>}
            </div>

            <Flex justify="end">
                <Button variant="soft" onClick={closeModal}>
                    Maybe later
                </Button>
            </Flex>

        </Flex>
    );
}
