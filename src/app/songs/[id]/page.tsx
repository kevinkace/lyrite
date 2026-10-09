"use client";

import Link from "next/link";
import { Button, Flex } from "@radix-ui/themes";

import EditSong from "@/components/song/EditSong";
import { EditingProvider } from "@/contexts/EditingContext";
import { useAuth } from "@/contexts/AuthContext";
import { useSong } from "@/contexts/SongContext";

export default function SongPage() {
    const { song } = useSong();
    const { user } = useAuth();

    return (
        <EditingProvider>
            {song && !song.user_id && !user && (
                <Flex justify="end" mb="3">
                    <Button asChild variant="surface" color="violet">
                        <Link href="/login">Sign up to save</Link>
                    </Button>
                </Flex>
            )}

            <EditSong />
        </EditingProvider>
    );
}
