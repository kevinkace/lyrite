"use client";

import { useEffect }  from "react";
import { useRouter } from "next/navigation";
import { Flex, Card } from "@radix-ui/themes";

import { useAuth }  from "@/contexts/AuthContext";
import SongEditor from "@/components/songs/SongEditor";

import css from "./page.module.css";

export default function NewSongPage() {
    const router = useRouter();

    const { user, loading } = useAuth();

    useEffect(() => {
        if (!user && !loading) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    return (
        <>
            <Flex direction="column" align="center">
                <h1>New Song</h1>

                <Card size="4" className={css.card}>
                    <SongEditor />
                </Card>
            </Flex>
        </>
    );
};
