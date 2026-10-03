"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Button, Flex } from "@radix-ui/themes";

import { useAuth } from "@/contexts/AuthContext";
import { useLayout } from "@/contexts/LayoutContext";
import { useSetlist } from "@/contexts/SetlistContext";
import { useSetlistEditing } from "@/contexts/SetlistEditingContext";
import { useModal } from "@/contexts/ModalContext";
import { SongsProvider } from "@/contexts/SongsContext";

import SongsTable from "@/components/songs/SongsTable";

export default function SetlistEditor() {
    const id = useParams<{ id: string }>().id;
    const { user } = useAuth();
    const { openModal } = useModal();
    const { setHeaderContent } = useLayout();
    const { setlist, loading, error } = useSetlist();
    const { addSong } = useSetlistEditing();

    useEffect(() => {
        if (!setlist) {
            setHeaderContent(null);
            return;
        }

        setHeaderContent(<h1>{setlist.title}</h1>);

        return () => setHeaderContent(null);
    }, [setHeaderContent, setlist]);

    const isOwner = !!user && !!setlist && user.id === setlist.user_id;

    if (loading && !setlist) return <p>Loading setlist...</p>;
    if (!setlist) return <p>{error || "Setlist not found"}</p>;

    return (
        <Flex direction="column" gap="5">
            {setlist.songs.length === 0 && <p>Your setlist is empty.</p>}

            <SongsProvider userId={user?.id} pageSize={100} setlistId={id}>
                <SongsTable
                    actions={isOwner ? [<Button key="add-song" onClick={() => openModal({
                        type: "addSong",
                        title: "Add Song",
                        props: {
                            onAdd: (songId: string) => {
                                return addSong(id, songId);
                            },
                        },
                    })}>Add song</Button>] : []}
                />
            </SongsProvider>
        </Flex>
    );
}