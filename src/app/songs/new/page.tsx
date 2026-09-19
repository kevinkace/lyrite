"use client";

import { useEffect, useState }  from "react";
import { useRouter } from "next/navigation";
import { Flex, Card } from "@radix-ui/themes";

import { useAuth }  from "@/contexts/AuthContext";
import { useModal } from "@/contexts/ModalContext";
import SongEditor from "@/components/songs/SongEditor";
import { supabase } from "@/lib/supabase/client";
import { songCountLimitForTier } from "@/data/pricing";

import css from "./page.module.css";

export default function NewSongPage() {
    const router = useRouter();

    const { user, profile, loading } = useAuth();
    const { openModal } = useModal();
    const [canCreateSong, setCanCreateSong] = useState<boolean | null>(null);

    useEffect(() => {
        if (!user && !loading) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (!user || !profile) return;

        const checkSongLimit = async () => {
            const { count, error } = await supabase
                .from("songs")
                .select("id", { count: "exact", head: true })
                .eq("user_id", user.id);

            if (error) {
                setCanCreateSong(true);
                return;
            }

            const canCreate = (count ?? 0) < songCountLimitForTier(profile.tier_name);
            setCanCreateSong(canCreate);

            if (!canCreate) {
                openModal({
                    type: "upgrade",
                    title: "Plans",
                });
            }
        };

        void checkSongLimit();
    }, [profile, user, openModal]);

    if (loading || !user || !profile || canCreateSong === null) return null;

    return (
        <>
            <Flex direction="column" align="center">
                <h1>New Song</h1>

                <Card size="4" className={css.card}>
                    <SongEditor isNew={true}/>
                </Card>
            </Flex>
        </>
    );
};
